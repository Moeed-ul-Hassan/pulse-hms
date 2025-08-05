// Export all printable components
export { default as PrintLayout } from './PrintLayout'
export { default as Receipt } from './Receipt'
export { default as Prescription } from './Prescription'
export { default as VisitSummary } from './VisitSummary'
export { default as MedicalHistory } from './MedicalHistory'
export { default as LabRequest } from './LabRequest'
export { default as DischargeSummary } from './DischargeSummary'
export { default as AppointmentSlip } from './AppointmentSlip'
export { default as IncomeReport } from './IncomeReport'
export { default as PrintManager } from './PrintManager'
export { default as NewReceipt } from './NewReceipt'

// Export types for better TypeScript support
export type {
  PrintLayoutProps,
  ReceiptProps,
  PrescriptionProps,
  VisitSummaryProps,
  MedicalHistoryProps,
  LabRequestProps,
  DischargeSummaryProps,
  AppointmentSlipProps,
  IncomeReportProps,
  PrintManagerProps
} from './types' 