'use client'

import { useState, useEffect } from 'react'
import { BarChart3, Download, Calendar, Users, DollarSign, TrendingUp } from 'lucide-react'
import toast from 'react-hot-toast'

interface ReportData {
  totalPatients: number
  totalAppointments: number
  totalRevenue: number
  monthlyStats: {
    month: string
    patients: number
    appointments: number
    revenue: number
  }[]
  appointmentStatus: {
    status: string
    count: number
  }[]
  paymentStatus: {
    status: string
    count: number
    amount: number
  }[]
}

export default function ReportsPage() {
  const [reportData, setReportData] = useState<ReportData | null>(null)
  const [loading, setLoading] = useState(true)
  const [dateRange, setDateRange] = useState('30')

  useEffect(() => {
    fetchReportData()
  }, [dateRange])

  const fetchReportData = async () => {
    try {
      const response = await fetch(`/api/reports?days=${dateRange}`)
      if (response.ok) {
        const data = await response.json()
        setReportData(data)
      }
    } catch (error) {
      toast.error('Failed to fetch report data')
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const handleExport = async (type: string) => {
    try {
      const response = await fetch(`/api/reports/export?type=${type}&days=${dateRange}`)
      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `pulse-hms-report-${type}-${new Date().toISOString().split('T')[0]}.csv`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
        toast.success(`${type} report exported successfully`)
      }
    } catch (error) {
      toast.error('Failed to export report')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!reportData) {
    return (
      <div className="text-center py-12">
        <BarChart3 className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">No report data available</h3>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600">View insights and export data</p>
        </div>
        <div className="flex space-x-2">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="block px-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
            <option value="365">Last year</option>
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Patients
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {reportData.totalPatients}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Appointments
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {reportData.totalAppointments}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <DollarSign className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Revenue
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {formatCurrency(reportData.totalRevenue)}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Avg. Revenue/Day
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {formatCurrency(reportData.totalRevenue / parseInt(dateRange))}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Export Options */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            Export Reports
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <button
              onClick={() => handleExport('patients')}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              <Download className="mr-2 h-4 w-4" />
              Export Patients
            </button>
            <button
              onClick={() => handleExport('appointments')}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
            >
              <Download className="mr-2 h-4 w-4" />
              Export Appointments
            </button>
            <button
              onClick={() => handleExport('billing')}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700"
            >
              <Download className="mr-2 h-4 w-4" />
              Export Billing
            </button>
          </div>
        </div>
      </div>

      {/* Appointment Status Breakdown */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            Appointment Status Breakdown
          </h3>
          <div className="space-y-3">
            {reportData.appointmentStatus.map((status) => (
              <div key={status.status} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 capitalize">
                  {status.status.replace('_', ' ')}
                </span>
                <span className="text-sm text-gray-500">
                  {status.count} appointments
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Payment Status Breakdown */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            Payment Status Breakdown
          </h3>
          <div className="space-y-3">
            {reportData.paymentStatus.map((status) => (
              <div key={status.status} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  {status.status}
                </span>
                <div className="text-sm text-gray-500">
                  <span>{status.count} bills</span>
                  <span className="mx-2">•</span>
                  <span>{formatCurrency(status.amount)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monthly Trends */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            Monthly Trends
          </h3>
          <div className="space-y-3">
            {reportData.monthlyStats.map((month) => (
              <div key={month.month} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <span className="text-sm font-medium text-gray-700">
                  {month.month}
                </span>
                <div className="flex space-x-4 text-sm text-gray-500">
                  <span>{month.patients} patients</span>
                  <span>{month.appointments} appointments</span>
                  <span className="font-medium">{formatCurrency(month.revenue)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 