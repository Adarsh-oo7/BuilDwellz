import { notFound } from "next/navigation";
import { projects } from "@/lib/projects";
import ProjectClient from "./project-client";

interface Props {
  params: { id: string };
}

// Static generation function
export async function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id.toString(),
  }));
}

// Optional: Generate metadata for SEO
export async function generateMetadata({ params }: Props) {
  const project = projects.find((p) => p.id === parseInt(params.id));
  
  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} - Architecture Portfolio`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [project.image],
    },
  };
}

export default function ProjectDetailsPage({ params }: Props) {
  const project = projects.find((p) => p.id === parseInt(params.id));

  if (!project) {
    return notFound();
  }

  // Pass the project data to the client component
  return <ProjectClient project={project} />;
}