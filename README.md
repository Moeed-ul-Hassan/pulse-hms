# Pulse HMS - Hospital Management System

A modern, minimal hospital management system designed for small to mid-sized clinics, especially in infrastructure-limited regions like South Asia. Built with Next.js, optimized for low-tech environments and non-technical users.

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

## 🚀 Tech Stack

- **Frontend & Backend**: Next.js 15 (App Router)
- **Database**: SQLite with Prisma ORM
- **Authentication**: JWT with bcrypt
- **Styling**: TailwindCSS
- **UI Components**: Lucide React Icons
- **Form Handling**: React Hook Form with Zod validation
- **Notifications**: React Hot Toast

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

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

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

---

Built with ❤️ for healthcare professionals in low-tech environments.
