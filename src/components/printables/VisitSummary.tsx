'use client'

import { forwardRef } from 'react'
import PrintLayout from './PrintLayout'

interface VisitSummaryProps {
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

const VisitSummary = forwardRef<HTMLDivElement, VisitSummaryProps>(({
  visitNumber,
  patientName,
  patientId,
  patientAge,
  patientGender,
  patientPhone,
  visitDate,
  visitTime,
  doctorName,
  complaint,
  diagnosis,
  treatment,
  notes,
  nextVisitDate,
  includePaymentSummary = false,
  paymentAmount,
  paymentStatus,
  clinicName = 'Pulse HMS Clinic',
  clinicLogo,
  clinicAddress = '123 Medical Center, City, Country',
  clinicPhone = '+92 300 1234567',
  clinicEmail = 'info@pulsehms.com'
}, ref) => {
  return (
    <PrintLayout
      ref={ref}
      title="PATIENT VISIT SUMMARY"
      clinicName={clinicName}
      clinicLogo={clinicLogo}
      clinicAddress={clinicAddress}
      clinicPhone={clinicPhone}
      clinicEmail={clinicEmail}
      watermark="Pulse HMS Visit Summary"
    >
      <div className="space-y-6">
        {/* Visit Header */}
        <div className="flex justify-between items-start border-b border-gray-300 pb-4">
          <div>
            <p className="text-sm text-gray-600">Visit #</p>
            <p className="text-lg font-bold text-gray-900">{visitNumber}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Date & Time</p>
            <p className="text-lg font-semibold text-gray-900">{visitDate}</p>
            <p className="text-sm text-gray-600">{visitTime}</p>
          </div>
        </div>

        {/* Patient Information */}
        <div className="border border-gray-300 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">
            Patient Information
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-600">Name</p>
              <p className="text-sm font-medium">{patientName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Patient ID</p>
              <p className="text-sm font-medium">{patientId}</p>
            </div>
            {patientAge && (
              <div>
                <p className="text-sm text-gray-600">Age</p>
                <p className="text-sm font-medium">{patientAge} years</p>
              </div>
            )}
            {patientGender && (
              <div>
                <p className="text-sm text-gray-600">Gender</p>
                <p className="text-sm font-medium">{patientGender}</p>
              </div>
            )}
            {patientPhone && (
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="text-sm font-medium">{patientPhone}</p>
              </div>
            )}
            <div>
              <p className="text-sm text-gray-600">Doctor</p>
              <p className="text-sm font-medium">Dr. {doctorName}</p>
            </div>
          </div>
        </div>

        {/* Clinical Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-gray-300 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">
              Chief Complaint
            </h3>
            <p className="text-sm text-gray-700 whitespace-pre-wrap">{complaint}</p>
          </div>

          <div className="border border-gray-300 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">
              Diagnosis
            </h3>
            <p className="text-sm text-gray-700 whitespace-pre-wrap">{diagnosis}</p>
          </div>
        </div>

        {/* Treatment */}
        <div className="border border-gray-300 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">
            Treatment Provided
          </h3>
          <p className="text-sm text-gray-700 whitespace-pre-wrap">{treatment}</p>
        </div>

        {/* Notes */}
        {notes && (
          <div className="border border-gray-300 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">
              Additional Notes
            </h3>
            <p className="text-sm text-gray-700 whitespace-pre-wrap">{notes}</p>
          </div>
        )}

        {/* Next Visit */}
        {nextVisitDate && (
          <div className="border border-gray-300 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Follow-up Appointment</h3>
            <p className="text-sm text-gray-700">
              Next visit scheduled for: <span className="font-medium">{nextVisitDate}</span>
            </p>
          </div>
        )}

        {/* Payment Summary */}
        {includePaymentSummary && paymentAmount && (
          <div className="border border-gray-300 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">
              Payment Summary
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Amount:</span>
                <span className="text-sm font-medium">Rs. {paymentAmount.toLocaleString()}</span>
              </div>
              {paymentStatus && (
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Status:</span>
                  <span className={`text-sm font-medium ${
                    paymentStatus === 'PAID' ? 'text-green-600' : 
                    paymentStatus === 'PENDING' ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {paymentStatus}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Doctor Signature */}
        <div className="flex justify-between items-end border-t border-gray-300 pt-6">
          <div className="flex-1">
            <div className="border-t-2 border-gray-400 w-48 pt-2">
              <p className="text-sm font-medium text-gray-900">Dr. {doctorName}</p>
              <p className="text-xs text-gray-600">MBBS, MD</p>
            </div>
          </div>
          
          <div className="text-center">
            <div className="border border-gray-300 rounded p-2 w-24 h-16 flex items-center justify-center">
              <p className="text-xs text-gray-500">Signature</p>
            </div>
            <p className="text-xs text-gray-600 mt-1">Doctor's Signature</p>
          </div>
        </div>

        {/* Sharing Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Sharing Options</h3>
          <div className="text-sm text-blue-800 space-y-1">
            <p>• <strong>Email:</strong> Send this summary to patient's email</p>
            <p>• <strong>WhatsApp:</strong> Share via WhatsApp for quick access</p>
            <p>• <strong>Print:</strong> Print for patient's records</p>
            <p>• <strong>Save:</strong> Save as PDF for digital records</p>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center py-4 border-t border-gray-300">
          <p className="text-sm text-gray-600">
            This visit summary is generated by Pulse HMS
          </p>
          <p className="text-xs text-gray-500 mt-1">
            For any queries, please contact {clinicPhone} or {clinicEmail}
          </p>
        </div>
      </div>
    </PrintLayout>
  )
})

VisitSummary.displayName = 'VisitSummary'

export default VisitSummary 