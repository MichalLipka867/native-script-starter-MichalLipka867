import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";
import { ProductService } from "../../services/product.service";
import { CameraService } from "../../services/camera.service";
import { Product } from "../../models/product.model";

@Component({
  selector: "ns-product-add",
  templateUrl: "./product-add.component.html",
})
export class ProductAddComponent implements OnInit {
  product: Product = {
    name: "",
    code: "",
    description: "",
    status: "available",
    imagePath: ""
  };

  isLoading = false;
  error: string | null = null;
  imagePath: string | null = null;

  constructor(
    private productService: ProductService,
    private cameraService: CameraService,
    private router: RouterExtensions
  ) {}

  ngOnInit(): void {}

  takePicture(): void {
    this.isLoading = true;
    this.error = null;

    this.cameraService.takePicture().then(
      (path) => {
        this.imagePath = path;
        this.product.imagePath = path;
        this.isLoading = false;
      },
      (err) => {
        this.error = "Błąd podczas robienia zdjęcia: " + err.message;
        console.error(err);
        this.isLoading = false;
      }
    );
  }

  onSubmit(): void {
    this.error = null;

    if (!this.product.name || !this.product.name.trim()) {
      this.error = "Nazwa produktu jest wymagana";
      return;
    }

    if (!this.product.code || !this.product.code.trim()) {
      this.error = "Kod produktu jest wymagany";
      return;
    }

    this.isLoading = true;

    const productToAdd: Product = {
      ...this.product,
      name: this.product.name.trim(),
      code: this.product.code.trim(),
      description: this.product.description?.trim() || "",
      imagePath: this.imagePath || undefined
    };

    this.productService.addProduct(productToAdd).subscribe({
      next: () => {
        this.routerExtensions.navigate(["/products"], { clearHistory: true });
      },
      error: (err) => {
        this.error = "Błąd podczas dodawania produktu";
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  goBack(): void {
    this.routerExtensions.back();
  }
}
