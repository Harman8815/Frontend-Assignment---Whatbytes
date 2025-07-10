# 🛍️ Whatbytes – Frontend Assignment Submission

A fully responsive, dark-themed e-commerce frontend built with React 19 and Next.js App Router.  
This project demonstrates a complete product listing experience, dynamic product detail pages, an interactive cart, filters, toasts, and more.

🔗 **Live Website**: [https://frontend-assignment-whatbytes-zeta.vercel.app](https://frontend-assignment-whatbytes-zeta.vercel.app)  
🔗 **GitHub Repo**: [https://github.com/Harman8815/Frontend-Assignment---Whatbytes](https://github.com/Harman8815/Frontend-Assignment---Whatbytes)

---

## ✅ Core Features Implemented

### 🏠 Home Page (`/`)
- **Responsive Layout** with Tailwind CSS.
- **Header**:
  - Logo (left)
  - Central **search bar** (string-based matching)
  - Cart icon with badge + profile icon (right)
- **Sidebar Filters**:
  - Category checkboxes
  - Price range slider
- **Product Grid**:
  - Responsive columns (3 desktop / 2 tablet / 1 mobile)
  - Each card includes: Image, Title, Price, Add to Cart, and Rating stars
- **Footer**:
  - Copyright
  - Social media icons (placeholders)

---

### 📄 Product Detail Page (`/product/[id]`)
- **Dynamic routing** using Next.js
- **Image Section**:
  - Zoomable large image with carousel thumbnails using `keen-slider` + `react-inner-image-zoom`
- **Details Section**:
  - Product title, price, description, category
  - Quantity selector with `+` and `–` buttons
  - "Add to Cart" button
  - Static Reviews section
- **Toast notifications** for interactions (quantity changes, added to cart, etc.)

---

### 🛒 Cart Page (`/cart`)
- Modal-based cart preview
- Lists added products with:
  - Quantity adjustment
  - Per-item total
  - Remove item
- **Total summary** with price breakdown
- **Clear cart** functionality
- **Proceed to Checkout** CTA
- **Coupon input** and mock shipping info

---

## 🧠 Bonus Features Added

### 🎨 Custom Theme System
- Fully **dark-mode friendly** using CSS variables:
  - `--primary`, `--text`, `--surface`, `--accent`, etc.
- Dynamic background/text colors applied via Tailwind like `bg-[var(--primary)]`, `text-[var(--whitetext)]`, etc.

### 🔥 Toast System
- Global toast system built using **Zustand**
- Supports multiple types: `info`, `success`, `error`
- Lightweight, animated toast messages on key actions

### 💾 Persistent Cart
- Cart state is persisted in **`localStorage`** using Zustand middleware

### 🔎 URL-based Filtering
- Supports URL query params like `?category=electronics&price=0-1000`
- Makes filter state shareable via URL

---

## 🛠 Tech Stack

| Tech            | Usage                                           |
|-----------------|--------------------------------------------------|
| **React 19**     | Component logic, modern hooks                  |
| **Next.js 14**   | App Router, dynamic routing, optimized SSR/CSR |
| **TypeScript**   | Type safety across components                  |
| **Tailwind CSS** | Fast, responsive UI design                     |
| **Zustand**      | Global state for cart and toasts               |
| **Framer Motion**| Animations and transitions                     |
| **Lucide React** | Icons throughout UI                            |
| **Keen Slider**  | Product image thumbnail carousel               |
| **Inner Image Zoom** | Zoomable product image                    |
| **Vercel**       | Hosting and deployment                         |

---

---

### 📁 Project Folder Structure

```
ecommerce-assignment/
├── .next/                      # Next.js build output (auto-generated)
├── app/                        # App Router entry point
│   ├── cart/                   # Cart modal logic
│   │   └── CartModal.tsx
│   ├── product/                # Dynamic product detail route
│   │   └── [id]/page.tsx
│   ├── layout.tsx              # Global layout component
│   ├── not-found.tsx           # 404 handler
│   ├── page.tsx                # Home page – Product listing
│   ├── favicon.ico             # App favicon
│   └── globals.css             # Global styles & CSS variables
├── components/                 # Reusable UI components
│   ├── CartModal.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── Navbar.tsx
│   ├── ProductCard.tsx
│   └── Toast.tsx
├── data/                       # Mock product data
│   └── product.json
├── public/                     # Static assets (images, fonts, etc.)
├── store/                      # Zustand stores for global state
│   ├── cart.ts                 # Cart state logic
│   ├── themeStore.ts           # Theme toggle & state
│   └── useToastStore.ts        # Toast notification store
├── types/                      # TypeScript interfaces
│   └── product.d.ts            # Product type definition
├── .gitignore
├── package.json
└── tsconfig.json
```

---

### 📦 Organized by Responsibility

| Folder        | Purpose                                                        |
| ------------- | -------------------------------------------------------------- |
| `app/`        | Routing & layout structure using Next.js App Router            |
| `components/` | Reusable shared UI components like navbar, footer, toast, etc. |
| `store/`      | Global state logic using Zustand (cart, toast, theme)          |
| `data/`       | Static product data in JSON format                             |
| `types/`      | TypeScript interfaces and types                                |
| `public/`     | Assets like images, icons                                      |


---

## 🧪 How to Run Locally

```bash
git clone https://github.com/Harman8815/Frontend-Assignment---Whatbytes.git
cd Frontend-Assignment---Whatbytes
npm install --legacy-peer-deps
npm run dev
````

Visit [http://localhost:3000](http://localhost:3000)

---

## 📸 Screenshots

<img width="1920" height="928" alt="ScreenShot_20250710213244" src="https://github.com/user-attachments/assets/593eb59f-5202-49da-9a23-eb400e094f37" />
<img width="1920" height="928" alt="ScreenShot_20250710213327" src="https://github.com/user-attachments/assets/eca7b00a-20b8-4ced-bc34-d2895960d5d9" />
<img width="1920" height="928" alt="ScreenShot_20250710213300" src="https://github.com/user-attachments/assets/082a4922-ea5f-48d1-8925-156841601e39" />
<img width="1920" height="928" alt="ScreenShot_20250710213251" src="https://github.com/user-attachments/assets/34547c6e-e36e-4975-bc9d-611ca730c4e0" />
<img width="1920" height="928" alt="ScreenShot_20250710213313" src="https://github.com/user-attachments/assets/2293f655-bb37-407d-bfaa-69b7be8ac932" />

---

## 👨‍💻 Author

**Harman Deep Singh**
GitHub: [@Harman8815](https://github.com/Harman8815)
Email: [harman88157@gmail.com](mailto:harman88157@gmail.com)

---

