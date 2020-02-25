# `/cities`

## GET

Returns a list of cities for a country.

### Request

```http
GET https://heetchfrontendtest.now.sh/@{GitHubUserName}/cities?countryCode={countryCode}
```

#### Parameters

`countryCode` - 2 letters code of a country

### Response

```json
{
  "currencyCode": "EUR",
  "capital": "Andorra la Vella",
  "name": "Andorra",
  "continent": "EU",
  "cities": {
    "Puiol del Piu": {
      "countryCode": "AD",
      "name": "Puiol del Piu",
      "description": "",
      "id": "7FjpKJpVkHaTuCoDG7TM",
      "order": 1
    },
    "Canillo": {
      "name": "Canillo",
      "description": "",
      "countryCode": "AD",
      "id": "E6vb4jEKKrviCnfkipwv",
      "order": 2
    }
  }
}
```

## PUT/POST

Updates existing or creates a new city. The documentation is the same for both methods.

### Request

```http
PUT https://heetchfrontendtest.now.sh/@{GitHubUserName}/cities/{id}
```

```http
POST https://heetchfrontendtest.now.sh/@{GitHubUserName}/cities
```

#### Parameters

`id` - ID of city to be updated

#### Body

```json
{
  "name": "New name",
  "description": "New description",
  "countryCode": "AD"
}
```

### Response

```json
{
  "success": true,
  "code": 200
}
```
