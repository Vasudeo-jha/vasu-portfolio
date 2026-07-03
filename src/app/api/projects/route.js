import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';

// GET - Fetch all projects
export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { order: 'asc' },
    });

    return NextResponse.json(projects);
  } catch (error) {
    console.error('Get projects error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

// POST - Create new project
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
      title,
      slug,
      shortDescription,
      description,
      techStack,
      imageUrl,
      liveUrl,
      githubUrl,
      featured,
      status,
      order,
    } = body;

    if (!title || !slug) {
      return NextResponse.json(
        { error: 'Title and slug are required' },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const existingProject = await prisma.project.findUnique({
      where: { slug },
    });

    if (existingProject) {
      return NextResponse.json(
        { error: 'A project with this slug already exists' },
        { status: 400 }
      );
    }

    // Get the highest order number
    const lastProject = await prisma.project.findFirst({
      orderBy: { order: 'desc' },
    });
    const newOrder = order ?? (lastProject?.order ?? 0) + 1;

    // Convert status to uppercase to match enum
    const statusEnum = status ? status.toUpperCase().replace(/ /g, '_') : 'IN_PROGRESS';

    const project = await prisma.project.create({
      data: {
        title,
        slug,
        description: description || shortDescription || '',
        techStack: techStack || [],
        imageUrl,
        liveUrl,
        githubUrl,
        isFeatured: featured ?? false,
        status: statusEnum,
        order: newOrder,
      },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error('Create project error:', error);
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
}
