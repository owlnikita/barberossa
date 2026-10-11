# Barberossa

Barberossa is a barbershop landing page and appointment booking project. It combines a responsive, modern storefront with a small backend service for managing booking slots and customer appointments in SQLite.

The project is designed to showcase a hair salon brand while giving users a way to select a date, view available time slots, and submit booking requests.

## Features

- Responsive landing page for a barbershop brand
- Sections for staff, gallery, contact information, and services
- Booking calendar and slot selection UI
- Available-slot lookup via REST API
- Booking creation with validation and capacity checks
- Per-IP request limits for the public booking API
- SQLite database for persistent slot and appointment data
- Admin-only slot creation endpoint using a secret header key

## Tech Stack

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js + Express
- Database: SQLite via `better-sqlite3`
- Environment management: `dotenv`
- CORS support enabled for API requests

## Project Structure

```text
Barberossa/
├── backend/
│   ├── app.js
│   ├── server.js
│   ├── .env.example
│   ├── config/
│   ├── controllers/
│   ├── database/
│   ├── middleware/
│   ├── routes/
│   ├── utils/
│   ├── package.json
│   └── package-lock.json
├── css/
├── fonts/
├── images/
├── js/
├── index.html
├── LICENSE
├── README.md
└── .gitignore
```

## Prerequisites

Before running the project, make sure you have:

- Node.js 18+ installed
- npm installed
- A browser to open the landing page

## Quick Start

1. Navigate to the backend folder:

```bash
cd backend
```

2. Copy the sample environment file:

```bash
cp .env.example .env
```

3. Install dependencies:

```bash
npm install
```

4. Start the API server:

```bash
npm start
```

The backend listens on the port defined in `.env` (default: `3000`). For the admin-only slot creation route, set a strong value in `ADMIN_SECRET_KEY` in `backend/.env`.

5. Open the frontend:

- Open `index.html` directly in a browser, or
- serve the root directory with any static file server if you prefer local preview

Note: the frontend JavaScript requests the API from `http://localhost:3000`, so the backend must be running while using the booking flow.

## Environment Configuration

The backend reads values from `backend/.env`.

Example:

```env
PORT=3000
DEBUG=true
ADMIN_SECRET_KEY=change-me
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100
BOOKING_RATE_LIMIT_WINDOW_MS=900000
BOOKING_RATE_LIMIT_MAX=5
TRUST_PROXY_HOPS=0
```

### Rate limiting

The backend applies two independent in-memory limits, keyed by the request's client IP:

- **Booking API limit:** all requests to `/api/bookings` share a limit of 100 requests per 15 minutes.
- **Booking submission limit:** requests to `POST /api/bookings/book` also share a stricter limit of 5 submissions per 15 minutes. A submission counts against both limits.

Each counter starts its window with that IP's first request. Once a limit is exceeded, the server responds with HTTP `429 Too Many Requests` and JSON:

```json
{
  "success": false,
  "error": "Too many requests. Please try again later."
}
```

Requests count when they reach the limiter, including invalid submissions and responses that later fail validation; retries consume quota too.

Rate-limit metadata is returned in the standard `RateLimit` and `RateLimit-Policy` headers, with `Retry-After` indicating how long to wait after a limit is reached. The browser booking flow does not need special setup; users can retry after the indicated interval.

Tune the limits with `RATE_LIMIT_WINDOW_MS` and `RATE_LIMIT_MAX` for the API-wide limit, and `BOOKING_RATE_LIMIT_WINDOW_MS` and `BOOKING_RATE_LIMIT_MAX` for booking submissions. Window values are milliseconds and all four values must be positive integers; invalid values stop the backend at startup. Defaults are 900000 ms (15 minutes), 100 API requests, and 5 booking submissions.

The client IP comes from Express's `req.ip`. `TRUST_PROXY_HOPS` defaults to `0`, so forwarded IP headers are not trusted. If the API is behind a reverse proxy, set this to the exact number of trusted proxy hops (for example, `1` for a single trusted proxy); do not enable proxy trust when clients can bypass that proxy.

The default rate-limit store is in process memory: counters are cleared when the backend restarts, and separate backend instances do not share counters. This works for a single-process deployment. For multiple instances or workers, configure a shared store (such as Redis) before relying on the limits across the whole deployment.

## API Overview

### Get available slots

Endpoint:

```http
GET /api/bookings/avslots?date=YYYY-MM-DD
```

Example:

```bash
curl "http://localhost:3000/api/bookings/avslots?date=2026-09-30"
```

Response example:

```json
{
  "success": true,
  "slots": [
    { "id": 1, "time_slot": "10:00-11:00", "capacity": 3, "booked_count": 1 }
  ]
}
```

### Create a booking

Endpoint:

```http
POST /api/bookings/book
```

Request body:

```json
{
  "slotId": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890"
}
```

Response example:

```json
{
  "message": "booking is created",
  "success": true
}
```

### Create a slot (admin-only)

Endpoint:

```http
POST /api/bookings/create-slot
```

Required headers:

```http
x-admin-key: YOUR_SECRET_KEY
```

Request body:

```json
{
  "date": "2026-09-30",
  "time_slot": "10:00-11:00",
  "capacity": 3,
  "is_active": 1
}
```

This endpoint is intended for administrative use to predefine available time slots for a given date.

## Database

The project uses SQLite with a local database file located at:

```text
backend/database/database.db
```

The current schema includes:

- `slots`
  - `id`
  - `date`
  - `time_slot`
  - `capacity`
  - `is_active`
- `bookings`
  - `id`
  - `slot_id`
  - `name`
  - `email`
  - `phone`
  - `created_at`

## Typical Workflow

1. Admin creates time slots for upcoming dates.
2. User opens the landing page and clicks the booking button.
3. A date is selected from the calendar.
4. Available slots are fetched from the backend.
5. The user chooses a time and submits their booking details.
6. The backend validates the request and inserts the booking if capacity allows.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Notes

This project is a strong starting point for a barber shop website with appointment management. It is intentionally lightweight and can be extended with features such as:

- admin dashboard
- email confirmations
- customer management
- appointment editing and cancellation
- secure authentication for admin actions
- production deployment configuration
