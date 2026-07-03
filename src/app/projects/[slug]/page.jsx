import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Calendar, Tag } from 'lucide-react';
import { GithubIcon } from '@/components/ui/Icons';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { projectsData } from '@/lib/data';

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);
  
  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [project.imageUrl],
    },
  };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const relatedProjects = projectsData
    .filter((p) => p.slug !== slug)
    .slice(0, 3);

  return (
    <>
      <Navbar />
      <main className="pt-24">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[150px]" />
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[150px]" />
          </div>

          <div className="container mx-auto px-6 py-16 relative z-10">
            {/* Back Button */}
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              Back to Projects
            </Link>

            {/* Project Title */}
            <div className="max-w-4xl">
              {project.isFeatured && (
                <span className="badge-gradient mb-4 inline-block">Featured Project</span>
              )}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                {project.title}
              </h1>
              <p className="text-xl text-gray-400 leading-relaxed mb-8">
                {project.description}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    <ExternalLink className="w-5 h-5" />
                    Live Demo
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary"
                  >
                    <GithubIcon className="w-5 h-5" />
                    View Code
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Project Image */}
        <section className="container mx-auto px-6 py-8">
          <div className="glass-card overflow-hidden rounded-3xl">
            <div className="aspect-video bg-gradient-to-br from-blue-600/30 to-purple-600/30 flex items-center justify-center">
              <span className="text-9xl opacity-50">🖼️</span>
            </div>
          </div>
        </section>

        {/* Project Details */}
        <section className="container mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Overview */}
              <div>
                <h2 className="text-2xl font-bold mb-6">Project Overview</h2>
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-400 leading-relaxed">
                    {project.content || project.description}
                  </p>
                </div>
              </div>

              {/* Features */}
              {project.features && project.features.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Key Features</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {project.features.map((feature, index) => (
                      <div
                        key={index}
                        className="glass-card-sm p-4 flex items-center gap-3"
                      >
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center text-blue-400">
                          ✓
                        </div>
                        <span className="text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Challenges & Solutions */}
              {(project.challenges || project.solutions) && (
                <div className="grid md:grid-cols-2 gap-8">
                  {project.challenges && (
                    <div className="glass-card p-6">
                      <h3 className="text-xl font-bold mb-4 text-orange-400">Challenges</h3>
                      <p className="text-gray-400 leading-relaxed">{project.challenges}</p>
                    </div>
                  )}
                  {project.solutions && (
                    <div className="glass-card p-6">
                      <h3 className="text-xl font-bold mb-4 text-green-400">Solutions</h3>
                      <p className="text-gray-400 leading-relaxed">{project.solutions}</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Tech Stack */}
              <div className="glass-card p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Tag className="w-5 h-5 text-blue-400" />
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 rounded-lg text-sm font-medium bg-white/5 border border-white/10 text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Project Links */}
              <div className="glass-card p-6">
                <h3 className="text-lg font-bold mb-4">Project Links</h3>
                <div className="space-y-3">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
                    >
                      <ExternalLink className="w-5 h-5" />
                      Live Website
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
                    >
                      <GithubIcon className="w-5 h-5" />
                      Source Code
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <section className="container mx-auto px-6 py-16 border-t border-white/5">
            <h2 className="text-2xl font-bold mb-8">Related Projects</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedProjects.map((relProject) => (
                <Link
                  key={relProject.slug}
                  href={`/projects/${relProject.slug}`}
                  className="glass-card-sm p-6 group card-hover"
                >
                  <div className="aspect-video rounded-xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 flex items-center justify-center mb-4">
                    <span className="text-4xl opacity-50">🖼️</span>
                  </div>
                  <h3 className="font-bold text-lg mb-2 group-hover:text-white transition-colors">
                    {relProject.title}
                  </h3>
                  <p className="text-sm text-gray-400 line-clamp-2">
                    {relProject.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
