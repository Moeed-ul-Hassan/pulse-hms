# Pulse HMS Printables Suite

A comprehensive collection of professional, print-ready document components designed specifically for clinics and hospitals. All components are optimized for thermal printers, A4 paper, and PDF export.

## 🎯 Features

### Core Features
- **Print-Ready Design**: Optimized for thermal printers, A4 paper, and PDF export
- **QR Code Integration**: QR codes for digital copy access and re-printing
- **Professional Branding**: Clinic logo, header, footer, and watermark support
- **Urdu Language Support**: Optional Urdu instructions for better patient communication
- **Multiple Export Formats**: Print, PDF, email, and WhatsApp sharing
- **Responsive Design**: Works perfectly on all screen sizes and print media
- **Customizable Settings**: Font size, paper size, and content options

### Document Types

#### 1. Medical Receipt
- **Purpose**: Professional billing receipt with payment breakdown
- **Features**:
  - Patient information and consultation details
  - Itemized service breakdown with quantities and prices
  - Fee breakdown (subtotal, discount, tax, total)
  - Payment status and method
  - QR code for digital access
  - Thank you message and clinic contact

#### 2. Medical Prescription
- **Purpose**: Doctor prescription with medications and instructions
- **Features**:
  - Patient demographics and clinical information
  - Symptoms and diagnosis
  - Detailed medication list with dosage, frequency, and duration
  - Optional dosage chart for patient convenience
  - Optional Urdu instructions
  - Doctor signature and clinic stamp areas
  - Next visit scheduling

#### 3. Patient Visit Summary
- **Purpose**: Visit summary for patient records and sharing
- **Features**:
  - Visit details and patient information
  - Chief complaint and diagnosis
  - Treatment provided and notes
  - Optional payment summary
  - Follow-up appointment details
  - Sharing options (email, WhatsApp, print, PDF)

#### 4. Complete Medical History
- **Purpose**: Comprehensive medical history for referrals and transfers
- **Features**:
  - Complete patient demographics
  - Chronic conditions and current medications
  - Allergy history with severity levels
  - Complete visit history with all diagnoses
  - Laboratory reports with status indicators
  - Family history and export information
  - Watermark for authenticity

#### 5. Laboratory Test Request
- **Purpose**: Lab test request with urgency levels and instructions
- **Features**:
  - Patient information and requesting doctor
  - Test list with codes and special instructions
  - Urgency levels (Routine, Urgent, Emergency)
  - Fasting instructions and sample collection details
  - Special instructions and contact information
  - Signature and clinic stamp areas

#### 6. Discharge Summary
- **Purpose**: Hospital discharge summary in mini and full versions
- **Features**:
  - **Mini Version**: Essential information for quick reference
  - **Full Version**: Complete discharge details
  - Admission and discharge information
  - Clinical course and procedures performed
  - Discharge medications with instructions
  - Follow-up advice and restrictions
  - Doctor signature and clinic stamp

#### 7. Appointment Slip
- **Purpose**: Appointment token for queue management
- **Features**:
  - Token number and appointment details
  - Patient and doctor information
  - Appointment type (Walk-in, Scheduled, Emergency)
  - Estimated wait time and special instructions
  - Queue information and contact details
  - Professional clinic branding

#### 8. Income Report
- **Purpose**: Revenue reports for administration
- **Features**:
  - Daily, weekly, monthly, and custom reports
  - Patient count and total revenue
  - Revenue breakdown by category
  - Payment method analysis
  - Performance highlights
  - Visual charts and graphs
  - Export and sharing options

## 🚀 Technical Implementation

### Dependencies
```json
{
  "react-to-print": "^3.1.1",
  "html2pdf.js": "^0.10.3",
  "jspdf": "^3.0.1",
  "qrcode": "^1.5.4"
}
```

### Component Structure
```
src/components/printables/
├── PrintLayout.tsx          # Base layout component
├── Receipt.tsx             # Medical receipt component
├── Prescription.tsx        # Medical prescription component
├── VisitSummary.tsx        # Patient visit summary component
├── MedicalHistory.tsx      # Complete medical history component
├── LabRequest.tsx          # Laboratory test request component
├── DischargeSummary.tsx    # Discharge summary component
├── AppointmentSlip.tsx     # Appointment slip component
├── IncomeReport.tsx        # Income report component
├── PrintManager.tsx        # Unified print management component
├── types.ts               # TypeScript interfaces
├── index.ts               # Component exports
└── README.md              # This file
```

### Usage Examples

