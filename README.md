
```plaintext
# Multi-Tenant School Profile Application

## Features
1. Subdomain-based Tenant Routing: Each school has its own subdomain.
2. Authentication: Secure login and session management.
3. Data Isolation: Tenant-based data separation in MongoDB.
4. Admin Dashboard: Manage school profiles.
5. Admin Login and Registration: Allows admins to log in and manage schools.
6. Admin Access Control: Only authenticated admins can update school profiles Data.
7. Protected API Endpoints: Uses JWT authentication to secure school profile updates.
8. Responsive UI: Built with modern UI principles.

## Setup and Running Instructions
1. Install Node.js (v18+ recommended), MongoDB (local or Atlas), and Git.
2. Clone the repository:
   ```
   git clone https://github.com/pranav09022001/RaromeAssesment.git

   cd your-repo-name
   ```
3. Initialize Git if not already initialized:
   ```
   git init
   ```
4. Install dependencies:
   ```
   npm install
   ```
5. Create a `.env` file in the root directory and add the following environment variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   
   JWT_SECRET=your_jwt_secret_key
  
   ```
6. Ensure MongoDB is running locally or use MongoDB Atlas.
7. Start the development server:
   ```
   npm run dev
   ```
8. Open the application in your browser:
   ```
   http://localhost:3000
   ```

## Assumptions:

1. Each school (tenant) has its own subdomain.
2. Authentication is required to access school profiles.
3. Admins must register and log in to manage school data.

```

If you have any queries, feel free to contact via email: pranav.pokharkar.9@gmail.com
