'use client'

import { forwardRef } from 'react'
import PrintLayout from './PrintLayout'

interface Medication {
  id: string
  name: string
  dosage: string
  frequency: string
  duration: string
  instructions?: string
  beforeMeal?: boolean
}

interface PrescriptionProps {
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

const Prescription = forwardRef<HTMLDivElement, PrescriptionProps>(({
  prescriptionNumber,
  patientName,
  patientId,
  patientAge,
  patientGender,
  patientWeight,
  patientPhone,
  date,
  doctorName,
  doctorSignature,
  symptoms,
  diagnosis,
  medications,
  instructions,
  nextVisitDate,
  includeDosageChart = false,
  includeUrduInstructions = false,
  clinicName = 'Pulse HMS Clinic',
  clinicLogo,
  clinicAddress = '123 Medical Center, City, Country',
  clinicPhone = '+92 300 1234567',
  clinicEmail = 'info@pulsehms.com'
}, ref) => {
  return (
    <PrintLayout
      ref={ref}
      title="MEDICAL PRESCRIPTION"
      clinicName={clinicName}
      clinicLogo={clinicLogo}
      clinicAddress={clinicAddress}
      clinicPhone={clinicPhone}
      clinicEmail={clinicEmail}
      watermark="Pulse HMS Prescription"
    >
      <div className="space-y-6">
        {/* Prescription Header */}
        <div className="flex justify-between items-start border-b border-gray-300 pb-4">
          <div>
            <p className="text-sm text-gray-600">Prescription #</p>
            <p className="text-lg font-bold text-gray-900">{prescriptionNumber}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Date</p>
            <p className="text-lg font-semibold text-gray-900">{date}</p>
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
            {patientWeight && (
              <div>
                <p className="text-sm text-gray-600">Weight</p>
                <p className="text-sm font-medium">{patientWeight}</p>
              </div>
            )}
            {patientPhone && (
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="text-sm font-medium">{patientPhone}</p>
              </div>
            )}
          </div>
        </div>

        {/* Clinical Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-gray-300 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">
              Symptoms
            </h3>
            <p className="text-sm text-gray-700 whitespace-pre-wrap">{symptoms}</p>
          </div>

          <div className="border border-gray-300 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">
              Diagnosis
            </h3>
            <p className="text-sm text-gray-700 whitespace-pre-wrap">{diagnosis}</p>
          </div>
        </div>

        {/* Medications */}
        <div className="border border-gray-300 rounded-lg overflow-hidden">
          <h3 className="text-lg font-semibold text-gray-900 p-4 border-b border-gray-200 bg-gray-50">
            Prescribed Medications
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
                {medications.map((medication) => (
                  <tr key={medication.id}>
                    <td className="p-3 text-sm font-medium text-gray-900">{medication.name}</td>
                    <td className="p-3 text-sm text-gray-900">{medication.dosage}</td>
                    <td className="p-3 text-sm text-gray-900">{medication.frequency}</td>
                    <td className="p-3 text-sm text-gray-900">{medication.duration}</td>
                    <td className="p-3 text-sm text-gray-900">
                      {medication.instructions}
                      {medication.beforeMeal && (
                        <span className="block text-xs text-blue-600 mt-1">
                          Take before meals
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Dosage Chart */}
        {includeDosageChart && (
          <div className="border border-gray-300 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">
              Dosage Schedule
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Morning (8:00 AM)</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  {medications.filter(m => m.frequency.includes('morning') || m.frequency.includes('daily')).map(med => (
                    <li key={med.id}>• {med.name} - {med.dosage}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Evening (8:00 PM)</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  {medications.filter(m => m.frequency.includes('evening') || m.frequency.includes('daily')).map(med => (
                    <li key={med.id}>• {med.name} - {med.dosage}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Instructions */}
        {instructions && (
          <div className="border border-gray-300 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">
              Instructions
            </h3>
            <p className="text-sm text-gray-700 whitespace-pre-wrap">{instructions}</p>
          </div>
        )}

        {/* Urdu Instructions */}
        {includeUrduInstructions && (
          <div className="border border-gray-300 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">
              ہدایات (Instructions in Urdu)
            </h3>
            <div className="text-sm text-gray-700" style={{ fontFamily: 'Noto Nastaliq Urdu, serif' }}>
              <p>• تمام دوائیں وقت پر لیں</p>
              <p>• کھانے سے پہلے یا بعد میں دوائیں لیں جیسا کہ بتایا گیا ہے</p>
              <p>• کوئی بھی دوائی چھوڑنے سے پہلے ڈاکٹر سے مشورہ کریں</p>
              <p>• اگر کوئی مسئلہ ہو تو فوراً ڈاکٹر سے رابطہ کریں</p>
            </div>
          </div>
        )}

        {/* Next Visit */}
        {nextVisitDate && (
          <div className="border border-gray-300 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Next Visit</h3>
            <p className="text-sm text-gray-700">Follow-up appointment scheduled for: <span className="font-medium">{nextVisitDate}</span></p>
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

        {/* Footer Note */}
        <div className="text-center py-4 border-t border-gray-300">
          <p className="text-sm text-gray-600">
            This prescription is digitally signed by Pulse HMS
          </p>
          <p className="text-xs text-gray-500 mt-1">
            For any queries, please contact {clinicPhone}
          </p>
        </div>
      </div>
    </PrintLayout>
  )
})

Prescription.displayName = 'Prescription'

export default Prescription 