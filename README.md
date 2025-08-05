<div align="center">
  <img src="public/logo.svg" alt="Pulse HMS Logo" width="120" height="120">
  <h1>Pulse HMS</h1>
  <p><strong>Hospital Management System</strong></p>
  <p>A modern, minimal hospital management system designed for small to mid-sized clinics, especially in infrastructure-limited regions like South Asia. Built with Next.js, optimized for low-tech environments and non-technical users.</p>
  
  <div style="display: flex; justify-content: center; gap: 20px; margin: 20px 0;">
    <img src="public/logo.svg" alt="Standard Logo" width="60" height="60" title="Standard Logo">
    <img src="public/logo-modern.svg" alt="Modern Logo" width="60" height="60" title="Modern Logo">
    <img src="public/logo-dark.svg" alt="Dark Mode Logo" width="60" height="60" title="Dark Mode Logo">
    <img src="public/logo-horizontal.svg" alt="Horizontal Logo" width="200" height="40" title="Horizontal Logo">
  </div>
  
  [![Next.js](https://img.shields.io/badge/Next.js-15.4.5-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
  [![Prisma](https://img.shields.io/badge/Prisma-6.13-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
  [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=for-the-badge)](http://makeapullrequest.com)
</div>

## 📋 Table of Contents

- [🎯 Features](#-features)
- [🚀 Tech Stack](#-tech-stack)
- [📦 Installation](#-installation)
- [🔧 Configuration](#-configuration)
- [📱 Usage](#-usage)
- [🎨 Logo Design](#-logo-design)
- [🎨 Printables Suite](#-printables-suite)
- [🔒 Security](#-security)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## 🎯 Features

### Core Features
- **Patient Registration & Profile Management**
  - Complete CRUD operations for patients
  - Search and filter functionality
  - Medical history tracking
  - Document attachments support

- **Appointment Scheduler**
  - Smart booking with conflict detection
  - Calendar view with status tracking
  - Doctor and patient assignment
  - Appointment status management

- **Billing & Payment Tracking**
  - Simple invoice generation
  - Payment status tracking (unpaid, paid, partial)
  - Revenue analytics
  - Payment history

- **Professional Printables Suite** 🆕
  - Medical receipts with QR codes
  - Doctor prescriptions with Urdu support
  - Patient visit summaries
  - Complete medical history for referrals
  - Laboratory test requests
  - Discharge summaries (mini & full versions)
  - Appointment slips for queue management
  - Income reports for administration
  - Print, PDF, email, and WhatsApp sharing
  - Optimized for thermal printers and A4 paper

- **Role-Based Access Control (RBAC)**
  - Admin, Doctor, and Nurse roles
  - Permission-based access control
  - Secure authentication with JWT

- **Audit Logs**
  - Complete activity tracking
  - User action history
  - Timestamp and role-based logging

### AI-Powered Features (Planned)
- Form/ID scanning with OCR
- No-touch scheduling suggestions
- AI-powered data validation
- One-click report generation
- Conversational FAQ bot

### Offline & Lite Mode (Planned)
- Offline data caching
- Lite mode for essential functions
- Mobile-first responsive design
- Low bandwidth optimization

## 🎨 Logo Design

Our **Pulse HMS** logo represents the heartbeat of modern healthcare technology. We offer multiple variants to suit different use cases:

### 🎯 Logo Variants

| Variant | Use Case | Description |
|---------|----------|-------------|
| **Standard Logo** | Main branding, headers | Full-featured design with enhanced gradients and glow effects |
| **Modern Logo** | Clean interfaces, minimal designs | Simplified version with cleaner lines and reduced complexity |
| **Dark Mode Logo** | Dark themes, low-light environments | Optimized for dark backgrounds with bright pulse waves |
| **Horizontal Logo** | Navigation bars, headers | Icon + text combination for horizontal layouts |
| **Favicon** | Browser tabs, bookmarks | Simplified version optimized for small sizes |

### 🎨 Design Philosophy

- **Healthcare Symbolism**: Pulse wave represents heartbeat and medical monitoring
- **Modern Technology**: Gradient backgrounds and glow effects convey innovation
- **Professional Colors**: Blue (#3B82F6) for trust, Green (#10B981) for health
- **Scalable Design**: Works perfectly from favicon (32px) to large displays (120px+)
- **Accessibility**: High contrast ratios and clear visual hierarchy

### 📱 Usage Guidelines

```html
<!-- Standard usage -->
<img src="/public/logo.svg" alt="Pulse HMS" width="120" height="120">

<!-- Dark mode detection -->
<img src="/public/logo-dark.svg" alt="Pulse HMS" class="dark:block hidden">
<img src="/public/logo.svg" alt="Pulse HMS" class="block dark:hidden">

<!-- Horizontal layout -->
<img src="/public/logo-horizontal.svg" alt="Pulse HMS" width="300" height="60">
```

## 🎨 Printables Suite

Our comprehensive **Professional Printables Suite** provides 8 different document types optimized for medical facilities:

### 📄 Document Types

| Document | Purpose | Key Features |
|----------|---------|--------------|
| **Medical Receipt** | Professional billing | QR codes, payment breakdown, clinic branding |
| **Medical Prescription** | Doctor prescriptions | Urdu support, dosage charts, digital signatures |
| **Visit Summary** | Patient records | Shareable format, payment summary, follow-up details |
| **Medical History** | Referrals & transfers | Complete patient history, lab reports, allergies |
| **Lab Request** | Laboratory tests | Urgency levels, fasting instructions, sample details |
| **Discharge Summary** | Hospital discharge | Mini & full versions, medications, follow-up advice |
| **Appointment Slip** | Queue management | Token system, wait times, special instructions |
| **Income Report** | Administration | Revenue analytics, payment methods, performance metrics |

### 🖨️ Print Features

- **Multi-format Export**: Print, PDF, Email, WhatsApp
- **Thermal Printer Optimized**: Perfect for receipt printers
- **A4 Paper Ready**: Professional document formatting
- **QR Code Integration**: Digital copy access
- **Urdu Language Support**: Localized patient communication
- **Customizable Branding**: Clinic logo, header, footer
- **Responsive Design**: Works on all devices and screen sizes

### 🚀 Quick Start

```tsx
import { PrintManager } from '@/components/printables'

// Generate a medical receipt
<PrintManager
  type="receipt"
  data={receiptData}
  onClose={() => setShowPrintManager(false)}
/>
```

📖 **[View Complete Printables Documentation](./src/components/printables/README.md)**

## 🚀 Tech Stack

- **Frontend & Backend**: Next.js 15 (App Router)
- **Database**: SQLite with Prisma ORM
- **Authentication**: JWT with bcrypt
- **Styling**: TailwindCSS
- **UI Components**: Lucide React Icons
- **Form Handling**: React Hook Form with Zod validation
- **Notifications**: React Hot Toast
- **Printing**: React-to-Print, html2pdf.js, jsPDF
- **QR Codes**: qrcode library

## 🔒 Security

### Data Protection
- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for password security
- **Input Validation**: Zod schema validation
- **SQL Injection Protection**: Prisma ORM with parameterized queries
- **XSS Protection**: React's built-in XSS protection
- **CSRF Protection**: Next.js built-in CSRF protection

### Best Practices
- Use strong JWT secrets
- Regularly update dependencies
- Implement rate limiting in production
- Use HTTPS in production
- Regular security audits
- Data backup and recovery

### Privacy Compliance
- Patient data encryption
- Audit logging for all actions
- Role-based access control
- Data retention policies
- GDPR compliance ready

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd pulse-hms
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your configuration:
   ```env
   DATABASE_URL="file:./dev.db"
   JWT_SECRET="your-secret-key-here"
   ```

4. **Initialize the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Seed the database with demo data**
   ```bash
   npm run db:seed
   ```

6. **Start the development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="file:./dev.db"

# Authentication
JWT_SECRET="your-super-secret-jwt-key-here"

# Optional: Email Configuration
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"

# Optional: File Upload
UPLOAD_DIR="./uploads"
MAX_FILE_SIZE="10485760" # 10MB
```

### Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Seed with demo data
npm run db:seed

# Open Prisma Studio (optional)
npx prisma studio
```

## 📱 Usage

### Default Login Credentials

After seeding the database, you can login with:

| Role | Email | Password |
|------|-------|----------|
| **Admin** | `admin@pulsehms.com` | `admin123` |
| **Doctor** | `doctor@pulsehms.com` | `doctor123` |
| **Nurse** | `nurse@pulsehms.com` | `nurse123` |

### Key Features Walkthrough

1. **Patient Management**
   - Register new patients
   - Search and filter patient records
   - View complete medical history
   - Manage patient documents

2. **Appointment Scheduling**
   - Create appointments with conflict detection
   - Calendar view with status tracking
   - Send appointment reminders
   - Manage walk-in patients

3. **Billing & Payments**
   - Generate professional receipts
   - Track payment status
   - View revenue analytics
   - Export financial reports

4. **Professional Printables**
   - Access via `/dashboard/printables`
   - Generate 8 different document types
   - Print, PDF, email, and WhatsApp sharing
   - Customizable branding and settings

### API Endpoints

The system provides RESTful APIs for integration:

```bash
# Authentication
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/me

# Patients
GET    /api/patients
POST   /api/patients
GET    /api/patients/[id]
PUT    /api/patients/[id]
DELETE /api/patients/[id]

# Appointments
GET    /api/appointments
POST   /api/appointments
PUT    /api/appointments/[id]
DELETE /api/appointments/[id]

# Billing
GET    /api/billing
POST   /api/billing
GET    /api/billing/[id]
PUT    /api/billing/[id]
```

7. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔐 Demo Credentials

The system comes pre-loaded with demo users:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@pulsehms.com | admin123 |
| Doctor | doctor@pulsehms.com | doctor123 |
| Nurse | nurse@pulsehms.com | nurse123 |

## 📱 Usage

### For Administrators
- Manage all users and system settings
- View comprehensive reports and analytics
- Access audit logs and system monitoring
- Export data and generate reports

### For Doctors
- View and manage patient appointments
- Access patient medical records
- Update appointment statuses
- View billing information

### For Nurses
- Register new patients
- Schedule appointments
- Update patient information
- Basic reporting access

## 🏗️ Project Structure

```
pulse-hms/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── api/               # API routes
│   │   ├── dashboard/         # Dashboard pages
│   │   ├── login/            # Authentication pages
│   │   └── layout.tsx        # Root layout
│   ├── lib/                   # Utility libraries
│   │   ├── auth.ts           # Authentication utilities
│   │   └── prisma.ts         # Database client
│   └── middleware.ts         # Authentication middleware
├── prisma/
│   ├── schema.prisma         # Database schema
│   └── seed.ts              # Database seeder
├── public/                   # Static assets
└── package.json             # Dependencies and scripts
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Patients
- `GET /api/patients` - List all patients
- `POST /api/patients` - Create new patient
- `GET /api/patients/[id]` - Get patient details
- `PUT /api/patients/[id]` - Update patient
- `DELETE /api/patients/[id]` - Delete patient

### Appointments
- `GET /api/appointments` - List all appointments
- `POST /api/appointments` - Create new appointment
- `GET /api/appointments/[id]` - Get appointment details
- `PUT /api/appointments/[id]` - Update appointment
- `DELETE /api/appointments/[id]` - Cancel appointment

### Billing
- `GET /api/bills` - List all bills
- `POST /api/bills` - Create new bill
- `GET /api/bills/[id]` - Get bill details
- `PUT /api/bills/[id]` - Update bill

### Reports
- `GET /api/reports` - Get analytics data
- `GET /api/reports/export` - Export data as CSV

## 🎨 Customization

### Adding New Features
1. Create new API routes in `src/app/api/`
2. Add corresponding pages in `src/app/dashboard/`
3. Update the database schema in `prisma/schema.prisma`
4. Run `npx prisma db push` to apply changes

### Styling
The project uses TailwindCSS for styling. Custom styles can be added to `src/app/globals.css`.

### Database Schema
The database schema is defined in `prisma/schema.prisma`. After making changes:
1. Update the schema file
2. Run `npx prisma generate` to update the client
3. Run `npx prisma db push` to apply changes to the database

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms
The application can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Role-based access control
- Input validation with Zod
- SQL injection prevention with Prisma
- XSS protection with Next.js

## 📊 Performance Optimizations

- Server-side rendering with Next.js
- Optimized database queries
- Efficient caching strategies
- Responsive design for mobile devices
- Minimal bundle size

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### 🐛 Reporting Bugs
- Use the [GitHub Issues](https://github.com/your-repo/pulse-hms/issues) page
- Include detailed steps to reproduce
- Provide system information and error logs

### 💡 Feature Requests
- Submit feature requests via GitHub Issues
- Describe the use case and expected behavior
- Consider the impact on existing functionality

### 🔧 Development Setup
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Add tests if applicable
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

### 📝 Code Style
- Follow TypeScript best practices
- Use Prettier for code formatting
- Write meaningful commit messages
- Add comments for complex logic
- Include JSDoc for public APIs

### 🧪 Testing
- Write unit tests for new features
- Ensure all tests pass before submitting
- Test on different browsers and devices
- Verify print functionality works correctly

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Check the documentation in the `/docs` folder
- Review the API documentation

## 🔮 Roadmap

### Phase 1 (Current)
- ✅ Basic CRUD operations
- ✅ Authentication system
- ✅ Dashboard and reporting
- ✅ Responsive design

### Phase 2 (Planned)
- [ ] AI-powered features
- [ ] Offline support
- [ ] Mobile app
- [ ] Advanced analytics

### Phase 3 (Future)
- [ ] Multi-language support
- [ ] Advanced AI features
- [ ] Integration with external systems
- [ ] Advanced reporting

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team** for the amazing framework
- **Prisma Team** for the excellent ORM
- **Tailwind CSS** for the utility-first CSS framework
- **Lucide React** for the beautiful icons
- **React Hook Form** for form management
- **All contributors** who help improve this project

---

<div align="center">
  <p>Made with ❤️ for healthcare professionals</p>
  <p><strong>Pulse HMS</strong> - Modern Healthcare Management</p>
</div>
