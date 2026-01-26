# Z Axis Studio

A modern e-commerce platform for 3D printed goods, built with Next.js 14, TypeScript, and Tailwind CSS.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38B2AC?style=flat-square&logo=tailwind-css)
![Prisma](https://img.shields.io/badge/Prisma-5-2D3748?style=flat-square&logo=prisma)

## 🚀 Features

- **Hybrid Product System** - Sell both ready-made inventory and custom-order products
- **Custom Orders** - Photo uploads for lithophanes, text input for keychains
- **Razorpay Integration** - UPI, cards, and netbanking for Indian customers
- **GST Compliant** - CGST/SGST for intra-state, IGST for inter-state
- **Admin Dashboard** - Manage products, view inquiries, track orders
- **Bulk Services** - B2B inquiry system for corporate orders
- **File Uploads** - UploadThing integration for product images and custom files
- **Responsive Design** - Mobile-first glassmorphism UI

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + Shadcn UI |
| Database | PostgreSQL + Prisma ORM |
| Payments | Razorpay |
| File Uploads | UploadThing |
| State Management | Zustand |
| Forms | React Hook Form + Zod |

## 📦 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Razorpay account
- UploadThing account

### Installation

```bash
# Clone the repository
git clone https://github.com/itsmk42/zaxis-v2.git
cd zaxis-v2

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Push database schema
npx prisma db push

# Start development server
npm run dev
```

### Environment Variables

```env
DATABASE_URL=postgresql://...
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_...
RAZORPAY_KEY_ID=rzp_...
RAZORPAY_KEY_SECRET=...
UPLOADTHING_TOKEN=...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── admin/              # Admin dashboard pages
│   ├── api/                # API routes
│   ├── bulk-services/      # B2B inquiry page
│   ├── products/           # Product detail pages
│   └── shop/               # Shop listing page
├── components/
│   ├── admin/              # Admin components
│   ├── cart/               # Cart components
│   ├── checkout/           # Payment components
│   ├── forms/              # Form components
│   ├── home/               # Homepage sections
│   ├── layout/             # Navbar, Footer
│   ├── product/            # Product components
│   ├── shop/               # Shop components
│   └── ui/                 # Shadcn UI components
├── hooks/                  # Custom React hooks
└── lib/                    # Utilities & configs
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy

The `postinstall` script automatically runs `prisma generate` during build.

## 📄 License

MIT License - feel free to use this for your own projects.

## 👨‍💻 Author

**Z Axis Studio** - Mangaluru, Karnataka, India

---

Made with ♥ using Next.js and 3D printing passion