#### Basic Usage
```tsx
import { PrintManager } from '@/components/printables'

// Receipt example
const receiptData = {
  receiptNumber: 'RCP-2024-001',
  patientName: 'Ahmed Khan',
  patientId: 'P-2024-001',
  // ... other data
}

<PrintManager
  type="receipt"
  data={receiptData}
  onClose={() => setShowPrintManager(false)}
/>
```

#### Direct Component Usage
```tsx
import { Receipt } from '@/components/printables'

<Receipt
  receiptNumber="RCP-2024-001"
  patientName="Ahmed Khan"
  // ... other props
/>
```

#### Print Settings
```tsx
const printSettings = {
  includeQRCode: true,
  includeWatermark: true,
  includeClinicLogo: true,
  fontSize: '12px',
  paperSize: 'A4'
}
```

## 🎨 Styling and Customization

### Print-Specific CSS
All components include print-specific styles that:
- Hide navigation and UI elements during print
- Optimize layout for A4 paper
- Use appropriate fonts and spacing
- Include watermarks and branding

### Responsive Design
- Mobile-first approach
- Optimized for thermal printers
- A4 paper compatibility
- PDF export optimization

### Branding Options
- Clinic logo integration
- Custom header and footer
- Watermark support
- Color scheme customization

## 📱 Print Manager Features

### Unified Interface
- Single component for all document types
- Consistent print, PDF, and sharing options
- Settings panel for customization
- Preview functionality

### Export Options
- **Print**: Direct printing using browser print dialog
- **PDF**: High-quality PDF export with html2pdf.js
- **Email**: Direct email sharing with pre-filled subject and body
- **WhatsApp**: Direct WhatsApp sharing with document information

### Settings Panel
- QR code inclusion toggle
- Watermark inclusion toggle
- Clinic logo inclusion toggle
- Font size selection
- Paper size options

## 🔧 Integration Guide

### 1. Install Dependencies
```bash
npm install react-to-print html2pdf.js jspdf qrcode
```

### 2. Import Components
```tsx
import { PrintManager } from '@/components/printables'
```

### 3. Prepare Data
```tsx
const documentData = {
  // Document-specific data structure
  // See types.ts for detailed interfaces
}
```

### 4. Render Component
```tsx
<PrintManager
  type="receipt"
  data={documentData}
  onClose={handleClose}
/>
```

### 5. Handle Print Events
```tsx
const handlePrint = () => {
  // Custom print logic
}

const handleExportPDF = () => {
  // Custom PDF export logic
}
```

## 📋 Data Structures

### Receipt Data
```tsx
interface ReceiptData {
  receiptNumber: string
  patientName: string
  patientId: string
  services: Service[]
  subtotal: number
  discount: number
  tax: number
  total: number
  paid: number
  balance: number
  paymentMethod: string
  // ... other fields
}
```

### Prescription Data
```tsx
interface PrescriptionData {
  prescriptionNumber: string
  patientName: string
  symptoms: string
  diagnosis: string
  medications: Medication[]
  includeDosageChart?: boolean
  includeUrduInstructions?: boolean
  // ... other fields
}
```

## 🎯 Best Practices

### 1. Data Preparation
- Ensure all required fields are provided
- Validate data before passing to components
- Handle missing optional fields gracefully

### 2. Print Optimization
- Test on actual thermal printers
- Verify A4 paper compatibility
- Check print margins and spacing

### 3. Performance
- Use React.memo for static components
- Optimize images and logos
- Minimize bundle size

### 4. Accessibility
- Include alt text for images
- Use semantic HTML structure
- Ensure keyboard navigation

## 🔒 Security Considerations

### Data Privacy
- Sanitize patient data before printing
- Implement proper access controls
- Log print activities for audit

### Document Integrity
- Include watermarks for authenticity
- Use QR codes for verification
- Implement digital signatures

## 🚀 Future Enhancements

### Planned Features
- **Digital Signatures**: Doctor signature upload and auto-insertion
- **Template System**: Customizable document templates
- **Batch Printing**: Multiple document printing
- **Cloud Storage**: Document storage and retrieval
- **Mobile App**: Native mobile printing support
- **API Integration**: External system integration

### Technical Improvements
- **Offline Support**: Print without internet connection
- **Caching**: Document caching for better performance
- **Compression**: Optimized file sizes
- **Analytics**: Print usage analytics

## 📞 Support

For technical support or feature requests:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Pulse HMS Printables Suite** - Professional medical document printing for modern healthcare facilities. 