PARVATIBAI GENBA MOZE COLLEGE OF ENGINEERING 
Wagholi, Pune 
Department of Master of Computer Application 
Academic Year 2025-26 
Synopsis for Internship Project Report 

Title of the Project: Development of MockFlow - A Mock API Service for Frontend Developers at Scalar Techhub

Name of the Participant/s: 1. Mr. Ankit Kumar (MCA103)
______________________________________________________________________________

1. Study of Existing System

The MockFlow project is a full-stack web application developed during the internship at Scalar Techhub, Pune. The application serves frontend developers by providing mock API services, eliminating the dependency on backend availability during development and testing phases.

The existing development workflow at Scalar Techhub involved frontend developers waiting for backend APIs to be completed before they could integrate and test their features. This created bottlenecks in the development process, especially when working on enterprise applications like ThermoFisher.

The system is built with a modern technology stack consisting of Angular 18 for the frontend interface and FastAPI (Python) for the backend services. The application follows RESTful API architecture with MongoDB for data persistence. The development methodology follows Agile principles with iterative development cycles.

The frontend application provides a user-friendly interface for creating, managing, and testing mock API endpoints. The backend handles dynamic endpoint generation, request routing, and response simulation with support for custom delays, status codes, and headers.

______________________________________________________________________________

2. Limitations of Existing System

During the initial phase of the internship, several limitations were identified in the typical development workflow that MockFlow aims to address:

• Frontend developers had to wait for backend teams to complete API endpoints before integration testing
• Manual creation of mock servers was time-consuming and required repetitive setup for each project
• Lack of centralized mock API management led to inconsistent mock data across the team
• No visual interface for configuring and testing mock endpoints
• Difficulty in simulating various HTTP status codes and error scenarios
• Limited ability to customize response delays for testing loading states
• No tracking of API usage or hit counts for mock endpoints
• Absence of faker data generation for realistic test scenarios
• Multiple team members creating duplicate mock setups independently
• No logging mechanism to track mock API requests during testing

These limitations highlighted the need for a dedicated mock API management platform that could streamline frontend development workflows.

______________________________________________________________________________

3. Work Done During Internship

During the internship period at Scalar Techhub, comprehensive work was carried out on the MockFlow project, spanning requirement analysis, system design, full-stack development, testing, and documentation. The work was structured across multiple phases aligned with development sprints.

Week 1: Introduction and Project Orientation
During the first week, Knowledge Transfer (KT) sessions were conducted to understand the project requirements and objectives. The purpose and scope of MockFlow were introduced, including its role in accelerating frontend development workflows. The technology stack was reviewed, including Angular 18 for frontend development and FastAPI for backend services. Development environment setup was completed, including installation of Python, Node.js, MongoDB, and required IDEs (VS Code). Version control workflows using Git were established, and communication processes within the team were discussed.

Week 2: Requirement Analysis and System Design
The second week focused on understanding detailed requirements and designing the system architecture. User stories were created and documented for different features. Database schema design was finalized for projects, endpoints, and request logs. API endpoint specifications were defined following RESTful conventions. UI/UX wireframes were sketched for key screens including project list, project detail, and endpoint editor. Component hierarchy was planned for the Angular application, and service layer architecture was designed for both frontend and backend.

Week 3: Backend Development - Core Setup
Backend development began with setting up the FastAPI application structure. MongoDB connection was configured using Motor (async driver). Environment variables were managed using python-dotenv for secure configuration. Pydantic models were created for request/response validation. CORS middleware was configured to allow frontend communication. Health check endpoints were implemented for service monitoring. Base project structure was established following MVC architecture patterns. CRUD operations skeleton was created for project management.

Week 4: Backend Development - Project Management Module
The fourth week focused on implementing the project management functionality. Create project endpoint was developed with slug validation for uniqueness. List projects endpoint was implemented to retrieve all projects from the database. Get single project endpoint was created using slug-based lookup. Update project endpoint was developed with partial update support. Delete project endpoint was implemented with proper error handling. Input validation and error responses were standardized across all endpoints.

Week 5: Backend Development - Mock Engine
The mock engine development was undertaken in the fifth week. Dynamic route handling was implemented to capture any path under mock endpoints. Method-based routing was developed to support GET, POST, PUT, PATCH, and DELETE operations. Response simulation logic was created to return configured JSON bodies. Status code customization was enabled for different scenarios. Header configuration support was added for custom response headers. Request delay implementation was completed for testing loading states. Hit counter logic was developed to track endpoint usage.

Week 6: Backend Development - Faker Service Integration
The sixth week focused on integrating faker data generation capabilities. The faker_template field was added to endpoint schema. Template parsing logic was developed to identify faker placeholders. Data generation functions were implemented for names, emails, addresses, and dates. Random data generation was configured to produce varied outputs per request. Use_faker flag was implemented to toggle between static and dynamic responses. Edge cases were handled for invalid templates.

Week 7: Frontend Development - Angular Setup and Core Modules
Frontend development began with Angular CLI project initialization. Project structure was organized following Angular best practices. Routing module was configured for navigation between views. Material Design library was integrated for UI components. Reactive forms module was imported for form handling. HTTP client module was configured for API communication. Shared modules and utilities were created. Global styles and themes were defined.

Week 8: Frontend Development - Project Components
The eighth week involved creating project-related components. Project list component was developed to display all projects in card/grid view. Project create component was built with form validation. Project detail component was implemented to show project information. Confirm dialog component was created for delete confirmations. Header component was developed for consistent navigation. Error handling and toast notifications were implemented.

Week 9: Frontend Development - Editor and Playground
Advanced features were developed in the ninth week. Endpoint editor component was created for adding/editing mock endpoints. JSON editor integration was completed for response body editing. Validation logic was implemented for required fields. Playground component was developed to test mock endpoints directly. Response viewer was created to display API responses with syntax highlighting. Copy-to-clipboard functionality was added for easy data extraction.

Week 10: Frontend Development - Analytics and Dashboard
The tenth week focused on analytics and visualization. Dashboard component was built to show project statistics. Analytics page was developed with charts and metrics. Hit count visualization was implemented using progress bars. Recent activity feed was created showing latest requests. Summary cards were designed for quick overview. Responsive layouts were ensured for different screen sizes.

Week 11: Testing and Debugging
Comprehensive testing was performed in the eleventh week. Unit tests were written for critical backend functions. Frontend component testing was done using Jasmine/Karma. API endpoint testing was performed using Postman. Cross-browser compatibility testing was conducted. Mobile responsiveness was verified on various devices. Performance optimization was done for slow queries. Bug fixes were implemented based on testing feedback.

Week 12: Documentation and Deployment Preparation
The final week focused on documentation and handover. API documentation was generated using FastAPI's auto-generated docs. README files were created for setup instructions. Code comments were added throughout the codebase. User guide was written for end users. Deployment checklist was prepared. Knowledge transfer sessions were conducted with team members. Final presentation was prepared and delivered.

______________________________________________________________________________

4. Hardware & Software Requirements

Hardware Requirements
• Minimum 8GB RAM (16GB recommended for smooth development)
• Intel i5 Processor or higher (i7 recommended)
• 256GB SSD storage (512GB recommended)
• Internet connectivity for package downloads and updates
• Monitor with 1920x1080 resolution for optimal development experience

Software Requirements
Backend Technologies:
• Python 3.9 or higher
• FastAPI framework
• Uvicorn ASGI server
• MongoDB (local or cloud instance)
• Motor (async MongoDB driver)
• Pydantic for data validation
• Faker library for data generation
• python-dotenv for environment management

Frontend Technologies:
• Angular 18
• TypeScript
• Node.js (v18 or higher)
• npm package manager
• Angular Material
• RxJS for reactive programming

Development Tools:
• Visual Studio Code / IntelliJ IDEA
• Git for version control
• Postman for API testing
• MongoDB Compass for database visualization
• Chrome/Firefox/Edge browsers for testing

Operating Systems:
• Windows 10/11
• Linux (Ubuntu preferred)
• macOS

______________________________________________________________________________

5. Detailed Study

System Architecture
MockFlow follows a three-tier architecture consisting of presentation layer (Angular frontend), application layer (FastAPI backend), and data layer (MongoDB). The frontend communicates with the backend through RESTful API calls over HTTP. The backend processes requests, performs database operations, and returns appropriate responses. The mock engine acts as a middleware that intercepts mock requests and returns simulated responses.

Backend Architecture
The backend is built using FastAPI, a modern high-performance web framework. It follows a modular structure with separate directories for API routes, core configurations, data models, and business logic services. The API routes handle incoming requests and delegate to service layer functions. The core module manages database connections and application settings. Models define data structures using Pydantic schemas. Services contain business logic for project management, mock data generation, and faker integration.

Frontend Architecture
The Angular application follows component-based architecture with clear separation of concerns. Core modules handle singleton services like HTTP clients and authentication. Shared modules contain reusable components like dialogs and headers. Feature modules organize functionality by domain (projects, analytics, editor). Services manage state and API communication. Components handle UI rendering and user interactions. Routing enables navigation between different views.

Database Design
MongoDB was chosen for its flexibility and schema-less nature. The database contains three main collections: mock_projects stores project configurations and endpoint definitions, request_logs maintains history of mock API calls for analytics, and system_settings stores application-wide configurations. Each project document contains embedded endpoint arrays for efficient querying. Indexes are created on frequently queried fields like slug and timestamps.

