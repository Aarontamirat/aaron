import Image from "next/image";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Braces,
  Check,
  Code2,
  Database,
  Download,
  Globe2,
  Layers3,
  MapPin,
  Server,
  Sparkles,
  Workflow,
} from "lucide-react";
import { portfolio, projects } from "@/content/portfolio";
import { SystemVisual } from "@/components/system-visual";
import { SectionHeading } from "@/components/section-heading";
import { ProjectGallery } from "@/components/project-gallery";
import { ContactForm } from "@/components/contact-form";
import { RevealObserver } from "@/components/reveal-observer";
import { emailConfigured } from "@/lib/contact-service";

const skillIcons = {
  frontend: Code2,
  backend: Server,
  database: Database,
  architecture: Layers3,
  tools: Workflow,
  creative: Sparkles,
};

export default function Home() {
  return (
    <main id="main-content">
      <section className="hero" id="home" aria-labelledby="hero-title">
        <div className="hero-grid-background" aria-hidden="true" />
        <div className="container hero-layout">
          <div className="hero-copy">
            <p className="hero-status">
              <span className="status-dot" />
              {portfolio.availability.label}
            </p>
            <p className="eyebrow hero-eyebrow">{portfolio.hero.eyebrow}</p>
            <h1 id="hero-title">
              {portfolio.hero.lineOne}
              <br />
              {portfolio.hero.lineTwo} <em>{portfolio.hero.emphasis}</em>
            </h1>
            <p className="hero-introduction">{portfolio.hero.introduction}</p>
            <div className="hero-actions">
              <a href="#projects" className="button button-primary">
                View selected work
                <ArrowDownRight size={18} />
              </a>
              <a
                href={
                  portfolio.resume.url ||
                  `mailto:${portfolio.email}?subject=CV%20request`
                }
                className="button button-secondary"
                download={
                  portfolio.resume.url ? portfolio.resume.filename : undefined
                }
              >
                {portfolio.resume.url ? "Download CV" : "Request CV"}
                <Download size={16} />
              </a>
            </div>
            <a href="#contact" className="hero-contact">
              Have something in mind?{" "}
              <span>
                Let’s talk
                <ArrowUpRight size={14} />
              </span>
            </a>
          </div>
          <SystemVisual />
        </div>
        <div className="container hero-footnote">
          <div>
            <MapPin size={14} />
            <span>{portfolio.location}</span>
            <span className="hero-footnote-separator">/</span>
            <span>Building across the stack</span>
          </div>
          <a href="#projects" className="scroll-cue">
            <span className="mono">EXPLORE THE WORK</span>
            <ArrowDown size={15} />
          </a>
        </div>
      </section>

      <div className="capability-strip">
        <div className="container">
          <span className="mono capability-label">
            CONNECTED THINKING. COMPLETE SOLUTIONS.
          </span>
          {portfolio.hero.focus.map((focus, i) => (
            <span key={focus} className="capability">
              <span className="capability-mark">
                {i === 0 ? (
                  <Braces size={17} />
                ) : i === 1 ? (
                  <Layers3 size={17} />
                ) : (
                  <Database size={17} />
                )}
              </span>
              {focus}
            </span>
          ))}
        </div>
      </div>

      <section
        className="section section-work container"
        id="projects"
        aria-labelledby="work-title"
      >
        <div className="section-heading" data-reveal>
          <div className="section-heading-main">
            <p className="eyebrow">
              <span>01</span>SELECTED WORK
            </p>
            <h2 id="work-title">
              Real workflows.
              <br />
              <span className="muted-heading">Considered solutions.</span>
            </h2>
          </div>
          <p className="work-intro">
            A selection of applications connecting people, processes, and data.
            Explore the thinking behind the build.
          </p>
        </div>
        <ProjectGallery
          projects={projects.map(
            ({
              slug,
              number,
              title,
              shortTitle,
              category,
              discipline,
              summary,
              image,
              imageAlt,
              accent,
              stack,
            }) => ({
              slug,
              number,
              title,
              shortTitle,
              category,
              discipline,
              summary,
              image,
              imageAlt,
              accent,
              stack,
            }),
          )}
        />
        <div className="work-footer">
          <span>Behind every interface, there’s a system.</span>
          <a
            href={portfolio.socials[0].url}
            target="_blank"
            rel="noopener noreferrer"
          >
            More on GitHub
            <ArrowUpRight size={16} />
          </a>
        </div>
      </section>

      <section
        className="section about-section"
        id="about"
        aria-labelledby="about-title"
      >
        <div className="container about-layout">
          <div className="about-heading" data-reveal>
            <p className="eyebrow">
              <span>02</span>THE DEVELOPER BEHIND THE WORK
            </p>
            <h2 id="about-title">{portfolio.about.title}</h2>
            <div className="about-signature">
              <span className="signature-name">Aaron.</span>
              <span className="mono">
                THINK IN SYSTEMS.
                <br />
                BUILD FOR PEOPLE.
              </span>
            </div>
          </div>
          <div className="about-copy" data-reveal>
            <p className="about-lead">{portfolio.about.introduction}</p>
            {portfolio.about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <ul className="about-principles">
              {portfolio.about.principles.map((principle) => (
                <li key={principle}>
                  <Check size={15} />
                  {principle}
                </li>
              ))}
            </ul>
            <div className="about-location">
              <Globe2 size={16} />
              <span>Based in {portfolio.location}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section container experience-section" id="experience">
        <SectionHeading
          number="03"
          eyebrow="PROFESSIONAL EXPERIENCE"
          title="Engineering in the real world."
          description="A foundation in operational systems, with an understanding of the business behind the software."
        />
        <div className="experience-timeline">
          {portfolio.experience.map((experience) => (
            <article
              className="experience-row"
              key={experience.organization}
              data-reveal
            >
              <div className="experience-company">
                <span className="timeline-dot" />
                <p className="mono">{experience.context}</p>
                <h3>{experience.organization}</h3>
                {experience.period && (
                  <span className="experience-period">{experience.period}</span>
                )}
              </div>
              <div className="experience-content">
                <h4>{experience.title}</h4>
                <p>{experience.introduction}</p>
                <ul>
                  {experience.responsibilities.map((responsibility) => (
                    <li key={responsibility}>{responsibility}</li>
                  ))}
                </ul>
                {experience.technologies.length > 0 && (
                  <div className="project-stack">
                    {experience.technologies.map((tech) => (
                      <span key={tech}>{tech}</span>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
        <div className="experience-cv">
          <span>Explore my background and qualifications.</span>
          <a
            href={
              portfolio.resume.url ||
              `mailto:${portfolio.email}?subject=CV%20request`
            }
            download={
              portfolio.resume.url ? portfolio.resume.filename : undefined
            }
          >
            View my CV
            <Download size={15} />
          </a>
        </div>
        <div className="education-row">
          <span className="mono">EDUCATION</span>
          <span>{portfolio.education.degree}</span>
          <span>{portfolio.education.organization}</span>
        </div>
      </section>

      <section className="section expertise-section" id="skills">
        <div className="container">
          <SectionHeading
            number="04"
            eyebrow="TECHNICAL EXPERTISE"
            title="Depth across the stack."
            description="The tools matter. Knowing how to connect them matters more."
          />
          <div className="skills-grid">
            {portfolio.skills.map((skill) => {
              const Icon = skillIcons[skill.icon as keyof typeof skillIcons];
              return (
                <article className="skill-item" key={skill.number} data-reveal>
                  <div className="skill-top">
                    <Icon size={23} strokeWidth={1.5} />
                    <span className="mono">{skill.number}</span>
                  </div>
                  <h3>{skill.title}</h3>
                  <p>{skill.description}</p>
                  <div className="skill-technologies">
                    {skill.technologies.map((tech) => (
                      <span key={tech}>{tech}</span>
                    ))}
                  </div>
                  <span
                    className={`skill-level ${skill.number === "06" ? "exploring" : ""}`}
                  >
                    <span />
                    {skill.level}
                  </span>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section container approach-section" id="approach">
        <SectionHeading
          number="05"
          eyebrow="HOW I WORK"
          title="Intentional at every layer."
        />
        <div className="approach-grid">
          {portfolio.approach.map((step) => (
            <article className="approach-step" key={step.number} data-reveal>
              <div className="approach-number mono">
                {step.number}
                <span />
                <ArrowRight size={16} />
              </div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section certifications-section" id="certifications">
        <div className="container">
          <SectionHeading
            number="06"
            eyebrow="CONTINUOUS LEARNING"
            title="A practice of getting better."
            description="Web development credentials from IBM and Cisco. Explore the original credential records."
          />
          <div className="credentials">
            {portfolio.certifications.map((credential) => (
              <a
                className="credential"
                key={credential.title}
                href={credential.url}
                target="_blank"
                rel="noopener noreferrer"
                data-reveal
              >
                <Image
                  src={credential.image}
                  alt={`${credential.issuer} ${credential.title} badge`}
                  width={66}
                  height={66}
                  sizes="66px"
                />
                <div>
                  <span className="credential-issuer mono">
                    {credential.issuer} · {credential.year}
                  </span>
                  <h3>{credential.title}</h3>
                </div>
                <span className="credential-link">
                  View credential
                  <ArrowUpRight size={15} />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section
        className="section contact-section"
        id="contact"
        aria-labelledby="contact-title"
      >
        <div className="container contact-layout">
          <div className="contact-copy" data-reveal>
            <p className="eyebrow">
              <span>07</span>LET’S CONNECT
            </p>
            <h2 id="contact-title">
              {portfolio.contact.title} <em>{portfolio.contact.emphasis}</em>
            </h2>
            <p>{portfolio.contact.description}</p>
            <div className="contact-socials">
              {portfolio.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.label}
                  <ArrowUpRight size={17} />
                </a>
              ))}
            </div>
            <div className="contact-location">
              <MapPin size={15} />
              <span>{portfolio.location}</span>
            </div>
          </div>
          <ContactForm
            email={portfolio.email}
            configured={emailConfigured()}
            topics={portfolio.contact.topics}
          />
        </div>
      </section>
      <RevealObserver />
    </main>
  );
}
