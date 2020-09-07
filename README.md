## Запуск

установить `REACT_APP_API_URL=http://localhost:3001`<br />

`node --experimental-modules mock-server/`<br />
или<br />
`yarn mock-server`

## Добавление новых моков:

1. добавление статических моков в папку `__mocks__` в соотвествующий раздел:

- GET.json для GET запросов
- POST.json для POST запросов
- DELETE.json для DELETE запросов
- PATCH.json для PATCH запросов

2. добавление динамических моков.

- GET.mjs для GET запросов
- POST.mjs для POST запросов
- DELETE.mjs для DELETE запросов
- PATCH.mjs для PATCH запросов

### Пример динамического мока:

```js
export default (request, response) => {
  const {
    // параметры из урл.
    // напр: api/brand/34 (для апи api/brand/:agency_id)
    // -> { agency_id: 34 }
    params,
    // параметры query
    // напр: api/agency/list?limit=20
    // -> { limit: 20 }
    query,
    // параметры body для post запросов
    body,
  } = request;

  const data = {
    login,
    password,
  };

  return response.status(200).json({
    code: "ok",
    data,
  });
};
```
