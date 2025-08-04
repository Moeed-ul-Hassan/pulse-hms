'use client'

import { useState, useEffect } from 'react'
import { Plus, DollarSign, Search, Eye, Download, CreditCard } from 'lucide-react'
import toast from 'react-hot-toast'

interface Bill {
  id: string
  amount: number
  description: string
  status: string
  paidAmount: number
  paidAt: string | null
  createdAt: string
  patient: {
    id: string
    name: string
  }
  appointment?: {
    id: string
    scheduledAt: string
  }
}

export default function BillingPage() {
  const [bills, setBills] = useState<Bill[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  useEffect(() => {
    fetchBills()
  }, [])

  const fetchBills = async () => {
    try {
      const response = await fetch('/api/bills')
      if (response.ok) {
        const data = await response.json()
        setBills(data.bills)
      }
    } catch (error) {
      toast.error('Failed to fetch bills')
    } finally {
      setLoading(false)
    }
  }

  const filteredBills = bills.filter(bill => {
    const matchesSearch = bill.patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bill.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || bill.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PAID':
        return 'bg-green-100 text-green-800'
      case 'PARTIAL':
        return 'bg-yellow-100 text-yellow-800'
      case 'UNPAID':
        return 'bg-red-100 text-red-800'
      case 'REFUNDED':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const totalRevenue = bills.filter(b => b.status === 'PAID').reduce((sum, b) => sum + b.paidAmount, 0)
  const pendingAmount = bills.filter(b => b.status === 'UNPAID').reduce((sum, b) => sum + b.amount, 0)
  const partialAmount = bills.filter(b => b.status === 'PARTIAL').reduce((sum, b) => sum + (b.amount - b.paidAmount), 0)

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Billing</h1>
          <p className="text-gray-600">Manage invoices and payment tracking</p>
        </div>
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" />
          Create Invoice
        </button>
      </div>

      {/* Revenue Overview */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Revenue
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {formatCurrency(totalRevenue)}
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
                <CreditCard className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Pending Amount
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {formatCurrency(pendingAmount)}
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
                    Partial Payments
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {formatCurrency(partialAmount)}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search bills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>
        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="block px-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="all">All Status</option>
            <option value="PAID">Paid</option>
            <option value="UNPAID">Unpaid</option>
            <option value="PARTIAL">Partial</option>
            <option value="REFUNDED">Refunded</option>
          </select>
        </div>
      </div>

      {/* Bills Table */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {filteredBills.map((bill) => (
            <li key={bill.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                        <DollarSign className="h-5 w-5 text-green-600" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="flex items-center">
                        <p className="text-sm font-medium text-gray-900">
                          {bill.patient.name}
                        </p>
                        <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(bill.status)}`}>
                          {bill.status}
                        </span>
                      </div>
                      <div className="mt-1 text-sm text-gray-500">
                        {bill.description}
                      </div>
                      <div className="mt-1 flex items-center text-sm text-gray-500">
                        <span className="font-medium">{formatCurrency(bill.amount)}</span>
                        {bill.status === 'PARTIAL' && (
                          <>
                            <span className="mx-2">•</span>
                            <span>Paid: {formatCurrency(bill.paidAmount)}</span>
                          </>
                        )}
                        {bill.paidAt && (
                          <>
                            <span className="mx-2">•</span>
                            <span>Paid on: {formatDate(bill.paidAt)}</span>
                          </>
                        )}
                      </div>
                      <div className="mt-1 text-sm text-gray-500">
                        Created: {formatDate(bill.createdAt)}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="text-blue-600 hover:text-blue-900">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="text-gray-600 hover:text-gray-900">
                      <Download className="h-4 w-4" />
                    </button>
                    {bill.status !== 'PAID' && (
                      <button className="text-green-600 hover:text-green-900">
                        <CreditCard className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        {filteredBills.length === 0 && (
          <div className="text-center py-12">
            <DollarSign className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No bills found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by creating a new invoice.
            </p>
          </div>
        )}
      </div>
    </div>
  )
} 