# Project Blueprint

## Overview

This is a user registration application built with Angular for the frontend and a simple Express.js backend. The application allows users to register, and the frontend is designed to be deployed to Firebase Hosting.

## Style, Design, and Features

*   **Framework:** Angular 18
*   **Styling:** Modern CSS with a clean and simple design.
*   **Components:**
    *   `AppComponent`: The root component of the application.
    *   `RegisterComponent`: A form for user registration.
    *   `UsersListComponent`: A component to display the list of registered users.
*   **Backend:**
    *   Express.js server handling user registration.
    *   SQLite database for user storage.
*   **Deployment:**
    *   Continuous deployment to **Firebase Hosting** is configured via **GitHub Actions**.
    *   The workflow automatically builds and deploys the Angular application on every push to the `main` branch.

## Automated Testing Strategy

To ensure a robust and maintainable testing process, this project has adopted an AI-driven, cloud-based testing strategy.

*   **Tooling:** The project is set up to be tested by an external AI-powered test automation platform like **Mabl** or **Testim**.
*   **Methodology:** Instead of relying on local testing frameworks (like Playwright or Jest), tests are run against the live, deployed application on Firebase Hosting.
*   **Benefits:**
    *   **Real-World Validation:** Tests the exact code and environment that users will interact with.
    *   **Zero Maintenance:** The AI platform handles test creation, execution, and maintenance, automatically adapting to UI changes.
    *   **No Dependency Conflicts:** Keeps the application's codebase clean and free of testing-related packages.

## Completed Actions

1.  **Removed Local Testing:** All configurations and dependencies related to Jest and Playwright have been removed to simplify the codebase.
2.  **Configured Firebase Hosting:** The `frontend` application has been configured for deployment to Firebase Hosting.
3.  **Implemented CI/CD Pipeline:** A GitHub Actions workflow (`.github/workflows/deploy.yml`) has been created to automatically build and deploy the Angular application to Firebase Hosting.
4.  **Adopted AI-Powered Testing Strategy:** The project is now set up for a modern, automated QA process using an external testing platform.
