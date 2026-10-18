# DriveGo Admin Web Application – Copilot Development Rules

This document defines strict rules that must be followed when generating code for the DriveGo Admin Web Application.

GitHub Copilot or any AI coding assistant must follow these rules when suggesting code.

These rules ensure that the generated code remains consistent, maintainable, and aligned with the project architecture.

---

# 1. Project Overview

DriveGo is a **location-enforced car rental platform**.

The system consists of three main components:

1. Android mobile application for customers
2. React web application for administrators
3. Java REST API backend connected to Firebase Firestore

The Admin Web Application provides **operational control of the platform** including:

- fleet management
- location configuration
- booking monitoring
- user management
- payment tracking
- analytics

This admin panel is built using **React and CoreUI**.

---

# 2. Technology Stack

Frontend Framework:
React

Admin Template:
CoreUI React (Free Version)

Routing:
React Router

HTTP Client:
Axios

Charts:
CoreUI Charts / Chart.js

Styling:
CoreUI default styling with SCSS

Backend Communication:
REST API requests to Java backend

Database:
Firebase Firestore (accessed only through backend APIs)

---

# 3. UI Framework Rules

Copilot MUST follow these rules:

- Use **CoreUI React components whenever possible**
- Do NOT introduce other UI libraries
- Do NOT use Material UI
- Do NOT use Ant Design
- Do NOT use Tailwind UI libraries
- Do NOT use Bootstrap components outside CoreUI

All UI must remain consistent with the **CoreUI design system**.

---

# 4. Project Folder Structure

Generated code must follow this structure.

src/

components/  
Reusable UI components

pages/  
Full pages used by routing

services/  
API communication logic

routes/  
Application routing configuration

utils/  
Utility helper functions

assets/  
Images and static resources

layout/  
CoreUI layout configuration

Copilot must NOT generate random folders outside this structure.

---

# 5. Component Design Rules

Components must follow these guidelines:

- Keep components small and focused
- Avoid extremely large components
- Extract reusable UI elements into `/components`
- Pages should focus on layout and data rendering

Example:

pages/CarsPage.js  
components/CarTable.js  
components/CarFormModal.js

---

# 6. API Communication Rules

All backend communication must use **Axios**.

API calls must be centralized inside the `/services` folder.

Example:

services/carService.js

Example usage:

import carService from '../services/carService'


Pages should never directly implement Axios requests.

---

# 7. Data Handling Rules

API responses must be handled consistently.

Example response structure:

{
"status": "success",
"data": [...]
}

Error structure:

{
"status": "error",
"message": "Error description"
}


Components must handle:

- loading states
- error states
- empty states

---

# 8. Table and List Rendering

Admin panels frequently display lists.

Use CoreUI tables for displaying:

- cars
- users
- bookings
- rentals
- payments

Tables should support:

- sorting
- pagination
- filtering when necessary

---

# 9. Form Design Rules

Forms are used for:

- adding cars
- updating car details
- creating locations
- editing users

Form requirements:

- validation before submission
- clear labels
- consistent layout
- modal dialogs when appropriate

All forms must use **CoreUI form components**.

---

# 10. Dashboard Rules

The dashboard must display key metrics:

- total users
- total cars
- active rentals
- completed rentals
- daily revenue
- monthly revenue
- most rented cars

Use CoreUI widgets and chart components.

---

# 11. Security Rules

The admin interface must:

- require authentication
- store authentication tokens securely
- attach tokens to API requests
- redirect to login if authentication fails

---

# 12. Development Phases

Development should occur in two phases.

Phase 1: UI Development

- build all pages
- use mock data
- verify navigation
- ensure layout consistency

Phase 2: API Integration

- connect pages to backend APIs
- replace mock data
- implement loading states
- handle API errors

---

# 13. Code Style Rules

Copilot must follow these coding standards:

- use functional React components
- use React hooks
- use descriptive variable names
- avoid deeply nested code
- keep logic readable

Avoid overly complex patterns unless required.

---

# 14. Navigation Structure

Sidebar navigation should include:

Dashboard  
Cars  
Locations  
Bookings  
Rentals  
Users  
Payments  
Notifications

Routes must match these modules.

---

# 15. Development Philosophy

The DriveGo Admin Web Application must be:

- clean
- modular
- maintainable
- consistent with CoreUI design

The admin panel should prioritize **functionality and operational clarity** rather than complex UI effects.

All generated code should support a scalable and maintainable administrative system.