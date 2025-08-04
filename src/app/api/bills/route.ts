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

    const bills = await prisma.bill.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        patient: {
          select: {
            id: true,
            name: true
          }
        },
        appointment: {
          select: {
            id: true,
            scheduledAt: true
          }
        }
      }
    })

    return NextResponse.json({ bills })
  } catch (error) {
    console.error('Get bills error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser()
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { patientId, appointmentId, amount, description } = body

    if (!patientId || !amount || !description) {
      return NextResponse.json(
        { error: 'Patient, amount, and description are required' },
        { status: 400 }
      )
    }

    const bill = await prisma.bill.create({
      data: {
        patientId,
        appointmentId,
        amount: parseFloat(amount),
        description,
        status: 'UNPAID'
      },
      include: {
        patient: {
          select: {
            id: true,
            name: true
          }
        }
      }
    })

    // Create audit log
    await prisma.auditLog.create({
      data: {
        userId: user.id,
        billId: bill.id,
        action: 'CREATE',
        details: JSON.stringify({ 
          patientName: bill.patient.name,
          amount: bill.amount,
          description: bill.description
        }),
        userAgent: request.headers.get('user-agent') || 'unknown'
      }
    })

    return NextResponse.json({ bill }, { status: 201 })
  } catch (error) {
    console.error('Create bill error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 