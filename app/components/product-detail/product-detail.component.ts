import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { RouterExtensions } from "@nativescript/angular";
import { ProductService } from "../../services/product.service";
import { Product } from "../../models/product.model";
import { ImageSource } from "@nativescript/core";

@Component({
  selector: "ns-product-detail",
  templateUrl: "./product-detail.component.html",
})
export class ProductDetailComponent implements OnInit {
  product: Product | null = null;
  productId: string | null = null;
  isLoading = true;
  isEditing = false;
  error: string | null = null;
  
  editedProduct: Product = {
    name: "",
    code: "",
    description: "",
    status: "available"
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private routerExtensions: RouterExtensions,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productId = params["id"];
      if (this.productId) {
        this.loadProduct();
      }
    });
  }

  loadProduct(): void {
    if (!this.productId) return;
    
    this.isLoading = true;
    this.productService.getProduct(this.productId).subscribe({
      next: (product) => {
        if (product) {
          this.product = product;
          this.editedProduct = { ...product };
        } else {
          this.error = "Produkt nie został znaleziony";
        }
        this.isLoading = false;
      },
      error: (err) => {
        this.error = "Błąd podczas ładowania produktu";
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  startEdit(): void {
    this.isEditing = true;
  }

  cancelEdit(): void {
    if (this.product) {
      this.editedProduct = { ...this.product };
    }
    this.isEditing = false;
  }

  saveEdit(): void {
    if (!this.productId || !this.editedProduct.name || !this.editedProduct.code) {
      this.error = "Nazwa i kod są wymagane";
      return;
    }

    this.isLoading = true;
    this.productService.updateProduct(this.productId, this.editedProduct).subscribe({
      next: (updated) => {
        this.product = updated;
        this.isEditing = false;
        this.isLoading = false;
        this.error = null;
      },
      error: (err) => {
        this.error = "Błąd podczas aktualizacji produktu";
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  deleteProduct(): void {
    if (!this.productId) return;

    if (confirm("Czy na pewno chcesz usunąć ten produkt?")) {
      this.isLoading = true;
      this.productService.deleteProduct(this.productId).subscribe({
        next: () => {
          this.routerExtensions.navigate(["/products"], { clearHistory: true });
        },
        error: (err) => {
          this.error = "Błąd podczas usuwania produktu";
          console.error(err);
          this.isLoading = false;
        }
      });
    }
  }

  goBack(): void {
    this.routerExtensions.back();
  }

  getStatusText(status: string): string {
    switch (status) {
      case "available":
        return "Dostępny";
      case "out_of_stock":
        return "Brak";
      case "reserved":
        return "Zarezerwowany";
      default:
        return status;
    }
  }

  getImagePath(): string | null {
    return this.product?.imagePath || null;
  }
}
