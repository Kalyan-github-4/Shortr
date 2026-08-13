# Shortr

> A fast, scalable, and developer-focused URL shortener built with modern full-stack technologies.

Shortr is a modern URL shortening platform designed to turn long, complex URLs into short, shareable links while providing analytics, link management, and production-ready backend architecture.

The project is being built with a strong focus on **backend engineering, scalability, performance, and real-world system design** rather than being just a simple CRUD application.

---

## 🚀 Features

### 🔗 URL Shortening

* Convert long URLs into short, shareable links
* Automatically generate unique short codes
* Fast URL redirection
* Copy shortened URLs instantly

### 🎯 Custom Short Links

* Create custom aliases
* Example:

  * `shortr.app/a8K2x`
  * `shortr.app/github`
  * `shortr.app/portfolio`

### 📊 Link Analytics

Track important information about every shortened URL:

* Total clicks
* Unique visitors
* Click timeline
* Referrer
* Device type
* Browser
* Operating system
* Geographic information

### 👤 User Accounts

Authenticated users can:

* Create URLs
* View their shortened links
* Edit links
* Delete links
* Manage custom aliases
* View analytics

### ⏳ Link Expiration

Create temporary links with configurable expiration dates.

### 📱 QR Codes

Generate QR codes for shortened URLs for easy sharing.

### 🛡️ Security & Abuse Protection

* URL validation
* Rate limiting
* Abuse prevention
* Input sanitization
* Collision-safe short-code generation

---

## 🏗️ Architecture

```text
                         ┌──────────────────┐
                         │   Shortr Client  │
                         │  Next.js + React │
                         └────────┬─────────┘
                                  │
                                  ▼
                         ┌──────────────────┐
                         │   API Layer      │
                         │ Next.js Routes   │
                         └────────┬─────────┘
                                  │
                    ┌─────────────┼─────────────┐
                    ▼             ▼             ▼
              ┌──────────┐ ┌───────────┐ ┌───────────┐
              │  Redis   │ │ PostgreSQL│ │ Analytics │
              │  Cache   │ │  Drizzle  │ │  Pipeline │
              └──────────┘ └───────────┘ └───────────┘
                                  │
                                  ▼
                           URL Redirect Engine
```

---

## 🛠️ Tech Stack

### Frontend

* **Next.js**
* **React**
* **TypeScript**
* **Tailwind CSS**
* **shadcn/ui**
* **Lucide Icons**

### Backend

* **Next.js Route Handlers**
* **TypeScript**
* **Zod**
* RESTful API architecture

### Database

* **PostgreSQL**
* **Drizzle ORM**

### Infrastructure

* **Redis** — caching and rate limiting
* **Vercel** — frontend/application deployment
* PostgreSQL-compatible cloud database

---

## 📁 Project Structure

```text
shortr/
├── app/
│   ├── api/
│   │   └── urls/
│   │       └── route.ts
│   │
│   ├── [shortCode]/
│   │   └── page.tsx
│   │
│   ├── dashboard/
│   │   └── page.tsx
│   │
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── ui/
│   ├── url-form.tsx
│   ├── url-card.tsx
│   └── analytics-card.tsx
│
├── db/
│   ├── index.ts
│   └── schema.ts
│
├── lib/
│   ├── redis.ts
│   ├── utils.ts
│   ├── validation.ts
│   └── short-code.ts
│
├── drizzle/
│   └── migrations/
│
├── public/
│
├── .env.example
├── drizzle.config.ts
├── next.config.ts
├── package.json
└── README.md
```

---

## 🔄 How URL Shortening Works

When a user submits a URL:

```text
Long URL
   │
   ▼
Validation
   │
   ▼
Generate Short Code
   │
   ▼
Check Collision
   │
   ▼
Store in PostgreSQL
   │
   ▼
Return Short URL
```

Example:

```text
Original:
https://example.com/some/very/long/path

Generated:
https://shortr.app/x7Kp2
```

When someone visits the shortened URL:

```text
GET /x7Kp2
      │
      ▼
Check Redis Cache
      │
      ├── HIT ──► Redirect
      │
      └── MISS
             │
             ▼
        PostgreSQL
             │
             ▼
        Record Click
             │
             ▼
        Cache Result
             │
             ▼
          Redirect
```

---

## 🗄️ Database Design

The core URL table will contain information similar to:

```text
urls
────────────────────────
id
user_id
short_code
original_url
custom_alias
expires_at
created_at
updated_at
```

Analytics can be stored separately:

```text
clicks
────────────────────────
id
url_id
ip_hash
user_agent
referrer
device
browser
os
country
created_at
```

### Important Indexes

The system will use indexes for high-frequency queries such as:

```text
short_code
user_id
created_at
url_id
```

