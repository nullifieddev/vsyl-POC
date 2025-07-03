---
Author: Jason Nullified
Organisation: Design Code Mastery
Document Title: User Stories - Simple CMS Calendar Application (Latest Version)
Document Version: 1.0
Date: 2023-10-27
---

# User Stories - Simple CMS Calendar Application (Latest Version)

## 1. Introduction

This document outlines the functional requirements of the Simple CMS Calendar Application from the perspective of the end-user (Content Manager), incorporating all feedback and clarifications received from the client. Each user story describes a specific feature or piece of functionality, detailing the user's goal and the benefit they gain, along with specific acceptance criteria that define when the feature is complete.

This document reflects the addition of the List View, sorting, and filtering, the clarification that 'Draft' and 'Published' are the primary statuses managed in the UI, the mandatory field requirements for 'Publish', the requirement for `postPublishDate` for 'Draft', Blog Category handling (list + add new), specifying image handling via Sanity URLs, and adding `postBody` max length validation for Instagram/Facebook.

## 2. User Role

The primary user role for this application is:

*   **Content Manager:** A user responsible for planning, creating, scheduling, editing, and deleting content posts across different platforms.

## 3. User Stories by Feature Area

### 3.1. Authentication & Access

*   **AUTH-1: Secure Login**
    *   As a Content Manager,
    *   I want to securely log into the CMS,
    *   So that I can access and manage my content calendar privately.
    *   **Details:** The application must prompt the user to login if they are not authenticated. It should support multiple login methods.
    *   **Acceptance Criteria:**
        *   The application presents a distinct login screen when the user is not authenticated.
        *   The login screen provides options for: Login with Email and Password (or Username & Password), Login using a designated Google Sign-In button.
        *   Upon successful authentication via any method, the user is redirected to the Home Page.
        *   Failed login attempts display an informative error message.
    *   **[Ref: Req 2]**

### 3.2. Homepage Views & Navigation

*   **HOME-1: Choose Homepage Display View**
    *   As a Content Manager,
    *   I want to be able to switch between a Calendar View and a List View on the homepage,
    *   So that I can choose the most convenient way to review my content (visual planning vs. chronological review).
    *   **Details:** The homepage should provide a control to toggle between the two main display modes. Calendar View is the default.
    *   **Acceptance Criteria:**
        *   The Home Page displays a control (e.g., tabs, buttons) allowing the user to switch between "Calendar View" and "List View".
        *   The application defaults to showing the "Calendar View" upon initial load after login.
        *   Switching views updates the main content area to display either the Calendar or the List.
    *   **[Ref: New Requirement]**

*   **CAL-1: View Content Calendar (Month View)**
    *   As a Content Manager viewing the Calendar View,
    *   I want to see a calendar displaying the current month,
    *   So that I can quickly visualize scheduled content.
    *   **Details:** When the Calendar View is selected, it displays the FullCalendar interface.
    *   **Acceptance Criteria:**
        *   When "Calendar View" is selected, the Home Page prominently displays a calendar interface using FullCalendar.
        *   The calendar initially shows the current month.
    *   **[Ref: Req 3, New Requirement]**

*   **CAL-2: Navigate Calendar Months**
    *   As a Content Manager viewing the Calendar View,
    *   I want to easily navigate between months,
    *   So that I can plan and review past/future content.
    *   **Details:** Calendar includes month-level navigation controls.
    *   **Acceptance Criteria:**
        *   Calendar displays "Today", "Previous Month", and "Next Month" controls.
        *   Controls for Day, Week, or other non-Month views are *not* present.
    *   **[Ref: Req 3.1, 3.2]**

*   **CAL-3: See Scheduled Posts on Calendar**
    *   As a Content Manager viewing the Calendar View,
    *   I want to see my content posts displayed on the calendar on their `postPublishDate`, regardless of status,
    *   So that I see all planned content.
    *   **Details:** Posts with a `postPublishDate` in the month appear on the grid. `postPublishDate` is required for all saved posts (Draft or Published).
    *   **Acceptance Criteria:**
        *   Posts with a valid `postPublishDate` in the month are visible.
        *   Includes 'Draft' and 'Published' posts.
        *   Calendar display shows `postTitle` (potentially truncated).
    *   **[Ref: Req 3.3, Client Feedback]**

*   **CAL-4: Differentiate Posts by Type and Status (Calendar)**
    *   As a Content Manager viewing the Calendar View,
    *   I want Posts to be visually distinct by type and show quick status details,
    *   So that I can quickly identify content type and status.
    *   **Details:** Posts are color-coded by Content-Type; tooltip shows full title and status.
    *   **Acceptance Criteria:**
        *   Posts are color-coded (Blog, Instagram, Facebook).
        *   A legend shows the color mapping.
        *   Hover/tap shows a tooltip with full `postTitle` and `postStatus` (Draft / Published).
    *   **[Ref: Req 3.3.1, 3.3.2]**

