"use client";

import Link from "next/link";
import { ArrowUpRight, Download, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Logo } from "./logo";

type NavigationProps = {
  name: string;
  links: { label: string; href: string }[];
  resume: { url: string | null; filename: string };
  email: string;
};

export function Navigation({ name, links, resume, email }: NavigationProps) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const menuButton = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    function dismiss(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    }
    function outside(event: PointerEvent) {
      if (header.current && !header.current.contains(event.target as Node))
        setOpen(false);
    }
    document.addEventListener("keydown", dismiss);
    document.addEventListener("pointerdown", outside);
    return () => {
      document.removeEventListener("keydown", dismiss);
      document.removeEventListener("pointerdown", outside);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-15% 0px -65% 0px" },
    );
    document
      .querySelectorAll("main section[id]")
      .forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <header className="site-header" ref={header}>
      <div className="container navigation">
        <Link
          href="/"
          className="brand"
          aria-label={`${name}, home`}
          onClick={() => setOpen(false)}
        >
          <Logo />
          <span>
            Aaron Tamirat<span className="brand-dot">.</span>
          </span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                pathname === "/" && active === link.href.split("#")[1]
                  ? "active"
                  : ""
              }
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <a
          className="nav-resume"
          href={resume.url || `mailto:${email}?subject=CV%20request`}
          download={resume.url ? resume.filename : undefined}
        >
          {resume.url ? "Download CV" : "Request CV"}
          {resume.url ? <Download size={14} /> : <ArrowUpRight size={14} />}
        </a>
        <button
          ref={menuButton}
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Close navigation" : "Open navigation"}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      <nav
        id="mobile-navigation"
        className={`mobile-nav ${open ? "is-open" : ""}`}
        aria-label="Mobile navigation"
        inert={!open}
      >
        {links.map((link, i) => (
          <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
            <span className="mono">0{i + 1}</span>
            {link.label}
            <ArrowUpRight size={18} />
          </Link>
        ))}
        <a
          href={resume.url || `mailto:${email}?subject=CV%20request`}
          download={resume.url ? resume.filename : undefined}
          onClick={() => setOpen(false)}
        >
          {resume.url ? "Download CV" : "Request CV"}
          <Download size={18} />
        </a>
      </nav>
    </header>
  );
}
