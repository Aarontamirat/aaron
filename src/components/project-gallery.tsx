"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { useState } from "react";
import type { Project } from "@/content/portfolio";

type PreviewProject = Pick<
  Project,
  | "slug"
  | "number"
  | "title"
  | "shortTitle"
  | "category"
  | "discipline"
  | "summary"
  | "image"
  | "imageAlt"
  | "accent"
  | "stack"
>;

export function ProjectGallery({ projects }: { projects: PreviewProject[] }) {
  const [filter, setFilter] = useState("All work");
  const filtered = projects.filter(
    (project) => filter === "All work" || project.category === filter,
  );
  return (
    <>
      <div className="project-toolbar">
        <div
          className="project-filters"
          role="group"
          aria-label="Filter projects"
        >
          {["All work", "Enterprise", "Workflow"].map((category) => (
            <button
              key={category}
              type="button"
              aria-pressed={filter === category}
              onClick={() => setFilter(category)}
              className={filter === category ? "selected" : ""}
            >
              {category}
              {category === "All work" && (
                <span>{projects.length.toString().padStart(2, "0")}</span>
              )}
            </button>
          ))}
        </div>
        <span className="mono gallery-caption" aria-live="polite">
          {filtered.length.toString().padStart(2, "0")} PROJECTS · END-TO-END
          ENGINEERING
        </span>
      </div>
      <div className="project-grid">
        {filtered.map((project, index) => (
          <article
            className={`project-card accent-${project.accent} ${index < 2 ? "project-featured" : "project-compact"}`}
            key={project.slug}
          >
            <Link className="project-link" href={`/projects/${project.slug}`}>
              <div className="project-artwork">
                <div className="project-artwork-meta mono">
                  <span>{project.discipline}</span>
                  <span>
                    {project.number} /{" "}
                    {projects.length.toString().padStart(2, "0")}
                  </span>
                </div>
                <div className="project-browser">
                  <div className="browser-toolbar">
                    <span className="browser-dots">
                      <i />
                      <i />
                      <i />
                    </span>
                    <span className="mono">{project.title}</span>
                    <span className="browser-indicator" />
                  </div>
                  <Image
                    src={project.image}
                    alt={project.imageAlt}
                    width={1600}
                    height={780}
                    sizes="(max-width: 700px) 90vw, (max-width: 1100px) 45vw, 650px"
                    className="project-image"
                  />
                </div>
                <span className="artwork-caption mono">
                  ORIGINAL APPLICATION CAPTURE
                </span>
              </div>
              <div className="project-card-content">
                <div className="project-card-heading">
                  <div>
                    <p className="project-category mono">
                      {project.category} application
                    </p>
                    <h3>{project.title}</h3>
                  </div>
                  <span className="project-arrow">
                    <ArrowUpRight size={21} />
                  </span>
                </div>
                <p>{project.summary}</p>
                <div className="project-stack">
                  {project.stack.slice(0, 4).map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
                <span className="case-study-link">
                  Explore case study <ArrowRight size={15} />
                </span>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </>
  );
}
