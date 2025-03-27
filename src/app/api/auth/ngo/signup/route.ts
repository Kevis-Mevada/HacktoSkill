import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { sendWelcomeEmail } from '@/lib/email'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { ngoName, registrationId, email, password, telephone, state, city, pincode, area } = body

    // Check if NGO already exists by email
    const existingNGOByEmail = await prisma.nGO.findUnique({
      where: { email },
    })

    if (existingNGOByEmail) {
      return NextResponse.json(
        { message: 'NGO with this email already exists' },
        { status: 400 }
      )
    }

    // Check if NGO already exists by registration ID
    const existingNGOByRegId = await prisma.nGO.findFirst({
      where: { registrationId },
    })

    if (existingNGOByRegId) {
      return NextResponse.json(
        { message: 'NGO with this registration ID already exists' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create NGO
    const ngo = await prisma.nGO.create({
      data: {
        ngoName,
        registrationId,
        email,
        password: hashedPassword,
        telephone,
        state,
        city,
        pincode,
        area,
      },
    })

    // Remove password from response
    const { password: _, ...ngoWithoutPassword } = ngo

    // Send welcome email
    try {
      await sendWelcomeEmail(email, ngoName, 'ngo')
    } catch (emailError) {
      console.error('Failed to send welcome email:', emailError)
      // Don't throw error here, as NGO is already created
    }

    return NextResponse.json(
      { message: 'NGO created successfully', ngo: ngoWithoutPassword },
      { status: 201 }
    )
  } catch (error) {
    console.error('NGO registration error:', error)
    return NextResponse.json(
      { message: 'Error creating NGO account' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
} 