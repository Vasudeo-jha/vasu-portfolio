import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';

// GET - Fetch all experiences
export async function GET() {
  try {
    const experiences = await prisma.experience.findMany({
      where: { isActive: true },
      orderBy: [{ isCurrent: 'desc' }, { startDate: 'desc' }],
    });
    
    return NextResponse.json(experiences);
  } catch (error) {
    console.error('Failed to fetch experiences:', error);
    return NextResponse.json(
      { error: 'Failed to fetch experiences' },
      { status: 500 }
    );
  }
}

// POST - Create new experience
export async function POST(request) {
  try {
    // Verify authentication
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const body = await request.json();
    const { 
      company, 
      companyUrl,
      position, 
      employmentType,
      description, 
      startDate,
      endDate,
      isCurrent,
      logoUrl,
      location,
      order
    } = body;

    if (!company || !position || !description || !startDate) {
      return NextResponse.json(
        { error: 'Company, position, description, and start date are required' },
        { status: 400 }
      );
    }

    const experience = await prisma.experience.create({
      data: {
        company,
        companyUrl,
        position,
        employmentType: employmentType || 'Full-time',
        description,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        isCurrent: isCurrent || false,
        logoUrl,
        location,
        order: order || 0,
      },
    });

    return NextResponse.json(experience, { status: 201 });
  } catch (error) {
    console.error('Failed to create experience:', error);
    return NextResponse.json(
      { error: 'Failed to create experience' },
      { status: 500 }
    );
  }
}
