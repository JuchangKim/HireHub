1. Node.js Server

•app.js: The entry point of your Node.js application. It sets up the server, connects to MongoDB, and initializes middleware and routes.

2. Config

•db.js: Contains the MongoDB connection setup.

•auth.js: Manages authentication configurations, including JWT secret keys.

3. Models

•User.js: Defines the user schema, including fields like username, password, email, profile, etc.

•JobListing.js: Defines the job listing schema, including fields like title, description, company, location, salary, etc.

•Application.js: Manages job applications, linking users to job listings and tracking application status.

•Company.js: Defines company-related data, including name, location, description, reviews, etc.

4. Routes

•authRoutes.js: Handles authentication routes like registration, login, and logout.

•userRoutes.js: Manages user-related routes, such as profile updates and retrieving user data.

•jobRoutes.js: Routes for creating, updating, and retrieving job listings.

•applicationRoutes.js: Handles job application processes.

5. Controllers

•authController.js: Contains the logic for handling authentication-related tasks.

•userController.js: Manages user operations like profile updates and retrieving user data.

•jobController.js: Controls the creation, updating, and retrieval of job listings.

•applicationController.js: Handles job applications, tracking status, and managing related data.

6. Middleware

•authMiddleware.js: Middleware for protecting routes that require authentication.

•errorHandler.js: Global error handling middleware.

7. Utils

•scraper.js: Contains utility functions for scraping job data from external websites, potentially using the Python script.

8. Client

•public/: Static files for the front end.

•src/: Source files for the front-end React application.

•components/: Reusable React components.

•pages/: Different pages of the application (e.g., home, job listings, profile, etc.).

•App.js: Main application component.

•index.js: Entry point for the React application.

9. Scripts

•webscraper.py: Python script for scraping job data from external websites. This script can be triggered by the Node.js server or run independently.



```
HireHub-jialin
├─ client
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ public
│  │  ├─ index.html
│  │  ├─ manifest.json
│  │  └─ robots.txt
│  ├─ README.md
│  └─ src
│     ├─ App.css
│     ├─ App.js
│     ├─ App.test.js
│     ├─ components
│     │  ├─ CompanyInfo.js
│     │  ├─ Navbar.js
│     │  └─ PostJobForm.js
│     ├─ index.css
│     ├─ index.js
│     ├─ pages
│     │  ├─ ApplicationsPage.js
│     │  ├─ CompanyInfo.css
│     │  ├─ CompanyInfoPage.js
│     │  ├─ CompanyListPage.css
│     │  ├─ CompanyListPage.js
│     │  ├─ CompanyReviewPage.js
│     │  ├─ HomePage.js
│     │  ├─ JobDetailsPage.js
│     │  ├─ LoginPage.js
│     │  ├─ PostJobPage.js
│     │  └─ RegisterPage.js
│     ├─ reportWebVitals.js
│     ├─ setupTests.js
│     └─ styles.css
├─ package-lock.json
├─ package.json
├─ README.md
├─ scripts
│  └─ webscraper.py
└─ server
   ├─ app.js
   ├─ config
   │  ├─ auth.js
   │  └─ db.js
   ├─ controllers
   │  ├─ applicationController.js
   │  ├─ authController.js
   │  ├─ companyController.js
   │  ├─ jobController.js
   │  └─ userController.js
   ├─ middleware
   │  ├─ authMiddleware.js
   │  └─ errorHandler.js
   ├─ models
   │  ├─ Application.js
   │  ├─ Company.js
   │  ├─ JobListing.js
   │  └─ User.js
   ├─ routes
   │  ├─ applicationRoutes.js
   │  ├─ authRoutes.js
   │  ├─ companyRoutes.js
   │  ├─ jobRoutes.js
   │  └─ userRoutes.js
   └─ utils
      └─ scraper.js

```