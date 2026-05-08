# Nyooms Frozen Food - E-commerce Application
A full-stack e-commerce application for selling kebabs and frozen food, built with React.js, Node.js, Express.js, and MySQL.
## Features
### Customer Features
- User registration and authentication
- Browse products with search and filtering
- Product detail pages
- Shopping cart functionality
- Wishlist management
- Order placement and tracking
- User profile management
### Admin Features
- Admin dashboard with statistics
- Category management (CRUD)
- Product management (CRUD)
- Order management and status updates
- Sales reporting
## Tech Stack
### Frontend
- React.js with TypeScript
- React Router for navigation
- Tailwind CSS for styling
- Lucide React for icons
- Context API for state management
### Backend
- Node.js with Express.js
- MySQL database
- JWT authentication
- bcryptjs for password hashing
- CORS enabled
## Prerequisites
Before running this application, make sure you have:
- Node.js (v16 or higher)
- MySQL (v8.0 or higher)
- npm or yarn package manager
## Installation
1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd nyooms-frozen-food
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Database Setup**
   Create a MySQL database:
   ```sql
   CREATE DATABASE nyooms_frozen_food;
   ```
4. **Environment Configuration**
   Create a `.env` file in the root directory:
   ```env
   # Database Configuration
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=nyooms_frozen_food
   DB_PORT=3306
   # JWT Secret
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   # Server Configuration
   PORT=3001
   ```
5. **Start the application**
   ```bash
   npm run dev
   ```
   This will start both the frontend (port 5173) and backend (port 3001) servers.
## Database Schema
The application will automatically create the following tables:
- **users** - User accounts (customers and admins)
- **categories** - Product categories
- **products** - Product catalog
- **orders** - Customer orders
- **order_items** - Individual items in orders
## Default Admin Account
The application creates a default admin account:
- **Email:** admin@nyooms.com
- **Password:** admin123
## API Endpoints
### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
### User Management
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile
### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category (admin only)
- `PUT /api/categories/:id` - Update category (admin only)
- `DELETE /api/categories/:id` - Delete category (admin only)
### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)
### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - Get orders (user's orders or all for admin)
- `PUT /api/orders/:id/status` - Update order status (admin only)
### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics (admin only)
## Project Structure
```
nyooms-frozen-food/
├── src/                    # Frontend React application
│   ├── components/         # Reusable components
│   ├── context/           # React context providers
│   ├── pages/             # Page components
│   └── pages/admin/       # Admin-specific pages
├── server/                # Backend Node.js application
│   ├── config/            # Database configuration
│   ├── models/            # Database models
│   └── index.js           # Main server file
├── .env                   # Environment variables
└── package.json           # Dependencies and scripts
```
## Development
### Frontend Development
The frontend is built with Vite and includes:
- Hot module replacement
- TypeScript support
- Tailwind CSS for styling
- Responsive design
### Backend Development
The backend uses:
- Express.js for API routes
- MySQL2 for database operations
- JWT for authentication
- Bcrypt for password hashing
## Production Deployment
1. **Build the frontend**
   ```bash
   npm run build
   ```
2. **Set up production database**
   - Create a production MySQL database
   - Update environment variables
3. **Deploy to your hosting platform**
   - Upload the built files
   - Configure environment variables
   - Start the server
## Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request
## License
This project is licensed under the MIT License.