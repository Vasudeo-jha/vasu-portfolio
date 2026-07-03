import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';

// GET - Fetch all skills
export async function GET() {
  try {
    const skills = await prisma.skill.findMany({
      orderBy: { order: 'asc' },
    });

    return NextResponse.json(skills);
  } catch (error) {
    console.error('Get skills error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch skills' },
      { status: 500 }
    );
  }
}

// POST - Create new skill
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
    const { name, percentage, category, iconUrl, order } = body;

    if (!name || !category) {
      return NextResponse.json(
        { error: 'Name and category are required' },
        { status: 400 }
      );
    }

    // Convert category to uppercase to match enum
    const categoryEnum = category.toUpperCase();
    const validCategories = ['FRONTEND', 'BACKEND', 'DATABASE', 'TOOLS', 'OTHER'];
    if (!validCategories.includes(categoryEnum)) {
      return NextResponse.json(
        { error: 'Invalid category' },
        { status: 400 }
      );
    }

    // Get the highest order number
    const lastSkill = await prisma.skill.findFirst({
      orderBy: { order: 'desc' },
    });
    const newOrder = order ?? (lastSkill?.order ?? 0) + 1;

    const skill = await prisma.skill.create({
      data: {
        name,
        percentage: percentage ?? 80,
        category: categoryEnum,
        iconUrl,
        order: newOrder,
      },
    });

    return NextResponse.json(skill, { status: 201 });
  } catch (error) {
    console.error('Create skill error:', error);
    return NextResponse.json(
      { error: 'Failed to create skill' },
      { status: 500 }
    );
  }
}
