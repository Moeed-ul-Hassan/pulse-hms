import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser()
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const patient = await prisma.patient.findUnique({
      where: { id: params.id },
      select: {
        id: true,
        name: true,
        age: true,
        gender: true,
        phone: true,
        email: true,
        address: true,
        emergencyContact: true,
        medicalHistory: true,
        createdAt: true,
        updatedAt: true,
        createdBy: {
          select: {
            name: true
          }
        },
        updatedBy: {
          select: {
            name: true
          }
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
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser()
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { name, age, gender, phone, email, address, emergencyContact, medicalHistory } = body

    if (!name || !age || !gender) {
      return NextResponse.json(
        { error: 'Name, age, and gender are required' },
        { status: 400 }
      )
    }

    // Check if patient exists
    const existingPatient = await prisma.patient.findUnique({
      where: { id: params.id }
    })

    if (!existingPatient) {
      return NextResponse.json(
        { error: 'Patient not found' },
        { status: 404 }
      )
    }

    const patient = await prisma.patient.update({
      where: { id: params.id },
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
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser()
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Check if patient exists
    const existingPatient = await prisma.patient.findUnique({
      where: { id: params.id }
    })

    if (!existingPatient) {
      return NextResponse.json(
        { error: 'Patient not found' },
        { status: 404 }
      )
    }

    // Soft delete - set isActive to false
    const patient = await prisma.patient.update({
      where: { id: params.id },
      data: {
        isActive: false,
        updatedById: user.id
      }
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