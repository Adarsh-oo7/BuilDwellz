"use client";

import React, { useState } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import { projects } from "@/lib/projects";

interface Props {
  params: { id: string };
}

export default function ProjectDetailsPage({ params }: Props) {
  const project = projects.find((p) => p.id === parseInt(params.id));

  if (!project) return notFound();

  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openGallery = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeGallery = () => {
    setIsOpen(false);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? project.gallery!.length - 1 : prev - 1));
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === project.gallery!.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="py-20 container mx-auto px-4">
      <h1 className="text-4xl font-bold mb-2">{project.title}</h1>
      <p className="text-muted-foreground text-lg mb-6">
        {project.category.toUpperCase()} • {project.location} • {project.year}
      </p>
      <p className="mb-8 max-w-3xl">{project.description}</p>

      <Image
        src={project.image}
        alt={project.title}
        width={1000}
        height={500}
        className="rounded-lg shadow mb-8"
      />

      {/* Gallery Section */}
      {project.gallery && (
        <>
          <h2 className="text-2xl font-semibold mb-4">Project Gallery</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {project.gallery.map((img, i) => (
              <div
                key={i}
                className="cursor-pointer"
                onClick={() => openGallery(i)}
              >
                <Image
                  src={img}
                  alt={`Gallery ${i + 1}`}
                  width={400}
                  height={300}
                  className="rounded shadow"
                />
              </div>
            ))}
          </div>
        </>
      )}

      {/* Popup Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={closeGallery}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              closeGallery();
            }}
            className="absolute top-8 right-8 text-white text-3xl font-bold hover:text-red-500"
            aria-label="Close gallery"
          >
            &times;
          </button>

          <button
            onClick={prevImage}
            className="absolute left-8 text-white text-4xl font-bold hover:text-gray-300"
            aria-label="Previous image"
          >
            &#8592;
          </button>

          <Image
            src={project.gallery[currentIndex]}
            alt={`Gallery ${currentIndex + 1}`}
            width={800}
            height={600}
            className="rounded-lg shadow-lg"
            onClick={(e) => e.stopPropagation()} // prevent closing popup on image click
          />

          <button
            onClick={nextImage}
            className="absolute right-8 text-white text-4xl font-bold hover:text-gray-300"
            aria-label="Next image"
          >
            &#8594;
          </button>
        </div>
      )}
    </div>
  );
}
