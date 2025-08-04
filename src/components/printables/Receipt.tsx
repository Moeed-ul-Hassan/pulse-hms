'use client'

import { forwardRef } from 'react'
import PrintLayout from './PrintLayout'

interface Service {
  id: string
  name: string
  quantity: number
  unitPrice: number
  total: number
}

interface ReceiptProps {
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

const Receipt = forwardRef<HTMLDivElement, ReceiptProps>(({
  receiptNumber,
  patientName,
  patientId,
  patientPhone,
  patientAge,
  patientGender,
  date,
  doctorName,
  services,
  subtotal,
  discount,
  tax,
  total,
  paid,
  balance,
  paymentMethod,
  clinicName = 'Pulse HMS Clinic',
  clinicLogo,
  clinicAddress = '123 Medical Center, City, Country',
  clinicPhone = '+92 300 1234567',
  clinicEmail = 'info@pulsehms.com',
  notes
}, ref) => {
  const qrCodeData = JSON.stringify({
    type: 'receipt',
    receiptNumber,
    patientId,
    date,
    total
  })

  return (
    <PrintLayout
      ref={ref}
      title="MEDICAL RECEIPT"
      clinicName={clinicName}
      clinicLogo={clinicLogo}
      clinicAddress={clinicAddress}
      clinicPhone={clinicPhone}
      clinicEmail={clinicEmail}
      showQRCode={true}
      qrCodeData={qrCodeData}
      watermark="Pulse HMS Receipt"
    >
      <div className="space-y-6">
        {/* Receipt Header */}
        <div className="flex justify-between items-start border-b border-gray-300 pb-4">
          <div>
            <p className="text-sm text-gray-600">Receipt #</p>
            <p className="text-lg font-bold text-gray-900">{receiptNumber}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Date</p>
            <p className="text-lg font-semibold text-gray-900">{date}</p>
          </div>
        </div>

        {/* Patient Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-gray-300 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">
              Patient Information
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Name:</span>
                <span className="text-sm font-medium">{patientName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Patient ID:</span>
                <span className="text-sm font-medium">{patientId}</span>
              </div>
              {patientPhone && (
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Phone:</span>
                  <span className="text-sm font-medium">{patientPhone}</span>
                </div>
              )}
              {patientAge && (
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Age:</span>
                  <span className="text-sm font-medium">{patientAge} years</span>
                </div>
              )}
              {patientGender && (
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Gender:</span>
                  <span className="text-sm font-medium">{patientGender}</span>
                </div>
              )}
            </div>
          </div>

          <div className="border border-gray-300 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">
              Consultation Details
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Doctor:</span>
                <span className="text-sm font-medium">Dr. {doctorName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Payment Method:</span>
                <span className="text-sm font-medium">{paymentMethod}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Services Table */}
        <div className="border border-gray-300 rounded-lg overflow-hidden">
          <h3 className="text-lg font-semibold text-gray-900 p-4 border-b border-gray-200 bg-gray-50">
            Services & Charges
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-3 text-sm font-medium text-gray-700">Service</th>
                  <th className="text-right p-3 text-sm font-medium text-gray-700">Qty</th>
                  <th className="text-right p-3 text-sm font-medium text-gray-700">Unit Price</th>
                  <th className="text-right p-3 text-sm font-medium text-gray-700">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {services.map((service) => (
                  <tr key={service.id}>
                    <td className="p-3 text-sm text-gray-900">{service.name}</td>
                    <td className="p-3 text-sm text-gray-900 text-right">{service.quantity}</td>
                    <td className="p-3 text-sm text-gray-900 text-right">
                      Rs. {service.unitPrice.toLocaleString()}
                    </td>
                    <td className="p-3 text-sm font-medium text-gray-900 text-right">
                      Rs. {service.total.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Fee Breakdown */}
        <div className="border border-gray-300 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">
            Fee Breakdown
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Subtotal:</span>
              <span className="text-sm font-medium">Rs. {subtotal.toLocaleString()}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span className="text-sm">Discount:</span>
                <span className="text-sm font-medium">- Rs. {discount.toLocaleString()}</span>
              </div>
            )}
            {tax > 0 && (
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Tax:</span>
                <span className="text-sm font-medium">Rs. {tax.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between border-t border-gray-200 pt-2">
              <span className="text-lg font-semibold text-gray-900">Total Amount:</span>
              <span className="text-lg font-bold text-gray-900">Rs. {total.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Amount Paid:</span>
              <span className="text-sm font-medium">Rs. {paid.toLocaleString()}</span>
            </div>
            {balance > 0 && (
              <div className="flex justify-between text-red-600">
                <span className="text-sm font-medium">Balance Due:</span>
                <span className="text-sm font-bold">Rs. {balance.toLocaleString()}</span>
              </div>
            )}
            {balance === 0 && (
              <div className="flex justify-between text-green-600">
                <span className="text-sm font-medium">Status:</span>
                <span className="text-sm font-bold">PAID IN FULL</span>
              </div>
            )}
          </div>
        </div>

        {/* Notes */}
        {notes && (
          <div className="border border-gray-300 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Notes</h3>
            <p className="text-sm text-gray-700">{notes}</p>
          </div>
        )}

        {/* Thank You Message */}
        <div className="text-center py-6 border-t border-gray-300">
          <p className="text-lg font-semibold text-gray-900 mb-2">
            Thank you for choosing {clinicName}!
          </p>
          <p className="text-sm text-gray-600">
            For any queries, please contact us at {clinicPhone} or {clinicEmail}
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Scan the QR code above to access your digital receipt
          </p>
        </div>
      </div>
    </PrintLayout>
  )
})

Receipt.displayName = 'Receipt'

export default Receipt 