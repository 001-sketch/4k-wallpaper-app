# 4K Wallpaper App

*A beautiful, modern wallpaper discovery and collection app built with Next.js*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/michael-cheges-projects/v0-4-k-wallpaper-app)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/vh06Y4qXn9l)

## ✨ Features

### Wallpaper Discovery
- 🖼️ Browse and search 4K wallpapers
- 📊 Explore by categories and tags
- ❤️ Add wallpapers to favorites
- 📥 Download wallpapers with "save as" dialog
- 🎨 Beautiful grid layout with preview

### User Authentication
- 👤 User registration and login
- 🔐 Secure password hashing (bcrypt)
- 🔄 JWT-based token management
- 📱 Session management across devices
- 🛡️ Rate limiting for brute force protection
- 📝 Account settings and profile management
- 🔑 Change password functionality
- 🚪 Logout from all devices

### User Collections
- 📚 Create and manage collections
- 🔗 Organize wallpapers in custom collections
- 🌐 Share public collections
- 🔒 Keep collections private

## 🛠️ Tech Stack

- **Frontend:** React 18, Next.js 14, TypeScript, Tailwind CSS
- **State Management:** Zustand
- **Database:** PostgreSQL (Neon)
- **Authentication:** JWT, bcryptjs, jsonwebtoken, jose
- **UI Components:** Radix UI, Lucide Icons
- **API:** Next.js API Routes with middleware
- **Deployment:** Vercel

## 📚 Documentation

- [AUTHENTICATION.md](AUTHENTICATION.md) - Authentication setup guide
- [AUTHENTICATION_OPTIMIZED.md](AUTHENTICATION_OPTIMIZED.md) - Advanced auth features
- [AUTH_OPTIMIZATION_SUMMARY.md](AUTH_OPTIMIZATION_SUMMARY.md) - Quick auth summary
- [FILE_MANIFEST.md](FILE_MANIFEST.md) - Complete file listing

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL database (Neon recommended)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd 4k-wallpaper-app

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env
# Edit .env with your DATABASE_URL and JWT_SECRET
```

### Database Setup

```bash
# Run migrations
psql $DATABASE_URL < scripts/001_create_wallpaper_tables.sql
psql $DATABASE_URL < scripts/003_create_auth_tables.sql
```

### Development

```bash
# Start development server
pnpm dev

# Open http://localhost:3000
```

### Build & Deploy

```bash
# Build for production
pnpm build

# Start production server
pnpm start
```

## 📁 Project Structure

```
src/
├── app/                          # Next.js pages and API routes
│   ├── api/                      # API endpoints
│   │   └── auth/                 # Authentication endpoints
│   ├── login/                    # Login/signup page
│   ├── account/                  # Account settings page
│   └── ...                       # Other pages
├── components/                   # React components
│   ├── ui/                       # Base UI components
│   └── wallpaper/               # Feature components
├── lib/                          # Utilities and configuration
│   ├── auth.ts                   # Core auth functions
│   ├── auth-store.ts             # Auth state management
│   ├── rate-limit.ts             # Rate limiting
│   ├── db.ts                     # Database client
│   └── hooks/                    # Custom React hooks
└── styles/                       # Global styles
```

## 🔐 Security Features

- ✅ Password hashing with bcrypt (10 salt rounds)
- ✅ JWT tokens with expiration
- ✅ HTTP-only secure cookies
- ✅ Rate limiting on auth endpoints
- ✅ Input validation and sanitization
- ✅ CSRF protection
- ✅ Protected API routes with middleware
- ✅ Automatic token refresh
- ✅ Session revocation

## 📖 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout (single device)
- `POST /api/auth/logout-all` - Logout all devices
- `GET /api/auth/me` - Get current user
- `POST /api/auth/refresh` - Refresh access token

### User
- `PUT /api/auth/profile` - Update user profile
- `POST /api/auth/change-password` - Change password

### Wallpapers
- `GET /api/wallpapers` - Get wallpapers
- `GET /api/categories` - Get categories

### Collections
- `GET /api/user/collections` - Get user collections
- `POST /api/user/collections` - Create collection

## 🤝 Usage Examples

### Protect a Route

```typescript
import { useProtectedRoute } from "@/lib/hooks/use-auth";

export default function ProtectedPage() {
  const isAuthenticated = useProtectedRoute();
  
  if (!isAuthenticated) return <div>Loading...</div>;
  return <div>Protected content</div>;
}
```

### Get User Data

```typescript
import { useAuth } from "@/lib/hooks/use-auth";

export default function Header() {
  const { user, logout } = useAuth();
  
  return (
    <div>
      <span>Welcome, {user?.email}</span>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

## 🧪 Testing

```bash
# Run tests
pnpm test

# Build check
pnpm build

# Lint check
pnpm lint
```

## 🐛 Known Issues & Limitations

- Email verification not yet implemented
- Password reset flow coming soon
- OAuth providers (Google, GitHub) coming soon
- Two-factor authentication coming soon

## 📈 Roadmap

- [ ] Email verification for signup
- [ ] Password reset functionality
- [ ] OAuth integration (Google, GitHub)
- [ ] Two-factor authentication
- [ ] User activity logs
- [ ] Admin dashboard
- [ ] Enhanced recommendation system
- [ ] API rate limiting per user

## 📄 License

MIT License - See LICENSE file for details

## 👤 Author

Created with ❤️ by Mike C

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

**Live Demo:** [https://4k-wallpaper-app.vercel.app](https://4k-wallpaper-app.vercel.app)  
**Repository:** [GitHub](https://github.com/your-repo)  
**Status:** ✅ Production Ready