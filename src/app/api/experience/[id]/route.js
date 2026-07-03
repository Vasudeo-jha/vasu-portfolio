import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';

// GET - Fetch single experience
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    
    const experience = await prisma.experience.findUnique({
      where: { id },
    });

    if (!experience) {
      return NextResponse.json({ error: 'Experience not found' }, { status: 404 });
    }

    return NextResponse.json(experience);
  } catch (error) {
    console.error('Failed to fetch experience:', error);
    return NextResponse.json(
      { error: 'Failed to fetch experience' },
      { status: 500 }
    );
  }
}

// PUT - Update experience
export async function PUT(request, { params }) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const { id } = await params;
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
      order,
      isActive
    } = body;

    const experience = await prisma.experience.update({
      where: { id },
      data: {
        ...(company && { company }),
        ...(companyUrl !== undefined && { companyUrl }),
        ...(position && { position }),
        ...(employmentType && { employmentType }),
        ...(description && { description }),
        ...(startDate && { startDate: new Date(startDate) }),
        ...(endDate !== undefined && { endDate: endDate ? new Date(endDate) : null }),
        ...(isCurrent !== undefined && { isCurrent }),
        ...(logoUrl !== undefined && { logoUrl }),
        ...(location !== undefined && { location }),
        ...(order !== undefined && { order }),
        ...(isActive !== undefined && { isActive }),
      },
    });

    return NextResponse.json(experience);
  } catch (error) {
    console.error('Failed to update experience:', error);
    return NextResponse.json(
      { error: 'Failed to update experience' },
      { status: 500 }
    );
  }
}

// DELETE - Soft delete experience
export async function DELETE(request, { params }) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const { id } = await params;

    // Soft delete
    await prisma.experience.update({
      where: { id },
      data: { isActive: false },
    });

    return NextResponse.json({ message: 'Experience deleted successfully' });
  } catch (error) {
    console.error('Failed to delete experience:', error);
    return NextResponse.json(
      { error: 'Failed to delete experience' },
      { status: 500 }
    );
  }
}
