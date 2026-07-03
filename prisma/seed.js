const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 12);
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@vasujha.dev' },
    update: {},
    create: {
      email: 'admin@vasujha.dev',
      password: hashedPassword,
      name: 'Vasu Jha',
      role: 'ADMIN',
    },
  });

  console.log('Admin user created:', admin.email);

  // Create initial profile
  const profile = await prisma.profile.upsert({
    where: { id: 'default-profile' },
    update: {},
    create: {
      id: 'default-profile',
      name: 'Vasu Jha',
      title: 'Frontend Developer',
      subtitle: 'Building modern web experiences',
      description: 'Passionate Frontend Developer with experience in building modern, responsive and scalable web applications using React.js, Next.js, Tailwind CSS and PostgreSQL.',
      email: 'hello@vasujha.dev',
      location: 'India',
    },
  });

  console.log('Profile created:', profile.name);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
