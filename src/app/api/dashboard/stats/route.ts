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

    // Get total patients
    const totalPatients = await prisma.patient.count({
      where: { isActive: true }
    })

    // Get total appointments
    const totalAppointments = await prisma.appointment.count()

    // Get total revenue
    const revenueResult = await prisma.bill.aggregate({
      where: { status: 'PAID' },
      _sum: { paidAmount: true }
    })
    const totalRevenue = revenueResult._sum.paidAmount || 0

    // Get pending appointments
    const pendingAppointments = await prisma.appointment.count({
      where: {
        status: {
          in: ['SCHEDULED', 'CONFIRMED']
        }
      }
    })

    return NextResponse.json({
      totalPatients,
      totalAppointments,
      totalRevenue,
      pendingAppointments
    })
  } catch (error) {
    console.error('Dashboard stats error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 