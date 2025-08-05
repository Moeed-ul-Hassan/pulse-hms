'use client'

'use client'

import { useRef, useState } from 'react'
import { useReactToPrint } from 'react-to-print'
import dynamic from 'next/dynamic'

// Dynamically import html2pdf to avoid SSR issues
const html2pdf = dynamic(() => import('html2pdf.js').then(module => ({ default: module.default })), { ssr: false })
import { 
  Printer, 
  Download, 
  Share2, 
  Mail, 
  MessageCircle, 
  FileText,
  X,
  Check,
  Settings
} from 'lucide-react'
import toast from 'react-hot-toast'

// Import all printable components
import Receipt from './Receipt'
import Prescription from './Prescription'
import VisitSummary from './VisitSummary'
import MedicalHistory from './MedicalHistory'
import LabRequest from './LabRequest'
import DischargeSummary from './DischargeSummary'
import AppointmentSlip from './AppointmentSlip'
import IncomeReport from './IncomeReport'

interface PrintManagerProps {
  type: 'receipt' | 'prescription' | 'visit-summary' | 'medical-history' | 'lab-request' | 'discharge-summary' | 'appointment-slip' | 'income-report'
  data: any
  onClose?: () => void
  showControls?: boolean
}

const PrintManager = ({ 
  type, 
  data, 
  onClose, 
  showControls = true 
}: PrintManagerProps) => {
  const printRef = useRef<HTMLDivElement>(null)
  const [isPrinting, setIsPrinting] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [printSettings, setPrintSettings] = useState({
    includeQRCode: true,
    includeWatermark: true,
    includeClinicLogo: true,
    fontSize: '12px',
    paperSize: 'A4'
  })

  // Print function using react-to-print
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    onBeforeGetContent: () => {
      setIsPrinting(true)
      toast.loading('Preparing for print...')
    },
    onAfterPrint: () => {
      setIsPrinting(false)
      toast.dismiss()
      toast.success('Print job sent successfully!')
    },
    onPrintError: () => {
      setIsPrinting(false)
      toast.dismiss()
      toast.error('Print failed. Please try again.')
    }
  })

  // PDF Export function
  const handleExportPDF = async () => {
    if (!printRef.current) return

    setIsExporting(true)
    toast.loading('Generating PDF...')

    try {
      const element = printRef.current
      const opt = {
        margin: [10, 10, 10, 10],
        filename: `${type}-${Date.now()}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 2,
          useCORS: true,
          allowTaint: true
        },
        jsPDF: { 
          unit: 'mm', 
          format: 'a4', 
          orientation: 'portrait' 
        }
      }

      await html2pdf().set(opt).from(element).save()
      
      setIsExporting(false)
      toast.dismiss()
      toast.success('PDF exported successfully!')
    } catch (error) {
      setIsExporting(false)
      toast.dismiss()
      toast.error('PDF export failed. Please try again.')
      console.error('PDF export error:', error)
    }
  }

  // Share functions
  const handleShareEmail = () => {
    const subject = encodeURIComponent(`${type.replace('-', ' ').toUpperCase()} - ${data.patientName || 'Document'}`)
    const body = encodeURIComponent(`Please find attached the ${type.replace('-', ' ')} document.`)
    window.open(`mailto:?subject=${subject}&body=${body}`)
  }

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(`Please find the ${type.replace('-', ' ')} document.`)
    window.open(`https://wa.me/?text=${text}`)
  }

  // Render the appropriate component based on type
  const renderComponent = () => {
    const commonProps = {
      ref: printRef,
      ...data,
      ...printSettings
    }

    switch (type) {
      case 'receipt':
        return <Receipt {...commonProps} />
      case 'prescription':
        return <Prescription {...commonProps} />
      case 'visit-summary':
        return <VisitSummary {...commonProps} />
      case 'medical-history':
        return <MedicalHistory {...commonProps} />
      case 'lab-request':
        return <LabRequest {...commonProps} />
      case 'discharge-summary':
        return <DischargeSummary {...commonProps} />
      case 'appointment-slip':
        return <AppointmentSlip {...commonProps} />
      case 'income-report':
        return <IncomeReport {...commonProps} />
      default:
        return <div>Unknown document type</div>
    }
  }

  // Get document title
  const getDocumentTitle = () => {
    const titles = {
      'receipt': 'Medical Receipt',
      'prescription': 'Medical Prescription',
      'visit-summary': 'Patient Visit Summary',
      'medical-history': 'Complete Medical History',
      'lab-request': 'Laboratory Test Request',
      'discharge-summary': 'Discharge Summary',
      'appointment-slip': 'Appointment Slip',
      'income-report': 'Income Report'
    }
    return titles[type] || 'Document'
  }

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{getDocumentTitle()}</h2>
            <p className="text-sm text-gray-600">
              {data.patientName && `Patient: ${data.patientName}`}
              {data.receiptNumber && ` | Receipt: ${data.receiptNumber}`}
              {data.prescriptionNumber && ` | Prescription: ${data.prescriptionNumber}`}
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            {showControls && (
              <>
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
                  title="Print Settings"
                >
                  <Settings className="h-5 w-5" />
                </button>
                
                <button
                  onClick={handlePrint}
                  disabled={isPrinting}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  <Printer className="h-4 w-4" />
                  <span>{isPrinting ? 'Printing...' : 'Print'}</span>
                </button>
                
                <button
                  onClick={handleExportPDF}
                  disabled={isExporting}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                >
                  <Download className="h-4 w-4" />
                  <span>{isExporting ? 'Exporting...' : 'PDF'}</span>
                </button>
                
                <div className="relative">
                  <button
                    onClick={() => setShowSettings(false)}
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                  >
                    <Share2 className="h-4 w-4" />
                    <span>Share</span>
                  </button>
                  
                  {/* Share dropdown */}
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    <button
                      onClick={handleShareEmail}
                      className="flex items-center space-x-2 w-full px-4 py-2 text-left hover:bg-gray-50"
                    >
                      <Mail className="h-4 w-4" />
                      <span>Email</span>
                    </button>
                    <button
                      onClick={handleShareWhatsApp}
                      className="flex items-center space-x-2 w-full px-4 py-2 text-left hover:bg-gray-50"
                    >
                      <MessageCircle className="h-4 w-4" />
                      <span>WhatsApp</span>
                    </button>
                  </div>
                </div>
              </>
            )}
            
            {onClose && (
              <button
                onClick={onClose}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>

        {/* Settings Panel */}
        {showSettings && showControls && (
          <div className="p-4 bg-gray-50 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Print Settings</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={printSettings.includeQRCode}
                  onChange={(e) => setPrintSettings(prev => ({ ...prev, includeQRCode: e.target.checked }))}
                  className="rounded"
                />
                <span className="text-sm">Include QR Code</span>
              </label>
              
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={printSettings.includeWatermark}
                  onChange={(e) => setPrintSettings(prev => ({ ...prev, includeWatermark: e.target.checked }))}
                  className="rounded"
                />
                <span className="text-sm">Include Watermark</span>
              </label>
              
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={printSettings.includeClinicLogo}
                  onChange={(e) => setPrintSettings(prev => ({ ...prev, includeClinicLogo: e.target.checked }))}
                  className="rounded"
                />
                <span className="text-sm">Include Logo</span>
              </label>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Font Size</label>
                <select
                  value={printSettings.fontSize}
                  onChange={(e) => setPrintSettings(prev => ({ ...prev, fontSize: e.target.value }))}
                  className="w-full px-3 py-1 border border-gray-300 rounded-md text-sm"
                >
                  <option value="10px">Small (10px)</option>
                  <option value="12px">Medium (12px)</option>
                  <option value="14px">Large (14px)</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Document Content */}
        <div className="flex-1 overflow-auto p-4">
          <div className="max-w-4xl mx-auto">
            {renderComponent()}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div>
              <p>Generated by Pulse HMS</p>
              <p>Date: {new Date().toLocaleDateString()}</p>
            </div>
            <div className="text-right">
              <p>For any queries, contact the clinic</p>
              <p>This document is digitally generated</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrintManager 