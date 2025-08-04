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

    const appointments = await prisma.appointment.findMany({
      orderBy: { scheduledAt: 'asc' },
      include: {
        patient: {
          select: {
            id: true,
            name: true
          }
        },
        doctor: {
          select: {
            id: true,
            name: true
          }
        }
      }
    })

    return NextResponse.json({ appointments })
  } catch (error) {
    console.error('Get appointments error:', error)
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
    const { patientId, doctorId, scheduledAt, duration, notes } = body

    if (!patientId || !doctorId || !scheduledAt) {
      return NextResponse.json(
        { error: 'Patient, doctor, and scheduled time are required' },
        { status: 400 }
      )
    }

    // Check for scheduling conflicts
    const conflictingAppointment = await prisma.appointment.findFirst({
      where: {
        doctorId,
        scheduledAt: {
          gte: new Date(scheduledAt),
          lt: new Date(new Date(scheduledAt).getTime() + (duration || 30) * 60000)
        },
        status: {
          in: ['SCHEDULED', 'CONFIRMED']
        }
      }
    })

    if (conflictingAppointment) {
      return NextResponse.json(
        { error: 'Time slot is already booked' },
        { status: 409 }
      )
    }

    const appointment = await prisma.appointment.create({
      data: {
        patientId,
        doctorId,
        scheduledAt: new Date(scheduledAt),
        duration: duration || 30,
        notes,
        status: 'SCHEDULED'
      },
      include: {
        patient: {
          select: {
            id: true,
            name: true
          }
        },
        doctor: {
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
        appointmentId: appointment.id,
        action: 'CREATE',
        details: JSON.stringify({ 
          patientName: appointment.patient.name,
          scheduledAt: appointment.scheduledAt 
        }),
        userAgent: request.headers.get('user-agent') || 'unknown'
      }
    })

    return NextResponse.json({ appointment }, { status: 201 })
  } catch (error) {
    console.error('Create appointment error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 