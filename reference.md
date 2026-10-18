# StudySphere Admin Web Application

Technical Reference Documentation

## 1. Project Overview

StudySphere is a **student-focused mobile commerce platform** that allows university students to buy, sell, and exchange academic resources such as:

* Lecture notes
* Textbooks
* Lab equipment
* Electronic gadgets

The platform is designed to support **peer-to-peer academic resource sharing within a campus environment**.

The ecosystem consists of two main systems:

1. **Student Mobile Application (Android)**
2. **Admin Web Management Panel**

The **Admin Web Application** is responsible for monitoring and managing all activities occurring in the mobile marketplace.

The main goal of the Admin Web system is to **maintain platform integrity, moderate content, manage users, and monitor marketplace transactions**.

---

# 2. System Architecture

StudySphere uses a **multi-tier architecture** consisting of:

### Mobile Client

Android application used by students.

Functions include:

* Account registration/login
* Listing products
* Searching marketplace items
* Placing orders
* Leaving reviews
* Managing profile and listings

### Admin Web Panel

A web dashboard used by administrators to manage the entire platform.

### Backend API

Java-based backend services responsible for:

* Data processing
* API communication
* Business logic
* Database operations

### Cloud Database

Firebase Firestore used as the primary data store.

---

## Architecture Flow

```
Android App
     │
     │ REST API
     ▼
Java Backend (Spring / Java API Layer)
     │
     ▼
Firebase Firestore
     │
     ▼
Admin Web Panel (React + CoreUI)
```

The **Admin Panel communicates with the same backend APIs** used by the mobile application.

---

# 3. Admin Web Technology Stack

The Admin Web Panel will be built using the following technologies:

### Frontend

Framework:
React.js

Admin UI Framework:
CoreUI Free Admin Template

Languages:

* JavaScript / TypeScript
* HTML5
* CSS3

UI Libraries:

* CoreUI React Components
* Chart.js for analytics
* React Router
* Axios for API calls

---

### Backend

Language:
Java

Responsibilities:

* REST API services
* Data validation
* Authentication verification
* Business logic
* Communication with Firestore

---

### Database

Firebase Firestore

Data stored includes:

* Users
* Products
* Orders
* Reviews
* Complaints
* Notifications

---

# 4. Purpose of the Admin Web Panel

The Admin Panel acts as the **central control system of the StudySphere platform**.

Administrators can:

* Monitor user activity
* Manage listings
* Approve or reject content
* Review reports
* Handle complaints
* Maintain marketplace integrity

The system ensures the mobile marketplace remains **safe, organized, and trustworthy for students**.

---

# 5. Functional Modules

The Admin Web application will include the following major modules.

---

# 5.1 Dashboard

The Dashboard is the **main landing page after admin login**.

It provides an overview of the platform status using analytics and summary cards.

Displayed information includes:

* Total number of users
* Total number of product listings
* Total number of orders
* New user registrations today
* New products added today
* Total reviews
* Total complaints

Charts and statistics include:

* Monthly sales report
* Product category distribution
* Top selling categories
* User growth trends

---

# 5.2 User Management

This module allows administrators to manage all platform users.

Features include:

View all registered users

Each user record displays:

* User ID
* Name
* Email
* Role (Buyer / Seller)
* Registration date
* Account status

Admin actions:

* Block user
* Ban user
* Activate suspended user
* View user profile
* View user listings
* View complaints related to the user

The purpose is to **prevent fraud and misuse of the marketplace**.

---

# 5.3 Product / Resource Management

This module allows the admin to monitor all marketplace listings.

Admins can:

View all product listings.

Each listing includes:

* Product title
* Product category
* Seller name
* Price
* Date listed
* Status

Admin actions include:

Approve product listings
Reject listings with inappropriate content
Delete invalid listings
Edit listing details if necessary

Admin can also manage product categories such as:

* Books
* Notes
* Electronics
* Lab Equipment
* Gadgets

This prevents **unwanted or illegal items from appearing in the marketplace**.

---

# 5.4 Order and Transaction Monitoring

This module provides visibility into all marketplace transactions.

Admin can view:

* All orders placed
* Buyer details
* Seller details
* Product information
* Order status

Possible order statuses:

* Pending
* Accepted
* Completed
* Cancelled

Admin can use this module to monitor whether **transactions between students are functioning correctly**.

---

# 5.5 Review and Complaint Management

This module is responsible for **community moderation**.

Admins can review:

* Product reviews
* Seller ratings
* User complaints

Admin actions include:

Remove inappropriate reviews
Delete spam comments
Investigate reported products
Investigate reported users

Complaint categories may include:

* Fake product
* Misleading description
* Fraudulent seller
* Offensive content

This ensures the marketplace remains **safe and respectful**.

---

# 5.6 Reports and Analytics

The Reports module provides **platform insights for administrators**.

Analytics include:

Monthly sales report

Product category popularity

Most viewed products

Top sellers

User registration trends

These insights help administrators understand:

* Marketplace performance
* User behavior
* Demand for academic resources

Charts will be implemented using **Chart.js within the CoreUI dashboard**.

---

# 6. Non Functional Requirements

The Admin Web system must meet the following quality requirements.

### Performance

Pages should load within 2 seconds.

Large datasets should support pagination and lazy loading.

---

### Security

Admin login must be secure.

Role-based access control must be implemented.

Sensitive operations must require authentication.

---

### Reliability

The system must maintain data consistency with Firestore.

All admin operations should include validation and error handling.

---

### Scalability

The system should support increasing numbers of:

* Users
* Listings
* Orders

The architecture should allow future expansion.

---

# 7. Future Enhancements

The Admin Web system can later include advanced features such as:

Advanced analytics dashboards

AI-based fraud detection

Automated listing moderation

Admin messaging system

Bulk notification broadcasting

In-app chat monitoring

Payment gateway monitoring

---

# 8. Project Scope

The Admin Web Panel will support management of the entire StudySphere platform.

The scope includes:

Dashboard analytics
User account management
Marketplace listing moderation
Order monitoring
Review moderation
Complaint handling
Reports and statistics

The admin panel does **not replace the mobile application**, but instead acts as a **management and control interface for administrators**.

---

# 9. Integration with Mobile Application

The Admin Web Panel works together with the StudySphere Android app.

Actions performed in the Admin Panel directly affect the mobile marketplace.

Examples:

If admin deletes a product → it disappears from the mobile app.

If admin bans a user → that user cannot log in.

If admin approves a listing → it becomes visible in the marketplace.

---

# 10. Target Users

The Admin Web Panel is designed for:

Platform administrators
System moderators
University project evaluators

It provides full visibility and control over the platform.

---

# 11. Development Notes

The Admin Web application will use the **CoreUI React Admin Template** as the base UI system.

Custom modules will be implemented on top of this template using:

* React components
* REST API integration
* Firestore data services
* Chart visualization tools

The system should maintain **clean architecture, modular code structure, and reusable components**.

---

If you want, I can also give you an **even more powerful version for Copilot** that includes:

* Recommended **folder structure**
* Suggested **API endpoints**
* Firestore **database schema**
* Admin **React page list**
* Admin **navigation structure**



