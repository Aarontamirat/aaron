import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  GitBranch,
} from "lucide-react";
import { getProject, portfolio, projects } from "@/content/portfolio";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: {
      title: `${project.title} — Aaron Tamirat`,
      description: project.summary,
      url: `${portfolio.siteUrl}/projects/${slug}`,
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: `${project.title} — a project by Aaron Tamirat`,
        },
      ],
    },
    twitter: {
      title: `${project.title} — Aaron Tamirat`,
      description: project.summary,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const nextProject =
    projects[
      (projects.findIndex((item) => item.slug === slug) + 1) % projects.length
    ];
  return (
    <main id="main-content" className={`case-study accent-${project.accent}`}>
      <div className="container">
        <nav className="case-breadcrumb" aria-label="Breadcrumb">
          <Link href="/#projects">
            <ArrowLeft size={15} />
            Selected work
          </Link>
          <span>/</span>
          <span>{project.title}</span>
        </nav>
        <header className="case-header">
          <p className="eyebrow">
            <span>{project.number}</span>
            {project.discipline}
          </p>
          <h1>
            {project.title}
            <span className="brand-dot">.</span>
          </h1>
          <p className="case-summary">{project.summary}</p>
          <div className="case-meta">
            <div>
              <span className="mono">CONTRIBUTION</span>
              <p>{project.role}</p>
            </div>
            <div>
              <span className="mono">TYPE</span>
              <p>{project.category} application</p>
            </div>
            <div className="case-meta-stack">
              <span className="mono">TECHNOLOGY</span>
              <div className="project-stack">
                {project.stack.map((technology) => (
                  <span key={technology}>{technology}</span>
                ))}
              </div>
            </div>
          </div>
        </header>
        <figure className="case-screenshot">
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
            sizes="(max-width: 1250px) 90vw, 1180px"
            priority
          />
          <figcaption>
            <span>Original application screenshot · published portfolio</span>
            <a href={project.image} target="_blank" rel="noopener noreferrer">
              Open full image
              <ArrowUpRight size={14} />
            </a>
          </figcaption>
        </figure>
        <div className="case-body">
          <aside className="case-index">
            <span className="mono">IN THIS CASE STUDY</span>
            <nav aria-label="Case study contents">
              {[
                { id: "overview", title: "Overview" },
                { id: "problem", title: "The problem" },
                { id: "features", title: "What it does" },
                { id: "architecture", title: "Architecture" },
                { id: "decisions", title: "Engineering decisions" },
                { id: "challenge", title: "The challenge" },
                { id: "outcome", title: "The result" },
              ].map((item, i) => (
                <a href={`#${item.id}`} key={item.id}>
                  <span>0{i + 1}</span>
                  {item.title}
                </a>
              ))}
            </nav>
          </aside>
          <div className="case-sections">
            <section id="overview">
              <p className="eyebrow">01 / OVERVIEW</p>
              <h2>{project.shortTitle}</h2>
              <p>{project.overview}</p>
              <div className="case-contribution">
                <GitBranch size={20} />
                <div>
                  <h3>My contribution</h3>
                  <p>
                    {project.role}, bringing the interface, business workflow,
                    and data layer together.
                  </p>
                </div>
              </div>
            </section>
            <section id="problem">
              <p className="eyebrow">02 / THE BUSINESS REQUIREMENT</p>
              <h2>The problem to solve.</h2>
              <p>{project.problem}</p>
            </section>
            <section id="features">
              <p className="eyebrow">03 / THE APPLICATION</p>
              <h2>What the system does.</h2>
              <div className="case-feature-grid">
                {project.features.map((feature) => (
                  <article key={feature.title}>
                    <Check size={17} />
                    <h3>{feature.title}</h3>
                    <p>{feature.description}</p>
                  </article>
                ))}
              </div>
            </section>
            <section id="architecture">
              <p className="eyebrow">04 / TECHNICAL ARCHITECTURE</p>
              <h2>How the layers connect.</h2>
              <div
                className="architecture-diagram"
                role="img"
                aria-label={project.architecture
                  .map(
                    (layer) =>
                      `${layer.label}: ${layer.technology}. ${layer.description}`,
                  )
                  .join(" Then ")}
              >
                {project.architecture.map((layer, i) => (
                  <div className="architecture-layer" key={layer.label}>
                    <div className="architecture-step mono">0{i + 1}</div>
                    <div>
                      <span className="mono architecture-label">
                        {layer.label}
                      </span>
                      <h3>{layer.technology}</h3>
                      <p>{layer.description}</p>
                    </div>
                    {i < project.architecture.length - 1 && (
                      <span
                        className="architecture-connector"
                        aria-hidden="true"
                      >
                        ↓
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </section>
            <section id="decisions">
              <p className="eyebrow">05 / ENGINEERING DECISIONS</p>
              <h2>Deliberate choices.</h2>
              <div className="case-decisions">
                {project.decisions.map((decision, i) => (
                  <article key={decision.title}>
                    <span className="mono">0{i + 1}</span>
                    <div>
                      <h3>{decision.title}</h3>
                      <p>{decision.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>
            <section id="challenge">
              <p className="eyebrow">06 / THE TECHNICAL CHALLENGE</p>
              <h2>{project.challenge.title}.</h2>
              <p>{project.challenge.description}</p>
              <div className="challenge-solution">
                <span className="mono">THE APPROACH</span>
                <p>{project.challenge.solution}</p>
              </div>
            </section>
            <section id="outcome">
              <p className="eyebrow">07 / THE RESULT</p>
              <h2>A connected application.</h2>
              <p>{project.outcome}</p>
              <div className="case-source-links">
                {project.github ? (
                  <a
                    className="button button-secondary"
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Explore source
                    <ArrowUpRight size={16} />
                  </a>
                ) : (
                  <p className="private-source">
                    Public source and a live demo are not available for this
                    project.
                  </p>
                )}
                {project.additionalSource && (
                  <a
                    className="text-link"
                    href={project.additionalSource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {project.additionalSource.label}
                    <ArrowUpRight size={15} />
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    className="button button-primary"
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open live interface
                    <ArrowUpRight size={16} />
                  </a>
                )}
              </div>
              {project.demoNote && (
                <p className="demo-note">{project.demoNote}</p>
              )}
              <details className="source-note">
                <summary>About this case study’s sources</summary>
                <p>{project.sourceNote}</p>
              </details>
            </section>
          </div>
        </div>
        <div className="case-next">
          <div>
            <span className="mono">KEEP EXPLORING</span>
            <Link href={`/projects/${nextProject.slug}`}>
              {nextProject.title}
              <ArrowRight size={28} />
            </Link>
          </div>
          <Link className="text-link" href="/#contact">
            Let’s discuss your next project
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </main>
  );
}
