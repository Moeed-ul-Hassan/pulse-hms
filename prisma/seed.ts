import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 12)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@pulsehms.com' },
    update: {},
    create: {
      email: 'admin@pulsehms.com',
      name: 'Admin User',
      password: adminPassword,
      role: 'ADMIN'
    }
  })

  // Create doctor user
  const doctorPassword = await bcrypt.hash('doctor123', 12)
  const doctor = await prisma.user.upsert({
    where: { email: 'doctor@pulsehms.com' },
    update: {},
    create: {
      email: 'doctor@pulsehms.com',
      name: 'Dr. Sarah Johnson',
      password: doctorPassword,
      role: 'DOCTOR'
    }
  })

  // Create nurse user
  const nursePassword = await bcrypt.hash('nurse123', 12)
  const nurse = await prisma.user.upsert({
    where: { email: 'nurse@pulsehms.com' },
    update: {},
    create: {
      email: 'nurse@pulsehms.com',
      name: 'Nurse Maria Garcia',
      password: nursePassword,
      role: 'NURSE'
    }
  })

  // Create demo patients
  const patients = await Promise.all([
    prisma.patient.create({
      data: {
        name: 'Ahmed Khan',
        age: 45,
        gender: 'MALE',
        phone: '+92-300-1234567',
        email: 'ahmed.khan@email.com',
        address: 'House 123, Street 5, Karachi',
        emergencyContact: '+92-300-7654321',
        medicalHistory: 'Hypertension, Diabetes Type 2',
        createdById: nurse.id
      }
    }),
    prisma.patient.create({
      data: {
        name: 'Fatima Ali',
        age: 28,
        gender: 'FEMALE',
        phone: '+92-301-2345678',
        email: 'fatima.ali@email.com',
        address: 'Apartment 45, Block 7, Lahore',
        emergencyContact: '+92-301-8765432',
        medicalHistory: 'Asthma',
        createdById: nurse.id
      }
    }),
    prisma.patient.create({
      data: {
        name: 'Rajesh Patel',
        age: 52,
        gender: 'MALE',
        phone: '+91-98765-43210',
        email: 'rajesh.patel@email.com',
        address: 'Flat 12, Building A, Mumbai',
        emergencyContact: '+91-98765-01234',
        medicalHistory: 'Heart condition, High cholesterol',
        createdById: nurse.id
      }
    })
  ])

  // Create demo appointments
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  tomorrow.setHours(9, 0, 0, 0)

  const dayAfterTomorrow = new Date()
  dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2)
  dayAfterTomorrow.setHours(14, 30, 0, 0)

  await Promise.all([
    prisma.appointment.create({
      data: {
        patientId: patients[0].id,
        doctorId: doctor.id,
        scheduledAt: tomorrow,
        status: 'CONFIRMED',
        notes: 'Follow-up for diabetes management'
      }
    }),
    prisma.appointment.create({
      data: {
        patientId: patients[1].id,
        doctorId: doctor.id,
        scheduledAt: dayAfterTomorrow,
        status: 'SCHEDULED',
        notes: 'Asthma check-up'
      }
    })
  ])

  // Create demo bills
  await Promise.all([
    prisma.bill.create({
      data: {
        patientId: patients[0].id,
        amount: 2500,
        description: 'Consultation and blood tests',
        status: 'PAID',
        paidAmount: 2500,
        paidAt: new Date()
      }
    }),
    prisma.bill.create({
      data: {
        patientId: patients[1].id,
        amount: 1500,
        description: 'Consultation fee',
        status: 'UNPAID'
      }
    })
  ])

  console.log('Database seeded successfully!')
  console.log('Admin credentials: admin@pulsehms.com / admin123')
  console.log('Doctor credentials: doctor@pulsehms.com / doctor123')
  console.log('Nurse credentials: nurse@pulsehms.com / nurse123')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 