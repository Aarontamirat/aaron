import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const slugs = [
  "shareholder-voting-system",
  "hr-logistics-management-platform",
  "it-service-management-platform",
  "library-management-system",
  "leave-management-system",
  "insurance-claim-notifications-platform",
];

test("all case studies, metadata routes, images, and the authentic PDF are available", async ({
  request,
}) => {
  for (const slug of slugs) {
    const response = await request.get(`/projects/${slug}`);
    expect(response.status()).toBe(200);
    const html = await response.text();
    expect(html).toContain(`https://aarontamirat.vercel.app/projects/${slug}`);
    for (const anchor of [
      "overview",
      "problem",
      "features",
      "architecture",
      "decisions",
      "challenge",
      "outcome",
    ])
      expect(html).toContain(`id="${anchor}"`);
  }
  for (const route of [
    "/robots.txt",
    "/sitemap.xml",
    "/opengraph-image",
    "/icon.svg",
    "/projects/voting.png",
    "/projects/hrlog.png",
    "/projects/itsm.jpg",
    "/projects/library.png",
    "/projects/leave.png",
    "/projects/claim.png",
  ])
    expect((await request.get(route)).status()).toBe(200);
  const resume = await request.get("/cv/Aaron_Tamirat_CV.pdf");
  expect(resume.status()).toBe(200);
  expect(resume.headers()["content-type"]).toContain("application/pdf");
  expect((await resume.body()).subarray(0, 5).toString()).toBe("%PDF-");
  expect((await request.get("/projects/does-not-exist")).status()).toBe(404);
});

test("project filters work, all cards open case studies, and keyboard navigation remains usable", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#main-content/);
  await expect(page.locator(".project-card")).toHaveCount(6);
  await page.getByRole("button", { name: "Enterprise", exact: true }).click();
  await expect(page.locator(".project-card")).toHaveCount(3);
  await page.getByRole("button", { name: "Workflow", exact: true }).click();
  await expect(page.locator(".project-card")).toHaveCount(3);
  await page.getByRole("button", { name: /All work/ }).click();
  await expect(page.locator(".project-card")).toHaveCount(6);
  await page.locator(`.project-link[href="/projects/${slugs[0]}"]`).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Shareholder Voting System.",
  );
  await page.getByRole("link", { name: "04 Architecture" }).click();
  await expect(page).toHaveURL(/#architecture/);
  expect(errors).toEqual([]);
});

test("mobile navigation opens, dismisses with Escape, and follows a section link", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Open navigation" });
  await toggle.click();
  await expect(
    page.getByRole("navigation", { name: "Mobile navigation" }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(toggle).toBeFocused();
  await toggle.click();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: /Contact/ })
    .click();
  await expect(page).toHaveURL(/#contact/);
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
});

test("the CV button starts a real PDF download", async ({ page }) => {
  await page.goto("/");
  const downloadPromise = page.waitForEvent("download");
  await page.locator(".nav-resume").click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe("Aaron_Tamirat_CV.pdf");
  expect(await download.failure()).toBeNull();
});

test("contact validates input and offers an honest email draft when no provider is configured", async ({
  page,
}) => {
  await page.goto("/#contact");
  await page.getByRole("button", { name: "Open email draft" }).click();
  await expect(
    page.getByText("Enter a name between 2 and 80 characters."),
  ).toBeVisible();
  await page.getByLabel("Your name").fill("Alex Morgan");
  await page
    .getByRole("textbox", { name: "Email address" })
    .fill("alex@example.com");
  await page
    .getByLabel("What’s on your mind?")
    .selectOption("Engineering opportunity");
  await page
    .getByLabel("Your message")
    .fill(
      "I would like to discuss a full-stack engineering opportunity with you.",
    );
  await page.waitForTimeout(2100);
  await page.getByRole("button", { name: "Open email draft" }).click();
  await expect(
    page.getByRole("status").filter({ hasText: "Your email draft is ready" }),
  ).toBeVisible();
  await expect(page.getByText(/Your message has been accepted/)).toHaveCount(0);
});

test("server rejects invalid, automated, cross-origin, and unavailable-delivery requests", async ({
  request,
}) => {
  const message = {
    name: "Alex Morgan",
    email: "alex@example.com",
    topic: "Engineering opportunity",
    message: "I would like to discuss a full-stack engineering opportunity.",
    website: "",
    startedAt: Date.now() - 5000,
  };
  const headers = {
    origin: "http://127.0.0.1:3000",
    "x-real-ip": "browser-api-test",
  };
  expect(
    (
      await request.post("/api/contact", {
        data: message,
        headers: { ...headers, origin: "https://other.example" },
      })
    ).status(),
  ).toBe(403);
  expect(
    (
      await request.post("/api/contact", {
        data: { ...message, email: "invalid" },
        headers,
      })
    ).status(),
  ).toBe(400);
  expect(
    (
      await request.post("/api/contact", {
        data: { ...message, website: "https://spam.example" },
        headers,
      })
    ).status(),
  ).toBe(400);
  expect(
    (
      await request.post("/api/contact", {
        data: { ...message, startedAt: Date.now() },
        headers,
      })
    ).status(),
  ).toBe(400);
  const result = await request.post("/api/contact", { data: message, headers });
  expect(result.status()).toBe(503);
  expect((await result.json()).error).toContain(
    "Email delivery is currently unavailable",
  );
  await request.post("/api/contact", { data: message, headers });
  const limited = await request.post("/api/contact", {
    data: message,
    headers,
  });
  expect(limited.status()).toBe(429);
  expect(limited.headers()["retry-after"]).toBe("900");
});

test("layouts fit narrow phones, tablets, and desktops; reduced motion disables the animated visual", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ["/", `/projects/${slugs[1]}`]) {
      await page.goto(route);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      ).toBe(true);
    }
  }
  await page.goto("/");
  expect(
    await page
      .locator(".system-stack")
      .evaluate((element) => getComputedStyle(element).animationName),
  ).toBe("none");
});

test("homepage and case studies have no accessibility violations at desktop and mobile sizes", async ({
  page,
}) => {
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ["/", ...slugs.map((slug) => `/projects/${slug}`)]) {
      await page.goto(route);
      const result = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze();
      expect(
        result.violations.map((violation) => ({
          id: violation.id,
          nodes: violation.nodes.map((node) => node.target),
        })),
      ).toEqual([]);
    }
  }
});
