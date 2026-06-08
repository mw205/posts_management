# Posts Management & Donation API

A robust Node.js and Express RESTful API that manages users, authenticates them with JWT, hosts a posts-sharing platform, processes donations via the Kashier payment gateway, and triggers automated transactional emails using Nodemailer and EJS templates.

---

## 🚀 Getting Started

Follow the steps below to set up and run the project locally.

### 📋 Prerequisites

Ensure you have the following installed and set up:

- **Node.js** (v16+)
- **npm** (v7+)
- **MongoDB** (Local instance or MongoDB Atlas Connection string)
- **Gmail Account** (with 2-Step Verification enabled to generate an App Password)
- **Kashier Account** (Test merchant account details from [Kashier Portal](https://test.kashier.io/))
- **ngrok** (to tunnel webhooks locally)

---

## 🛠️ Step-by-Step Installation

### 1. Install Dependencies

Clone the repository, navigate to the project root, and run:

```bash

npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory and define all required credentials. You can copy the structure from `.env.example`:

```env
PORT=3000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_signing_secret

EMAIL_USER=your_gmail_address@gmail.com
EMAIL_PASS=your_gmail_16_character_app_password

KASHIER_MERCHANT_ID=your_kashier_merchant_id
KASHIER_API_KEY=your_kashier_api_key
KASHIER_SECRET_KEY=your_kashier_secret_key
KASHIER_WEBHOOK_URL=http://localhost:3000/donations/webhook
```

### 3. Expose the Server with ngrok

Kashier requires a secure public HTTPS endpoint to send transaction webhooks to your local machine. Expose port `3000` using `ngrok`:

```bash
ngrok http 3000
```

Copy the secure forwarding URL (e.g., `https://xxxx-xxx.ngrok-free.app`) and update the `KASHIER_WEBHOOK_URL` in your `.env` file:

```env
KASHIER_WEBHOOK_URL=https://xxxx-xxx.ngrok-free.app/donations/webhook
```

### 4. Run the Application

Start the server in development mode with hot-reloading (nodemon):

```bash
npm run dev
```

The server will boot and connect to MongoDB:

```text
Server running on port 3000...
Connected to MongoDB...
```

---

## 🧪 Testing with Postman

1. Import the Postman Collection: `Posts Management API.postman_collection.json` into your Postman client.
2. Sign up a new user (`POST /users/signup`) and verify your email inbox receives the welcome template.
3. Sign in to capture the `authToken` variable automatically.
4. Initiate a donation with `POST /donations` (minimum `10 EGP`).
5. Open the returned checkout `link` in your browser and complete the mock transaction with Kashier test cards.
6. The webhook will automatically verify the HMAC signature, update the database to `completed`, and email you a success receipt template!
