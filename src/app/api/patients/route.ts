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

    const patients = await prisma.patient.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
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
        createdBy: {
          select: {
            name: true
          }
        }
      }
    })

    return NextResponse.json({ patients })
  } catch (error) {
    console.error('Get patients error:', error)
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
    const { name, age, gender, phone, email, address, emergencyContact, medicalHistory } = body

    if (!name || !age || !gender) {
      return NextResponse.json(
        { error: 'Name, age, and gender are required' },
        { status: 400 }
      )
    }

    const patient = await prisma.patient.create({
      data: {
        name,
        age: parseInt(age),
        gender,
        phone,
        email,
        address,
        emergencyContact,
        medicalHistory,
        createdById: user.id
      }
    })

    // Create audit log
    await prisma.auditLog.create({
      data: {
        userId: user.id,
        patientId: patient.id,
        action: 'CREATE',
        details: JSON.stringify({ patientName: name }),
        userAgent: request.headers.get('user-agent') || 'unknown'
      }
    })

    return NextResponse.json({ patient }, { status: 201 })
  } catch (error) {
    console.error('Create patient error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 