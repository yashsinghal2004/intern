---

# 🛒 Product Catalog Viewer

A modern, responsive product catalog web app built with [Next.js](https://nextjs.org), [React](https://react.dev), and [TailwindCSS](https://tailwindcss.com).  
Features infinite scroll, category filtering, product detail view, and a persistent cart.

---

## Interview Feature-

- **On 1st page Render 16 products and on rest pages-8 prducts each**
: Initialised the pagesize with 16 and conditioning while fetching in useEffect() hook

if (pageNum === 1) {
  setPageSize(16);
  fetchProducts(1, selectedCategory, 16);
} else {
  setPageSize(8);
  fetchProducts(pageNum, selectedCategory, 8);
}



## 🚀 Features

- **Infinite Scroll** with dynamic pagination bar
- **Category Filtering** (from FakestoreAPI)
- **Product Detail Page** (with add to cart)
- **Cart Page** (with quantity, remove, and total)
- **Responsive Design** for mobile and desktop
- **Clean, well-organized code**

---

## 📦 Project Structure

```
product-catalog/
├── src/
│   └── app/
│       ├── cart/
│       │   └── page.js
│       ├── product/
│       │   └── [id]/
│       │       └── page.js
│       └── page.js
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── README.md
└── ...
```

### Key Files

- `src/app/page.js` — Home page (product grid, infinite scroll, filter)
- `src/app/product/[id]/page.js` — Product detail page
- `src/app/cart/page.js` — Cart page

---

## 🛠️ Getting Started

1. **Clone the repo:**
   ```bash
   git clone https://github.com/your-username/product-catalog.git
   cd product-catalog
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

---

## ✨ Usage

- Browse products with infinite scroll and dynamic pagination.
- Filter products by category.
- Click a product to view details and add to cart.
- View and manage your cart (quantity, remove, total).

---

## ⚡ Assumptions & Limitations

- Uses [https://fakestoreapi.in/](https://fakestoreapi.in/) for all product/category data.
- Cart is stored in `localStorage` (not persisted across browsers/devices).
- No authentication or checkout flow (demo only).
- Product images and data depend on the external API’s availability and structure.

---

## 💡 What Could Be Improved

- Add a global cart badge (using React Context or Zustand)
- Add error handling and loading skeletons
- Add product search and sorting
- Add user authentication and checkout flow
- Write unit and integration tests

---

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)

---

## 📄 License

MIT

---

**Happy coding!** 🎉


