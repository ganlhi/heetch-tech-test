# `/products`

## GET

Returns a list of products

### Request

```http
GET https://heetchfrontendtest.now.sh/@{GitHubUserName}/products
```

### Response

```json
{
  "products": {
    "drivers": {
      "status": "validated",
      "name": "drivers",
      "description": "",
      "id": "3nmwfrgnB7ygvQMCHN4X",
      "order": 1
    },
    "passengers": {
      "status": "validated",
      "name": "passengers",
      "description": "",
      "id": "6vrxYvR4mzPFU1LuGfR8",
      "order": 2
    },
    "lions": {
      "name": "lions",
      "description": "",
      "status": "validated",
      "id": "KAQLNKMFigdcN029NuCb",
      "order": 3
    },
    "zombies": {
      "status": "validated",
      "name": "zombies",
      "description": "active",
      "id": "rzkZjWLUF2LaXwbaoX7w",
      "order": 4
    }
  }
}
```

## PUT/POST

Updates existing or creates a new product. The documentation is the same for both methods.

### Request

```http
PUT https://heetchfrontendtest.now.sh/@{GitHubUserName}/products/{id}
```

```http
POST https://heetchfrontendtest.now.sh/@{GitHubUserName}/products
```

#### Parameters

`id` - ID of product to be updated

#### Body

```json
{
  "name": "new product",
  "description": "description"
}
```

### Response

```json
{
  "success": true,
  "code": 200
}
```
