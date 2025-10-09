# Stock Report Application

A modern web application built with Laravel and React for managing coffee shop/barista operations, including stock reporting, shift scheduling, and multi-outlet management.

## 🚀 Features

### Core Features
- **Stock Reporting System** - Baristas can report inventory status for various items
- **Multi-Outlet Support** - Manage multiple locations (Warehouse, Outlet A, Outlet B)
- **Role-Based Access Control** - Different permissions for Manager and Staff roles
- **Real-time Clock Display** - Live timestamp for accurate reporting
- **Interactive Dashboard** - Manager overview and staff management
- **Shift Scheduling** - Built-in shift management system

### Stock Management
- **Inventory Tracking** - Monitor stock levels for coffee shop essentials
- **Status Reporting** - Mark items as "Ready" or "Habis" (Out of Stock)
- **Action Alerts** - Flag items as "Hampir Habis" (Almost Out)
- **Report Generation** - Generate detailed stock reports with timestamps

### User Management
- **Authentication** - Secure login system with Laravel Sanctum
- **User Roles** - Manager and Staff role differentiation
- **Profile Management** - User profile editing capabilities

## 🛠 Technology Stack

### Backend
- **Laravel 12** - PHP web framework
- **Inertia.js** - Modern monolithic SPA approach
- **Laravel Sanctum** - API authentication
- **MySQL** - Database management

### Frontend
- **React 18** - User interface library
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool and dev server
- **Headless UI** - Accessible UI components
- **Lucide React** - Beautiful icon library

### Development Tools
- **Composer** - PHP dependency management
- **NPM/PNPM** - Node.js package management
- **Laravel Sail** - Docker development environment
- **Laravel Pint** - PHP code style fixer

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **PHP 8.2 or higher**
- **Composer** - PHP dependency manager
- **Node.js 18+** and **npm** or **pnpm**
- **MySQL** - Database server
- **Git** - Version control system

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd stock-report
```

### 2. Install PHP Dependencies
```bash
composer install
```

### 3. Install Node.js Dependencies
```bash
npm install
# or
pnpm install
```

### 4. Environment Configuration
```bash
cp .env.example .env
```

Update your `.env` file with the appropriate database credentials:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database_name
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

### 5. Generate Application Key
```bash
php artisan key:generate
```

### 6. Database Setup
```bash
# Run migrations
php artisan migrate

# Seed the database (optional)
php artisan db:seed
```

### 7. Import Existing Database (if available)
If you have an existing SQL file with your data:
```bash
mysql -u your_username -p your_database_name < database/your_sql_file.sql
```

### 8. Build Assets
```bash
npm run build
# or for development
npm run dev
```

## 🎯 Usage

### Starting the Application

#### Using Laravel Sail (Recommended)
```bash
./vendor/bin/sail up -d
./vendor/bin/sail npm run dev
```

#### Using PHP's Built-in Server
```bash
# Terminal 1 - Start Laravel server
php artisan serve

# Terminal 2 - Start Vite dev server
npm run dev

# Terminal 3 - Queue worker (optional)
php artisan queue:work

# Terminal 4 - Laravel Pail (optional)
php artisan pail
```

### Accessing the Application

1. **Homepage**: http://127.0.0.1:8000
2. **Dashboard** (Manager only): http://127.0.0.1:8000/dashboard

### Default Users

Based on your database setup, you can use these credentials:

- **Manager**: manager@gmail.com
- **Staff**: staff@gmail.com

## 📊 Database Schema

### Main Tables
- **users** - User accounts with roles (Manager/Staff)
- **jadwal_shift** - Shift scheduling data
- **jam_shift** - Shift time configurations
- **kesediaan** - Staff availability data
- **periode_gaji** - Payroll period management
- **tipe_pekerjaan** - Job type classifications

### Laravel System Tables
- **sessions** - User session management
- **cache** - Application caching
- **jobs** - Background job processing
- **migrations** - Database version control

## 👥 User Roles & Permissions

### Manager Role
- Access to dashboard
- View all reports
- Manage staff schedules
- Generate comprehensive reports

### Staff Role
- Create stock reports
- Update inventory status
- View personal reports
- Limited to assigned outlet

## 🔧 Configuration

### Environment Variables
```env
# Application
APP_NAME="Stock Report"
APP_URL=http://localhost:8000

# Database
DB_CONNECTION=mysql
DB_DATABASE=your_database

# Session & Cache
SESSION_DRIVER=database
CACHE_STORE=database
QUEUE_CONNECTION=database
```

### Available Commands

```bash
# Development
php artisan serve          # Start development server
npm run dev               # Start Vite dev server
npm run build             # Build for production

# Database
php artisan migrate       # Run migrations
php artisan migrate:fresh # Fresh migration with seed
php artisan db:seed       # Seed database

# Testing
php artisan test          # Run tests
php artisan pint          # Fix code style

# Queue & Jobs
php artisan queue:work    # Process queued jobs
php artisan pail         # Monitor application logs
```

## 🎨 Customization

### Adding New Stock Items
Edit `resources/js/Pages/StockReport.jsx` and add items to the `stockItems` array:

```javascript
const [stockItems, setStockItems] = useState([
    { id: 1, name: 'Espresso Beans', status: 'Ready', action: null },
    { id: 2, name: 'Your New Item', status: 'Ready', action: null },
    // ... other items
]);
```

### Styling
The application uses Tailwind CSS. Customize styles in:
- `resources/css/app.css` - Main stylesheet
- `tailwind.config.js` - Tailwind configuration

### Adding New Outlets
Update the outlet options in:
- `resources/js/Pages/Welcome.jsx` (outlets array)
- `resources/js/Pages/StockReport.jsx` (outlet select options)

## 🔒 Security Features

- **CSRF Protection** - Laravel's built-in CSRF protection
- **Input Sanitization** - All user inputs are sanitized
- **Role-Based Access** - Secure route protection
- **Session Management** - Secure session handling
- **Password Hashing** - Bcrypt password hashing

## 🚨 Troubleshooting

### Common Issues

1. **Database Connection Errors**
   - Verify your `.env` database credentials
   - Ensure MySQL server is running
   - Check database user permissions

2. **Asset Compilation Issues**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   npm run dev
   ```

3. **Permission Issues**
   ```bash
   chmod -R 755 storage bootstrap/cache
   php artisan config:clear
   php artisan cache:clear
   ```

## 📝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style
- Follow PSR-12 PHP coding standards
- Use Laravel Pint for code formatting: `php artisan pint`
- ESLint for JavaScript/React code

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check existing documentation
- Review Laravel and React documentation

## 🔄 Updates

### Version History
- **v1.0.0** - Initial release with stock reporting functionality
- **v1.1.0** - Added shift scheduling system
- **v1.2.0** - Enhanced UI/UX with real-time features

### Migration from Previous Versions
```bash
php artisan migrate
npm install
npm run build
```

---

**Made with ❤️ using Laravel & React by [K9Fox](https://yafff.tech/)**