The `short_code` field should have a **unique constraint** to prevent duplicate short URLs.

---

## ⚡ Performance

Shortr is designed around a high-read workload.

URL redirection is expected to be one of the most frequently executed operations, so the architecture prioritizes:

* Redis caching
* Database indexing
* Minimal redirect logic
* Efficient short-code lookup
* Stateless API services
* Asynchronous analytics where appropriate

The goal is to keep the redirect path as lightweight as possible.

---

## 🔐 Security

Shortr will implement several protections:

### URL Validation

Only valid URLs should be accepted.

```text
https://example.com
```

Invalid input should be rejected before reaching the database.

### Rate Limiting

Prevent users or IP addresses from creating excessive links or abusing the redirect system.

### Collision Prevention

Generated short codes are checked against existing records before insertion.

### Privacy

Sensitive visitor information should not be stored unnecessarily. IP addresses can be hashed or anonymized before analytics storage.

---

## 📡 API

### Create Short URL

```http
POST /api/urls
```

Request:

```json
{
  "url": "https://example.com/very/long/url"
}
```

Response:

```json
{
  "success": true,
  "data": {
    "shortCode": "x7Kp2",
    "shortUrl": "https://shortr.app/x7Kp2"
  }
}
```

---

### Get URL

```http
GET /:shortCode
```

Example:

```text
GET /x7Kp2
```

Response:

```text
HTTP 302 / 307
Location: https://example.com/very/long/url
```

---

### Get Analytics

```http
GET /api/urls/:id/analytics
```

Example response:

```json
{
  "clicks": 1248,
  "uniqueVisitors": 893,
  "topReferrers": [],
  "devices": [],
  "browsers": [],
  "timeline": []
}
```

---

## ⚙️ Environment Variables

Create a `.env.local` file:

```env
DATABASE_URL=

REDIS_URL=

NEXT_PUBLIC_APP_URL=
```

Additional authentication and analytics environment variables may be added as the project evolves.

---

## 🧑‍💻 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/shortr.git

cd shortr
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

```bash
cp .env.example .env.local
```

Add the required database and Redis credentials.

### 4. Run database migrations

```bash
npx drizzle-kit migrate
```

### 5. Start development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## 🧪 Development

Run the development server:

```bash
npm run dev
```

Build the application:

```bash
npm run build
```

Start production:

```bash
npm start
```

Lint the project:

```bash
npm run lint
```

---

## 🗺️ Roadmap

### Phase 1 — Core

* [x] Project setup
* [x] Landing page
* [ ] URL validation
* [ ] Short-code generation
* [ ] URL creation API
* [ ] Redirect system
* [ ] PostgreSQL integration
* [ ] Drizzle ORM

### Phase 2 — Management

* [ ] User authentication
* [ ] Dashboard
* [ ] URL management
* [ ] Custom aliases
* [ ] Link expiration
* [ ] Delete URLs

### Phase 3 — Analytics

* [ ] Click tracking
* [ ] Unique visitor tracking
* [ ] Device analytics
* [ ] Browser analytics
* [ ] OS analytics
* [ ] Referrer analytics
* [ ] Geographic analytics
* [ ] Analytics dashboard

### Phase 4 — Scale

* [ ] Redis caching
* [ ] Rate limiting
* [ ] Background analytics processing
* [ ] Database optimization
* [ ] Load testing
* [ ] API monitoring

### Phase 5 — Developer Platform

* [ ] API keys
* [ ] Public API
* [ ] API documentation
* [ ] Usage limits
* [ ] Webhooks
* [ ] QR code generation

---

## 🎯 Engineering Goals

Shortr is not intended to be just another URL-shortener clone.

The project is designed to demonstrate practical backend and system-design concepts including:

* REST API design
* Database schema design
* Indexing
* Caching
* Rate limiting
* Distributed-system considerations
* Analytics pipelines
* Authentication and authorization
* Horizontal scalability
* Observability
* Performance optimization

The long-term goal is to make Shortr capable of handling a **large number of URL creation requests and extremely high redirect traffic** while keeping the redirect path fast and reliable.

---

## 🤝 Contributing

Contributions, suggestions, and improvements are welcome.

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature/amazing-feature
```

3. Commit your changes

```bash
git commit -m "feat: add amazing feature"
```

4. Push the branch

```bash
git push origin feature/amazing-feature
```

5. Open a Pull Request

---

## 📄 License

This project is currently intended for educational and portfolio purposes.

License information will be added as the project matures.

---

## ⭐ Project Vision

**Shortr aims to become a production-grade URL shortening platform that demonstrates how a seemingly simple application can evolve into a scalable backend system.**

> Short links. Fast redirects. Useful analytics.
>
> **That's Shortr.**
