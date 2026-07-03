import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';

// GET - Fetch profile
export async function GET() {
  try {
    const profile = await prisma.profile.findFirst();
    
    if (!profile) {
      return NextResponse.json(
        { error: 'Profile not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(profile);
  } catch (error) {
    console.error('Get profile error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    );
  }
}

// PUT - Update profile
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
    const { name, title, subtitle, description, email, phone, location, avatarUrl, resumeUrl } = body;

    // Build update data object with only provided fields
    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (title !== undefined) updateData.title = title;
    if (subtitle !== undefined) updateData.subtitle = subtitle;
    if (description !== undefined) updateData.description = description;
    if (email !== undefined) updateData.email = email;
    if (phone !== undefined) updateData.phone = phone;
    if (location !== undefined) updateData.location = location;
    if (avatarUrl !== undefined) updateData.avatarUrl = avatarUrl;
    if (resumeUrl !== undefined) updateData.resumeUrl = resumeUrl;

    // Find existing profile or create new one
    let profile = await prisma.profile.findFirst();

    if (profile) {
      profile = await prisma.profile.update({
        where: { id: profile.id },
        data: updateData,
      });
    } else {
      profile = await prisma.profile.create({
        data: {
          name: name || 'Vasu Jha',
          title: title || 'Frontend Developer',
          subtitle,
          description: description || 'Passionate developer',
          email: email || 'contact@vasujha.dev',
          phone,
          location,
          avatarUrl,
          resumeUrl,
        },
      });
    }

    return NextResponse.json(profile);
  } catch (error) {
    console.error('Update profile error:', error);
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    );
  }
}
