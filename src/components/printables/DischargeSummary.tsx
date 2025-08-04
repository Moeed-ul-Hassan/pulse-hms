'use client'

import { forwardRef } from 'react'
import PrintLayout from './PrintLayout'

interface DischargeMedication {
  id: string
  name: string
  dosage: string
  frequency: string
  duration: string
  instructions?: string
}

interface DischargeSummaryProps {
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

const DischargeSummary = forwardRef<HTMLDivElement, DischargeSummaryProps>(({
  summaryNumber,
  patientName,
  patientId,
  patientAge,
  patientGender,
  patientPhone,
  patientAddress,
  bloodGroup,
  emergencyContact,
  admissionDate,
  dischargeDate,
  admissionDiagnosis,
  finalDiagnosis,
  symptoms,
  investigationsDone,
  treatmentProvided,
  proceduresPerformed,
  dischargeMedications,
  followUpAdvice,
  nextFollowUpDate,
  dietRestrictions,
  activityRestrictions,
  doctorName,
  doctorSignature,
  isMiniVersion = false,
  clinicName = 'Pulse HMS Clinic',
  clinicLogo,
  clinicAddress = '123 Medical Center, City, Country',
  clinicPhone = '+92 300 1234567',
  clinicEmail = 'info@pulsehms.com'
}, ref) => {
  const stayDuration = Math.ceil(
    (new Date(dischargeDate).getTime() - new Date(admissionDate).getTime()) / (1000 * 60 * 60 * 24)
  )

  if (isMiniVersion) {
    return (
      <PrintLayout
        ref={ref}
        title="DISCHARGE SUMMARY (MINI)"
        clinicName={clinicName}
        clinicLogo={clinicLogo}
        clinicAddress={clinicAddress}
        clinicPhone={clinicPhone}
        clinicEmail={clinicEmail}
        watermark="Pulse HMS Discharge Summary"
      >
        <div className="space-y-4">
          {/* Header */}
          <div className="flex justify-between items-start border-b border-gray-300 pb-3">
            <div>
              <p className="text-sm text-gray-600">Summary #</p>
              <p className="text-lg font-bold text-gray-900">{summaryNumber}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Discharge Date</p>
              <p className="text-lg font-semibold text-gray-900">{dischargeDate}</p>
            </div>
          </div>

          {/* Patient Info */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Patient Name</p>
              <p className="font-medium">{patientName}</p>
            </div>
            <div>
              <p className="text-gray-600">Patient ID</p>
              <p className="font-medium">{patientId}</p>
            </div>
            {patientAge && (
              <div>
                <p className="text-gray-600">Age</p>
                <p className="font-medium">{patientAge} years</p>
              </div>
            )}
            {patientGender && (
              <div>
                <p className="text-gray-600">Gender</p>
                <p className="font-medium">{patientGender}</p>
              </div>
            )}
          </div>

          {/* Key Information */}
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium text-gray-700">Final Diagnosis</p>
              <p className="text-sm text-gray-600">{finalDiagnosis}</p>
            </div>
            
            <div>
              <p className="text-sm font-medium text-gray-700">Treatment Provided</p>
              <p className="text-sm text-gray-600">{treatmentProvided}</p>
            </div>

            {dischargeMedications.length > 0 && (
              <div>
                <p className="text-sm font-medium text-gray-700">Discharge Medications</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  {dischargeMedications.map(med => (
                    <li key={med.id}>• {med.name} - {med.dosage} ({med.frequency})</li>
                  ))}
                </ul>
              </div>
            )}

            <div>
              <p className="text-sm font-medium text-gray-700">Follow-up Advice</p>
              <p className="text-sm text-gray-600">{followUpAdvice}</p>
            </div>

            {nextFollowUpDate && (
              <div>
                <p className="text-sm font-medium text-gray-700">Next Follow-up</p>
                <p className="text-sm text-gray-600">{nextFollowUpDate}</p>
              </div>
            )}
          </div>

          {/* Doctor Signature */}
          <div className="flex justify-between items-end border-t border-gray-300 pt-4">
            <div className="border-t-2 border-gray-400 w-32 pt-2">
              <p className="text-sm font-medium text-gray-900">Dr. {doctorName}</p>
            </div>
            <div className="text-center">
              <div className="border border-gray-300 rounded p-1 w-16 h-12 flex items-center justify-center">
                {doctorSignature ? (
                  <img 
                    src={doctorSignature} 
                    alt="Doctor Signature" 
                    className="max-w-full max-h-full object-contain"
                  />
                ) : (
                  <p className="text-xs text-gray-500">Signature</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </PrintLayout>
    )
  }

  return (
    <PrintLayout
      ref={ref}
      title="DISCHARGE SUMMARY (FULL)"
      clinicName={clinicName}
      clinicLogo={clinicLogo}
      clinicAddress={clinicAddress}
      clinicPhone={clinicPhone}
      clinicEmail={clinicEmail}
      watermark="Pulse HMS Discharge Summary"
    >
      <div className="space-y-6">
        {/* Summary Header */}
        <div className="flex justify-between items-start border-b border-gray-300 pb-4">
          <div>
            <p className="text-sm text-gray-600">Summary #</p>
            <p className="text-lg font-bold text-gray-900">{summaryNumber}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Discharge Date</p>
            <p className="text-lg font-semibold text-gray-900">{dischargeDate}</p>
            <p className="text-sm text-gray-600">Length of Stay: {stayDuration} days</p>
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
            {emergencyContact && (
              <div>
                <p className="text-sm text-gray-600">Emergency Contact</p>
                <p className="text-sm font-medium">{emergencyContact}</p>
              </div>
            )}
          </div>
        </div>

        {/* Admission & Discharge Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-gray-300 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">
              Admission Details
            </h3>
            <div className="space-y-2">
              <div>
                <p className="text-sm text-gray-600">Admission Date</p>
                <p className="text-sm font-medium">{admissionDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Admission Diagnosis</p>
                <p className="text-sm font-medium">{admissionDiagnosis}</p>
              </div>
            </div>
          </div>

          <div className="border border-gray-300 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">
              Discharge Details
            </h3>
            <div className="space-y-2">
              <div>
                <p className="text-sm text-gray-600">Discharge Date</p>
                <p className="text-sm font-medium">{dischargeDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Final Diagnosis</p>
                <p className="text-sm font-medium">{finalDiagnosis}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Clinical Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-gray-300 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">
              Presenting Symptoms
            </h3>
            <p className="text-sm text-gray-700 whitespace-pre-wrap">{symptoms}</p>
          </div>

          <div className="border border-gray-300 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">
              Investigations Done
            </h3>
            <p className="text-sm text-gray-700 whitespace-pre-wrap">{investigationsDone}</p>
          </div>
        </div>

        {/* Treatment Provided */}
        <div className="border border-gray-300 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">
            Treatment Provided
          </h3>
          <p className="text-sm text-gray-700 whitespace-pre-wrap">{treatmentProvided}</p>
        </div>

        {/* Procedures Performed */}
        {proceduresPerformed && proceduresPerformed.length > 0 && (
          <div className="border border-gray-300 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">
              Procedures Performed
            </h3>
            <ul className="text-sm text-gray-700 space-y-1">
              {proceduresPerformed.map((procedure, index) => (
                <li key={index}>• {procedure}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Discharge Medications */}
        <div className="border border-gray-300 rounded-lg overflow-hidden">
          <h3 className="text-lg font-semibold text-gray-900 p-4 border-b border-gray-200 bg-gray-50">
            Discharge Medications ({dischargeMedications.length} medications)
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-3 text-sm font-medium text-gray-700">Medication</th>
                  <th className="text-left p-3 text-sm font-medium text-gray-700">Dosage</th>
                  <th className="text-left p-3 text-sm font-medium text-gray-700">Frequency</th>
                  <th className="text-left p-3 text-sm font-medium text-gray-700">Duration</th>
                  <th className="text-left p-3 text-sm font-medium text-gray-700">Instructions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {dischargeMedications.map((medication) => (
                  <tr key={medication.id}>
                    <td className="p-3 text-sm font-medium text-gray-900">{medication.name}</td>
                    <td className="p-3 text-sm text-gray-900">{medication.dosage}</td>
                    <td className="p-3 text-sm text-gray-900">{medication.frequency}</td>
                    <td className="p-3 text-sm text-gray-900">{medication.duration}</td>
                    <td className="p-3 text-sm text-gray-900">{medication.instructions || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Follow-up Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-gray-300 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">
              Follow-up Advice
            </h3>
            <p className="text-sm text-gray-700 whitespace-pre-wrap">{followUpAdvice}</p>
            {nextFollowUpDate && (
              <div className="mt-3">
                <p className="text-sm font-medium text-gray-700">Next Follow-up Date</p>
                <p className="text-sm text-gray-600">{nextFollowUpDate}</p>
              </div>
            )}
          </div>

          <div className="border border-gray-300 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">
              Restrictions & Instructions
            </h3>
            <div className="space-y-3">
              {dietRestrictions && (
                <div>
                  <p className="text-sm font-medium text-gray-700">Diet Restrictions</p>
                  <p className="text-sm text-gray-600">{dietRestrictions}</p>
                </div>
              )}
              {activityRestrictions && (
                <div>
                  <p className="text-sm font-medium text-gray-700">Activity Restrictions</p>
                  <p className="text-sm text-gray-600">{activityRestrictions}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Doctor Signature */}
        <div className="flex justify-between items-end border-t border-gray-300 pt-6">
          <div className="flex-1">
            <div className="border-t-2 border-gray-400 w-48 pt-2">
              <p className="text-sm font-medium text-gray-900">Dr. {doctorName}</p>
              <p className="text-xs text-gray-600">Attending Physician</p>
            </div>
          </div>
          
          <div className="text-center">
            <div className="border border-gray-300 rounded p-2 w-24 h-16 flex items-center justify-center">
              {doctorSignature ? (
                <img 
                  src={doctorSignature} 
                  alt="Doctor Signature" 
                  className="max-w-full max-h-full object-contain"
                />
              ) : (
                <p className="text-xs text-gray-500">Signature</p>
              )}
            </div>
            <p className="text-xs text-gray-600 mt-1">Doctor's Signature</p>
          </div>

          <div className="text-center">
            <div className="border border-gray-300 rounded p-2 w-24 h-16 flex items-center justify-center">
              <p className="text-xs text-gray-500">Clinic Stamp</p>
            </div>
            <p className="text-xs text-gray-600 mt-1">Clinic Stamp</p>
          </div>
        </div>

        {/* Important Notes */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Important Notes</h3>
          <div className="text-sm text-blue-800 space-y-1">
            <p>• Take all medications as prescribed</p>
            <p>• Follow the diet and activity restrictions</p>
            <p>• Attend all follow-up appointments</p>
            <p>• Contact the clinic immediately if symptoms worsen</p>
            <p>• For any queries, contact {clinicPhone}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-4 border-t border-gray-300">
          <p className="text-sm text-gray-600">
            This discharge summary is generated by Pulse HMS
          </p>
          <p className="text-xs text-gray-500 mt-1">
            For any queries, please contact {clinicPhone} or {clinicEmail}
          </p>
        </div>
      </div>
    </PrintLayout>
  )
})

DischargeSummary.displayName = 'DischargeSummary'

export default DischargeSummary 