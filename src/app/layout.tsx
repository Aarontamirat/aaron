import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { portfolio } from "@/content/portfolio";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import "./globals.css";

const geist = localFont({
  src: "./fonts/geist.woff",
  variable: "--font-geist",
  display: "swap",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/geist-mono.woff",
  variable: "--font-mono",
  display: "swap",
  weight: "100 900",
});
const description =
  "Aaron Tamirat is a full-stack web developer and software engineer in Addis Ababa, building modern web applications, APIs, databases, and business systems.";

export const metadata: Metadata = {
  metadataBase: new URL(portfolio.siteUrl),
  title: {
    default: "Aaron Tamirat — Full-Stack Developer & Software Engineer",
    template: "%s | Aaron Tamirat",
  },
  description,
  applicationName: "Aaron Tamirat Portfolio",
  authors: [{ name: portfolio.name, url: portfolio.siteUrl }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: portfolio.siteUrl,
    siteName: "Aaron Tamirat",
    title: "Thoughtful interfaces. Powerful systems. — Aaron Tamirat",
    description,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Aaron Tamirat — Full-Stack Developer & Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aaron Tamirat — Full-Stack Developer",
    description,
    images: ["/opengraph-image"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0b0e14",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${portfolio.siteUrl}/#person`,
        name: portfolio.name,
        url: portfolio.siteUrl,
        jobTitle: portfolio.title,
        email: `mailto:${portfolio.email}`,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Addis Ababa",
          addressCountry: "ET",
        },
        sameAs: portfolio.socials.map((social) => social.url),
        knowsAbout: [
          "Full-stack web development",
          "Next.js",
          "React",
          "TypeScript",
          "REST APIs",
          "PostgreSQL",
          "MySQL",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${portfolio.siteUrl}/#website`,
        url: portfolio.siteUrl,
        name: "Aaron Tamirat — Full-Stack Developer",
        inLanguage: "en",
        author: { "@id": `${portfolio.siteUrl}/#person` },
      },
    ],
  };
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body id="top">
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <Navigation
          name={portfolio.name}
          links={portfolio.navigation}
          resume={portfolio.resume}
          email={portfolio.email}
        />
        {children}
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
