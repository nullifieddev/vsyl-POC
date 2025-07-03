---
Author: Jason Nullified
Organisation: Design Code Mastery
Document Title: Content Management System: User Requirements (Consolidated)
Document Version: 1.0
Date: 2023-10-27
---

# Content Management System: User Requirements (Consolidated)

## 1. General Application Requirements

1.  The application must be a very simple to use, modern, mobile-first web application.
    *   *Note:* This will be built using technologies like React/TypeScript, Tailwind CSS, FullCalendar, and Sanity.io.
2.  Users must be prompted to login upon accessing the application if not authenticated.
    *   Supported Login Methods: Email & Password (or Username & Password), Google account.

## 2. Homepage Views & Navigation

3.  The application homepage must allow the user to choose between two primary views: Calendar View (default) and List View.
    *   A control (e.g., buttons, tabs) must be available on the homepage to switch between these views.
    *   The Calendar View must be the default view shown upon successful login.

### 2.1. Calendar View

3.1. When Calendar View is selected, the homepage must display a calendar using the FullCalendar library.
3.2. The calendar must show the current month by default upon navigation to the Calendar View.
3.3. The calendar must include standard FullCalendar navigation controls limited to month-level navigation: "Today" button, "Previous Month" button, and "Next Month" button.
3.4. Controls for Day, Week, or other non-Month views must *not* be present.
3.5. Within the displayed month on the calendar, the user must be able to see various Posts that have been created and have a `postPublishDate` within that month, regardless of their status (Draft or Published).
    3.5.1. Posts on the calendar must be color-coded for easy identification based on their Content-Type (Blog Post, Instagram Post, Facebook Post).
    3.5.2. A legend showing the color-coding for each Content-Type must be displayed on the screen alongside the calendar.
    3.5.3. Each Post on the calendar must show the `postTitle` (potentially truncated).
    3.5.4. Hovering over (desktop) or tapping (mobile) a Post on the calendar must display a tooltip showing the full `postTitle` and the `postStatus` (Draft or Published).

### 2.2. List View

3.6. When List View is selected, the homepage must display a chronological list of all Posts.
3.7. The list must be sorted by `postPublishDate` in descending order (latest date first).
3.8. Each item in the list must display key information about the post, including at a minimum: the `postTitle`, `postPublishDate` (formatted), Content Type, and `postStatus`.
3.9. The List View must include controls to filter the list of posts by `postStatus` (allowing selection to show only Draft posts, only Published posts, or potentially both/all posts).

### 2.3. Post Detail Modal (Applies to both views)

3.10. Clicking a Post from either the Calendar View or the List View must launch a modal overlay showing more detail about that specific Post.
    3.10.1. The modal must display detailed information specific to the Post's Content-Type (Blog Post, Instagram Post, or Facebook Post). This includes at a minimum: `postTitle` (full), `postStatus` (Draft/Published), `postPublishDate`, `postBody`, `postImage` (displaying the image), `postSubTitle` (if applicable), `postCategory` (if applicable for Blog Post).
    3.10.2. The modal must include action buttons: Edit, Delete, and Cancel.
        3.10.2.1. Clicking "Edit" must close the Post Detail modal and load the selected Content-Type into the appropriate content creation/edit form modal, pre-filled with the current post's data.
        3.10.2.2. Clicking "Delete" must allow the user to delete the current Post from the system (Sanity.io) after confirming the action via a separate confirmation prompt/modal.
        3.10.2.3. Clicking "Cancel" (or closing the modal) must close the Post Detail modal and return the user to the homepage view they were previously on (Calendar or List).

## 3. Content Creation Workflow

4.  The homepage must have a button (visible in both Calendar and List views) that allows the user to initiate the creation of a new Post.
    4.1. Clicking this button must present a way to select the Content-Type from a list: Blog Post, Instagram Post, Facebook Post. (Future: AI Ideation* option).
    4.2. Once a Content-Type is selected, the application must present a modal form for entering post details.
        4.2.1. The structure and fields of the modal form must be dependent on the selected Content-Type (see Section 4. Content-Type Schema).
        4.2.2. The modal form must include actions to "Save as Draft", "Publish", and "Cancel".
            4.2.2.1. "Save as Draft": This action saves the post data to Sanity.io with the `postStatus` set to "Draft".
                *   Saving as Draft *requires* a valid `postPublishDate` to be selected in the form.
                *   Other fields are not mandatory for saving a Draft (except for `postPublishDate`).
            4.2.2.2. "Publish": This action saves the post data to Sanity.io with the `postStatus` set to "Published".
                *   Publishing *requires* all fields designated as mandatory for the "Publish" action (see Section 4) to be filled/selected. The "Publish" action/button must be inactive/disabled until these mandatory fields are complete.
            4.2.2.3. "Cancel": This action must clear and close the form modal, discarding any unsaved changes (a confirmation prompt is recommended if changes exist), and return the user to the main homepage view.

## 4. Content-Type Schema & Validation

This section specifies the required data fields for each Content-Type and clarifies their mandatory status based on the save action. `postID` is a system-managed unique ID and not a user-editable field.

### 4.1. Blog Post

*   `postStatus`: (Application set: Draft or Published, based on Save as Draft / Publish action)
*   `postTitle`: Single line text. **[REQUIRED: for Publish action]**
*   `postSubTitle`: Single line text. **[REQUIRED: for Publish action]**
*   `postCategory`: Dropdown selection with predefined values ("salvaje y libre", "reflexiónes sobre la vida", etc.). **[REQUIRED: for Publish action]**. An option "Add New Category" must be available, allowing the user to input a new category name which is saved for future use.
*   `postImage`: Image file selection. **[REQUIRED: for Publish action]**. The application must handle image upload (via device gallery/files) and display the image associated with the post (using a URL provided by Sanity.io).
*   `postBody`: Multi line rich text. **[REQUIRED: for Publish action]**
*   `postPublishDate`: Calendar selection tool for date and time. **[REQUIRED: for Save as Draft & Publish action]**

### 4.2. Instagram Post

*   `postStatus`: (Application set: Draft or Published, based on Save as Draft / Publish action)
*   `postTitle`: Single line text. **[REQUIRED: for Publish action]**
*   `postSubTitle`: Single line text. **[REQUIRED: for Publish action]**
*   `postImage`: Image file selection. **[REQUIRED: for Publish action]**. The application must handle image upload (via device gallery/files) and display the image associated with the post (using a URL provided by Sanity.io).
*   `postBody`: Multi line rich text. **[REQUIRED: for Publish action]**. Must include validation to ensure `postBody` does not exceed a specified maximum character length.
*   `postPublishDate`: Calendar selection tool for date and time. **[REQUIRED: for Save as Draft & Publish action]**

### 4.3. Facebook Post

*   `postStatus`: (Application set: Draft or Published, based on Save as Draft / Publish action)
*   `postTitle`: Single line text. **[REQUIRED: for Publish action]**
*   `postSubTitle`: Single line text. **[REQUIRED: for Publish action]**
*   `postImage`: Image file selection. **[REQUIRED: for Publish action]**. The application must handle image upload (via device gallery/files) and display the image associated with the post (using a URL provided by Sanity.io).
*   `postBody`: Multi line rich text. **[REQUIRED: for Publish action]**. Must include validation to ensure `postBody` does not exceed a specified maximum character length.
*   `postPublishDate`: Calendar selection tool for date and time. **[REQUIRED: for Save as Draft & Publish action]**

## 5. Future Requirements (to be taken into consideration)

6.1. \*AI integration for ideation - this would be an additional option for the dropdown selection in 4.1. (Note: This is acknowledged but not part of the current scope).

---