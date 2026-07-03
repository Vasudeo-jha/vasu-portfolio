import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Here you would typically:
    // 1. Save to database using Prisma
    // 2. Send notification email
    // 3. Log the message

    // For now, we'll just return success
    // In production, uncomment the following:
    /*
    const { prisma } = await import('@/lib/prisma');
    
    const newMessage = await prisma.message.create({
      data: {
        name,
        email,
        subject,
        message,
      },
    });
    */

    console.log('New contact form submission:', { name, email, subject, message });

    return NextResponse.json(
      { message: 'Message sent successfully', success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
