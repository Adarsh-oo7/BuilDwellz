"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Project } from "@/lib/projects";

interface Props {
  project: Project;
}

// Helper function to fix image paths for Next.js
const getImagePath = (path: string) => {
  // Remove the ../ prefix and ensure it starts with /
  return path.replace(/^\.\.\//, '/');
};

export default function ProjectClient({ project }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState<{[key: string]: boolean}>({});

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

  // Handle keyboard navigation
  const handleKeyDown = (e: KeyboardEvent) => {
    if (!isOpen) return;
    
    if (e.key === "Escape") {
      closeGallery();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      prevImage(e as any);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      nextImage(e as any);
    }
  };

  // Add keyboard event listener
  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, currentIndex, project.gallery]);

  // Handle image load errors
  const handleImageError = (imagePath: string) => {
    setImageErrors(prev => ({ ...prev, [imagePath]: true }));
  };

  return (
    <div className="py-20 container mx-auto px-4">
      <h1 className="text-4xl font-bold mb-2">{project.title}</h1>
      <p className="text-muted-foreground text-lg mb-6">
        {project.category.toUpperCase()} • {project.location} • {project.year}
      </p>
      <p className="mb-8 max-w-3xl text-lg leading-relaxed">{project.description}</p>

      <div className="mb-8">
        {!imageErrors[project.image] ? (
          <Image
            src={getImagePath(project.image)}
            alt={project.title}
            width={1200}
            height={600}
            className="rounded-lg shadow-lg w-full h-auto"
            priority
            onError={() => handleImageError(project.image)}
          />
        ) : (
          <div className="w-full h-96 bg-gray-200 rounded-lg shadow-lg flex items-center justify-center">
            <div className="text-center text-gray-500">
              <div className="text-4xl mb-2">🏠</div>
              <p>Image not available</p>
              <p className="text-sm mt-1">{project.title}</p>
            </div>
          </div>
        )}
      </div>

      {/* Gallery Section */}
      {project.gallery && project.gallery.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">Project Gallery</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {project.gallery.map((img, i) => (
              <div
                key={i}
                className="cursor-pointer group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
                onClick={() => openGallery(i)}
              >
                {!imageErrors[img] ? (
                  <Image
                    src={getImagePath(img)}
                    alt={`${project.title} gallery image ${i + 1}`}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={() => handleImageError(img)}
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <div className="text-2xl mb-1">📸</div>
                      <p className="text-xs">Image {i + 1}</p>
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                  <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-sm font-medium">Click to view</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Popup Overlay */}
      {isOpen && project.gallery && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
          onClick={closeGallery}
        >
          {/* Close button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              closeGallery();
            }}
            className="absolute top-4 right-4 text-white text-3xl font-bold hover:text-red-400 transition-colors duration-200 z-10"
            aria-label="Close gallery"
          >
            ×
          </button>

          {/* Image counter */}
          <div className="absolute top-4 left-4 text-white text-lg font-medium z-10">
            {currentIndex + 1} / {project.gallery.length}
          </div>

          {/* Previous button */}
          {project.gallery.length > 1 && (
            <button
              onClick={prevImage}
              className="absolute left-4 text-white text-4xl font-bold hover:text-gray-300 transition-colors duration-200 z-10"
              aria-label="Previous image"
            >
              ‹
            </button>
          )}

          {/* Main image */}
          <div className="relative max-w-4xl max-h-full">
            {!imageErrors[project.gallery[currentIndex]] ? (
              <Image
                src={getImagePath(project.gallery[currentIndex])}
                alt={`${project.title} gallery image ${currentIndex + 1}`}
                width={1200}
                height={800}
                className="rounded-lg shadow-2xl max-w-full max-h-[80vh] w-auto h-auto object-contain"
                onClick={(e) => e.stopPropagation()}
                onError={() => handleImageError(project.gallery![currentIndex])}
              />
            ) : (
              <div className="w-full h-96 bg-gray-800 rounded-lg flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-6xl mb-4">📸</div>
                  <p className="text-xl">Image not available</p>
                  <p className="text-sm mt-2">Gallery image {currentIndex + 1}</p>
                </div>
              </div>
            )}
          </div>

          {/* Next button */}
          {project.gallery.length > 1 && (
            <button
              onClick={nextImage}
              className="absolute right-4 text-white text-4xl font-bold hover:text-gray-300 transition-colors duration-200 z-10"
              aria-label="Next image"
            >
              ›
            </button>
          )}

          {/* Thumbnail strip */}
          {project.gallery.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 max-w-full overflow-x-auto px-4">
              {project.gallery.map((img, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex(i);
                  }}
                  className={`flex-shrink-0 w-16 h-12 rounded overflow-hidden border-2 transition-all duration-200 ${
                    i === currentIndex ? "border-white" : "border-transparent opacity-60 hover:opacity-80"
                  }`}
                >
                  {!imageErrors[img] ? (
                    <Image
                      src={getImagePath(img)}
                      alt={`Thumbnail ${i + 1}`}
                      width={64}
                      height={48}
                      className="w-full h-full object-cover"
                      onError={() => handleImageError(img)}
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-600 flex items-center justify-center">
                      <span className="text-white text-xs">📸</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}