# API Integration Documentation

## Authentication API

This document describes the API integration implemented in the RentNest frontend authentication system.

### Backend Base URL

```text
https://rent-nest-backend-fiy9.onrender.com
```

# API Integration

| Frontend Component             | Method | Backend Endpoint          | Purpose                                             |
| ------------------------------ | ------ | ------------------------- | --------------------------------------------------- |
| Login Form                     | POST   | `/api/auth/login`         | User login                                          |
| Register Form                  | POST   | `/api/auth/register`      | User registration                                   |
| Navbar / Auth                  | GET    | `/api/auth/me`            | Get logged-in user                                  |
| Authentication / Refresh Token | POST   | `/api/auth/refresh-token` | Generate a new access token using the refresh token |
| Admin Dashboard                | GET    | `/api/dashboard/admin`    | Get admin dashboard statistics                      |
