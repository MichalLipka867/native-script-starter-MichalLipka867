[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/Uu9lUx8_)
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=22281440&assignment_repo_type=AssignmentRepo)
# NativeScript: Scan Inventory

Aplikacja mobilna do zarządzania magazynem produktów z użyciem NativeScript i Angular.

## Co jest w aplikacji

- **4 widoki:** lista produktów, szczegóły, dodawanie, ustawienia
- **Natywna funkcja:** aparat do robienia zdjęć produktów
- **API:** komunikacja z JSONPlaceholder (GET/POST) + lokalne przechowywanie
- **Walidacja:** wymagane pola w formularzu

## Jak uruchomić

1. Zainstaluj zależności:
```bash
npm install
```

2. Uruchom na Androidzie:
```bash
npm run android
```

3. Uruchom na iOS (tylko macOS):
```bash
npm run ios
```

## Funkcje

- Lista produktów z kodami i statusami
- Szczegóły produktu z możliwością edycji/usuwania
- Dodawanie produktu z aparatem (natywna funkcja)
- Walidacja formularzy
- Obsługa błędów i uprawnień

## Technologie

- NativeScript 8
- Angular 17
- TypeScript
- nativescript-camera (natywna funkcja)

## Struktura

```
app/
├── components/        # Komponenty widoków
├── services/          # Serwisy (API, aparat)
├── models/            # Modele danych
└── app.module.ts      # Główny moduł
```
