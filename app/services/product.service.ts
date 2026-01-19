import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { Product } from "../models/product.model";

@Injectable({
  providedIn: "root"
})
export class ProductService {
  private apiUrl = "https://jsonplaceholder.typicode.com/posts";
  private localProducts: Product[] = [];

  constructor(private http: HttpClient) {
    this.loadLocalProducts();
  }

  private loadLocalProducts(): void {
    const stored = localStorage.getItem("products");
    if (stored) {
      this.localProducts = JSON.parse(stored);
    }
  }

  private saveLocalProducts(): void {
    localStorage.setItem("products", JSON.stringify(this.localProducts));
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((posts) => {
        const products: Product[] = this.localProducts.map(p => ({ ...p }));
        posts.slice(0, 5).forEach((post, index) => {
          if (!products.find(p => p.id === `api-${post.id}`)) {
            products.push({
              id: `api-${post.id}`,
              name: post.title.substring(0, 30),
              code: `API-${post.id}`,
              description: post.body,
              status: index % 2 === 0 ? "available" : "out_of_stock",
              createdAt: new Date().toISOString()
            });
          }
        });
        return products;
      }),
      catchError((error) => {
        console.error("Error fetching products from API, using local:", error);
        return of(this.localProducts);
      })
    );
  }

  getProduct(id: string): Observable<Product | null> {
    const product = this.localProducts.find(p => p.id === id);
    if (product) {
      return of({ ...product });
    }
    return of(null);
  }

  addProduct(product: Product): Observable<Product> {
    const newProduct: Product = {
      ...product,
      id: `local-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.localProducts.push(newProduct);
    this.saveLocalProducts();

    return this.http.post<any>(this.apiUrl, {
      title: product.name,
      body: product.description || ""
    }).pipe(
      map(() => newProduct),
      catchError((error) => {
        console.error("Error posting to API, but product saved locally:", error);
        return of(newProduct);
      })
    );
  }

  updateProduct(id: string, product: Product): Observable<Product> {
    const index = this.localProducts.findIndex(p => p.id === id);
    if (index !== -1) {
      const updated: Product = {
        ...product,
        id,
        updatedAt: new Date().toISOString()
      };
      this.localProducts[index] = updated;
      this.saveLocalProducts();
      return of(updated);
    }
    return throwError(() => new Error("Product not found"));
  }

  deleteProduct(id: string): Observable<boolean> {
    const index = this.localProducts.findIndex(p => p.id === id);
    if (index !== -1) {
      this.localProducts.splice(index, 1);
      this.saveLocalProducts();
      return of(true);
    }
    return throwError(() => new Error("Product not found"));
  }
}
