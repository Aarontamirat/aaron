import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main id="main-content" className="container not-found">
      <p className="eyebrow">404 / A DIFFERENT PATH</p>
      <h1>This page isn’t here.</h1>
      <p>
        The work you’re looking for may have moved. You can explore all of my
        projects from the homepage.
      </p>
      <Link href="/#projects" className="button button-primary">
        <ArrowLeft size={16} />
        Back to selected work
      </Link>
    </main>
  );
}
