// Static data for the portfolio (used as fallback when database is not connected)

export const profileData = {
  name: "Vasu Jha",
  title: "Frontend Developer",
  roles: [
    "React Developer",
    "Next.js Developer", 
    "Full Stack Learner",
    "UI Developer"
  ],
  description: "Passionate Frontend Developer with experience in building modern, responsive and scalable web applications using React.js, Next.js, Tailwind CSS and PostgreSQL.",
  email: "contact@vasujha.dev",
  phone: "+91 9876543210",
  location: "New Delhi, India",
  avatarUrl: "/images/avatar.jpg",
  resumeUrl: "/vasu-resume.pdf"
};

export const aboutData = {
  title: "About Me",
  content: `I'm a passionate Frontend Developer with a strong foundation in modern web technologies. I specialize in building beautiful, performant, and user-friendly web applications that deliver exceptional user experiences.

With a keen eye for design and a deep understanding of frontend frameworks, I transform complex requirements into elegant, scalable solutions. My journey in web development started with a curiosity about how things work on the internet, and it has evolved into a fulfilling career where I get to create impactful digital experiences every day.

I believe in writing clean, maintainable code and following best practices. When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing knowledge with the developer community.`,
  stats: {
    yearsExperience: 3,
    projectsCompleted: 25,
    happyClients: 15,
    technologies: 20
  }
};

export const skillsData = [
  { name: "React.js", percentage: 95, category: "Frontend" },
  { name: "Next.js", percentage: 90, category: "Frontend" },
  { name: "JavaScript", percentage: 95, category: "Language" },
  { name: "TypeScript", percentage: 85, category: "Language" },
  { name: "Tailwind CSS", percentage: 95, category: "Styling" },
  { name: "Redux Toolkit", percentage: 90, category: "State Management" },
  { name: "Node.js", percentage: 80, category: "Backend" },
  { name: "PostgreSQL", percentage: 80, category: "Database" },
  { name: "Prisma ORM", percentage: 85, category: "Database" },
  { name: "Git", percentage: 90, category: "Tools" },
  { name: "Figma", percentage: 75, category: "Design" },
  { name: "REST APIs", percentage: 90, category: "Backend" }
];

export const experienceData = [
  {
    id: 1,
    company: "Tech Startup Inc.",
    position: "Senior Frontend Developer",
    description: "Led the frontend development team, architected scalable React applications, and implemented modern UI/UX patterns. Improved application performance by 40% through code optimization and lazy loading strategies.",
    startDate: "2023-01-01",
    endDate: null,
    isCurrent: true,
    location: "Remote"
  },
  {
    id: 2,
    company: "Digital Agency Co.",
    position: "Frontend Developer",
    description: "Developed responsive web applications for various clients using React and Next.js. Collaborated with designers to implement pixel-perfect UIs and ensured cross-browser compatibility.",
    startDate: "2021-06-01",
    endDate: "2022-12-31",
    isCurrent: false,
    location: "Bangalore, India"
  },
  {
    id: 3,
    company: "Freelance",
    position: "Web Developer",
    description: "Worked with multiple clients to build custom websites and web applications. Specialized in e-commerce solutions and content management systems.",
    startDate: "2020-01-01",
    endDate: "2021-05-31",
    isCurrent: false,
    location: "Remote"
  }
];

export const projectsData = [
  {
    id: 1,
    title: "Portfolio CMS",
    slug: "portfolio-cms",
    description: "A dynamic portfolio management system built with Next.js and PostgreSQL. Features include admin dashboard, content management, and beautiful glassmorphism UI.",
    imageUrl: "/images/projects/portfolio-cms.jpg",
    liveUrl: "https://portfolio.example.com",
    githubUrl: "https://github.com/username/portfolio-cms",
    techStack: ["Next.js", "React", "Tailwind CSS", "PostgreSQL", "Prisma"],
    features: ["Admin Dashboard", "Dynamic Content", "SEO Optimized", "Responsive Design"],
    isFeatured: true
  },
  {
    id: 2,
    title: "Dukan App",
    slug: "dukan-app",
    description: "E-commerce platform for small businesses with inventory management, order tracking, and payment integration. Built for scalability and ease of use.",
    imageUrl: "/images/projects/dukan-app.jpg",
    liveUrl: "https://dukan.example.com",
    githubUrl: "https://github.com/username/dukan-app",
    techStack: ["React", "Node.js", "MongoDB", "Stripe", "Redux"],
    features: ["Inventory Management", "Order Tracking", "Payment Gateway", "Analytics"],
    isFeatured: true
  },
  {
    id: 3,
    title: "HRMS System",
    slug: "hrms-system",
    description: "Complete Human Resource Management System with employee management, attendance tracking, leave management, and payroll processing.",
    imageUrl: "/images/projects/hrms.jpg",
    liveUrl: "https://hrms.example.com",
    githubUrl: "https://github.com/username/hrms",
    techStack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Tailwind CSS"],
    features: ["Employee Directory", "Attendance System", "Leave Management", "Payroll"],
    isFeatured: true
  },
  {
    id: 4,
    title: "Blog CMS",
    slug: "blog-cms",
    description: "Modern blogging platform with markdown support, categories, tags, and SEO optimization. Perfect for content creators and businesses.",
    imageUrl: "/images/projects/blog-cms.jpg",
    liveUrl: "https://blog.example.com",
    githubUrl: "https://github.com/username/blog-cms",
    techStack: ["Next.js", "MDX", "Tailwind CSS", "Vercel"],
    features: ["Markdown Editor", "SEO Tools", "Analytics", "Comments"],
    isFeatured: false
  },
  {
    id: 5,
    title: "Admin Dashboard",
    slug: "admin-dashboard",
    description: "Feature-rich admin dashboard template with charts, tables, forms, and authentication. Built with modern design principles.",
    imageUrl: "/images/projects/admin-dashboard.jpg",
    liveUrl: "https://admin.example.com",
    githubUrl: "https://github.com/username/admin-dashboard",
    techStack: ["React", "Chart.js", "Tailwind CSS", "Firebase"],
    features: ["Charts & Graphs", "Data Tables", "User Management", "Dark Mode"],
    isFeatured: true
  }
];

export const socialLinksData = [
  { platform: "GitHub", url: "https://github.com/Vasudeo-jha", iconName: "Github" },
  { platform: "LinkedIn", url: "https://www.linkedin.com/in/vasu-deo-jha/", iconName: "Linkedin" },
  { platform: "Twitter", url: "https://twitter.com/vasujha", iconName: "Twitter" },
  { platform: "Email", url: "mailto:vasudeojha503@gmail.com", iconName: "Mail" }
];

export const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" }
];
