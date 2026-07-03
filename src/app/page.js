import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import GitHubSection from '@/components/sections/GitHubSection';
import ContactSection from '@/components/sections/ContactSection';
import { prisma } from '@/lib/prisma';
import { profileData as fallbackProfile, skillsData as fallbackSkills, projectsData as fallbackProjects, experienceData as fallbackExperience, aboutData as fallbackAbout } from '@/lib/data';

// Force dynamic rendering to always fetch fresh data
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Fetch data from database
async function getData() {
  try {
    const [profile, skills, projects, about, experiences] = await Promise.all([
      prisma.profile.findFirst(),
      prisma.skill.findMany({ orderBy: { order: 'asc' } }),
      prisma.project.findMany({ orderBy: { order: 'asc' } }),
      prisma.about.findFirst(),
      prisma.experience.findMany({ 
        where: { isActive: true },
        orderBy: [{ isCurrent: 'desc' }, { startDate: 'desc' }] 
      }),
    ]);

    return {
      profile: profile || fallbackProfile,
      skills: skills.length > 0 ? skills : fallbackSkills,
      projects: projects.length > 0 ? projects : fallbackProjects,
      about: about || fallbackAbout,
      experiences: experiences.length > 0 ? experiences : fallbackExperience,
    };
  } catch (error) {
    console.error('Failed to fetch data:', error);
    return {
      profile: fallbackProfile,
      skills: fallbackSkills,
      projects: fallbackProjects,
      about: fallbackAbout,
      experiences: fallbackExperience,
    };
  }
}

export default async function Home() {
  const { profile, skills, projects, about, experiences } = await getData();

  return (
    <>
      <Navbar />
      <main>
        <HeroSection profile={profile} />
        <AboutSection profile={profile} about={about} />
        <SkillsSection skills={skills} />
        <ExperienceSection experiences={experiences} />
        <ProjectsSection projects={projects} />
        <GitHubSection />
        <ContactSection profile={profile} />
      </main>
      <Footer profile={profile} />
    </>
  );
}
