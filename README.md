## Uruchomienie

```bash
npm install
npm run dev
```
W domyśle aplikacja nie połączy się z bazą danych - przez brak url.
Aby połączyć się z MongoDB należy w pliku .env dodać zmienną MONGODB_URL=mongodb+srv://...
Uzupełnioną danymi dostępu do bazy.
[Informacje o zdobywaniu dostępu](https://www.mongodb.com/docs/mongodb-shell/connect/) (w szczególności punkty 1 i 2).

**Strona jest stale dostępna pod tym [linkiem](https://bit-entry-todo.vercel.app).**

## Info

W trybie dev, przez strict mode-a przy wejściu na stronę zapisane taski pobiorą się dwa razy.
Zopytmalizowaną wersję można zobaczyć na [stronie](https://bit-entry-todo.vercel.app).