API Design Principles
RESTful design patterns were followed throughout the API development. Resources are identified by URLs, and HTTP methods define operations. Statelessness ensures each request contains all necessary information. Consistent response formats simplify frontend consumption. Proper use of HTTP status codes indicates success or failure scenarios. Pagination and filtering support efficient data retrieval.

Security Considerations
CORS policies restrict access to authorized origins only. Input validation prevents injection attacks and malformed data. Environment variables protect sensitive configuration data. Error messages are generic to avoid information leakage. Rate limiting can be implemented to prevent abuse. MongoDB connection strings are stored securely in .env files.

Performance Optimization
Asynchronous programming in both frontend and backend ensures non-blocking operations. Database indexes improve query performance. Caching strategies reduce redundant database calls. Lazy loading in Angular minimizes initial bundle size. Code splitting optimizes frontend load times. Connection pooling in MongoDB maximizes resource utilization.

______________________________________________________________________________

6. Module Description

Project Management Module
This module handles all CRUD operations for mock projects. Features include creating new projects with unique slugs, listing all projects with metadata, viewing individual project details, updating project configurations, and deleting projects with confirmation dialogs. The module ensures data integrity through validation and provides user-friendly error messages. Jira was used for task tracking with user stories created for each feature.

Mock Engine Module
The mock engine is the core functionality of MockFlow. It dynamically handles requests to any path under the /mock/{slug}/* pattern. The module matches incoming requests against configured endpoints based on path and HTTP method. It returns pre-configured response bodies with customizable status codes and headers. Support for artificial delays helps test loading states. Hit counters track usage statistics for each endpoint. Request logging enables analytics and debugging.

Faker Service Module
The faker service generates realistic fake data dynamically. It supports template-based data generation where users define placeholders like {{name}}, {{email}}, {{address}}. The service parses templates and replaces placeholders with generated values on each request. This enables varied responses instead of static data. Supported data types include person names, email addresses, phone numbers, dates, addresses, and company names. The use_faker flag allows toggling between static and dynamic modes.

Analytics Module
The analytics module provides insights into mock API usage. Dashboard displays summary statistics including total projects, total endpoints, and overall hit counts. Project-level analytics show individual endpoint performance. Hit count visualization uses progress bars to indicate most-used endpoints. Recent activity feeds show latest mock requests with timestamps. This data helps developers understand which APIs are being tested most frequently.

Editor Module
The endpoint editor provides a rich interface for configuring mock endpoints. Features include adding new endpoints with path and method selection, editing existing endpoint configurations, setting response body as JSON, configuring status codes and custom headers, enabling/disabling faker integration, setting artificial delays, and validating input before saving. The editor uses syntax highlighting for JSON and provides real-time validation feedback.

Playground Module
The playground allows developers to test mock endpoints directly from the browser. Users can select HTTP methods, enter request URLs, add headers and body content, send requests, and view responses. This eliminates the need for external tools like Postman for quick testing. Response viewer includes syntax highlighting and copy-to-clipboard functionality.

Shared Components Module
Reusable components ensure consistency across the application. The header component provides global navigation and branding. Confirm dialog component standardizes deletion confirmations. Loading spinners indicate async operations. Toast notifications provide user feedback. Error handlers catch and display errors gracefully. These shared components follow Material Design guidelines.

Deployment Module
The deployment process involves multiple stages. Development builds are served locally using hot-reload for rapid iteration. Production builds use optimized Angular compilation and minification. Backend uses Uvicorn with production settings. MongoDB can be deployed locally or on cloud services like MongoDB Atlas. Environment variables configure deployment-specific settings. Docker containerization is supported for consistent deployments.

______________________________________________________________________________

Conclusion

The MockFlow project successfully addresses the challenges faced by frontend developers when working without backend availability. Throughout the internship, comprehensive experience was gained in full-stack development, from requirement gathering to deployment preparation.

Key technical achievements include implementing a dynamic mock engine capable of handling arbitrary paths and methods, integrating faker for realistic data generation, building a responsive Angular interface with Material Design, designing RESTful APIs with proper validation and error handling, and creating analytics features for usage insights.

The project demonstrated practical application of modern web technologies including FastAPI's asynchronous capabilities, Angular's component architecture, MongoDB's flexible document model, TypeScript's type safety, and RESTful API design principles.

Beyond technical skills, valuable professional experience was gained in Agile development methodologies, sprint planning and execution, code documentation practices, version control workflows, testing strategies (unit, integration, manual), and knowledge transfer processes.

The MockFlow platform is now positioned to accelerate frontend development workflows at Scalar Techhub, reducing dependency on backend availability and enabling faster prototyping and testing cycles. The modular architecture allows for future enhancements such as authentication, team collaboration features, advanced faker templates, automated testing integrations, and cloud deployment options.

This internship provided an excellent opportunity to apply academic knowledge to a real-world problem, resulting in a production-ready tool that delivers tangible value to the development team.
