---
Role: GitHub Copilot Agent for CMS UI/UX POC
Task: Implement Phase 1 of the Simple CMS Calendar Application - UI/UX Proof of Concept (POC) with Local Mocking.
Goal: Build the frontend user interface and client-side logic to demonstrate the core views, navigation, content creation workflow, and content management actions as defined in the requirements and user stories. Use local JSON data to simulate backend operations.
---

**Project Context:**

You are tasked with implementing a simple Content Management System (CMS) web application designed for content managers to plan, create, schedule, and manage content posts across different platforms (Blog, Instagram, Facebook). The application needs to be modern, mobile-first, and easy to use.

**Phase 1 Focus: UI/UX Proof of Concept (POC) with Local Mocking**

The primary objective of this phase is to build the *frontend user interface* and *client-side workflow simulation*. Data persistence and actual backend integration (Sanity.io) are explicitly **out of scope** for this phase. You will use local JSON data structures to mock the data the UI displays and interacts with.

**Source Documents:**

Refer to the following documents, which are available in the project workspace, as the single source of truth for requirements and user stories:

1.  `Content Management System: User Requirements.md`
2.  `User Stories - Simple CMS Calendar Application.md`

**Technology Stack:**

Implement the application using the following technologies:

*   React (with TypeScript)
*   **Tailwind CSS 4.0** for styling (ensure mobile-first principles are applied)
*   FullCalendar library for the Calendar View
*   Local JSON file(s) or in-memory data structures to simulate backend data

**In Scope for Phase 1 POC:**

Implement the UI and client-side logic for the following features, using mock data:

1.  **Authentication UI (Mocked):**
    *   Display a login screen UI with fields/buttons for Email/Password and Google login.
    *   Simulate a successful login transition to the homepage (no actual authentication logic needed).
    *   **[Ref: Req 2, AUTH-1]**

2.  **Homepage Structure & Navigation:**
    *   Build the main application layout.
    *   Implement the UI controls (buttons/tabs) to switch between Calendar View and List View.
    *   Ensure the Calendar View is the default upon simulated login.
    *   **[Ref: Req 3, HOME-1]**

3.  **Calendar View (Mocked Data):**
    *   Integrate and configure FullCalendar library.
    *   Display a month view calendar.
    *   Include only "Today", "Previous Month", and "Next Month" navigation controls.
    *   Populate the calendar with mock posts from local data based on their `postPublishDate`. Include both 'Draft' and 'Published' mock posts.
    *   Implement color-coding for mock posts based on their mocked Content-Type (Blog, Instagram, Facebook).
    *   Display a visual legend for the color-coding.
    *   Show the mock `postTitle` (potentially truncated) on calendar events.
    *   Implement hover/tap functionality to show a tooltip with the full mock `postTitle` and `postStatus`.
    *   **[Ref: Req 3.1, 3.2, 3.3, 3.3.1, 3.3.2, 3.3.3, CAL-1, CAL-2, CAL-3, CAL-4]**

4.  **List View (Mocked Data):**
    *   Display a list UI.
    *   Populate the list with all mock posts from local data.
    *   Implement client-side sorting of mock posts by `postPublishDate` in descending order.
    *   For each list item, display the mock `postTitle`, `postPublishDate` (formatted), Content Type, and `postStatus`.
    *   Implement UI controls to filter the list by mock `postStatus` (Draft, Published, All). Apply filtering client-side.
    *   **[Ref: Req 3.6, 3.7, 3.8, 3.9, LIST-1, LIST-2]**

5.  **Post Detail Modal (Mocked Data):**
    *   Create a modal component to display mock post details.
    *   Implement logic to open this modal when a mock post is clicked in either Calendar or List view.
    *   Display detailed mock information within the modal based on the mock Content-Type, including: full `postTitle`, `postStatus`, `postPublishDate`, `postBody`, mock `postImage` (display a placeholder or mock URL string), `postSubTitle` (if applicable), `postCategory` (if applicable).
    *   Include UI buttons for "Edit", "Delete", and "Cancel".
    *   **[Ref: Req 3.10, 3.10.1, 3.10.2, CAL-5 / LIST-3]**

