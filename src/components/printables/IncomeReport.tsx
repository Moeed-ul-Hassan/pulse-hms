'use client'

import { forwardRef } from 'react'
import PrintLayout from './PrintLayout'

interface RevenueBreakdown {
  category: string
  amount: number
  percentage: number
  count: number
}

interface PaymentMethodBreakdown {
  method: string
  amount: number
  percentage: number
  count: number
}

interface IncomeReportProps {
  reportNumber: string
  reportType: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'CUSTOM'
  startDate: string
  endDate: string
  totalPatients: number
  totalRevenue: number
  revenueBreakdown: RevenueBreakdown[]
  paymentMethodBreakdown: PaymentMethodBreakdown[]
  averageRevenuePerPatient: number
  topPerformingDoctor?: string
  topPerformingService?: string
  notes?: string
  clinicName?: string
  clinicLogo?: string
  clinicAddress?: string
  clinicPhone?: string
  clinicEmail?: string
}

const IncomeReport = forwardRef<HTMLDivElement, IncomeReportProps>(({
  reportNumber,
  reportType,
  startDate,
  endDate,
  totalPatients,
  totalRevenue,
  revenueBreakdown,
  paymentMethodBreakdown,
  averageRevenuePerPatient,
  topPerformingDoctor,
  topPerformingService,
  notes,
  clinicName = 'Pulse HMS Clinic',
  clinicLogo,
  clinicAddress = '123 Medical Center, City, Country',
  clinicPhone = '+92 300 1234567',
  clinicEmail = 'info@pulsehms.com'
}, ref) => {
  return (
    <PrintLayout
      ref={ref}
      title="INCOME REPORT"
      clinicName={clinicName}
      clinicLogo={clinicLogo}
      clinicAddress={clinicAddress}
      clinicPhone={clinicPhone}
      clinicEmail={clinicEmail}
      watermark="Pulse HMS Income Report"
    >
      <div className="space-y-6">
        {/* Report Header */}
        <div className="flex justify-between items-start border-b border-gray-300 pb-4">
          <div>
            <p className="text-sm text-gray-600">Report #</p>
            <p className="text-lg font-bold text-gray-900">{reportNumber}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Report Type</p>
            <p className="text-lg font-semibold text-gray-900">{reportType}</p>
            <p className="text-sm text-gray-600">{startDate} to {endDate}</p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-gray-300 rounded-lg p-4 text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Patients</h3>
            <p className="text-3xl font-bold text-blue-600">{totalPatients}</p>
            <p className="text-sm text-gray-600">patients seen</p>
          </div>
          
          <div className="border border-gray-300 rounded-lg p-4 text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Revenue</h3>
            <p className="text-3xl font-bold text-green-600">Rs. {totalRevenue.toLocaleString()}</p>
            <p className="text-sm text-gray-600">total earnings</p>
          </div>
          
          <div className="border border-gray-300 rounded-lg p-4 text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Average Revenue</h3>
            <p className="text-3xl font-bold text-purple-600">Rs. {averageRevenuePerPatient.toLocaleString()}</p>
            <p className="text-sm text-gray-600">per patient</p>
          </div>
        </div>

        {/* Revenue Breakdown */}
        <div className="border border-gray-300 rounded-lg overflow-hidden">
          <h3 className="text-lg font-semibold text-gray-900 p-4 border-b border-gray-200 bg-gray-50">
            Revenue Breakdown by Category
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-3 text-sm font-medium text-gray-700">Category</th>
                  <th className="text-right p-3 text-sm font-medium text-gray-700">Amount</th>
                  <th className="text-right p-3 text-sm font-medium text-gray-700">Percentage</th>
                  <th className="text-right p-3 text-sm font-medium text-gray-700">Count</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {revenueBreakdown.map((item) => (
                  <tr key={item.category}>
                    <td className="p-3 text-sm font-medium text-gray-900">{item.category}</td>
                    <td className="p-3 text-sm text-gray-900 text-right">
                      Rs. {item.amount.toLocaleString()}
                    </td>
                    <td className="p-3 text-sm text-gray-900 text-right">
                      {item.percentage.toFixed(1)}%
                    </td>
                    <td className="p-3 text-sm text-gray-900 text-right">
                      {item.count}
                    </td>
                  </tr>
                ))}
                <tr className="bg-gray-50 font-semibold">
                  <td className="p-3 text-sm font-medium text-gray-900">Total</td>
                  <td className="p-3 text-sm font-medium text-gray-900 text-right">
                    Rs. {totalRevenue.toLocaleString()}
                  </td>
                  <td className="p-3 text-sm font-medium text-gray-900 text-right">100%</td>
                  <td className="p-3 text-sm font-medium text-gray-900 text-right">
                    {revenueBreakdown.reduce((sum, item) => sum + item.count, 0)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Payment Method Breakdown */}
        <div className="border border-gray-300 rounded-lg overflow-hidden">
          <h3 className="text-lg font-semibold text-gray-900 p-4 border-b border-gray-200 bg-gray-50">
            Payment Method Breakdown
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-3 text-sm font-medium text-gray-700">Payment Method</th>
                  <th className="text-right p-3 text-sm font-medium text-gray-700">Amount</th>
                  <th className="text-right p-3 text-sm font-medium text-gray-700">Percentage</th>
                  <th className="text-right p-3 text-sm font-medium text-gray-700">Transactions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paymentMethodBreakdown.map((item) => (
                  <tr key={item.method}>
                    <td className="p-3 text-sm font-medium text-gray-900">{item.method}</td>
                    <td className="p-3 text-sm text-gray-900 text-right">
                      Rs. {item.amount.toLocaleString()}
                    </td>
                    <td className="p-3 text-sm text-gray-900 text-right">
                      {item.percentage.toFixed(1)}%
                    </td>
                    <td className="p-3 text-sm text-gray-900 text-right">
                      {item.count}
                    </td>
                  </tr>
                ))}
                <tr className="bg-gray-50 font-semibold">
                  <td className="p-3 text-sm font-medium text-gray-900">Total</td>
                  <td className="p-3 text-sm font-medium text-gray-900 text-right">
                    Rs. {totalRevenue.toLocaleString()}
                  </td>
                  <td className="p-3 text-sm font-medium text-gray-900 text-right">100%</td>
                  <td className="p-3 text-sm font-medium text-gray-900 text-right">
                    {paymentMethodBreakdown.reduce((sum, item) => sum + item.count, 0)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Performance Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {topPerformingDoctor && (
            <div className="border border-gray-300 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">
                Top Performing Doctor
              </h3>
              <p className="text-sm text-gray-700">{topPerformingDoctor}</p>
            </div>
          )}
          
          {topPerformingService && (
            <div className="border border-gray-300 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">
                Top Performing Service
              </h3>
              <p className="text-sm text-gray-700">{topPerformingService}</p>
            </div>
          )}
        </div>

        {/* Revenue Chart Visualization */}
        <div className="border border-gray-300 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">
            Revenue Distribution
          </h3>
          <div className="space-y-3">
            {revenueBreakdown.map((item) => (
              <div key={item.category} className="flex items-center space-x-3">
                <div className="w-24 text-sm font-medium text-gray-700">{item.category}</div>
                <div className="flex-1 bg-gray-200 rounded-full h-4">
                  <div 
                    className="bg-blue-600 h-4 rounded-full" 
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
                <div className="w-20 text-sm text-gray-600 text-right">
                  {item.percentage.toFixed(1)}%
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notes */}
        {notes && (
          <div className="border border-gray-300 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">
              Notes
            </h3>
            <p className="text-sm text-gray-700 whitespace-pre-wrap">{notes}</p>
          </div>
        )}

        {/* Report Information */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Report Information</h3>
          <div className="text-sm text-blue-800 space-y-1">
            <p>• This report is generated automatically by Pulse HMS</p>
            <p>• Data is accurate as of the report generation time</p>
            <p>• For any discrepancies, please contact the administrator</p>
            <p>• This report is for internal use only</p>
          </div>
        </div>

        {/* Generated By */}
        <div className="flex justify-between items-end border-t border-gray-300 pt-6">
          <div className="flex-1">
            <div className="border-t-2 border-gray-400 w-48 pt-2">
              <p className="text-sm font-medium text-gray-900">Generated By</p>
              <p className="text-xs text-gray-600">Pulse HMS System</p>
            </div>
          </div>
          
          <div className="text-center">
            <div className="border border-gray-300 rounded p-2 w-24 h-16 flex items-center justify-center">
              <p className="text-xs text-gray-500">Admin Stamp</p>
            </div>
            <p className="text-xs text-gray-600 mt-1">Administrator</p>
          </div>

          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">{clinicName}</p>
            <p className="text-xs text-gray-600">{clinicPhone}</p>
            <p className="text-xs text-gray-600">{clinicEmail}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-4 border-t border-gray-300">
          <p className="text-sm text-gray-600">
            This income report is generated by Pulse HMS
          </p>
          <p className="text-xs text-gray-500 mt-1">
            For any queries, please contact {clinicPhone}
          </p>
        </div>
      </div>
    </PrintLayout>
  )
})

IncomeReport.displayName = 'IncomeReport'

export default IncomeReport 