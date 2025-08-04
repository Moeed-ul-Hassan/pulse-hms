'use client'

import { forwardRef } from 'react'
import PrintLayout from './PrintLayout'

interface Visit {
  id: string
  date: string
  doctorName: string
  complaint: string
  diagnosis: string
  treatment: string
  prescription?: string
  notes?: string
}

interface LabReport {
  id: string
  date: string
  testName: string
  result: string
  normalRange?: string
  status: 'NORMAL' | 'ABNORMAL' | 'CRITICAL'
}

interface Allergy {
  id: string
  allergen: string
  reaction: string
  severity: 'MILD' | 'MODERATE' | 'SEVERE'
}

interface MedicalHistoryProps {
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

const MedicalHistory = forwardRef<HTMLDivElement, MedicalHistoryProps>(({
  patientName,
  patientId,
  patientAge,
  patientGender,
  patientPhone,
  patientAddress,
  bloodGroup,
  emergencyContact,
  visits,
  labReports,
  allergies,
  chronicConditions,
  currentMedications,
  familyHistory,
  exportDate,
  clinicName = 'Pulse HMS Clinic',
  clinicLogo,
  clinicAddress = '123 Medical Center, City, Country',
  clinicPhone = '+92 300 1234567',
  clinicEmail = 'info@pulsehms.com'
}, ref) => {
  return (
    <PrintLayout
      ref={ref}
      title="COMPLETE MEDICAL HISTORY"
      clinicName={clinicName}
      clinicLogo={clinicLogo}
      clinicAddress={clinicAddress}
      clinicPhone={clinicPhone}
      clinicEmail={clinicEmail}
      watermark="Exported via Pulse HMS"
    >
      <div className="space-y-6">
        {/* Export Header */}
        <div className="flex justify-between items-start border-b border-gray-300 pb-4">
          <div>
            <p className="text-sm text-gray-600">Patient ID</p>
            <p className="text-lg font-bold text-gray-900">{patientId}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Export Date</p>
            <p className="text-lg font-semibold text-gray-900">{exportDate}</p>
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

        {/* Medical Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Chronic Conditions */}
          {chronicConditions && chronicConditions.length > 0 && (
            <div className="border border-gray-300 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">
                Chronic Conditions
              </h3>
              <ul className="text-sm text-gray-700 space-y-1">
                {chronicConditions.map((condition, index) => (
                  <li key={index}>• {condition}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Current Medications */}
          {currentMedications && currentMedications.length > 0 && (
            <div className="border border-gray-300 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">
                Current Medications
              </h3>
              <ul className="text-sm text-gray-700 space-y-1">
                {currentMedications.map((medication, index) => (
                  <li key={index}>• {medication}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Allergies */}
        {allergies.length > 0 && (
          <div className="border border-gray-300 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">
              Allergy History
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-3 text-sm font-medium text-gray-700">Allergen</th>
                    <th className="text-left p-3 text-sm font-medium text-gray-700">Reaction</th>
                    <th className="text-left p-3 text-sm font-medium text-gray-700">Severity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {allergies.map((allergy) => (
                    <tr key={allergy.id}>
                      <td className="p-3 text-sm font-medium text-gray-900">{allergy.allergen}</td>
                      <td className="p-3 text-sm text-gray-900">{allergy.reaction}</td>
                      <td className="p-3 text-sm text-gray-900">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          allergy.severity === 'SEVERE' ? 'bg-red-100 text-red-800' :
                          allergy.severity === 'MODERATE' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {allergy.severity}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Family History */}
        {familyHistory && (
          <div className="border border-gray-300 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">
              Family History
            </h3>
            <p className="text-sm text-gray-700 whitespace-pre-wrap">{familyHistory}</p>
          </div>
        )}

        {/* Visit History */}
        <div className="border border-gray-300 rounded-lg overflow-hidden">
          <h3 className="text-lg font-semibold text-gray-900 p-4 border-b border-gray-200 bg-gray-50">
            Complete Visit History ({visits.length} visits)
          </h3>
          <div className="space-y-4 p-4">
            {visits.map((visit, index) => (
              <div key={visit.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="text-md font-semibold text-gray-900">
                      Visit #{visits.length - index} - {visit.date}
                    </h4>
                    <p className="text-sm text-gray-600">Dr. {visit.doctorName}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Complaint:</p>
                    <p className="text-sm text-gray-600">{visit.complaint}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Diagnosis:</p>
                    <p className="text-sm text-gray-600">{visit.diagnosis}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm font-medium text-gray-700">Treatment:</p>
                    <p className="text-sm text-gray-600">{visit.treatment}</p>
                  </div>
                  {visit.prescription && (
                    <div className="md:col-span-2">
                      <p className="text-sm font-medium text-gray-700">Prescription:</p>
                      <p className="text-sm text-gray-600">{visit.prescription}</p>
                    </div>
                  )}
                  {visit.notes && (
                    <div className="md:col-span-2">
                      <p className="text-sm font-medium text-gray-700">Notes:</p>
                      <p className="text-sm text-gray-600">{visit.notes}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lab Reports */}
        {labReports.length > 0 && (
          <div className="border border-gray-300 rounded-lg overflow-hidden">
            <h3 className="text-lg font-semibold text-gray-900 p-4 border-b border-gray-200 bg-gray-50">
              Laboratory Reports ({labReports.length} reports)
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-3 text-sm font-medium text-gray-700">Date</th>
                    <th className="text-left p-3 text-sm font-medium text-gray-700">Test Name</th>
                    <th className="text-left p-3 text-sm font-medium text-gray-700">Result</th>
                    <th className="text-left p-3 text-sm font-medium text-gray-700">Normal Range</th>
                    <th className="text-left p-3 text-sm font-medium text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {labReports.map((report) => (
                    <tr key={report.id}>
                      <td className="p-3 text-sm text-gray-900">{report.date}</td>
                      <td className="p-3 text-sm font-medium text-gray-900">{report.testName}</td>
                      <td className="p-3 text-sm text-gray-900">{report.result}</td>
                      <td className="p-3 text-sm text-gray-900">{report.normalRange || 'N/A'}</td>
                      <td className="p-3 text-sm text-gray-900">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          report.status === 'CRITICAL' ? 'bg-red-100 text-red-800' :
                          report.status === 'ABNORMAL' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {report.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Export Information */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-yellow-900 mb-2">Export Information</h3>
          <div className="text-sm text-yellow-800 space-y-1">
            <p>• This document contains the complete medical history of {patientName}</p>
            <p>• Generated on {exportDate} for referral/transfer purposes</p>
            <p>• All data is accurate as of the export date</p>
            <p>• For any discrepancies, please contact {clinicPhone}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-4 border-t border-gray-300">
          <p className="text-sm text-gray-600">
            This medical history is exported via Pulse HMS
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {clinicName} | {clinicPhone} | {clinicEmail}
          </p>
        </div>
      </div>
    </PrintLayout>
  )
})

MedicalHistory.displayName = 'MedicalHistory'

export default MedicalHistory 