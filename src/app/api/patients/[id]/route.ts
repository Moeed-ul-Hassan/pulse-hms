import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser()
    const { id } = await params
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const patient = await prisma.patient.findUnique({
      where: { id, isActive: true },
      include: {
        createdBy: {
          select: { name: true }
        },
        appointments: {
          orderBy: { scheduledAt: 'desc' },
          take: 5
        },
        bills: {
          orderBy: { createdAt: 'desc' },
          take: 5
        }
      }
    })

    if (!patient) {
      return NextResponse.json(
        { error: 'Patient not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ patient })
  } catch (error) {
    console.error('Get patient error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser()
    const { id } = await params
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { name, age, gender, phone, email, address, emergencyContact, medicalHistory } = body

    const patient = await prisma.patient.update({
      where: { id },
      data: {
        name,
        age: parseInt(age),
        gender,
        phone,
        email,
        address,
        emergencyContact,
        medicalHistory,
        updatedById: user.id
      }
    })

    // Create audit log
    await prisma.auditLog.create({
      data: {
        userId: user.id,
        patientId: patient.id,
        action: 'UPDATE',
        details: JSON.stringify({ patientName: name }),
        userAgent: request.headers.get('user-agent') || 'unknown'
      }
    })

    return NextResponse.json({ patient })
  } catch (error) {
    console.error('Update patient error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser()
    const { id } = await params
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Soft delete - mark as inactive
    const patient = await prisma.patient.update({
      where: { id },
      data: { isActive: false }
    })

    // Create audit log
    await prisma.auditLog.create({
      data: {
        userId: user.id,
        patientId: patient.id,
        action: 'DELETE',
        details: JSON.stringify({ patientName: patient.name }),
        userAgent: request.headers.get('user-agent') || 'unknown'
      }
    })

    return NextResponse.json({ message: 'Patient deleted successfully' })
  } catch (error) {
    console.error('Delete patient error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 