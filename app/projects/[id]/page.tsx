import { notFound } from "next/navigation";
import { projects } from "@/lib/projects";
import ProjectClient from "./project-client";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ id: string }>;
}

// Static generation function
export async function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id.toString(),
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  
  // Validate that id is a valid number
  const projectId = parseInt(id);
  if (isNaN(projectId)) {
    return {
      title: "Project Not Found",
      description: "The requested project could not be found.",
    };
  }

  const project = projects.find((p) => p.id === projectId);
  
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
        }
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

export default async function ProjectDetailsPage({ params }: Props) {
  const { id } = await params;
  
  // Validate that id is a valid number
  const projectId = parseInt(id);
  if (isNaN(projectId)) {
    return notFound();
  }

  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    return notFound();
  }

  // Pass the project data to the client component
  return <ProjectClient project={project} />;
}