'use client'

import { forwardRef } from 'react'
import PrintLayout from './PrintLayout'

interface LabTest {
  id: string
  name: string
  code?: string
  instructions?: string
}

interface LabRequestProps {
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

const LabRequest = forwardRef<HTMLDivElement, LabRequestProps>(({
  requestNumber,
  patientName,
  patientId,
  patientAge,
  patientGender,
  patientPhone,
  patientAddress,
  bloodGroup,
  date,
  doctorName,
  tests,
  urgencyLevel,
  sampleInstructions,
  specialInstructions,
  fastingRequired,
  fastingDuration,
  clinicName = 'Pulse HMS Clinic',
  clinicLogo,
  clinicAddress = '123 Medical Center, City, Country',
  clinicPhone = '+92 300 1234567',
  clinicEmail = 'info@pulsehms.com'
}, ref) => {
  const getUrgencyColor = (level: string) => {
    switch (level) {
      case 'EMERGENCY':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'URGENT':
        return 'bg-orange-100 text-orange-800 border-orange-200'
      default:
        return 'bg-green-100 text-green-800 border-green-200'
    }
  }

  return (
    <PrintLayout
      ref={ref}
      title="LABORATORY TEST REQUEST"
      clinicName={clinicName}
      clinicLogo={clinicLogo}
      clinicAddress={clinicAddress}
      clinicPhone={clinicPhone}
      clinicEmail={clinicEmail}
      watermark="Pulse HMS Lab Request"
    >
      <div className="space-y-6">
        {/* Request Header */}
        <div className="flex justify-between items-start border-b border-gray-300 pb-4">
          <div>
            <p className="text-sm text-gray-600">Request #</p>
            <p className="text-lg font-bold text-gray-900">{requestNumber}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Date</p>
            <p className="text-lg font-semibold text-gray-900">{date}</p>
            <div className={`mt-2 px-3 py-1 rounded-full text-xs font-medium border ${getUrgencyColor(urgencyLevel)}`}>
              {urgencyLevel}
            </div>
          </div>
        </div>

        {/* Patient Information */}
        <div className="border border-gray-300 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">
            Patient Information
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-600">Full Name</p>
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
            {bloodGroup && (
              <div>
                <p className="text-sm text-gray-600">Blood Group</p>
                <p className="text-sm font-medium">{bloodGroup}</p>
              </div>
            )}
            {patientPhone && (
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="text-sm font-medium">{patientPhone}</p>
              </div>
            )}
            {patientAddress && (
              <div className="md:col-span-2">
                <p className="text-sm text-gray-600">Address</p>
                <p className="text-sm font-medium">{patientAddress}</p>
              </div>
            )}
          </div>
        </div>

        {/* Requesting Doctor */}
        <div className="border border-gray-300 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">
            Requesting Doctor
          </h3>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600">Doctor Name</p>
              <p className="text-sm font-medium">Dr. {doctorName}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Clinic</p>
              <p className="text-sm font-medium">{clinicName}</p>
            </div>
          </div>
        </div>

        {/* Requested Tests */}
        <div className="border border-gray-300 rounded-lg overflow-hidden">
          <h3 className="text-lg font-semibold text-gray-900 p-4 border-b border-gray-200 bg-gray-50">
            Requested Laboratory Tests ({tests.length} tests)
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-3 text-sm font-medium text-gray-700">Test Name</th>
                  <th className="text-left p-3 text-sm font-medium text-gray-700">Test Code</th>
                  <th className="text-left p-3 text-sm font-medium text-gray-700">Special Instructions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {tests.map((test) => (
                  <tr key={test.id}>
                    <td className="p-3 text-sm font-medium text-gray-900">{test.name}</td>
                    <td className="p-3 text-sm text-gray-900">{test.code || 'N/A'}</td>
                    <td className="p-3 text-sm text-gray-900">{test.instructions || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sample Instructions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Fasting Instructions */}
          {fastingRequired && (
            <div className="border border-gray-300 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">
                Fasting Instructions
              </h3>
              <div className="space-y-2">
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Fasting Required:</span> Yes
                </p>
                {fastingDuration && (
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Duration:</span> {fastingDuration}
                  </p>
                )}
                <p className="text-sm text-gray-700">
                  • No food or drink (except water) before the test
                </p>
                <p className="text-sm text-gray-700">
                  • Continue taking prescribed medications unless advised otherwise
                </p>
              </div>
            </div>
          )}

          {/* Sample Collection Instructions */}
          {sampleInstructions && (
            <div className="border border-gray-300 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">
                Sample Collection Instructions
              </h3>
              <p className="text-sm text-gray-700 whitespace-pre-wrap">{sampleInstructions}</p>
            </div>
          )}
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

        {/* Urgency Notice */}
        {urgencyLevel !== 'ROUTINE' && (
          <div className={`border rounded-lg p-4 ${urgencyLevel === 'EMERGENCY' ? 'border-red-200 bg-red-50' : 'border-orange-200 bg-orange-50'}`}>
            <h3 className={`text-lg font-semibold mb-2 ${urgencyLevel === 'EMERGENCY' ? 'text-red-900' : 'text-orange-900'}`}>
              ⚠️ {urgencyLevel} TEST REQUEST
            </h3>
            <div className={`text-sm space-y-1 ${urgencyLevel === 'EMERGENCY' ? 'text-red-800' : 'text-orange-800'}`}>
              {urgencyLevel === 'EMERGENCY' ? (
                <>
                  <p>• This is an EMERGENCY test request</p>
                  <p>• Process immediately upon receipt</p>
                  <p>• Contact requesting doctor if any issues</p>
                  <p>• Results needed as soon as possible</p>
                </>
              ) : (
                <>
                  <p>• This is an URGENT test request</p>
                  <p>• Process within 2-4 hours</p>
                  <p>• Notify requesting doctor of any delays</p>
                </>
              )}
            </div>
          </div>
        )}

        {/* Signature and Contact */}
        <div className="flex justify-between items-end border-t border-gray-300 pt-6">
          <div className="flex-1">
            <div className="border-t-2 border-gray-400 w-48 pt-2">
              <p className="text-sm font-medium text-gray-900">Dr. {doctorName}</p>
              <p className="text-xs text-gray-600">Requesting Doctor</p>
            </div>
          </div>
          
          <div className="text-center">
            <div className="border border-gray-300 rounded p-2 w-24 h-16 flex items-center justify-center">
              <p className="text-xs text-gray-500">Clinic Stamp</p>
            </div>
            <p className="text-xs text-gray-600 mt-1">Clinic Stamp</p>
          </div>

          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">{clinicName}</p>
            <p className="text-xs text-gray-600">{clinicPhone}</p>
            <p className="text-xs text-gray-600">{clinicEmail}</p>
          </div>
        </div>

        {/* Important Notes */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Important Notes</h3>
          <div className="text-sm text-blue-800 space-y-1">
            <p>• Please bring this request form when coming for sample collection</p>
            <p>• Results will be sent to the requesting doctor</p>
            <p>• For any queries, contact {clinicPhone}</p>
            <p>• This request is valid for 7 days from the date of issue</p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-4 border-t border-gray-300">
          <p className="text-sm text-gray-600">
            This lab request is generated by Pulse HMS
          </p>
          <p className="text-xs text-gray-500 mt-1">
            For any queries, please contact {clinicPhone}
          </p>
        </div>
      </div>
    </PrintLayout>
  )
})

LabRequest.displayName = 'LabRequest'

export default LabRequest 