# Simple CMS Calendar Application

## Table of Contents

1.  [Introduction](#1-introduction)
2.  [Features](#2-features)
3.  [Technologies Used](#3-technologies-used)
4.  [Setup Instructions](#4-setup-instructions)
    * [Prerequisites](#prerequisites)
    * [Project Initialization](#project-initialization)
    * [Install Core Dependencies](#install-core-dependencies)
    * [Install FullCalendar Dependencies](#install-fullcalendar-dependencies)
    * [Set up Tailwind CSS 4.0](#set-up-tailwind-css-40)
    * [Integrate React Code](#integrate-react-code)
    * [Run the Development Server](#run-the-development-server)
5.  [Mock Data](#5-mock-data)
6.  [Future Considerations](#6-future-considerations)
7.  [Out of Scope](#7-out-of-scope)
8.  [License](#8-license)

---

## 1. Introduction

This project is a simple Content Management System (CMS) Calendar Application designed to help content managers plan, create, schedule, edit, and delete content posts across different platforms. It provides both a calendar view for a visual overview of scheduled posts and a list view for detailed management, complete with sorting and filtering capabilities. The application is built with a mobile-first approach, ensuring a responsive and intuitive user experience on various devices.

## 2. Features

The application currently supports the following key functionalities:

* **Secure Login:** Basic login functionality (Email/Password and Google login placeholders).
* **Homepage Views:**
    * **Calendar View (Default):** Displays content posts on a monthly calendar using FullCalendar, with color-coding for content types and status indicators for drafts.
    * **List View:** Presents content posts in a sortable and filterable list format.
* **Content Creation:**
    * "Create New Post" button to open a modal for selecting content types (Blog Post, Instagram Post, Facebook Post).
    * `PostFormModal` for entering post details based on the selected content type, including title, subtitle, body, publish date, image upload (placeholder), and category (for Blog Posts).
    * Validation for required fields and character limits for Instagram/Facebook post bodies.
    * Ability to "Save as Draft" or "Publish" a post.
* **Content Detail View:**
    * Clicking on a post in either Calendar or List View opens a `PostDetailModal` displaying all post information.
* **Content Editing:**
    * "Edit" button within the `PostDetailModal` reopens the `PostFormModal` with existing post data pre-populated for modification.
    * Changes can be saved as "Draft" or "Published".
* **Content Deletion:**
    * "Delete" button within the `PostDetailModal` triggers a confirmation modal.
    * Upon confirmation, the post is removed from the application.
* **List View Enhancements:**
    * **Sorting:** Posts can be sorted by Publish Date (Newest/Oldest First) and Title (A-Z/Z-A).
    * **Filtering:** Posts can be filtered by `postStatus` (All, Draft, Published) and `contentType` (All, Blog Post, Instagram Post, Facebook Post).

## 3. Technologies Used

* **Frontend Framework:** React (with TypeScript)
* **Build Tool:** Vite
* **Styling:** Tailwind CSS 4.0
* **Calendar Component:** FullCalendar (`@fullcalendar/react`, `@fullcalendar/daygrid`)
* **Package Manager:** npm

## 4. Setup Instructions

Follow these steps to get the project up and running on your local machine.

### Prerequisites

* **Node.js and npm:** Ensure you have Node.js (version 14.18+, 16+ recommended) and npm installed. You can download Node.js from [nodejs.org](https://nodejs.org/).
* **Visual Studio Code (VS Code):** Recommended code editor.

### Project Initialization

1.  Open your terminal or VS Code's integrated terminal.
2.  Navigate to your desired projects directory:
    ```bash
    cd path/to/your/projects
    ```
3.  Create a new Vite React (TypeScript) project:
    ```bash
    npm create vite@latest
    ```
    * When prompted, enter your project name (e.g., `cms-calendar-app`), select `React` as the framework, and `TypeScript` as the variant.
4.  Navigate into your new project directory:
    ```bash
    cd cms-calendar-app
    ```

### Install Core Dependencies

Install the basic project dependencies:

```bash
npm install
```

### Install FullCalendar Dependencies
Install the specific packages for FullCalendar:

```Bash
npm install @fullcalendar/react @fullcalendar/daygrid
```
### Set up Tailwind CSS 4.0
Tailwind CSS 4.0 is integrated as a PostCSS plugin.

1. Install Tailwind CSS, PostCSS, Autoprefixer, and the Tailwind CSS PostCSS plugin:

```Bash
npm install -D tailwindcss @tailwindcss/postcss postcss autoprefixer
```
2. Manually create `postcss.config.js` in your project's root directory and add the following content:

```JavaScript
export default {
  plugins: {
    '@tailwindcss/postcss': {}, // Correct plugin for Tailwind CSS 4.0
    autoprefixer: {},
  },
};
```
3. Manually create `tailwind.config.js` in your project's root directory and add the following content:

```JavaScript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```
4. Open `src/index.css` (or `src/App.css`) and add the following Tailwind directives at the very top:

```CSS
@tailwind base;
@tailwind components;
@tailwind utilities;

/* You can add your custom global CSS here */
html, body, #root {
  height: 100%;
  margin: 0;
  font-family: "Inter", sans-serif; /* Recommended font */
}
```
### Integrate React Code
1. Open `src/App.tsx` in your VS Code editor.

2. Delete all existing content in `src/App.tsx`.

3. Copy the entire content from the `cms-app` immersive artifact (the React code I provided earlier in our chat, or request it again if you don't have the latest) and paste it into your empty `src/App.tsx` file.

4. Save the file.

### Run the Development Server
1. Ensure you are in your project's root directory (`cms-calendar-app`).

2. Start the development server:

```Bash
npm run dev
```
3. Open the provided local URL (e.g., `http://localhost:5173/`) in your web browser.

## 5. Mock Data
The application currently uses in-memory mock data for posts, defined in `src/App.tsx` as `initialMockPosts`. This data is reset each time the application is refreshed. In a production environment, this would be replaced with a persistent backend (e.g., Sanity.io or Firebase Firestore).

## 6. Future Considerations
AI Integration for Ideation: The "Create New Post" dropdown includes a disabled "AI Ideation" option, acknowledging potential future integration for content generation assistance.

Backend Integration: Transition from mock data to a real CMS backend (like Sanity.io or Firebase Firestore) for data persistence and multi-user capabilities.

Rich Text Editor: Implement a proper rich text editor for `postBody` instead of a plain textarea.

Image Upload Handling: Full integration with a cloud storage solution for image uploads (e.g., Sanity.io asset management).

User Authentication: Implement robust user authentication and authorization.

## 7. Out of Scope
Based on the initial requirements, the following features are explicitly out of scope for this version:

* Week or Day views in the calendar.

* Editing/deleting directly from calendar/list items (actions are via the detail modal only).

* Drag-and-drop rescheduling.

* Recurring posts.

* Advanced user roles/permissions.

* Notifications/reminders.

* Direct publishing from the CMS to social media platforms.

* Advanced reporting/analytics.

* Complex content versioning UI.

* Offline mode.

## 8. License
This project is open-source and available under the MIT License.