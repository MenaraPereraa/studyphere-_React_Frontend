# StudySphere Web

A browser-based Admin Panel and Seller Dashboard built with Next.js for the StudySphere platform — a location-aware campus m-commerce ecosystem where students can buy, sell, and exchange academic resources. This web application gives administrators full control over the platform and provides registered sellers with a dedicated space to manage listings, track orders, and view revenue analytics from any device.

> **Note:** This web application communicates with the StudySphere Backend API and Firebase Firestore directly from the browser. Environment variables prefixed with `NEXT_PUBLIC_` are exposed to the client bundle. Do not place sensitive server-side secrets in `NEXT_PUBLIC_` variables. If you choose to extend this application with sensitive business logic, consider moving it to Next.js API Routes or the dedicated backend service.

## Features

- **Admin Dashboard**: Platform-wide KPIs, revenue charts, user activity feed, and real-time listing statistics
- **User Management**: View, verify, suspend, or permanently delete student and seller accounts
- **Listings Moderation**: Approve, reject, or flag marketplace listings submitted from the Android app
- **Order Tracking**: Monitor all platform orders, update statuses, and resolve buyer–seller disputes
- **Financial Reports**: Revenue breakdown by date range, PayHere transaction logs, and CSV export
- **Category Manager**: Create, edit, and delete product categories that appear in the Android app
- **Platform Settings**: Configure platform fees, featured listing rules, and notification templates
- **Seller Overview**: Personal revenue summary, active listing count, and incoming order snapshot
- **My Listings**: Create, edit, and delete individual academic resource listings
- **My Orders**: View and manage incoming orders and update fulfilment status per order
- **Seller Analytics**: Per-listing views, enquiries, and sales performance charts
- **Seller Profile**: Edit public profile information and manage payout and bank account details
- **Authentication**: Email/Password and Google Sign-In via NextAuth.js and Firebase Authentication
- **Dark / Light Theme**: System-default adaptive theme with manual toggle support
- **Responsive Design**: Fully responsive layout optimized for desktop, tablet, and mobile browsers

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui + Radix UI primitives
- **Charts**: Recharts
- **Icons**: Lucide React
- **Forms**: react-hook-form + Zod validation
- **Authentication**: NextAuth.js + Firebase Authentication
- **Cloud Backend**: Firebase Firestore (real-time data reads)
- **HTTP Client**: Axios
- **State Management**: React Context API + React Hooks
- **Data Fetching**: SWR (stale-while-revalidate)
- **Notifications**: react-hot-toast
- **Date Handling**: date-fns
- **Build Tool**: Next.js built-in compiler (Turbopack in dev)

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- Git
- Firebase account for Authentication and Firestore ([Firebase Console](https://console.firebase.google.com/))
- A running instance of the [StudySphere Backend API](https://github.com/MenaraPereraa/StudySphere-Backend) (local or deployed)
- `google-services` web config values from your Firebase project

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/MenaraPereraa/StudySphere-Web.git
   cd StudySphere-Web
   ```

2. Install dependencies:
   ```
   npm install
   # or
   yarn
   ```

3. Set up environment variables:
   Copy the example environment file and fill in your values:
   ```
   cp .env.example .env.local
   ```

4. Run the development server:
   ```
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Setting up Firebase

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Open your existing StudySphere project or create a new one
3. Navigate to **Project Settings → General → Your apps** and register a Web app
4. Copy the Firebase config object values into your `.env.local` file (see [Environment Variables](#setting-up-environment-variables) below)
5. Ensure **Email/Password** and **Google** sign-in are enabled under **Authentication → Sign-in method**
6. Ensure your Firestore security rules allow authenticated reads from the browser:
   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /users/{userId}/{document=**} {
         allow read, write: if request.auth != null && request.auth.uid == userId;
       }
       match /{collection}/{document=**} {
         allow read: if request.auth != null;
       }
     }
   }
   ```

### Setting up Environment Variables

1. Open the `.env.local` file created during installation
2. Replace each placeholder with your actual values:
   ```
   # Firebase Client SDK (safe to expose — prefixed with NEXT_PUBLIC_)
   NEXT_PUBLIC_FIREBASE_API_KEY="your_firebase_api_key"
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your_project.firebaseapp.com"
   NEXT_PUBLIC_FIREBASE_PROJECT_ID="your_firebase_project_id"
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your_project.appspot.com"
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="your_sender_id"
   NEXT_PUBLIC_FIREBASE_APP_ID="your_firebase_app_id"

   # Backend API
   NEXT_PUBLIC_API_BASE_URL="http://localhost:5000/api"

   # NextAuth.js (server-side only — do NOT prefix with NEXT_PUBLIC_)
   NEXTAUTH_SECRET="your_nextauth_secret"
   NEXTAUTH_URL="http://localhost:3000"
   ```
3. Restart the development server after updating `.env.local`

## Project Structure

```
StudySphere-Web/
├── public/                       # Static files served as-is
│   ├── favicon.ico
│   ├── logo.png
│   └── manifest.json
│
├── src/                          # Project root
│   ├── app/                      # Next.js App Router
│   │   ├── (admin)/              # Admin-only routes (role-protected layout)
│   │   │   ├── dashboard/        # Platform overview and analytics
│   │   │   ├── users/            # User management (students, sellers)
│   │   │   ├── listings/         # All marketplace listings moderation
│   │   │   ├── orders/           # Order management and status tracking
│   │   │   ├── reports/          # Financial and usage reports
│   │   │   ├── categories/       # Product category management
│   │   │   └── settings/         # Platform-wide configuration
│   │   ├── (seller)/             # Seller-only routes (role-protected layout)
│   │   │   ├── overview/         # Seller revenue and activity summary
│   │   │   ├── my-listings/      # Seller's own listing management
│   │   │   ├── my-orders/        # Incoming orders and fulfilment
│   │   │   ├── analytics/        # Individual seller performance charts
│   │   │   └── profile/          # Seller profile and payout settings
│   │   ├── auth/                 # Authentication pages
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   └── forgot-password/
│   │   ├── api/                  # Next.js API Routes (server-side)
│   │   │   └── auth/             # NextAuth.js handler
│   │   ├── layout.tsx            # Root layout with providers
│   │   └── page.tsx              # Landing / role-based redirect page
│   │
│   ├── components/               # Reusable UI components
│   │   ├── charts/               # Recharts wrappers for dashboard graphs
│   │   ├── tables/               # Data table components with sorting and filters
│   │   ├── forms/                # Form components using react-hook-form
│   │   ├── modals/               # Dialog and confirmation modal components
│   │   └── ui/                   # Base UI primitives (shadcn/ui overrides)
│   │
│   ├── lib/                      # Utility libraries and helpers
│   │   ├── firebase.ts           # Firebase client SDK initialization
│   │   ├── api.ts                # Axios instance with auth header injection
│   │   └── auth.ts               # NextAuth.js configuration and providers
│   │
│   ├── hooks/                    # Custom React hooks
│   │   ├── useAuth.ts            # Access current user and role from context
│   │   ├── useListings.ts        # SWR hook for fetching listings
│   │   └── useOrders.ts          # SWR hook for fetching orders
│   │
│   ├── context/                  # React Context providers
│   │   ├── AuthContext.tsx       # Authenticated user and role state
│   │   └── ThemeContext.tsx      # Dark / light theme toggle state
│   │
│   ├── types/                    # TypeScript interfaces and types
│   │   ├── user.types.ts
│   │   ├── listing.types.ts
│   │   ├── order.types.ts
│   │   └── api.types.ts
│   │
│   └── styles/                   # Global CSS and Tailwind base styles
│       └── globals.css
│
├── .env.example                  # Environment variable template (safe to commit)
├── .env.local                    # Local environment values (DO NOT commit)
├── .gitignore
├── next.config.ts                # Next.js configuration
├── tailwind.config.ts            # Tailwind CSS configuration
├── tsconfig.json
├── package.json
└── README.md
```

## API Integration

This web application communicates with the StudySphere Backend API for all data operations. The API base URL is configured via the `NEXT_PUBLIC_API_BASE_URL` environment variable. The following resource modules are consumed:

- **Auth** — Token verification, session handling, and role resolution via NextAuth.js
- **Users** — Fetch, update, and manage user accounts and roles (admin only)
- **Listings** — Read all listings for moderation, or own listings for seller management
- **Orders** — Retrieve and update order records and fulfilment statuses
- **Payments** — Fetch verified PayHere transaction records for financial reports
- **Categories** — Read and manage product categories for the Android app catalog
- **Reports** — Pull aggregated revenue and usage statistics for the admin dashboard

You can find the complete Axios instance configuration and request helpers in `src/lib/api.ts`. All API responses follow the standardised envelope format defined in `src/types/api.types.ts`.

## Customization

- **Theme**: Primary and accent colors can be changed in `tailwind.config.ts` under the `extend.colors` key; dark mode overrides use Tailwind's `dark:` variant throughout components
- **Sidebar Navigation**: Add or remove menu items by editing the navigation config array in `src/components/ui/Sidebar.tsx`
- **Role Guards**: Access control rules per route are defined in the middleware file `src/middleware.ts` using NextAuth session roles
- **Chart Colors**: Default chart color palettes can be adjusted in `src/components/charts/chartConfig.ts`
- **API Base URL**: Switch between local and production API by updating `NEXT_PUBLIC_API_BASE_URL` in `.env.local`
- **Date Format**: Default date and time display formats can be changed globally in `src/lib/dateFormat.ts` using date-fns format strings

## Deployment

This application can be easily deployed to Vercel with zero configuration:

1. Push your code to a GitHub repository
2. Go to [Vercel](https://vercel.com/) and click **Add New → Project**
3. Import the `StudySphere-Web` repository from GitHub
4. Add all environment variables from `.env.local` in the **Environment Variables** section of the Vercel project settings
5. Click **Deploy** — Vercel will automatically build and publish the application

For manual builds outside of Vercel:

```
# build for production
npm run build

# start the production server
npm run start
```

The production build output will be stored in the `.next/` directory.

## License

[MIT License](LICENSE) - Free to use, modify, and distribute with attribution. Commercial use is permitted.
