/**
 * Application Routes Configuration - StudySphere Admin
 *
 * Defines all protected StudySphere admin routes using React lazy loading
 * for code splitting and performance optimization.
 *
 * Each route object contains:
 * - path: URL path for the route
 * - name: Human-readable name for breadcrumbs
 * - element: Lazy-loaded React component
 * - exact: (optional) Requires exact path match
 *
 * @module routes
 */

import React from 'react'

// Dashboard
const Dashboard = React.lazy(() => import('./views/studysphere/Dashboard'))

// Users Management
const UsersPage = React.lazy(() => import('./views/studysphere/UsersPage'))

// Products Management
const ProductsPage = React.lazy(() => import('./views/studysphere/ProductsPage'))

// Orders Management
const OrdersPage = React.lazy(() => import('./views/studysphere/OrdersPage'))

// Reviews & Complaints Management
const ReviewsComplaintsPage = React.lazy(() => import('./views/studysphere/ReviewsComplaintsPage'))

// Notifications Management
const NotificationsPage = React.lazy(() => import('./views/studysphere/NotificationsPage'))

// Reports & Analytics
const ReportsPage = React.lazy(() => import('./views/studysphere/ReportsPage'))

/**
 * StudySphere Admin Routes
 * All routes are protected and require admin authentication
 *
 * Topics:
 * - Dashboard: Platform overview and key metrics
 * - Users: User management and control
 * - Products: Product catalog and inventory
 * - Orders: Order management and tracking
 * - Reviews & Complaints: Feedback and issue management
 * - Notifications: Notification management
 * - Reports: Analytics and reporting tools
 */
const routes = [
  // '/' path එකට Dashboard එක කෙලින්ම set කරන්න
  { path: '/', exact: true, name: 'Home', element: Dashboard },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/users', name: 'Users', element: UsersPage },
  { path: '/products', name: 'Products', element: ProductsPage },
  { path: '/orders', name: 'Orders', element: OrdersPage },
  { path: '/reviews-complaints', name: 'Reviews & Complaints', element: ReviewsComplaintsPage },
  { path: '/notifications', name: 'Notifications', element: NotificationsPage },
  { path: '/reports', name: 'Reports', element: ReportsPage },
]
export default routes
