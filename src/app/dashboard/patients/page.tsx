'use client'

import { useState, useEffect } from 'react'
import { Plus, Search, Edit, Trash2, Eye } from 'lucide-react'
import toast from 'react-hot-toast'

interface Patient {
  id: string
  name: string
  age: number
  gender: string
  phone: string | null
  email: string | null
  address: string | null
  createdAt: string
}

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchPatients()
  }, [])

  const fetchPatients = async () => {
    try {
      const response = await fetch('/api/patients')
      if (response.ok) {
        const data = await response.json()
        setPatients(data.patients)
      }
    } catch (error) {
      toast.error('Failed to fetch patients')
    } finally {
      setLoading(false)
    }
  }

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phone?.includes(searchTerm)
  )

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this patient?')) return

    try {
      const response = await fetch(`/api/patients/${id}`, {
        method: 'DELETE'
      })
      if (response.ok) {
        toast.success('Patient deleted successfully')
        fetchPatients()
      } else {
        toast.error('Failed to delete patient')
      }
    } catch (error) {
      toast.error('Failed to delete patient')
    }
  }

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
          <h1 className="text-2xl font-bold text-gray-900">Patients</h1>
          <p className="text-gray-600">Manage patient records and information</p>
        </div>
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" />
          Add Patient
        </button>
      </div>

      {/* Search */}
      <div className="max-w-md">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search patients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </div>

      {/* Patients Table */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {filteredPatients.map((patient) => (
            <li key={patient.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-sm font-medium text-blue-600">
                          {patient.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="flex items-center">
                        <p className="text-sm font-medium text-gray-900">{patient.name}</p>
                        <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          patient.gender === 'MALE' ? 'bg-blue-100 text-blue-800' : 
                          patient.gender === 'FEMALE' ? 'bg-pink-100 text-pink-800' : 
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {patient.gender}
                        </span>
                      </div>
                      <div className="mt-1 flex items-center text-sm text-gray-500">
                        <span>{patient.age} years old</span>
                        {patient.phone && (
                          <>
                            <span className="mx-2">•</span>
                            <span>{patient.phone}</span>
                          </>
                        )}
                        {patient.email && (
                          <>
                            <span className="mx-2">•</span>
                            <span>{patient.email}</span>
                          </>
                        )}
                      </div>
                      {patient.address && (
                        <p className="mt-1 text-sm text-gray-500">{patient.address}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="text-blue-600 hover:text-blue-900">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="text-gray-600 hover:text-gray-900">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(patient.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500">
                      Registered: {new Date(patient.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        {filteredPatients.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No patients found</p>
          </div>
        )}
      </div>
    </div>
  )
} 