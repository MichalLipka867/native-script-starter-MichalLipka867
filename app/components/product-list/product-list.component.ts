import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";
import { ProductService } from "../../services/product.service";
import { Product } from "../../models/product.model";

@Component({
  selector: "ns-product-list",
  templateUrl: "./product-list.component.html",
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  isLoading = true;
  error: string | null = null;

  constructor(
    private productService: ProductService,
    private router: RouterExtensions
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading = true;
    this.error = null;
    
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = "Błąd podczas ładowania produktów";
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  navigateToDetail(id: string): void {
    this.router.navigate(["/product", id]);
  }

  navigateToAdd(): void {
    this.router.navigate(["/product-add"]);
  }

  navigateToSettings(): void {
    this.router.navigate(["/settings"]);
  }

  getStatusColor(status: string): string {
    switch (status) {
      case "available":
        return "#28a745";
      case "out_of_stock":
        return "#dc3545";
      case "reserved":
        return "#ffc107";
      default:
        return "#6c757d";
    }
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
}
