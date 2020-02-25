# `/permissions`

## GET

Return a content of menu together with permissions (whether it's visible, updateable, extendable)

### Request

```http
GET https://heetchfrontendtest.now.sh/@{GitHubUserName}/permissions
```

**Note: {GitHubUserName} === Your github username 😀**
Example:
GET https://heetchfrontendtest.now.sh/@Zoidberg/permissions

### Response

```json
{
  "continents": {},
  "products": {
    "order": 1,
    "actions": {
      "show": true,
      "getItems": {
        "type": "GET",
        "URL": "https://heetchfrontendtest.now.sh/@{GitHubUserName}/products"
      },
      "updateItem": {
        "type": "PUT",
        "URL": "https://heetchfrontendtest.now.sh/@{GitHubUserName}/products/{id}"
      },
      "addItem": {
        "type": "POST",
        "URL": "https://heetchfrontendtest.now.sh/@{GitHubUserName}/products"
      }
    },
    "slug": "/products/",
    "children": {}
  }
}
```
