import Link from "next/link";
import { ArrowUpRight, ArrowUp } from "lucide-react";
import { portfolio } from "@/content/portfolio";
import { Logo } from "./logo";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <Link href="/" className="brand">
              <Logo />
              <span>
                {portfolio.name}
                <span className="brand-dot">.</span>
              </span>
            </Link>
            <p>
              {portfolio.title} · {portfolio.secondaryTitle}
            </p>
          </div>
          <a className="footer-email" href={`mailto:${portfolio.email}`}>
            {portfolio.email}
            <ArrowUpRight size={17} />
          </a>
        </div>
        <div className="footer-links">
          <nav aria-label="Footer navigation">
            {portfolio.navigation.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>
          <div>
            {portfolio.socials.map((social) => (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {social.label}
                <ArrowUpRight size={13} />
              </a>
            ))}
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {portfolio.name}
          </span>
          <span className="mono">BUILT WITH CARE. ENGINEERED WITH INTENT.</span>
          <a href="#top">
            Back to top
            <ArrowUp size={14} />
          </a>
        </div>
      </div>
    </footer>
  );
}
