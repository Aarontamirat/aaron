"use client";

import Link from "next/link";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main id="main-content" className="container not-found">
      <p className="eyebrow">SOMETHING WENT WRONG</p>
      <h1>Let’s try that again.</h1>
      <p>This page couldn’t load. Please retry, or return to the homepage.</p>
      <div className="hero-actions">
        <button type="button" className="button button-primary" onClick={reset}>
          Try again
        </button>
        <Link className="button button-secondary" href="/">
          Return home
        </Link>
      </div>
    </main>
  );
}
