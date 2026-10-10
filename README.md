# 🛒 বাজার দর | BazarDor

**Know today's market prices at a glance!**

BazarDor is a Bengali-focused market price tracking web application that helps
users explore daily product prices, check price changes, browse categories, and
make informed shopping decisions.

## ✨ Key Features

- 📊 **Market Price Updates:** Explore product prices and daily price changes.
- 🛍️ **Product Categories:** Browse products by category and find relevant
  market information.
- ↕️ **Price Sorting:** Sort products by ascending or descending price.
- 🔐 **Authentication:** Sign up and sign in using email/password and social
  login options.
- 👤 **User Profile:** Access a protected profile page and manage account
  information.
- 📱 **Responsive Design:** Enjoy a user-friendly interface on mobile, tablet,
  and desktop.
- ⚡ **Loading Skeletons:** Display loading placeholders while product data is
  loading.
- 🚫 **Error Handling:** Provide appropriate not-found pages for unavailable
  products or categories.

---

## 🛠️ Technologies Used

- **Next.js** — React framework for web applications
- **React** — Component-based user interfaces
- **TypeScript** — Type-safe development
- **Tailwind CSS** — Responsive styling
- **daisyUI** — UI components
- **Better Auth** — Authentication and session management
- **Lucide React** — Icons
- **React Loading Skeleton** — Loading placeholders
- **Vercel** — Deployment and hosting

---

## 🚀 Getting Started

### Prerequisites

- Node.js
- npm
- Git

### 1. Clone the repository

```bash
git clone https://github.com/tarekcodes62/A7-Bazar-Dor.git
```

### 2. Navigate to the project

```bash
cd A7-Bazar-Dor
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env.local` file in the project root and add the environment variables
required by your project.

Example:

```env
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=your-secret-key

GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
```

Add any required database environment variables according to your configuration.

**Note:** Never commit your secret keys or `.env.local` file to GitHub.

### 5. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 6. Build the project

```bash
npm run build
```

---

## 🌐 Deployment

The application is deployed on Vercel.

**Live Demo:** https://a7-bazar-dor-self.vercel.app/

---

## 🎯 Project Purpose

BazarDor aims to make everyday market price information easier to access through
a simple, responsive, and Bengali-friendly web application.

---

**Developed with ❤️ using Next.js**
