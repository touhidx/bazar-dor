# 🛒 বাজার দর (BazarDor)

বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।

BazarDor is a responsive web app that lets users track daily market prices of essential products in Bangladesh, including price changes, category filters, and market-wise price details.

**Live Demo:** [bazar-dor-touhidx.vercel.app](https://bazar-dor-touhidx.vercel.app)

## ✨ Features

- 📱 **Fully responsive**: works smoothly on mobile, tablet, and desktop
- 📈 **Price ticker**: infinite scrolling marquee showing live price changes (▲/▼)
- 🔺 **Top risers & fallers**: see which products went up or down today
- 🗂️ **Category pages with sorting**: sort by default, price low to high, or high to low (handles Bengali numerals)
- 🔐 **Authentication**: email/password, Google, and GitHub login using BetterAuth
- 🔒 **product details**: min, max, and average prices across different markets
- ✏️ **Profile update**: users can update their name from the profile page
- ⏳ **Skeleton loaders & toasts**: smooth loading states and clear notifications
- 🚫 **Custom 404 page**: friendly error page with a link back home

## 🛠️ Technologies Used

- [Next.js](https://nextjs.org/) (App Router)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [DaisyUI](https://daisyui.com/)
- [BetterAuth](https://better-auth.com/)
- [react-hot-toast](https://react-hot-toast.com/)
- TypeScript / JavaScript

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/your-username/your-repo-name.git

# Go to the project folder
cd your-repo-name

# Install dependencies
npm install

# Create a .env file and add your keys
# BETTER_AUTH_SECRET=
# BETTER_AUTH_URL=
# GOOGLE_CLIENT_ID=
# GOOGLE_CLIENT_SECRET=
# GITHUB_CLIENT_ID=
# GITHUB_CLIENT_SECRET=

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📡 API

Data is fetched from the BazarDor API:

```
https://openapi.programming-hero.com/api/bazardor
```

Endpoints: `/products`, `/products/:id`, `/categories`, `/categories/:slug`

## 📄 License

This project is for learning purposes.
