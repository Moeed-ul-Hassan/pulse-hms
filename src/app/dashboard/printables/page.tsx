'use client'

import { useState } from 'react'
import { 
  Receipt, 
  Prescription, 
  VisitSummary, 
  MedicalHistory, 
  LabRequest, 
  DischargeSummary, 
  AppointmentSlip, 
  IncomeReport,
  PrintManager 
} from '@/components/printables'
import { 
  FileText, 
  Printer, 
  Download, 
  Eye,
  Receipt as ReceiptIcon,
  Pill,
  User,
  History,
  TestTube,
  FileCheck,
  Calendar,
  BarChart3,
  Check
} from 'lucide-react'

export default function PrintablesDemo() {
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null)
  const [showPrintManager, setShowPrintManager] = useState(false)

  // Sample data for each document type
  const sampleData = {
    receipt: {
      receiptNumber: 'RCP-2024-001',
      patientName: 'Ahmed Khan',
      patientId: 'P-2024-001',
      patientPhone: '+92 300 1234567',
      patientAge: 35,
      patientGender: 'Male',
      date: '2024-01-15',
      doctorName: 'Dr. Sarah Ahmed',
      services: [
        { id: '1', name: 'Consultation', quantity: 1, unitPrice: 2000, total: 2000 },
        { id: '2', name: 'Blood Test', quantity: 1, unitPrice: 1500, total: 1500 },
        { id: '3', name: 'Medication', quantity: 2, unitPrice: 500, total: 1000 }
      ],
      subtotal: 4500,
      discount: 500,
      tax: 225,
      total: 4225,
      paid: 4225,
      balance: 0,
      paymentMethod: 'Cash',
      notes: 'Patient advised to follow up in 2 weeks'
    },
    prescription: {
      prescriptionNumber: 'PRS-2024-001',
      patientName: 'Fatima Ali',
      patientId: 'P-2024-002',
      patientAge: 28,
      patientGender: 'Female',
      patientWeight: '65 kg',
      patientPhone: '+92 300 7654321',
      date: '2024-01-15',
      doctorName: 'Dr. Muhammad Hassan',
      symptoms: 'Fever, cough, and sore throat for the past 3 days',
      diagnosis: 'Upper Respiratory Tract Infection',
      medications: [
        {
          id: '1',
          name: 'Paracetamol 500mg',
          dosage: '1 tablet',
          frequency: 'Every 6 hours',
          duration: '5 days',
          instructions: 'Take after meals'
        },
        {
          id: '2',
          name: 'Amoxicillin 500mg',
          dosage: '1 capsule',
          frequency: 'Twice daily',
          duration: '7 days',
          instructions: 'Take on empty stomach'
        }
      ],
      instructions: 'Rest well, drink plenty of fluids, and avoid cold foods',
      nextVisitDate: '2024-01-22',
      includeDosageChart: true,
      includeUrduInstructions: true
    },
    'visit-summary': {
      visitNumber: 'VIS-2024-001',
      patientName: 'Ali Raza',
      patientId: 'P-2024-003',
      patientAge: 45,
      patientGender: 'Male',
      patientPhone: '+92 300 9876543',
      visitDate: '2024-01-15',
      visitTime: '10:30 AM',
      doctorName: 'Dr. Ayesha Khan',
      complaint: 'Severe headache and dizziness',
      diagnosis: 'Migraine with aura',
      treatment: 'Prescribed pain relievers and advised lifestyle modifications',
      notes: 'Patient has history of migraines. Advised to avoid triggers like stress and certain foods.',
      nextVisitDate: '2024-01-29',
      includePaymentSummary: true,
      paymentAmount: 3000,
      paymentStatus: 'PAID'
    },
    'medical-history': {
      patientName: 'Sana Malik',
      patientId: 'P-2024-004',
      patientAge: 32,
      patientGender: 'Female',
      patientPhone: '+92 300 1122334',
      patientAddress: 'House #123, Street 5, Islamabad',
      bloodGroup: 'B+',
      emergencyContact: '+92 300 5566778',
      visits: [
        {
          id: '1',
          date: '2024-01-10',
          doctorName: 'Dr. Ahmed Khan',
          complaint: 'Fever and body aches',
          diagnosis: 'Viral fever',
          treatment: 'Symptomatic treatment with paracetamol',
          prescription: 'Paracetamol 500mg TDS for 3 days'
        },
        {
          id: '2',
          date: '2024-01-15',
          doctorName: 'Dr. Sarah Ahmed',
          complaint: 'Follow-up for fever',
          diagnosis: 'Recovered from viral fever',
          treatment: 'No medication needed',
          notes: 'Patient is doing well'
        }
      ],
      labReports: [
        {
          id: '1',
          date: '2024-01-11',
          testName: 'Complete Blood Count',
          result: 'Normal',
          normalRange: '4.5-11.0 x10^9/L',
          status: 'NORMAL'
        }
      ],
      allergies: [
        {
          id: '1',
          allergen: 'Penicillin',
          reaction: 'Skin rash',
          severity: 'MODERATE'
        }
      ],
      chronicConditions: ['Hypertension'],
      currentMedications: ['Amlodipine 5mg daily'],
      familyHistory: 'Father has diabetes, mother has hypertension',
      exportDate: '2024-01-15'
    },
    'lab-request': {
      requestNumber: 'LAB-2024-001',
      patientName: 'Hassan Ali',
      patientId: 'P-2024-005',
      patientAge: 40,
      patientGender: 'Male',
      patientPhone: '+92 300 3344556',
      patientAddress: 'House #456, Street 10, Lahore',
      bloodGroup: 'O+',
      date: '2024-01-15',
      doctorName: 'Dr. Fatima Zahra',
      tests: [
        { id: '1', name: 'Complete Blood Count', code: 'CBC', instructions: 'Fasting required' },
        { id: '2', name: 'Blood Sugar (Fasting)', code: 'FBS', instructions: '12 hours fasting' },
        { id: '3', name: 'Lipid Profile', code: 'LIPID', instructions: '14 hours fasting' }
      ],
      urgencyLevel: 'ROUTINE',
      sampleInstructions: 'Collect blood sample in the morning between 8-10 AM',
      specialInstructions: 'Patient is on blood thinners, inform lab technician',
      fastingRequired: true,
      fastingDuration: '12-14 hours'
    },
    'discharge-summary': {
      summaryNumber: 'DIS-2024-001',
      patientName: 'Zara Khan',
      patientId: 'P-2024-006',
      patientAge: 55,
      patientGender: 'Female',
      patientPhone: '+92 300 7788990',
      patientAddress: 'House #789, Street 15, Karachi',
      bloodGroup: 'A+',
      emergencyContact: '+92 300 1122334',
      admissionDate: '2024-01-10',
      dischargeDate: '2024-01-15',
      admissionDiagnosis: 'Acute appendicitis',
      finalDiagnosis: 'Acute appendicitis - post appendectomy',
      symptoms: 'Severe right lower abdominal pain, nausea, vomiting',
      investigationsDone: 'Ultrasound abdomen, CBC, CRP',
      treatmentProvided: 'Laparoscopic appendectomy performed successfully',
      proceduresPerformed: ['Laparoscopic appendectomy'],
      dischargeMedications: [
        {
          id: '1',
          name: 'Ciprofloxacin 500mg',
          dosage: '1 tablet',
          frequency: 'Twice daily',
          duration: '7 days',
          instructions: 'Take with food'
        },
        {
          id: '2',
          name: 'Paracetamol 500mg',
          dosage: '1 tablet',
          frequency: 'Every 6 hours as needed',
          duration: '5 days',
          instructions: 'For pain relief'
        }
      ],
      followUpAdvice: 'Follow up in 1 week. Avoid heavy lifting for 2 weeks. Keep wound clean and dry.',
      nextFollowUpDate: '2024-01-22',
      dietRestrictions: 'No restrictions, resume normal diet gradually',
      activityRestrictions: 'Avoid heavy lifting and strenuous exercise for 2 weeks',
      doctorName: 'Dr. Usman Ali'
    },
    'appointment-slip': {
      tokenNumber: '001',
      patientName: 'Aisha Khan',
      patientId: 'P-2024-007',
      patientPhone: '+92 300 4455667',
      appointmentDate: '2024-01-15',
      appointmentTime: '2:00 PM',
      doctorName: 'Dr. Hamza Ahmed',
      department: 'Cardiology',
      appointmentType: 'SCHEDULED',
      estimatedWaitTime: '15-20 minutes',
      specialInstructions: 'Please bring all previous medical reports'
    },
    'income-report': {
      reportNumber: 'INC-2024-001',
      reportType: 'DAILY',
      startDate: '2024-01-15',
      endDate: '2024-01-15',
      totalPatients: 25,
      totalRevenue: 125000,
      revenueBreakdown: [
        { category: 'Consultations', amount: 50000, percentage: 40, count: 20 },
        { category: 'Laboratory Tests', amount: 45000, percentage: 36, count: 15 },
        { category: 'Medications', amount: 20000, percentage: 16, count: 10 },
        { category: 'Procedures', amount: 10000, percentage: 8, count: 5 }
      ],
      paymentMethodBreakdown: [
        { method: 'Cash', amount: 75000, percentage: 60, count: 15 },
        { method: 'Online', amount: 37500, percentage: 30, count: 8 },
        { method: 'Credit', amount: 12500, percentage: 10, count: 2 }
      ],
      averageRevenuePerPatient: 5000,
      topPerformingDoctor: 'Dr. Sarah Ahmed',
      topPerformingService: 'General Consultation',
      notes: 'Good patient turnout today. Online payments increased by 15%.'
    }
  }

  const documentTypes = [
    { id: 'receipt', name: 'Medical Receipt', icon: ReceiptIcon, description: 'Professional receipt with QR code and payment breakdown' },
    { id: 'prescription', name: 'Medical Prescription', icon: Pill, description: 'Doctor prescription with medications and instructions' },
    { id: 'visit-summary', name: 'Visit Summary', icon: User, description: 'Patient visit summary for sharing and records' },
    { id: 'medical-history', name: 'Medical History', icon: History, description: 'Complete medical history for referrals' },
    { id: 'lab-request', name: 'Lab Request', icon: TestTube, description: 'Laboratory test request with urgency levels' },
    { id: 'discharge-summary', name: 'Discharge Summary', icon: FileCheck, description: 'Hospital discharge summary (mini & full versions)' },
    { id: 'appointment-slip', name: 'Appointment Slip', icon: Calendar, description: 'Appointment token for queue management' },
    { id: 'income-report', name: 'Income Report', icon: BarChart3, description: 'Revenue reports for administration' }
  ]

  const handlePrintDocument = (type: string) => {
    setSelectedDocument(type)
    setShowPrintManager(true)
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Pulse HMS Printables Suite</h1>
        <p className="text-gray-600">
          Professional, print-ready documents for clinics and hospitals. All documents are optimized for thermal printers, A4 paper, and PDF export.
        </p>
      </div>

      {/* Document Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {documentTypes.map((doc) => (
          <div key={doc.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <doc.icon className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">{doc.name}</h3>
                <p className="text-sm text-gray-600">{doc.description}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <button
                onClick={() => handlePrintDocument(doc.id)}
                className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Printer className="h-4 w-4" />
                <span>Print Document</span>
              </button>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => handlePrintDocument(doc.id)}
                  className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                >
                  <Download className="h-3 w-3" />
                  <span>PDF</span>
                </button>
                <button
                  onClick={() => handlePrintDocument(doc.id)}
                  className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
                >
                  <Eye className="h-3 w-3" />
                  <span>Preview</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Features Section */}
      <div className="mt-12 bg-gray-50 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Check className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Print-Ready Design</h3>
              <p className="text-sm text-gray-600">Optimized for thermal printers, A4 paper, and PDF export</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Check className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">QR Code Integration</h3>
              <p className="text-sm text-gray-600">QR codes for digital copy access and re-printing</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Check className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Urdu Support</h3>
              <p className="text-sm text-gray-600">Optional Urdu instructions for better patient communication</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Check className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Professional Branding</h3>
              <p className="text-sm text-gray-600">Clinic logo, header, footer, and watermark support</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Check className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Multiple Formats</h3>
              <p className="text-sm text-gray-600">Print, PDF, email, and WhatsApp sharing options</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Check className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Responsive Design</h3>
              <p className="text-sm text-gray-600">Works perfectly on all screen sizes and print media</p>
            </div>
          </div>
        </div>
      </div>

      {/* Print Manager Modal */}
      {showPrintManager && selectedDocument && (
        <PrintManager
          type={selectedDocument as any}
          data={sampleData[selectedDocument as keyof typeof sampleData]}
          onClose={() => setShowPrintManager(false)}
        />
      )}
    </div>
  )
} 