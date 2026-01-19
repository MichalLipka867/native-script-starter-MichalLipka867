import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";

@Component({
  selector: "ns-settings",
  templateUrl: "./settings.component.html",
})
export class SettingsComponent implements OnInit {
  constructor(private router: RouterExtensions) {}

  ngOnInit(): void {}

  goBack(): void {
    this.routerExtensions.back();
  }

  clearData(): void {
    if (confirm("Czy na pewno chcesz wyczyścić wszystkie dane?")) {
      localStorage.removeItem("products");
      alert("Dane zostały wyczyszczone. Aplikacja zostanie odświeżona.");
      // W NativeScript możemy użyć aplikacji restart lub po prostu powiadomić użytkownika
    }
  }
}
