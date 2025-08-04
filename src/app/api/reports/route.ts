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
    const days = parseInt(searchParams.get('days') || '30')
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)

    // Get total counts
    const totalPatients = await prisma.patient.count({
      where: { isActive: true }
    })

    const totalAppointments = await prisma.appointment.count({
      where: {
        createdAt: {
          gte: startDate
        }
      }
    })

    const totalRevenue = await prisma.bill.aggregate({
      where: {
        status: 'PAID',
        createdAt: {
          gte: startDate
        }
      },
      _sum: { paidAmount: true }
    })

    // Get appointment status breakdown
    const appointmentStatus = await prisma.appointment.groupBy({
      by: ['status'],
      _count: {
        status: true
      }
    })

    // Get payment status breakdown
    const paymentStatus = await prisma.bill.groupBy({
      by: ['status'],
      _count: {
        status: true
      },
      _sum: {
        amount: true
      }
    })

    // Get monthly stats (last 6 months)
    const monthlyStats = []
    for (let i = 5; i >= 0; i--) {
      const monthStart = new Date()
      monthStart.setMonth(monthStart.getMonth() - i, 1)
      monthStart.setHours(0, 0, 0, 0)
      
      const monthEnd = new Date(monthStart)
      monthEnd.setMonth(monthEnd.getMonth() + 1, 0)
      monthEnd.setHours(23, 59, 59, 999)

      const monthPatients = await prisma.patient.count({
        where: {
          createdAt: {
            gte: monthStart,
            lte: monthEnd
          }
        }
      })

      const monthAppointments = await prisma.appointment.count({
        where: {
          createdAt: {
            gte: monthStart,
            lte: monthEnd
          }
        }
      })

      const monthRevenue = await prisma.bill.aggregate({
        where: {
          status: 'PAID',
          createdAt: {
            gte: monthStart,
            lte: monthEnd
          }
        },
        _sum: { paidAmount: true }
      })

      monthlyStats.push({
        month: monthStart.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        patients: monthPatients,
        appointments: monthAppointments,
        revenue: monthRevenue._sum.paidAmount || 0
      })
    }

    return NextResponse.json({
      totalPatients,
      totalAppointments,
      totalRevenue: totalRevenue._sum.paidAmount || 0,
      appointmentStatus: appointmentStatus.map(item => ({
        status: item.status,
        count: item._count.status
      })),
      paymentStatus: paymentStatus.map(item => ({
        status: item.status,
        count: item._count.status,
        amount: item._sum.amount || 0
      })),
      monthlyStats
    })
  } catch (error) {
    console.error('Reports error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 