*   **LIST-1: View Content in Chronological List**
    *   As a Content Manager viewing the List View,
    *   I want to see a chronological list of all my posts (latest first),
    *   So that I can quickly review upcoming/recent activity.
    *   **Details:** List shows posts sorted by `postPublishDate` descending.
    *   **Acceptance Criteria:**
        *   When "List View" is selected, a list of all posts is displayed.
        *   Posts are sorted by `postPublishDate` descending.
        *   Each item shows `postTitle`, `postPublishDate`, Content Type, and `postStatus`.
    *   **[Ref: New Requirement]**

*   **LIST-2: Filter List View by Post Status**
    *   As a Content Manager viewing the List View,
    *   I want to filter the list by post status,
    *   So that I can easily find posts like Drafts.
    *   **Details:** Filter control for `postStatus`.
    *   **Acceptance Criteria:**
        *   A filter control for `postStatus` (Draft, Published) is available.
        *   Selecting a status filters the list to show only posts with that status.
        *   Clearing the filter shows all posts.
        *   (Confirm with client: single status filter or multiple selection?)
    *   **[Ref: New Requirement]**

*   **CAL-5 / LIST-3: View Detailed Post Information (Modal)**
    *   As a Content Manager,
    *   I want to click on a Post from either the Calendar or List View to see more details,
    *   So that I can review content before editing/deleting.
    *   **Details:** Clicking a Post opens a detail modal.
    *   **Acceptance Criteria:**
        *   Clicking a Post from Calendar or List opens a modal overlay.
        *   Modal content is specific to the Content-Type.
        *   Modal displays: full `postTitle`, `postStatus` (Draft/Published), `postPublishDate`, `postBody`, `postImage` (displayed image), `postSubTitle` (if applicable), `postCategory` (if applicable).
        *   Modal includes "Edit", "Delete", and "Cancel" buttons.
    *   **[Ref: Req 3.3.3, 5, Client Feedback 2, 3, 4, New Requirement]**

### 3.3. Content Creation Workflow

*   **CREATE-1: Initiate New Post Creation**
    *   As a Content Manager,
    *   I want a button to start creating a new post, visible from the homepage,
    *   So that I can easily add new items regardless of the current view.
    *   **Details:** Button is visible in both Calendar and List views.
    *   **Acceptance Criteria:**
        *   A "Create New Post" button is visible on the Home Page in both views.
        *   Clicking it presents content type selection (CREATE-2).
    *   **[Ref: Req 4, New Requirement]**

*   **CREATE-2: Select Content Type**
    *   As a Content Manager,
    *   I want to choose the specific type of content,
    *   So that the system uses the correct form.
    *   **Details:** Select from a list after initiating creation.
    *   **Acceptance Criteria:**
        *   Clicking "Create New Post" reveals a dropdown/selection.
        *   Options: Blog Post, Instagram Post, Facebook Post. (Future: AI Ideation*).
        *   Selecting an option opens the form modal (CREATE-3).
    *   **[Ref: Req 4.1]**

*   **CREATE-3: Fill Out Content Form**
    *   As a Content Manager,
    *   When I select a Content-Type, I want a form tailored to that type,
    *   So that I can enter required details.
    *   **Details:** Modal form with type-specific fields and Save/Publish/Cancel actions.
    *   **Acceptance Criteria:**
        *   Selecting Content-Type opens form modal.
        *   Form displays fields per type (Req 5, Client Feedback).
        *   Fields use appropriate inputs (text, dropdown, file input, rich text, date/time picker).
        *   Form includes "Save as Draft" (CREATE-4), "Publish" (CREATE-5), and "Cancel" (MANAGE-5) actions.
    *   **[Ref: Req 4.2, 4.2.1, 5, Client Feedback 2, 3, 4]**

*   **CREATE-4: Save Content as Draft**
    *   As a Content Manager,
    *   I want to save content as a draft,
    *   So I can return later and it appears on the calendar/list.
    *   **Details:** Saves with 'Draft' status. Requires `postPublishDate`.
    *   **Acceptance Criteria:**
        *   Form includes "Save as Draft".
        *   Clicking validates for draft requirements.
        *   Saving as Draft *requires* a valid `postPublishDate`.
        *   If valid, saves to Sanity.io with `postStatus`='Draft'.
        *   Upon success, modal closes and homepage view updates.
    *   **[Ref: Req 4.2.2.1 (modified), Client Feedback 2, 3, 4]**

*   **CREATE-5: Publish Content**
    *   As a Content Manager,
    *   When content is complete, I want to publish it,
    *   So status is updated and it meets platform criteria.
    *   **Details:** Saves with 'Published' status. Requires all mandatory fields.
    *   **Acceptance Criteria:**
        *   Form includes "Publish".
        *   Clicking validates *all* mandatory fields for Publish per Content-Type (see Section 4).
        *   If valid, saves to Sanity.io with `postStatus`='Published'.
        *   Upon success, modal closes and homepage view updates.
        *   "Publish" is inactive until mandatory fields are complete.
    *   **[Ref: Req 4.2.2.1 (modified), Client Feedback 2, 3, 4]**