6.  **Content Creation Workflow (Mocked Save/Publish):**
    *   Add a "Create New Post" button visible on the homepage in both views.
    *   Implement UI for selecting the Content Type (Blog Post, Instagram Post, Facebook Post).
    *   Create a modal form component that adapts its fields based on the selected Content Type (matching the schema in Req 4). Use appropriate input types (text, date/time picker, textarea, dropdown, simulated file input).
    *   Include UI buttons for "Save as Draft", "Publish", and "Cancel".
    *   Implement client-side mock validation UI for the "Publish" action based on the mandatory fields specified in Req 4. The "Publish" button should appear disabled until mock validation passes.
    *   Implement client-side mock validation UI for `postBody` length for Instagram and Facebook posts, showing warnings if exceeded. The "Publish" button should be disabled if this mock validation fails.
    *   Implement the UI for adding a new category within the Blog Post form's `postCategory` field (the actual saving of the new category to a persistent list is out of scope).
    *   Simulate the "Save as Draft" and "Publish" actions by closing the modal and perhaps showing a success message (no actual data persistence needed).
    *   **[Ref: Req 4, 4.1, 4.2, 4.2.1, 4.2.2, CREATE-1, CREATE-2, CREATE-3, CREATE-4, CREATE-5, CREATE-6, CREATE-7, MANAGE-5]**

7.  **Content Management Actions (Mocked):**
    *   From the Post Detail modal:
        *   Implement the click handler for "Edit" to open the content creation form modal pre-filled with the mock data of the selected post.
        *   Implement the click handler for "Delete" to open a confirmation modal.
        *   Create the UI for the delete confirmation modal (message, "Delete", "Cancel" buttons).
        *   Simulate the delete action from the confirmation modal (close modals, show success message).
        *   Implement the "Cancel" button on the Post Detail modal to close it and return to the previous homepage view.
    *   **[Ref: Req 3.10.2.1, 3.10.2.2, 3.10.2.3, MANAGE-1, MANAGE-3, MANAGE-4]**

**Out of Scope for Phase 1 POC:**

*   Actual user authentication backend integration.
*   Persistent storage of data (Sanity.io integration).
*   Real API calls to any backend.
*   Actual image file uploads or processing.
*   Server-side code.
*   Complex, persistent state management beyond what is necessary to demonstrate the UI flows for a single session.
*   Any features marked as 'Future Requirements' or explicitly listed in Section 4 ('Out of Scope') of the User Stories document.

**Instructions for the Agent:**

*   **Create the project inside a sub-folder named `phase1-poc` relative to the current workspace root.**
*   Structure the project as a standard React application (e.g., using Create React App, Vite, or Next.js - state preference if any, otherwise choose a simple setup).
*   Organize code into logical components (e.g., `LoginPage`, `HomePage`, `CalendarView`, `ListView`, `PostDetailModal`, `PostFormModal`).
*   Create a file (e.g., `src/mockData.json` or `src/mockData.ts`) containing sample mock post data covering different Content Types and statuses, with valid `postPublishDate` values.
*   Implement state management locally within React components or using React Context/simple hooks to manage the currently viewed data, modal states, view switching, and filter application on the mock data.
*   Ensure the UI is responsive and uses Tailwind CSS utility classes.
*   **Write clean, readable code that follows standard React/TypeScript best practices.**
*   **Add sufficient comments and documentation (e.g., prop types, function descriptions) to make the codebase easy for another developer to understand and extend.**
*   **Follow DRY (Don't Repeat Yourself) principles by creating reusable components (e.g., buttons, form inputs, modals) and utility functions where appropriate.**
*   When implementing features using the specified technologies (React, TypeScript, Tailwind CSS 4.0, FullCalendar), always prioritize referencing and adhering to the official online documentation and guides provided by the respective suppliers to ensure correct usage, best practices, and compatibility with the specified versions.
*   Add comments where the logic is complex or requires explanation.
*   Provide clear steps on how to run the developed POC application.
*   Focus on completing the UI/UX flow demonstration with mocked data before refining code structure or adding complex features.

**Upon Completion:**

Report back on the implemented features within the Phase 1 scope, provide instructions on how to run the POC, and indicate readiness for review or proceeding to Phase 2 planning.