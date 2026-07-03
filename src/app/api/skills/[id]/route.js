import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';

// PUT - Update skill
export async function PUT(request, { params }) {
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

    const { id } = await params;
    const body = await request.json();
    const { name, percentage, category, iconUrl, order } = body;

    // Build update data object with only provided fields
    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (percentage !== undefined) updateData.percentage = percentage;
    if (category !== undefined) updateData.category = category.toUpperCase();
    if (iconUrl !== undefined) updateData.iconUrl = iconUrl;
    if (order !== undefined) updateData.order = order;

    const skill = await prisma.skill.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(skill);
  } catch (error) {
    console.error('Update skill error:', error);
    return NextResponse.json(
      { error: 'Failed to update skill' },
      { status: 500 }
    );
  }
}

// DELETE - Delete skill (soft delete by setting isDeleted flag, or hard delete)
export async function DELETE(request, { params }) {
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

    const { id } = await params;

    await prisma.skill.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Skill deleted successfully' });
  } catch (error) {
    console.error('Delete skill error:', error);
    return NextResponse.json(
      { error: 'Failed to delete skill' },
      { status: 500 }
    );
  }
}
