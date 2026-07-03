import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';

// GET - Fetch about data
export async function GET() {
  try {
    let about = await prisma.about.findFirst();
    
    // Create default if not exists
    if (!about) {
      about = await prisma.about.create({
        data: {
          title: 'About Me',
          content: 'Passionate developer with experience in building modern web applications.',
          yearsExperience: 3,
          projectsCompleted: 25,
          happyClients: 15,
          technologies: 20,
        },
      });
    }
    
    return NextResponse.json(about);
  } catch (error) {
    console.error('Failed to fetch about:', error);
    return NextResponse.json(
      { error: 'Failed to fetch about data' },
      { status: 500 }
    );
  }
}

// PUT - Update about data
export async function PUT(request) {
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
      content, 
      imageUrl,
      yearsExperience,
      projectsCompleted,
      happyClients,
      technologies 
    } = body;

    // Find existing about or create new
    let about = await prisma.about.findFirst();
    
    if (about) {
      about = await prisma.about.update({
        where: { id: about.id },
        data: {
          title: title ?? about.title,
          content: content ?? about.content,
          imageUrl: imageUrl ?? about.imageUrl,
          yearsExperience: yearsExperience ?? about.yearsExperience,
          projectsCompleted: projectsCompleted ?? about.projectsCompleted,
          happyClients: happyClients ?? about.happyClients,
          technologies: technologies ?? about.technologies,
        },
      });
    } else {
      about = await prisma.about.create({
        data: {
          title: title || 'About Me',
          content: content || '',
          imageUrl,
          yearsExperience: yearsExperience || 0,
          projectsCompleted: projectsCompleted || 0,
          happyClients: happyClients || 0,
          technologies: technologies || 0,
        },
      });
    }

    return NextResponse.json(about);
  } catch (error) {
    console.error('Failed to update about:', error);
    return NextResponse.json(
      { error: 'Failed to update about data' },
      { status: 500 }
    );
  }
}
