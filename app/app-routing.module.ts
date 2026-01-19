import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "@nativescript/angular";
import { Routes } from "@angular/router";
import { ProductListComponent } from "./components/product-list/product-list.component";
import { ProductDetailComponent } from "./components/product-detail/product-detail.component";
import { ProductAddComponent } from "./components/product-add/product-add.component";
import { SettingsComponent } from "./components/settings/settings.component";

const routes: Routes = [
  { path: "", redirectTo: "/products", pathMatch: "full" },
  { path: "products", component: ProductListComponent },
  { path: "product/:id", component: ProductDetailComponent },
  { path: "product-add", component: ProductAddComponent },
  { path: "settings", component: SettingsComponent },
];

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule],
})
export class AppRoutingModule {}
