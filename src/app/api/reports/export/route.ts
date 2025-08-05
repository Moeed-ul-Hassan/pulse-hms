import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser()
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') || 'patients'
    const days = parseInt(searchParams.get('days') || '30')
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)

    let data: any = {}
    let filename = ''

    switch (type) {
      case 'patients':
        const patients = await prisma.patient.findMany({
          where: { 
            isActive: true,
            createdAt: { gte: startDate }
          },
          select: {
            id: true,
            name: true,
            age: true,
            gender: true,
            phone: true,
            email: true,
            address: true,
            createdAt: true,
            createdBy: {
              select: { name: true }
            }
          },
          orderBy: { createdAt: 'desc' }
        })
        data = patients
        filename = `patients_${new Date().toISOString().split('T')[0]}.csv`
        break

      case 'appointments':
        const appointments = await prisma.appointment.findMany({
          where: {
            createdAt: { gte: startDate }
          },
          select: {
            id: true,
            scheduledAt: true,
            status: true,
            notes: true,
            createdAt: true,
            patient: {
              select: { name: true, phone: true }
            },
            doctor: {
              select: { name: true }
            }
          },
          orderBy: { scheduledAt: 'desc' }
        })
        data = appointments
        filename = `appointments_${new Date().toISOString().split('T')[0]}.csv`
        break

      case 'billing':
        const bills = await prisma.bill.findMany({
          where: {
            createdAt: { gte: startDate }
          },
          select: {
            id: true,
            amount: true,
            description: true,
            status: true,
            paidAmount: true,
            paidAt: true,
            createdAt: true,
            patient: {
              select: { name: true, phone: true }
            }
          },
          orderBy: { createdAt: 'desc' }
        })
        data = bills
        filename = `billing_${new Date().toISOString().split('T')[0]}.csv`
        break

      default:
        return NextResponse.json(
          { error: 'Invalid export type' },
          { status: 400 }
        )
    }

    // Convert to CSV format
    const csvData = convertToCSV(data, type)
    
    return new NextResponse(csvData, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    })
  } catch (error) {
    console.error('Export error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

function convertToCSV(data: any[], type: string): string {
  if (data.length === 0) return ''

  let headers: string[] = []
  let rows: string[] = []

  switch (type) {
    case 'patients':
      headers = ['ID', 'Name', 'Age', 'Gender', 'Phone', 'Email', 'Address', 'Created Date', 'Created By']
      rows = data.map(patient => [
        patient.id,
        patient.name,
        patient.age,
        patient.gender,
        patient.phone || '',
        patient.email || '',
        patient.address || '',
        new Date(patient.createdAt).toLocaleDateString(),
        patient.createdBy?.name || ''
      ].map(field => `"${field}"`).join(','))
      break

    case 'appointments':
      headers = ['ID', 'Patient', 'Doctor', 'Scheduled Date', 'Status', 'Notes', 'Created Date']
      rows = data.map(appointment => [
        appointment.id,
        appointment.patient?.name || '',
        appointment.doctor?.name || '',
        new Date(appointment.scheduledAt).toLocaleString(),
        appointment.status,
        appointment.notes || '',
        new Date(appointment.createdAt).toLocaleDateString()
      ].map(field => `"${field}"`).join(','))
      break

    case 'billing':
      headers = ['ID', 'Patient', 'Amount', 'Description', 'Status', 'Paid Amount', 'Paid Date', 'Created Date']
      rows = data.map(bill => [
        bill.id,
        bill.patient?.name || '',
        bill.amount,
        bill.description,
        bill.status,
        bill.paidAmount,
        bill.paidAt ? new Date(bill.paidAt).toLocaleDateString() : '',
        new Date(bill.createdAt).toLocaleDateString()
      ].map(field => `"${field}"`).join(','))
      break
  }

  return [headers.join(','), ...rows].join('\n')
} 