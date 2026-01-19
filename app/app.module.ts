import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "@nativescript/angular";
import { NativeScriptFormsModule } from "@nativescript/angular";
import { NativeScriptHttpClientModule } from "@nativescript/angular";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ProductListComponent } from "./components/product-list/product-list.component";
import { ProductDetailComponent } from "./components/product-detail/product-detail.component";
import { ProductAddComponent } from "./components/product-add/product-add.component";
import { SettingsComponent } from "./components/settings/settings.component";

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    NativeScriptHttpClientModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductDetailComponent,
    ProductAddComponent,
    SettingsComponent
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}
