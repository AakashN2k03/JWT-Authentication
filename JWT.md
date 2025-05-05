# 🔐 JWT Authentication Example

This project demonstrates how to implement **JWT (JSON Web Token) Authentication** in a web application. JWT is a secure, stateless way to authenticate users and protect routes using access tokens.

## 🚀 What is JWT?

**JWT (JSON Web Token)** is a compact, URL-safe token format that represents claims between two parties. It is widely used for **authentication** and **authorization** in modern web applications.

A JWT has 3 parts: `header.payload.signature`

### 1. Header

The header typically contains two parts:
- `alg`: the signing algorithm (e.g., HS256)
- `typ`: the type, which is JWT

Example (JSON):
```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

Encoded in Base64URL:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
```

### 2. Payload

This contains the claims – information about the user and token.
Standard claims include: `sub` (subject), `name`, `iat` (issued at), `exp` (expiration), etc.

Example (JSON):
```json
{
  "sub": "1234567890",
  "name": "Aakash",
  "admin": true,
  "iat": 1714896000
}
```

Encoded in Base64URL:

- (Base64 is a binary-to-text encoding scheme that is used to encode binary data (like images, files, or complex data) into an ASCII string format by converting it into a radix-64 representation.)
```
eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFha2FzaCIsImFkbWluIjp0cnVlLCJpYXQiOjE3MTQ4OTYwMDB9
```

### 3. Signature

To prevent tampering, the signature is created by:
```
HMACSHA256(
  base64UrlEncode(header) + "." + base64UrlEncode(payload),
  secret_key
)
```

Example output:
```
SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

### ✅ Final JWT:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFha2FzaCIsImFkbWluIjp0cnVlLCJpYXQiOjE3MTQ4OTYwMDB9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

This entire token can be passed in the HTTP Authorization header like so:
```
Authorization: Bearer <JWT>
```

## 🔧 How It Works

1. A user logs in with credentials.
2. The server verifies the user and generates a JWT.
3. The client stores the token (usually in localStorage or a cookie).
4. For protected routes, the client includes the token in the `Authorization` header.
5. The server verifies the token and grants or denies access.

## 📦 Technologies Can Be Used

- Backend: (e.g., Node.js + Express / Python + Flask / Django)
- JWT Library: (e.g., `jsonwebtoken` for Node.js or `PyJWT` for Python)
- Postman for testing APIs

## 📁 API Endpoints

### `POST /login`
- Accepts: `{ "username": "aakash", "password": "123456" }`
- Returns: JWT token on successful login

### `GET /protected`
- Requires: Bearer token in headers
- Returns: Protected data if token is valid

## 🔐 Storing the Token

You can store the token in:
- `localStorage`: For SPAs, but vulnerable to XSS.
- `HttpOnly cookies`: More secure, not accessible via JavaScript.

## ✅ Pros of Using JWT

- Stateless and scalable (no session storage needed)
- Great for Single Page Apps (SPAs) and mobile apps
- Supports Single Sign-On (SSO) 
- Built-in expiry and payload claims

## SSO
SSO (Single Sign-On) is an authentication system that allows a user to log in once and then access multiple applications or services without having to log in again for each one.

### 🧑‍💻 Simple Example:
Imagine Aakash logs in to his Google Account once.

After that, he can access:

- Gmail
- YouTube
- Google Drive
- Google Docs

 without logging in again for each service. - > That’s SSO in action! ✅

## ⚠️ Security Notes

- Always use **HTTPS** to prevent token interception.
- Use **short expiry tokens** and **refresh tokens**.
- Never store JWTs in plain-text-accessible places if you can avoid it.

## 🧪 Sample Token (Decoded)

```json
{
  "sub": "1234567890",
  "name": "Aakash",
  "iat": 1714896000,
  "exp": 1714899600
}
```

