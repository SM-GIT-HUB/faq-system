# FAQ System
My mistake: I don't know how to run api tests.

A backend-focused FAQ management system with authentication, multilingual support, pagination, caching, and a minimal frontend.

## Features
✅ REST API for FAQs
✅ Authentication system (Signup/Login)
✅ Multilingual support (English, Hindi, Bengali)
✅ Pagination (5 FAQs per page)
✅ Redis caching for improved performance
✅ Admin-based FAQ management
✅ Minimal frontend using React + Vite
✅ Code quality tools: ESLint, Prettier, Husky, Commitlint

---

## 📁 Project Structure

```
faqsystem/
│-- backend/
│   │-- controllers/
│   │-- lib/
│   │-- middlewares/
│   │-- routes/
│   │-- server.js
│-- frontend/
│   │-- src/
│   │-- index.html
│   │-- package.json
│-- .env
│-- package.json (backend dependencies)
│-- README.md
```

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js (latest LTS recommended)
- Redis (for caching)
- MongoDB (for database storage)
- Upstash account (for Redis URL)
- Google Cloud account (for Google Translate API key)

### 1️⃣ Clone the repository
```sh
 git clone https://github.com/SM-GIT-HUB/faq-system.git
 cd faqsystem
```

### 2️⃣ Setup Backend

1. **Install backend dependencies**
   ```sh
   npm install
   ```
2. **Create a `.env` file in the root directory**
   ```
   PORT=5011
   TOKEN_SECRET=sometokensecret
   UPSTASH_REDIS_URL=your_upstash_redis_url
   GOOGLE_TRANSLATE_API_KEY=your_google_translate_api_key
   ```
   - Create an account on [Upstash](https://upstash.com/) to get a Redis URL.
   - Get a Google Translate API key from Google Cloud Console.
   - Do not use `NODE_ENV=dev` if using Google Translate API.

3. **Start the backend server**
   ```sh
   npm run dev
   ```

### 3️⃣ Setup Frontend

1. **Navigate to the frontend directory**
   ```sh
   cd frontend
   ```
2. **Install frontend dependencies**
   ```sh
   npm install
   ```
3. **Run the frontend**
   ```sh
   npm run dev
   ```
4. **After that go to signup and complete. Go to your mongodb server. Find the user and edit its role from "customer" to "admin"**

**We must make our user "admin" to edit add or delete faqs. Please go to the mongodb document, find your user and make role to "admin"**

---

## 📌 API Routes

### 🔐 Auth Routes (`/api/auth`)
| Method | Endpoint      | Protected | Description        |
|--------|-------------|------------|--------------------|
| GET    | `/getuser`   | ✅ Yes     | Get authenticated user |
| POST   | `/signup`    | ❌ No      | Register a new user |
| POST   | `/login`     | ❌ No      | Login a user |
| POST   | `/logout`    | ✅ Yes     | Logout user |

### ❓ FAQ Routes (`/api/faqs`)
| Method | Endpoint       | Protected | Admin Only | Description            |
|--------|--------------|------------|------------|------------------------|
| GET    | `/`           | ❌ No      | ❌ No      | Fetch FAQs (supports pagination & multilingual) |
| POST   | `/create`     | ✅ Yes     | ✅ Yes     | Create a new FAQ |
| PUT    | `/:id`        | ✅ Yes     | ✅ Yes     | Edit an FAQ |
| DELETE | `/:id`        | ✅ Yes     | ✅ Yes     | Delete an FAQ |

---

## 🤔 Assumptions
1. The project is primarily a backend-focused test.
2. A basic authentication system is required.
3. Pagination is necessary with a default limit of 5 FAQs per page.
4. Only three languages are supported: English (en), Hindi (hi), Bengali (bn).
5. The frontend is minimal and primarily for testing API functionality.
6. Google Translate API could not be used due to API key issues, so everything was tested with a locally hosted LibreTranslate API.

---
