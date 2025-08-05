'use client'

import { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { 
  Receipt, 
  Printer, 
  Download, 
  Plus, 
  Trash2, 
  Save,
  User,
  Calendar,
  DollarSign,
  FileText
} from 'lucide-react'
import { useReactToPrint } from 'react-to-print'
import toast from 'react-hot-toast'
import { PrimaryButton } from '@/components'

interface ServiceItem {
  id: string
  name: string
  quantity: number
  unitPrice: number
  total: number
}

const receiptSchema = z.object({
  receiptNumber: z.string().min(1, 'Receipt number is required'),
  patientName: z.string().min(1, 'Patient name is required'),
  patientId: z.string().min(1, 'Patient ID is required'),
  patientPhone: z.string().optional(),
  patientAge: z.number().min(1, 'Age is required'),
  patientGender: z.string().min(1, 'Gender is required'),
  date: z.string().min(1, 'Date is required'),
  doctorName: z.string().min(1, 'Doctor name is required'),
  discount: z.number().min(0, 'Discount cannot be negative'),
  tax: z.number().min(0, 'Tax cannot be negative'),
  paymentMethod: z.string().min(1, 'Payment method is required'),
  notes: z.string().optional()
})

type ReceiptForm = z.infer<typeof receiptSchema>

export default function NewReceipt() {
  const [services, setServices] = useState<ServiceItem[]>([
    { id: '1', name: '', quantity: 1, unitPrice: 0, total: 0 }
  ])
  const [showForm, setShowForm] = useState(true)
  const [isPrinting, setIsPrinting] = useState(false)
  const printRef = useRef<HTMLDivElement>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset
  } = useForm<ReceiptForm>({
    resolver: zodResolver(receiptSchema),
    defaultValues: {
      receiptNumber: `RCP-${new Date().getFullYear()}-${String(Date.now()).slice(-4)}`,
      date: new Date().toISOString().split('T')[0],
      discount: 0,
      tax: 0,
      paymentMethod: 'Cash'
    }
  })

  const watchedServices = watch('services')

  const addService = () => {
    const newId = String(services.length + 1)
    setServices([...services, { id: newId, name: '', quantity: 1, unitPrice: 0, total: 0 }])
  }

  const removeService = (id: string) => {
    if (services.length > 1) {
      setServices(services.filter(service => service.id !== id))
    }
  }

  const updateService = (id: string, field: keyof ServiceItem, value: string | number) => {
    setServices(services.map(service => {
      if (service.id === id) {
        const updatedService = { ...service, [field]: value }
        if (field === 'quantity' || field === 'unitPrice') {
          updatedService.total = updatedService.quantity * updatedService.unitPrice
        }
        return updatedService
      }
      return service
    }))
  }

  const calculateSubtotal = () => {
    return services.reduce((sum, service) => sum + service.total, 0)
  }

  const calculateTotal = () => {
    const subtotal = calculateSubtotal()
    const discount = watch('discount') || 0
    const tax = watch('tax') || 0
    return subtotal - discount + tax
  }

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    onBeforeGetContent: () => setIsPrinting(true),
    onAfterPrint: () => {
      setIsPrinting(false)
      toast.success('Receipt printed successfully!')
    }
  })

  const handleSave = () => {
    setShowForm(false)
    toast.success('Receipt saved! Click Print to generate the receipt.')
  }

  const handleReset = () => {
    reset()
    setServices([{ id: '1', name: '', quantity: 1, unitPrice: 0, total: 0 }])
    setShowForm(true)
  }

  const onSubmit = (data: ReceiptForm) => {
    console.log('Receipt data:', data)
    handleSave()
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            New Receipt
          </h1>
          <p className="text-gray-600 mt-2">Create and print a custom receipt</p>
        </div>
        <div className="flex space-x-3">
          {!showForm && (
            <>
              <PrimaryButton
                onClick={handlePrint}
                loading={isPrinting}
                className="px-6 py-3"
              >
                <Printer className="h-4 w-4 mr-2" />
                Print Receipt
              </PrimaryButton>
              <PrimaryButton
                onClick={handleReset}
                variant="secondary"
                className="px-6 py-3"
              >
                <FileText className="h-4 w-4 mr-2" />
                New Receipt
              </PrimaryButton>
            </>
          )}
        </div>
      </div>

      {/* Receipt Form */}
      {showForm && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="form-label">Receipt Number *</label>
                <input
                  {...register('receiptNumber')}
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter receipt number"
                />
                {errors.receiptNumber && (
                  <p className="mt-1 text-sm text-red-600">{errors.receiptNumber.message}</p>
                )}
              </div>

              <div>
                <label className="form-label">Date *</label>
                <input
                  {...register('date')}
                  type="date"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
                {errors.date && (
                  <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>
                )}
              </div>
            </div>

            {/* Patient Information */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <User className="h-5 w-5 mr-2 text-blue-600" />
                Patient Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="form-label">Patient Name *</label>
                  <input
                    {...register('patientName')}
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter patient name"
                  />
                  {errors.patientName && (
                    <p className="mt-1 text-sm text-red-600">{errors.patientName.message}</p>
                  )}
                </div>

                <div>
                  <label className="form-label">Patient ID *</label>
                  <input
                    {...register('patientId')}
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter patient ID"
                  />
                  {errors.patientId && (
                    <p className="mt-1 text-sm text-red-600">{errors.patientId.message}</p>
                  )}
                </div>

                <div>
                  <label className="form-label">Phone Number</label>
                  <input
                    {...register('patientPhone')}
                    type="tel"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter phone number"
                  />
                </div>

                <div>
                  <label className="form-label">Age *</label>
                  <input
                    {...register('patientAge', { valueAsNumber: true })}
                    type="number"
                    min="1"
                    max="150"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter age"
                  />
                  {errors.patientAge && (
                    <p className="mt-1 text-sm text-red-600">{errors.patientAge.message}</p>
                  )}
                </div>

                <div>
                  <label className="form-label">Gender *</label>
                  <select
                    {...register('patientGender')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.patientGender && (
                    <p className="mt-1 text-sm text-red-600">{errors.patientGender.message}</p>
                  )}
                </div>

                <div>
                  <label className="form-label">Doctor Name *</label>
                  <input
                    {...register('doctorName')}
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter doctor name"
                  />
                  {errors.doctorName && (
                    <p className="mt-1 text-sm text-red-600">{errors.doctorName.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="border-t border-gray-200 pt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <DollarSign className="h-5 w-5 mr-2 text-green-600" />
                  Services & Charges
                </h3>
                <button
                  type="button"
                  onClick={addService}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-lg text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Service
                </button>
              </div>

              <div className="space-y-4">
                {services.map((service, index) => (
                  <div key={service.id} className="grid grid-cols-12 gap-4 items-center p-4 bg-gray-50 rounded-xl">
                    <div className="col-span-4">
                      <input
                        type="text"
                        value={service.name}
                        onChange={(e) => updateService(service.id, 'name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Service name"
                      />
                    </div>
                    <div className="col-span-2">
                      <input
                        type="number"
                        value={service.quantity}
                        onChange={(e) => updateService(service.id, 'quantity', parseInt(e.target.value) || 0)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Qty"
                        min="1"
                      />
                    </div>
                    <div className="col-span-2">
                      <input
                        type="number"
                        value={service.unitPrice}
                        onChange={(e) => updateService(service.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Price"
                        min="0"
                        step="0.01"
                      />
                    </div>
                    <div className="col-span-2">
                      <div className="px-3 py-2 bg-white border border-gray-300 rounded-lg">
                        <span className="font-medium">${service.total.toFixed(2)}</span>
                      </div>
                    </div>
                    <div className="col-span-2">
                      {services.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeService(service.id)}
                          className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-lg text-red-600 bg-red-50 hover:bg-red-100 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Information */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Receipt className="h-5 w-5 mr-2 text-purple-600" />
                Payment Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="form-label">Discount ($)</label>
                  <input
                    {...register('discount', { valueAsNumber: true })}
                    type="number"
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="0.00"
                  />
                  {errors.discount && (
                    <p className="mt-1 text-sm text-red-600">{errors.discount.message}</p>
                  )}
                </div>

                <div>
                  <label className="form-label">Tax ($)</label>
                  <input
                    {...register('tax', { valueAsNumber: true })}
                    type="number"
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="0.00"
                  />
                  {errors.tax && (
                    <p className="mt-1 text-sm text-red-600">{errors.tax.message}</p>
                  )}
                </div>

                <div>
                  <label className="form-label">Payment Method *</label>
                  <select
                    {...register('paymentMethod')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="">Select method</option>
                    <option value="Cash">Cash</option>
                    <option value="Card">Card</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="Insurance">Insurance</option>
                  </select>
                  {errors.paymentMethod && (
                    <p className="mt-1 text-sm text-red-600">{errors.paymentMethod.message}</p>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <label className="form-label">Notes</label>
                <textarea
                  {...register('notes')}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Add any additional notes..."
                />
              </div>
            </div>

            {/* Summary */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-medium">${calculateSubtotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Discount:</span>
                  <span className="font-medium text-green-600">-${(watch('discount') || 0).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax:</span>
                  <span className="font-medium">${(watch('tax') || 0).toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-300 pt-2">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-gray-900">Total:</span>
                    <span className="text-lg font-bold text-blue-600">${calculateTotal().toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-4">
              <PrimaryButton
                type="submit"
                className="px-8 py-3"
              >
                <Save className="h-4 w-4 mr-2" />
                Save & Preview
              </PrimaryButton>
            </div>
          </form>
        </div>
      )}

      {/* Receipt Preview */}
      {!showForm && (
        <div ref={printRef} className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
          <div className="max-w-2xl mx-auto">
            {/* Receipt Header */}
            <div className="text-center border-b border-gray-300 pb-4 mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Pulse HMS</h1>
              <p className="text-gray-600">Healthcare Management System</p>
              <p className="text-sm text-gray-500 mt-2">Receipt</p>
            </div>

            {/* Receipt Details */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm text-gray-600">Receipt #</p>
                <p className="font-semibold">{watch('receiptNumber')}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Date</p>
                <p className="font-semibold">{watch('date')}</p>
              </div>
            </div>

            {/* Patient Information */}
            <div className="border-b border-gray-300 pb-4 mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">Patient Information</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Name: <span className="font-medium">{watch('patientName')}</span></p>
                  <p className="text-gray-600">ID: <span className="font-medium">{watch('patientId')}</span></p>
                  <p className="text-gray-600">Phone: <span className="font-medium">{watch('patientPhone') || 'N/A'}</span></p>
                </div>
                <div>
                  <p className="text-gray-600">Age: <span className="font-medium">{watch('patientAge')} years</span></p>
                  <p className="text-gray-600">Gender: <span className="font-medium">{watch('patientGender')}</span></p>
                  <p className="text-gray-600">Doctor: <span className="font-medium">{watch('doctorName')}</span></p>
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Services</h3>
              <div className="border border-gray-300 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Service</th>
                      <th className="px-4 py-2 text-right text-sm font-medium text-gray-700">Qty</th>
                      <th className="px-4 py-2 text-right text-sm font-medium text-gray-700">Price</th>
                      <th className="px-4 py-2 text-right text-sm font-medium text-gray-700">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {services.map((service) => (
                      <tr key={service.id} className="border-t border-gray-200">
                        <td className="px-4 py-2 text-sm">{service.name}</td>
                        <td className="px-4 py-2 text-sm text-right">{service.quantity}</td>
                        <td className="px-4 py-2 text-sm text-right">${service.unitPrice.toFixed(2)}</td>
                        <td className="px-4 py-2 text-sm text-right font-medium">${service.total.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Summary */}
            <div className="border-t border-gray-300 pt-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Subtotal:</span>
                  <span className="text-sm font-medium">${calculateSubtotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Discount:</span>
                  <span className="text-sm font-medium text-green-600">-${(watch('discount') || 0).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Tax:</span>
                  <span className="text-sm font-medium">${(watch('tax') || 0).toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-300 pt-2">
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-900">Total:</span>
                    <span className="font-bold text-blue-600">${calculateTotal().toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="mt-4 pt-4 border-t border-gray-300">
              <p className="text-sm text-gray-600">
                Payment Method: <span className="font-medium">{watch('paymentMethod')}</span>
              </p>
              {watch('notes') && (
                <p className="text-sm text-gray-600 mt-2">
                  Notes: <span className="font-medium">{watch('notes')}</span>
                </p>
              )}
            </div>

            {/* Footer */}
            <div className="text-center mt-8 pt-4 border-t border-gray-300">
              <p className="text-sm text-gray-500">Thank you for choosing Pulse HMS</p>
              <p className="text-xs text-gray-400 mt-1">Generated on {new Date().toLocaleString()}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 