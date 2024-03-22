### Backend API Endpoints:

#### 1. Books Endpoints:

##### Get All Books:

```bash
curl -X GET https://bookstore-backend-alpha.vercel.app/books
```

Example Response:

```json
[
  {
    "id": 1,
    "title": "Book Title",
    "writer": "Author Name",
    "cover_image": "https://example.com/cover.jpg",
    "point": 10,
    "tags": ["fiction", "adventure"]
  },
  {
    "id": 2,
    "title": "Another Book",
    "writer": "Another Author",
    "cover_image": "https://example.com/another-cover.jpg",
    "point": 15,
    "tags": ["non-fiction", "history"]
  }
]
```

##### Get Book by ID:

```bash
curl -X GET https://bookstore-backend-alpha.vercel.app/books/1
```

Example Response:

```json
{
  "id": 1,
  "title": "Book Title",
  "writer": "Author Name",
  "cover_image": "https://example.com/cover.jpg",
  "point": 10,
  "tags": ["fiction", "adventure"]
}
```

##### Create Book:

```bash
curl -X POST https://bookstore-backend-alpha.vercel.app/books -d '{"title":"New Book","writer":"New Author","cover_image":"https://example.com/new-cover.jpg","point":20,"tags":["science","fiction"]}' -H "Content-Type: application/json"
```

Example Response:

```json
{
  "id": 3,
  "title": "New Book",
  "writer": "New Author",
  "cover_image": "https://example.com/new-cover.jpg",
  "point": 20,
  "tags": ["science", "fiction"]
}
```

##### Update Book:

```bash
curl -X PUT https://bookstore-backend-alpha.vercel.app/books/1 -d '{"title":"Updated Title","writer":"Updated Author","cover_image":"https://example.com/updated-cover.jpg","point":25,"tags":["fiction","mystery"]}' -H "Content-Type: application/json"
```

Example Response:

```json
{
  "id": 1,
  "title": "Updated Title",
  "writer": "Updated Author",
  "cover_image": "https://example.com/updated-cover.jpg",
  "point": 25,
  "tags": ["fiction", "mystery"]
}
```

##### Delete Book:

```bash
curl -X DELETE https://bookstore-backend-alpha.vercel.app/books/1
```

Example Response:

```json
{
  "message": "Book deleted successfully"
}
```

#### 2. Customers Endpoints:

##### Get All Customers:

```bash
curl -X GET https://bookstore-backend-alpha.vercel.app/customers
```

Example Response:

```json
[
  {
    "id": 1,
    "name": "John Doe",
    "points": 100
  },
  {
    "id": 2,
    "name": "Jane Smith",
    "points": 150
  }
]
```

##### Get Customer by ID:

```bash
curl -X GET https://bookstore-backend-alpha.vercel.app/customers/1
```

Example Response:

```json
{
  "id": 1,
  "name": "John Doe",
  "points": 100
}
```

##### Create Customer:

```bash
curl -X POST https://bookstore-backend-alpha.vercel.app/customers -d '{"name":"New Customer"}' -H "Content-Type: application/json"
```

Example Response:

```json
{
  "id": 3,
  "name": "New Customer",
  "points": 100
}
```

##### Update Customer:

```bash
curl -X PUT https://bookstore-backend-alpha.vercel.app/customers/1 -d '{"name":"Updated Name","points":120}' -H "Content-Type: application/json"
```

Example Response:

```json
{
  "id": 1,
  "name": "Updated Name",
  "points": 120
}
```

##### Delete Customer:

```bash
curl -X DELETE https://bookstore-backend-alpha.vercel.app/customers/1
```

Example Response:

```json
{
  "message": "Customer deleted successfully"
}
```

#### 3. Orders Endpoints:

##### Get All Orders:

```bash
curl -X GET https://bookstore-backend-alpha.vercel.app/orders
```

Example Response:

```json
[
  {
    "id": 1,
    "customerId": 1,
    "bookId": 1,
    "timestamp": "2024-03-30T10:00:00Z"
  },
  {
    "id": 2,
    "customerId": 2,
    "bookId": 2,
    "timestamp": "2024-03-30T11:00:00Z"
  }
]
```

##### Create Order:

```bash
curl -X POST https://bookstore-backend-alpha.vercel.app/orders -d '{"bookId":1}' -H "Content-Type: application/json"
```

Example Response:

```json
{
  "id": 3,
  "customerId": 1,
  "bookId": 1,
  "timestamp": "2024-03-30T12:00:00Z"
}
```

##### Cancel Order:

```bash
curl -X DELETE https://bookstore-backend-alpha.vercel.app/orders/1
```

Example Response:

```json
{
  "message": "Order canceled successfully"
}
```
