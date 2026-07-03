import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';

// GET - Fetch single project
export async function GET(request, { params }) {
  try {
    const { id } = await params;

    const project = await prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error('Get project error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch project' },
      { status: 500 }
    );
  }
}

// PUT - Update project
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

    // Check if slug is taken by another project
    if (slug) {
      const existingProject = await prisma.project.findFirst({
        where: {
          slug,
          NOT: { id },
        },
      });

      if (existingProject) {
        return NextResponse.json(
          { error: 'A project with this slug already exists' },
          { status: 400 }
        );
      }
    }

    // Build update data object with only provided fields
    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (slug !== undefined) updateData.slug = slug;
    if (description !== undefined) updateData.description = description;
    else if (shortDescription !== undefined) updateData.description = shortDescription;
    if (techStack !== undefined) updateData.techStack = techStack;
    if (imageUrl !== undefined) updateData.imageUrl = imageUrl;
    if (liveUrl !== undefined) updateData.liveUrl = liveUrl;
    if (githubUrl !== undefined) updateData.githubUrl = githubUrl;
    if (featured !== undefined) updateData.isFeatured = featured;
    if (status !== undefined) updateData.status = status.toUpperCase().replace(/ /g, '_');
    if (order !== undefined) updateData.order = order;

    const project = await prisma.project.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error('Update project error:', error);
    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    );
  }
}

// DELETE - Delete project
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

    await prisma.project.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Delete project error:', error);
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    );
  }
}
