# 🚀 Dynamic Developer Portfolio

A **premium, modern, high-end glassmorphism personal developer portfolio** built with Next.js 15. Features a stunning dark theme with soft blue/purple gradients, glassmorphism effects, and smooth animations.

## ✨ Features

### Frontend
- 🎨 **Premium Glassmorphism UI** - Apple + Linear + Vercel inspired design
- 🌙 **Dark/Light Theme** - Toggle support with smooth transitions
- 📱 **Fully Responsive** - Desktop, Tablet & Mobile optimized
- ⚡ **Smooth Animations** - Framer Motion powered transitions
- 🖱️ **Interactive Elements** - Mouse follow effects, floating cards
- 📝 **Typing Animation** - Dynamic role display in hero section

### Sections
- **Navbar** - Transparent glass navbar with smooth scroll navigation
- **Hero** - Full viewport with animated profile and floating tech cards
- **About** - Glass card with stats and professional introduction
- **Skills** - Progress bars with animated fill effects
- **Experience** - Vertical timeline with animated indicators
- **Projects** - 3D hover effects with live demo/GitHub links
- **GitHub Stats** - Contributions, languages, and coding streak
- **Contact** - Glass form with validation and toast notifications
- **Footer** - Social links with back-to-top button

### Backend & CMS
- 🔐 **Admin Dashboard** - Secure JWT authentication
- 📊 **Full CRUD Operations** - Manage all portfolio content
- 🖼️ **Cloudinary Integration** - Image and resume uploads
- 🗄️ **PostgreSQL + Prisma** - Type-safe database operations
- 🔒 **Protected Routes** - Middleware-based security

### SEO & Performance
- 📈 **Dynamic Metadata** - OpenGraph & Twitter Cards
- 🗺️ **Dynamic Sitemap** - Auto-generated for all pages
- 🤖 **robots.txt** - Proper crawler configuration
- ⚡ **Optimized Images** - Next.js Image optimization
- 🚀 **Code Splitting** - Automatic route-based splitting

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | Next.js 15 |
| Language | JavaScript |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| Database | PostgreSQL |
| ORM | Prisma |
| Image Storage | Cloudinary |
| Authentication | JWT + bcrypt |
| Forms | React Hook Form |
| HTTP Client | Axios |
| Notifications | React Hot Toast |
| Icons | Lucide React |

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database
- Cloudinary account (optional, for image uploads)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your credentials:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/portfolio_db"
   JWT_SECRET="your-super-secret-jwt-key"
   CLOUDINARY_CLOUD_NAME="your-cloud-name"
   CLOUDINARY_API_KEY="your-api-key"
   CLOUDINARY_API_SECRET="your-api-secret"
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   ADMIN_EMAIL="admin@example.com"
   ADMIN_PASSWORD="your-secure-password"
   ```

4. **Initialize the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open in browser**
   ```
   http://localhost:3000
   ```

### Admin Dashboard
- Navigate to `/admin/login`
- Default credentials: `admin@example.com` / `admin123`

## 📁 Project Structure

```
portfolio/
├── prisma/
│   └── schema.prisma       # Database schema
├── public/
│   ├── images/             # Static images
│   └── resume.pdf          # Resume file
├── src/
│   ├── app/
│   │   ├── admin/          # Admin dashboard pages
│   │   ├── api/            # API routes
│   │   ├── projects/       # Project detail pages
│   │   ├── globals.css     # Global styles
│   │   ├── layout.js       # Root layout
│   │   └── page.js         # Home page
│   ├── components/
│   │   ├── layout/         # Navbar, Footer
│   │   └── sections/       # Page sections
│   └── lib/
│       ├── animations.js   # Framer Motion variants
│       ├── auth.js         # JWT utilities
│       ├── cloudinary.js   # Image upload
│       ├── data.js         # Static data
│       └── prisma.js       # Database client
├── .env.example
├── next.config.mjs
├── package.json
└── README.md
```

## 🎨 Customization

### Colors
Update CSS variables in `src/app/globals.css`:
```css
:root {
  --primary-blue: #3b82f6;
  --primary-purple: #8b5cf6;
  --bg-primary: #0a0a0f;
  --bg-secondary: #12121a;
}
```

### Content
Edit static data in `src/lib/data.js` or manage through the admin dashboard.

## 📦 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

### Manual Deployment
```bash
npm run build
npm start
```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

⭐ Star this repo if you found it helpful!
