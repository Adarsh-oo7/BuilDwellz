import { notFound } from "next/navigation";
import { projects } from "@/lib/projects";
import { upcomingProjects } from "@/lib/upcoming-projects";
import ProjectClient from "./project-client";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ id: string }>;
}

// Static generation for all project IDs (current + upcoming)
export async function generateStaticParams() {
  const all = [...projects, ...upcomingProjects];
  return all.map((project) => ({
    id: project.id.toString(),
  }));
}

// Dynamic SEO metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  const allProjects = [...projects, ...upcomingProjects];
  const project = allProjects.find((p) => p.id.toString() === id);

  if (!project) {
    return {
      title: "Project Not Found",
      description: "The requested project could not be found.",
    };
  }

  return {
    title: `${project.title} - Architecture Portfolio`,
    description: project.description,
    keywords: [project.category, project.location, "architecture", "design"],
    openGraph: {
      title: project.title,
      description: project.description,
      images: [
        {
          url: project.image,
          width: 1200,
          height: 600,
          alt: project.title,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.description,
      images: [project.image],
    },
  };
}

// Page component
export default async function ProjectDetailsPage({ params }: Props) {
  const { id } = await params;

  const allProjects = [...projects, ...upcomingProjects];
  const project = allProjects.find((p) => p.id.toString() === id);

  if (!project) return notFound();

  const isUpcoming = upcomingProjects.some((p) => p.id.toString() === id);

  return <ProjectClient project={project} isUpcoming={isUpcoming} />;
}
