import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { sendWelcomeEmail } from '@/lib/email'
import { Restaurant } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { 
      restaurantName, 
      ownerName,
      fssaiLicense, 
      email, 
      password, 
      telephone, 
      state, 
      city, 
      pincode, 
      area 
    } = body

    // Check if restaurant already exists by email
    const existingRestaurantByEmail = await prisma.restaurant.findUnique({
      where: { email },
    })

    if (existingRestaurantByEmail) {
      return NextResponse.json(
        { message: 'Restaurant with this email already exists' },
        { status: 400 }
      )
    }

    // Check if restaurant already exists by FSSAI license
    const existingRestaurantByLicense = await prisma.restaurant.findFirst({
      where: { fssaiLicense },
    })

    if (existingRestaurantByLicense) {
      return NextResponse.json(
        { message: 'Restaurant with this FSSAI license already exists' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create restaurant
    const restaurant = await prisma.restaurant.create({
      data: {
        restaurantName,
        ownerName,
        fssaiLicense,
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
    const { password: _, ...restaurantWithoutPassword } = restaurant

    // Send welcome email
    try {
      await sendWelcomeEmail(email, restaurantName, 'restaurant')
    } catch (emailError) {
      console.error('Failed to send welcome email:', emailError)
      // Don't throw error here, as restaurant is already created
    }

    return NextResponse.json(
      { message: 'Restaurant created successfully', restaurant: restaurantWithoutPassword },
      { status: 201 }
    )
  } catch (error) {
    console.error('Restaurant registration error:', error)
    return NextResponse.json(
      { message: 'Error creating restaurant account' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
} 