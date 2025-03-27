import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { sendWelcomeEmail } from '@/lib/email'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { fullName, email, password } = body

    // Check if user already exists
    const existingUser = await prisma.guest.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json(
        { message: 'User with this email already exists' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const user = await prisma.guest.create({
      data: {
        fullName,
        email,
        password: hashedPassword,
      },
    })

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user

    // Send welcome email
    try {
      await sendWelcomeEmail(email, fullName, 'guest')
    } catch (emailError) {
      console.error('Failed to send welcome email:', emailError)
      // Don't throw error here, as user is already created
    }

    return NextResponse.json(
      { message: 'User created successfully', user: userWithoutPassword },
      { status: 201 }
    )
  } catch (error) {
    console.error('User registration error:', error)
    return NextResponse.json(
      { message: 'Error creating user account' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
} 