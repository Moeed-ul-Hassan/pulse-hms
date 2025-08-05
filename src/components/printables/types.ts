// Common interfaces used across printable components

export interface Service {
  id: string
  name: string
  quantity: number
  unitPrice: number
  total: number
}

export interface Medication {
  id: string
  name: string
  dosage: string
  frequency: string
  duration: string
  instructions?: string
  beforeMeal?: boolean
}

export interface LabTest {
  id: string
  name: string
  code?: string
  instructions?: string
}

export interface Visit {
  id: string
  date: string
  doctorName: string
  complaint: string
  diagnosis: string
  treatment: string
  prescription?: string
  notes?: string
}

export interface LabReport {
  id: string
  date: string
  testName: string
  result: string
  normalRange?: string
  status: 'NORMAL' | 'ABNORMAL' | 'CRITICAL'
}

export interface Allergy {
  id: string
  allergen: string
  reaction: string
  severity: 'MILD' | 'MODERATE' | 'SEVERE'
}

export interface DischargeMedication {
  id: string
  name: string
  dosage: string
  frequency: string
  duration: string
  instructions?: string
}

export interface RevenueBreakdown {
  category: string
  amount: number
  percentage: number
  count: number
}

export interface PaymentMethodBreakdown {
  method: string
  amount: number
  percentage: number
  count: number
}

// Component Props interfaces
export interface PrintLayoutProps {
  children: React.ReactNode
  title?: string
  clinicName?: string
  clinicLogo?: string
  clinicAddress?: string
  clinicPhone?: string
  clinicEmail?: string
  watermark?: string
  showQRCode?: boolean
  qrCodeData?: string
  className?: string
}

export interface ReceiptProps {
  receiptNumber: string
  patientName: string
  patientId: string
  patientPhone?: string
  patientAge?: number
  patientGender?: string
  date: string
  doctorName: string
  services: Service[]
  subtotal: number
  discount: number
  tax: number
  total: number
  paid: number
  balance: number
  paymentMethod: string
  clinicName?: string
  clinicLogo?: string
  clinicAddress?: string
  clinicPhone?: string
  clinicEmail?: string
  notes?: string
}

export interface PrescriptionProps {
  prescriptionNumber: string
  patientName: string
  patientId: string
  patientAge?: number
  patientGender?: string
  patientWeight?: string
  patientPhone?: string
  date: string
  doctorName: string
  doctorSignature?: string
  symptoms: string
  diagnosis: string
  medications: Medication[]
  instructions?: string
  nextVisitDate?: string
  includeDosageChart?: boolean
  includeUrduInstructions?: boolean
  clinicName?: string
  clinicLogo?: string
  clinicAddress?: string
  clinicPhone?: string
  clinicEmail?: string
}

export interface VisitSummaryProps {
  visitNumber: string
  patientName: string
  patientId: string
  patientAge?: number
  patientGender?: string
  patientPhone?: string
  visitDate: string
  visitTime: string
  doctorName: string
  complaint: string
  diagnosis: string
  treatment: string
  notes?: string
  nextVisitDate?: string
  includePaymentSummary?: boolean
  paymentAmount?: number
  paymentStatus?: string
  clinicName?: string
  clinicLogo?: string
  clinicAddress?: string
  clinicPhone?: string
  clinicEmail?: string
}

export interface MedicalHistoryProps {
  patientName: string
  patientId: string
  patientAge?: number
  patientGender?: string
  patientPhone?: string
  patientAddress?: string
  bloodGroup?: string
  emergencyContact?: string
  visits: Visit[]
  labReports: LabReport[]
  allergies: Allergy[]
  chronicConditions?: string[]
  currentMedications?: string[]
  familyHistory?: string
  exportDate: string
  clinicName?: string
  clinicLogo?: string
  clinicAddress?: string
  clinicPhone?: string
  clinicEmail?: string
}

export interface LabRequestProps {
  requestNumber: string
  patientName: string
  patientId: string
  patientAge?: number
  patientGender?: string
  patientPhone?: string
  patientAddress?: string
  bloodGroup?: string
  date: string
  doctorName: string
  tests: LabTest[]
  urgencyLevel: 'ROUTINE' | 'URGENT' | 'EMERGENCY'
  sampleInstructions?: string
  specialInstructions?: string
  fastingRequired?: boolean
  fastingDuration?: string
  clinicName?: string
  clinicLogo?: string
  clinicAddress?: string
  clinicPhone?: string
  clinicEmail?: string
}

export interface DischargeSummaryProps {
  summaryNumber: string
  patientName: string
  patientId: string
  patientAge?: number
  patientGender?: string
  patientPhone?: string
  patientAddress?: string
  bloodGroup?: string
  emergencyContact?: string
  admissionDate: string
  dischargeDate: string
  admissionDiagnosis: string
  finalDiagnosis: string
  symptoms: string
  investigationsDone: string
  treatmentProvided: string
  proceduresPerformed?: string[]
  dischargeMedications: DischargeMedication[]
  followUpAdvice: string
  nextFollowUpDate?: string
  dietRestrictions?: string
  activityRestrictions?: string
  doctorName: string
  doctorSignature?: string
  isMiniVersion?: boolean
  clinicName?: string
  clinicLogo?: string
  clinicAddress?: string
  clinicPhone?: string
  clinicEmail?: string
}

export interface AppointmentSlipProps {
  tokenNumber: string
  patientName: string
  patientId: string
  patientPhone?: string
  appointmentDate: string
  appointmentTime: string
  doctorName: string
  department?: string
  appointmentType: 'WALK_IN' | 'SCHEDULED' | 'EMERGENCY'
  estimatedWaitTime?: string
  clinicName?: string
  clinicLogo?: string
  clinicAddress?: string
  clinicPhone?: string
  clinicEmail?: string
  specialInstructions?: string
}

export interface IncomeReportProps {
  reportNumber: string
  reportType: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'CUSTOM'
  startDate: string
  endDate: string
  totalPatients: number
  totalRevenue: number
  revenueBreakdown: RevenueBreakdown[]
  paymentMethodBreakdown: PaymentMethodBreakdown[]
  averageRevenuePerPatient: number
  topPerformingDoctor?: string
  topPerformingService?: string
  notes?: string
  clinicName?: string
  clinicLogo?: string
  clinicAddress?: string
  clinicPhone?: string
  clinicEmail?: string
}

export interface PrintManagerProps {
  type: 'receipt' | 'prescription' | 'visit-summary' | 'medical-history' | 'lab-request' | 'discharge-summary' | 'appointment-slip' | 'income-report'
  data: any
  onClose?: () => void
  showControls?: boolean
} 