*   **CREATE-6: Add New Blog Category**
    *   As a Content Manager creating a Blog Post,
    *   I want to add a new category if needed,
    *   So I can categorize correctly and make it available for future posts.
    *   **Details:** Option in `postCategory` dropdown.
    *   **Acceptance Criteria:**
        *   `postCategory` dropdown includes "Add New Category".
        *   Selecting it allows input of a new name.
        *   Confirmed new category added to list for current session.
        *   Saving post with new category updates the master category list in Sanity.io for all users.
    *   **[Ref: Client Feedback 2]**

*   **CREATE-7: Validate Post Body Length (Instagram/Facebook)**
    *   As a Content Manager creating Insta/FB Post,
    *   I want warning if post body is too long,
    *   So I avoid platform rejection.
    *   **Details:** `postBody` validated against max length for these types.
    *   **Acceptance Criteria:**
        *   `postBody` validated against specified max length for Instagram/Facebook.
        *   Exceeding limit displays warning message (with counts).
        *   "Publish" is disabled if limit exceeded.
    *   **[Ref: Client Feedback 3, 4]**

### 3.4. Content Management (Edit & Delete)

*   **MANAGE-1: Edit Existing Post**
    *   As a Content Manager,
    *   From Post Details, I want to edit a post,
    *   So I can change content/status/schedule.
    *   **Details:** Detail modal has Edit option.
    *   **Acceptance Criteria:**
        *   Post Details modal includes "Edit".
        *   Clicking closes modal and opens Content-Type form pre-filled with post data.
        *   Edit form includes "Save as Draft" and "Publish".
    *   **[Ref: Req 3.3.3.1, 3.3.3.1.1, 5]**

*   **MANAGE-2: Save Edited Post**
    *   As a Content Manager,
    *   When editing, I want to save changes,
    *   So updated content reflects in system/views.
    *   **Details:** Edit form uses Save/Publish actions with same validation as creation.
    *   **Acceptance Criteria:**
        *   Edit form includes "Save as Draft" and "Publish".
        *   Actions function identically to CREATE-4/CREATE-5, including validation and status setting.
        *   Clicking saves changes to existing post in Sanity.io.
        *   Upon success, modal closes and homepage view updates.
    *   **[Ref: Req 4.2.2.1 (applies to edit), Client Feedback 2, 3, 4]**

*   **MANAGE-3: Delete Existing Post (with Confirmation)**
    *   As a Content Manager,
    *   From Post Details, I want to delete a post, but confirm first,
    *   So I remove content but avoid accidental deletion.
    *   **Details:** Delete option triggers confirmation.
    *   **Acceptance Criteria:**
        *   Post Details modal includes "Delete".
        *   Clicking opens confirmation modal.
        *   Confirmation displays message and "Delete"/"Cancel" buttons.
        *   Clicking "Cancel" on confirmation returns to Post Details.
        *   Clicking "Delete" on confirmation permanently deletes from Sanity.io.
        *   Upon success, both modals close, homepage view updates.
    *   **[Ref: Req 3.3.3.1, 3.3.3.1.2]**

*   **MANAGE-4: Cancel from Post Detail View**
    *   As a Content Manager,
    *   I want to close the Post Details modal,
    *   So I return to the homepage view without action.
    *   **Details:** Cancel/Close button on detail modal.
    *   **Acceptance Criteria:**
        *   Post Details modal includes "Cancel" (or close/X).
        *   Clicking closes modal.
        *   User returns to previous homepage view (Calendar/List) with no changes.
    *   **[Ref: Req 3.3.3.1, 3.3.3.1.3]**

*   **MANAGE-5: Cancel from Create/Edit Form**
    *   As a Content Manager,
    *   I want to close the form without saving,
    *   So I discard work and return to the homepage view.
    *   **Details:** Cancel/Close button on form modal.
    *   **Accept criteria:**
        *   Form modal includes "Cancel".
        *   Clicking closes modal.
        *   Unsaved changes discarded (confirmation prompt recommended).
        *   User returns to previous homepage view (Calendar/List).
    *   **[Ref: Req 4.2.2.3]**

### 3.5. Future Considerations

*   **FUTURE-1: AI Ideation Placeholder**
    *   As a Content Manager,
    *   I want to see that future AI Ideation is planned,
    *   So I know this feature may be available later.
    *   **Details:** Acknowledge potential AI integration in create workflow.
    *   **Acceptance Criteria:**
        *   "Create New Post" dropdown design allows adding "AI Ideation" option.
        *   (Currently) Option may be disabled or marked as future.
    *   **[Ref: Req 6, 6.1]**

## 4. Out of Scope (Based on Requirements)

*   Week or Day views in calendar (Req 3.2).
*   Editing/deleting directly from calendar/list items (actions via detail modal only).
*   Drag-and-drop rescheduling.
*   Recurring posts.
*   User roles/permissions beyond one role.
*   Notifications/reminders.
*   Direct publishing *from* the CMS to social media platforms.
*   Advanced reporting/analytics.
*   Complex content versioning UI.
*   Offline mode.
*   Handling images via static file paths (using Sanity Asset URLs).

## 5. Conclusion

This document provides a comprehensive set of user stories based on all gathered requirements and client feedback, including the new List View and workflow clarifications.

---