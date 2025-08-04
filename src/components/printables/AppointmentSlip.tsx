'use client'

import { forwardRef } from 'react'
import PrintLayout from './PrintLayout'

interface AppointmentSlipProps {
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

const AppointmentSlip = forwardRef<HTMLDivElement, AppointmentSlipProps>(({
  tokenNumber,
  patientName,
  patientId,
  patientPhone,
  appointmentDate,
  appointmentTime,
  doctorName,
  department,
  appointmentType,
  estimatedWaitTime,
  clinicName = 'Pulse HMS Clinic',
  clinicLogo,
  clinicAddress = '123 Medical Center, City, Country',
  clinicPhone = '+92 300 1234567',
  clinicEmail = 'info@pulsehms.com',
  specialInstructions
}, ref) => {
  const getAppointmentTypeColor = (type: string) => {
    switch (type) {
      case 'EMERGENCY':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'WALK_IN':
        return 'bg-orange-100 text-orange-800 border-orange-200'
      default:
        return 'bg-green-100 text-green-800 border-green-200'
    }
  }

  return (
    <PrintLayout
      ref={ref}
      title="APPOINTMENT SLIP"
      clinicName={clinicName}
      clinicLogo={clinicLogo}
      clinicAddress={clinicAddress}
      clinicPhone={clinicPhone}
      clinicEmail={clinicEmail}
      watermark="Pulse HMS Appointment"
    >
      <div className="space-y-6">
        {/* Token Header */}
        <div className="text-center border-b border-gray-300 pb-4">
          <div className="text-4xl font-bold text-gray-900 mb-2">
            #{tokenNumber}
          </div>
          <div className={`inline-block px-4 py-2 rounded-full text-sm font-medium border ${getAppointmentTypeColor(appointmentType)}`}>
            {appointmentType.replace('_', ' ')}
          </div>
        </div>

        {/* Patient Information */}
        <div className="border border-gray-300 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">
            Patient Information
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Patient Name</p>
              <p className="text-sm font-medium">{patientName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Patient ID</p>
              <p className="text-sm font-medium">{patientId}</p>
            </div>
            {patientPhone && (
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="text-sm font-medium">{patientPhone}</p>
              </div>
            )}
          </div>
        </div>

        {/* Appointment Details */}
        <div className="border border-gray-300 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">
            Appointment Details
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Date</p>
              <p className="text-sm font-medium">{appointmentDate}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Time</p>
              <p className="text-sm font-medium">{appointmentTime}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Doctor</p>
              <p className="text-sm font-medium">Dr. {doctorName}</p>
            </div>
            {department && (
              <div>
                <p className="text-sm text-gray-600">Department</p>
                <p className="text-sm font-medium">{department}</p>
              </div>
            )}
            {estimatedWaitTime && (
              <div className="md:col-span-2">
                <p className="text-sm text-gray-600">Estimated Wait Time</p>
                <p className="text-sm font-medium text-blue-600">{estimatedWaitTime}</p>
              </div>
            )}
          </div>
        </div>

        {/* Special Instructions */}
        {specialInstructions && (
          <div className="border border-gray-300 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">
              Special Instructions
            </h3>
            <p className="text-sm text-gray-700 whitespace-pre-wrap">{specialInstructions}</p>
          </div>
        )}

        {/* Queue Information */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Queue Information</h3>
          <div className="text-sm text-blue-800 space-y-1">
            <p>• Please wait in the waiting area</p>
            <p>• Your token number will be called on the display screen</p>
            <p>• Keep this slip with you at all times</p>
            <p>• For any queries, contact the reception desk</p>
          </div>
        </div>

        {/* Important Notes */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-yellow-900 mb-2">Important Notes</h3>
          <div className="text-sm text-yellow-800 space-y-1">
            <p>• Arrive 10 minutes before your appointment time</p>
            <p>• Bring all relevant medical documents</p>
            <p>• If you need to cancel, please call {clinicPhone}</p>
            <p>• Emergency cases will be prioritized</p>
          </div>
        </div>

        {/* Contact Information */}
        <div className="text-center border-t border-gray-300 pt-4">
          <p className="text-sm font-medium text-gray-900">{clinicName}</p>
          <p className="text-xs text-gray-600">{clinicAddress}</p>
          <p className="text-xs text-gray-600">Phone: {clinicPhone} | Email: {clinicEmail}</p>
        </div>

        {/* Footer */}
        <div className="text-center py-2 border-t border-gray-300">
          <p className="text-xs text-gray-500">
            Generated on {new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </div>
      </div>
    </PrintLayout>
  )
})

AppointmentSlip.displayName = 'AppointmentSlip'

export default AppointmentSlip 