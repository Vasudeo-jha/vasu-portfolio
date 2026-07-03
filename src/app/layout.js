import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: {
    default: "Vasu Jha | Frontend Developer",
    template: "%s | Vasu Jha",
  },
  description:
    "Passionate Frontend Developer with experience in building modern, responsive and scalable web applications using React.js, Next.js, Tailwind CSS and PostgreSQL.",
  keywords: [
    "Frontend Developer",
    "React Developer",
    "Next.js Developer",
    "Full Stack Developer",
    "Web Developer",
    "JavaScript",
    "TypeScript",
    "Tailwind CSS",
  ],
  authors: [{ name: "Vasu Jha" }],
  creator: "Vasu Jha",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://vasujha.dev",
    siteName: "Vasu Jha - Portfolio",
    title: "Vasu Jha | Frontend Developer",
    description:
      "Passionate Frontend Developer with experience in building modern, responsive and scalable web applications.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Vasu Jha - Frontend Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vasu Jha | Frontend Developer",
    description:
      "Passionate Frontend Developer with experience in building modern, responsive and scalable web applications.",
    images: ["/og-image.jpg"],
    creator: "@vasujha",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="min-h-screen bg-[var(--bg-primary)] text-white">
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "rgba(18, 18, 26, 0.95)",
              color: "#fff",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "12px",
              backdropFilter: "blur(10px)",
            },
            success: {
              iconTheme: {
                primary: "#22c55e",
                secondary: "#fff",
              },
            },
            error: {
              iconTheme: {
                primary: "#ef4444",
                secondary: "#fff",
              },
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}
