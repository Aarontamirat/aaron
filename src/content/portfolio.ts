import { contactTopics } from "@/lib/contact-validation";

export type Project = {
  slug: string;
  number: string;
  title: string;
  shortTitle: string;
  category: "Enterprise" | "Workflow";
  discipline: string;
  summary: string;
  image: string;
  imageAlt: string;
  accent: "blue" | "teal" | "violet";
  stack: string[];
  role: string;
  overview: string;
  problem: string;
  features: { title: string; description: string }[];
  architecture: { label: string; technology: string; description: string }[];
  decisions: { title: string; description: string }[];
  challenge: { title: string; description: string; solution: string };
  outcome: string;
  sourceNote: string;
  github?: string;
  additionalSource?: { label: string; url: string };
  liveUrl?: string;
  demoNote?: string;
};

export const portfolio = {
  name: "Aaron Tamirat",
  firstName: "Aaron",
  title: "Full-Stack Web Developer",
  secondaryTitle: "Software Engineer",
  email: "aarontamirat99@gmail.com",
  location: "Addis Ababa, Ethiopia",
  timezone: "Africa/Addis_Ababa",
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL || "https://aarontamirat.vercel.app",
  resume: {
    url: "/cv/Aaron_Tamirat_CV.pdf" as string | null,
    filename: "Aaron_Tamirat_CV.pdf",
  },
  availability: {
    label: "Open to engineering conversations",
    employmentTypes: [] as string[],
    relocation: null as string | null,
  },
  socials: [
    { label: "GitHub", url: "https://github.com/aarontamirat" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/aarontamirat/" },
  ],
  navigation: [
    { label: "About", href: "/#about" },
    { label: "Experience", href: "/#experience" },
    { label: "Expertise", href: "/#skills" },
    { label: "Work", href: "/#projects" },
    { label: "Contact", href: "/#contact" },
  ],
  hero: {
    eyebrow: "FULL-STACK DEVELOPER · SOFTWARE ENGINEER",
    lineOne: "Thoughtful interfaces.",
    lineTwo: "Powerful",
    emphasis: "systems.",
    introduction:
      "I’m Aaron Tamirat. I build modern web applications and business systems, connecting considered user experiences with the engineering that makes them work.",
    focus: ["Frontend precision", "Backend depth", "Database integrity"],
  },
  about: {
    title: "A good interface is only the beginning.",
    introduction:
      "I’m a full-stack developer who thinks in complete systems. From the first interaction to the last database query, I care about how every part works together.",
    paragraphs: [
      "My work spans web applications, APIs, relational databases, and operational software. Experience in an insurance ICT environment has shaped how I approach software: understand the business, respect the data, and build something people can rely on.",
      "I enjoy translating complex workflows into clear, usable products. That means asking better questions, making deliberate architecture choices, and treating maintainability as part of the product—not something to add later.",
    ],
    principles: [
      "Understand the whole system",
      "Make complexity usable",
      "Build for the next developer",
    ],
  },
  education: {
    degree: "BSc in Computer Science",
    organization: "Admas University",
    period: null as string | null,
  },
  experience: [
    {
      organization: "Lucy Insurance",
      title: "Systems & database administration / development",
      period: null as string | null,
      context: "ICT · Insurance & enterprise systems",
      introduction:
        "Working at the intersection of operational systems, application development, and database administration in an insurance ICT environment.",
      responsibilities: [
        "Administer Linux and Windows servers, with preventive maintenance, updates, access controls, and backup routines.",
        "Work with MySQL and PostgreSQL administration, including backups, replication, indexing, and query tuning.",
        "Develop and maintain responsive websites, working with developers and stakeholders on features, bug fixes, and reliability.",
        "Troubleshoot operational systems and monitor infrastructure performance to support day-to-day business continuity.",
      ],
      technologies: [
        "Linux / Windows Server",
        "MySQL",
        "PostgreSQL",
      ] as string[],
      source:
        "Employment context supplied by Aaron; responsibility areas supported by the public CV. The CV does not associate dates or an official title with this organization.",
    },
  ],
  skills: [
    {
      number: "01",
      title: "Frontend engineering",
      description:
        "Responsive applications with a clear component structure and a considered user experience.",
      technologies: [
        "Next.js",
        "React",
        "TypeScript",
        "JavaScript",
        "Tailwind CSS",
        "HTML / CSS",
      ],
      level: "Applied in projects",
      icon: "frontend",
    },
    {
      number: "02",
      title: "Backend engineering",
      description:
        "Application logic, REST APIs, authentication, and the workflows behind the interface.",
      technologies: ["Node.js", "Express.js", "NestJS", "PHP", "REST APIs"],
      level: "Applied in projects",
      icon: "backend",
    },
    {
      number: "03",
      title: "Database engineering",
      description:
        "Relational modeling, data constraints, migrations, and queries that reflect the business domain.",
      technologies: ["PostgreSQL", "MySQL", "Prisma"],
      level: "Applied in projects",
      icon: "database",
    },
    {
      number: "04",
      title: "Full-stack architecture",
      description:
        "Connecting presentation, business rules, and persistence into coherent applications.",
      technologies: [
        "App Router",
        "API design",
        "Role-based workflows",
        "Data modeling",
      ],
      level: "Engineering practice",
      icon: "architecture",
    },
    {
      number: "05",
      title: "Tools & workflow",
      description:
        "Versioned source, reusable interfaces, and deliberate development and deployment workflows.",
      technologies: [
        "Git",
        "GitHub",
        "Postman",
        "Docker",
        "Linux / Windows Server",
        "Vercel",
      ],
      level: "Development & systems workflow",
      icon: "tools",
    },
    {
      number: "06",
      title: "Creative development",
      description:
        "Developing expressive, performance-conscious interfaces while exploring a broader technical toolkit.",
      technologies: [
        "GSAP",
        "Three.js",
        "Figma",
        "Python",
        "Laravel",
        "MongoDB",
      ],
      level: "Exploring & developing",
      icon: "creative",
    },
  ],
  approach: [
    {
      number: "01",
      title: "Understand before building.",
      description:
        "Start with the people, the process, and the constraints. Translate business requirements into a clear scope.",
    },
    {
      number: "02",
      title: "Design the connections.",
      description:
        "Define the data model, application boundaries, and user journeys together. Make the important decisions explicit.",
    },
    {
      number: "03",
      title: "Build with intention.",
      description:
        "Develop the interface and business logic as one system, with readable code and clear responsibilities.",
    },
    {
      number: "04",
      title: "Verify. Refine. Maintain.",
      description:
        "Check the workflows, edge cases, and performance. Make deployment and ongoing maintenance part of the work.",
    },
  ],
  certifications: [
    {
      title: "Web Development Fundamentals",
      issuer: "IBM",
      year: "2025",
      image: "/badges/web-development-fundamentals.png",
      url: "https://www.credly.com/badges/6903c6df-0bd6-4c00-9c50-7381a7ba70a3/public_url",
    },
    {
      title: "JavaScript Essentials 1",
      issuer: "Cisco",
      year: "2025",
      image: "/badges/javascript-essentials-1.png",
      url: "https://www.credly.com/badges/6e93da1f-41f6-4cd8-80bc-a6f648fc0e84/public_url",
    },
    {
      title: "HTML Essentials",
      issuer: "Cisco",
      year: "2025",
      image: "/badges/html-essentials.png",
      url: "https://www.credly.com/badges/1946dd93-7697-40e9-a1a2-1f5f5ce4f799/public_url",
    },
    {
      title: "CSS Essentials",
      issuer: "Cisco",
      year: "2025",
      image: "/badges/css-essentials.png",
      url: "https://www.credly.com/badges/1d4394ca-3f13-476d-86a0-411c44642834/public_url",
    },
  ],
  contact: {
    title: "Good work starts with",
    emphasis: "a conversation.",
    description:
      "Have an engineering role, a challenging product, or an idea worth building? I’d like to hear about it.",
    topics: contactTopics,
  },
};

export const projects: Project[] = [
  {
    slug: "shareholder-voting-system",
    number: "01",
    title: "Shareholder Voting System",
    shortTitle: "Making every vote count.",
    category: "Enterprise",
    discipline: "GOVERNANCE & DATA INTEGRITY",
    summary:
      "A shareholder governance platform connecting attendance, representation, and share-weighted voting.",
    image: "/projects/voting.png",
    imageAlt:
      "Original Shareholder Voting System interface from Aaron’s published portfolio",
    accent: "blue",
    stack: ["Next.js", "TypeScript", "Prisma", "MySQL", "Tailwind CSS"],
    role: "Full-stack development",
    overview:
      "A web application for managing shareholder meetings and the information behind a weighted vote. The system connects shareholders, representatives, attendance records, nominees, and voting results in a relational model.",
    problem:
      "A shareholder vote is more than a simple tally. Attendance, representation, and share ownership all affect the result. These relationships need to remain consistent throughout a meeting and traceable after it closes.",
    features: [
      {
        title: "Meeting lifecycle",
        description:
          "Separate draft, open, voting-open, and closed states organize the progression of a meeting.",
      },
      {
        title: "Attendance & representation",
        description:
          "Track a shareholder’s attendance and connect representatives to the shareholders they represent.",
      },
      {
        title: "Weighted voting",
        description:
          "Associate each vote with a meeting, nominee, voter, and voting weight.",
      },
      {
        title: "Historical snapshots",
        description:
          "Preserve shareholder details and share values in attendance and vote records.",
      },
    ],
    architecture: [
      {
        label: "Presentation",
        technology: "Next.js · React",
        description:
          "Meeting management, attendance, nominees, and voting interfaces.",
      },
      {
        label: "Application",
        technology: "Next.js routes · Prisma",
        description:
          "Meeting operations and relational access through a typed data layer.",
      },
      {
        label: "Persistence",
        technology: "MySQL",
        description:
          "Shareholders, representatives, meetings, attendance, nominees, and votes.",
      },
    ],
    decisions: [
      {
        title: "Model the real relationships",
        description:
          "Representatives and representation records are distinct entities. This separates a person from the specific shareholders they represent at a meeting.",
      },
      {
        title: "Keep historical context",
        description:
          "Attendance and votes store snapshot fields instead of relying entirely on a shareholder’s current profile. Changes to the source profile can be separated from the meeting record.",
      },
      {
        title: "Put uniqueness in the database",
        description:
          "Compound constraints prevent duplicate attendance per shareholder and meeting, and duplicate votes for the same meeting, nominee, and voter.",
      },
    ],
    challenge: {
      title: "A changing register, a stable meeting record",
      description:
        "Shareholder information can change over time, while a meeting needs to preserve the context in which attendance and votes were recorded.",
      solution:
        "The Prisma schema stores names and share values as snapshots on attendance and vote records, with decimal fields for share values. Meeting-level snapshots retain total shares and holder counts.",
    },
    outcome:
      "The implementation brings the core meeting entities into one application, with an explicit lifecycle and database constraints for duplicate attendance and voting records. Historical snapshots retain the context behind a meeting’s records.",
    sourceNote:
      "Architecture and implementation details checked against the public voting-app package manifest and Prisma schema. The image is the original screenshot from Aaron’s published portfolio.",
    github: "https://github.com/Aarontamirat/voting-app",
  },
  {
    slug: "hr-logistics-management-platform",
    number: "02",
    title: "HR & Logistics Management Platform",
    shortTitle: "People. Assets. One system.",
    category: "Enterprise",
    discipline: "OPERATIONS & RESOURCE MANAGEMENT",
    summary:
      "A centralized operational platform for employee records, organizational structure, assets, and resource coordination.",
    image: "/projects/hrlog.png",
    imageAlt:
      "Original HR and Logistics Management Platform interface from Aaron’s published portfolio",
    accent: "teal",
    stack: ["Next.js", "TypeScript", "Prisma", "MySQL", "Tailwind CSS"],
    role: "Full-stack development",
    overview:
      "An operational application that brings personnel and resource information into a shared system. The public hrmsams codebase includes HR records, organizational relationships, asset custody, locations, movement history, and maintenance records.",
    problem:
      "People and physical resources are closely connected in day-to-day operations. Separate records make it harder to understand who holds an asset, where it is located, and how the organization’s structure relates to those responsibilities.",
    features: [
      {
        title: "Employee profiles",
        description:
          "Structured employee records with departments, teams, job positions, and reporting relationships.",
      },
      {
        title: "Asset custody",
        description: "Connect assets to their current custodian and location.",
      },
      {
        title: "Movement history",
        description:
          "Record asset assignments, transfers, returns, and maintenance movements.",
      },
      {
        title: "Domain-specific roles",
        description:
          "A role model distinguishes general users, managers, HR staff, and asset administration.",
      },
    ],
    architecture: [
      {
        label: "Presentation",
        technology: "Next.js · Tailwind CSS",
        description:
          "Dedicated HR and asset management areas with shared interface components.",
      },
      {
        label: "Application",
        technology: "Server actions · Prisma",
        description:
          "Domain actions for employees, departments, assets, categories, and locations.",
      },
      {
        label: "Persistence",
        technology: "MySQL",
        description:
          "Related employee, organization, asset, custody, and movement records.",
      },
    ],
    decisions: [
      {
        title: "Separate current state from history",
        description:
          "An asset stores its current location and custodian. AssetMovement records separately preserve the movement between people and locations.",
      },
      {
        title: "Represent hierarchy explicitly",
        description:
          "Self-referential relationships model employee reporting lines and nested locations, instead of flattening them into descriptive text.",
      },
      {
        title: "Organize around the domain",
        description:
          "HR and asset management have dedicated routes and action modules while sharing a common user and data model.",
      },
    ],
    challenge: {
      title: "Connecting people and resources without losing context",
      description:
        "A single asset can move between locations, custodians, and maintenance states. A current-state record alone cannot explain that journey.",
      solution:
        "The schema separates the asset master record from movement and maintenance records, with relationships for the sending and receiving locations, custodians, and approving user.",
    },
    outcome:
      "A shared relational foundation connects employee administration with asset custody, movement, and maintenance. Dedicated HR and asset areas make these related operational responsibilities accessible through one application.",
    sourceNote:
      "The Next.js, Prisma, and MySQL stack and HR/asset architecture were checked against hrmsams. The screenshot comes from the existing portfolio and may reflect an earlier version.",
    github: "https://github.com/Aarontamirat/hrmsams",
  },
  {
    slug: "it-service-management-platform",
    number: "03",
    title: "IT Service Management Platform",
    shortTitle: "Clearer service. Better coordination.",
    category: "Enterprise",
    discipline: "IT OPERATIONS",
    summary:
      "An IT service platform for incident handling, staff coordination, project tracking, and operational reporting.",
    image: "/projects/itsm.jpg",
    imageAlt:
      "Original IT Service Management Platform screenshot from Aaron’s published portfolio",
    accent: "violet",
    stack: ["PHP", "MySQL", "jQuery", "Tailwind CSS"],
    role: "Application & database development",
    overview:
      "A PHP-based application bringing common IT service workflows into one place. The public source includes incident administration, staff assignments, project management, a knowledge base, and report exports.",
    problem:
      "Support requests need clear ownership and visible progress. An IT team also needs a shared view of projects, recurring issues, and service activity, rather than a collection of disconnected records.",
    features: [
      {
        title: "Incident handling",
        description:
          "Dedicated workflows for assignment, status updates, rejection, and incident history.",
      },
      {
        title: "Staff coordination",
        description: "Administration of staff and branch assignments.",
      },
      {
        title: "Project tracking",
        description:
          "Project creation, assignment, deadlines, comments, and review routes.",
      },
      {
        title: "Knowledge & reporting",
        description:
          "Knowledge-base administration and CSV/PDF export endpoints.",
      },
    ],
    architecture: [
      {
        label: "Presentation",
        technology: "PHP views · jQuery",
        description: "Role-specific administrative and IT staff interfaces.",
      },
      {
        label: "Application",
        technology: "PHP handlers",
        description:
          "Incident, assignment, project, knowledge-base, and reporting operations.",
      },
      {
        label: "Persistence",
        technology: "MySQL",
        description:
          "A relational foundation for service records and operational relationships.",
      },
    ],
    decisions: [
      {
        title: "Group workflows by responsibility",
        description:
          "Separate administrative and IT staff areas make the different operational responsibilities visible in the application structure.",
      },
      {
        title: "Include knowledge alongside requests",
        description:
          "Knowledge-base routes sit alongside incident and project workflows, supporting the reuse of service information.",
      },
    ],
    challenge: {
      title: "Several service workflows, one application",
      description:
        "Incident resolution, staff coordination, and project management have different actions and reporting needs.",
      solution:
        "The public code organizes these concerns into dedicated handlers and role-specific areas. Incident history and report exports provide additional views of operational activity.",
    },
    outcome:
      "The application brings incident handling, staff coordination, project tracking, and knowledge management into a single PHP/MySQL system, with incident history and operational exports for review.",
    sourceNote:
      "Features checked against the public repository’s routes and handlers. The image is from the existing portfolio. Company data, uploaded files, and internal deployment information are excluded.",
    github: "https://github.com/Aarontamirat/itsm",
  },
  {
    slug: "library-management-system",
    number: "04",
    title: "Library Management System",
    shortTitle: "From catalog to circulation.",
    category: "Workflow",
    discipline: "CATALOG & LENDING OPERATIONS",
    summary:
      "An administrative application for books, memberships, borrowing, returns, and library reporting.",
    image: "/projects/library.png",
    imageAlt:
      "Original Library Management System interface from Aaron’s published portfolio",
    accent: "blue",
    stack: ["Next.js", "PostgreSQL", "NestJS", "Tailwind CSS"],
    role: "Full-stack development",
    overview:
      "A library operations application with a Next.js frontend. The public frontend source contains catalog, member, staff, borrow/return, genre, and reporting areas. The existing portfolio identifies NestJS and PostgreSQL as its backend stack.",
    problem:
      "Library administration combines catalog information with people and time-sensitive lending activity. Staff need a clear way to manage the records and follow a book through borrowing and return.",
    features: [
      {
        title: "Book catalog",
        description:
          "Interfaces for adding, editing, viewing, and deleting books and genres.",
      },
      {
        title: "Membership",
        description:
          "Member administration and a dedicated member-history view.",
      },
      {
        title: "Borrowing & returns",
        description:
          "Purpose-built borrowing and return dialogs, organized in a circulation area.",
      },
      {
        title: "Administration",
        description:
          "Staff, profile, dashboard, reporting, and permission-aware navigation components.",
      },
    ],
    architecture: [
      {
        label: "Presentation",
        technology: "Next.js · Tailwind CSS",
        description:
          "Catalog, circulation, membership, and reporting interfaces.",
      },
      {
        label: "Application",
        technology: "NestJS · REST API",
        description:
          "Backend stack stated in the original portfolio; frontend API integration exists in the public source.",
      },
      {
        label: "Persistence",
        technology: "PostgreSQL",
        description: "Relational storage stated in the original portfolio.",
      },
    ],
    decisions: [
      {
        title: "Give circulation its own workflow",
        description:
          "Borrowing and returning are distinct actions with dedicated dialogs, rather than generic edits to a book record.",
      },
      {
        title: "Keep domain areas consistent",
        description:
          "Book, member, genre, and staff operations use reusable interface patterns and a shared layout.",
      },
    ],
    challenge: {
      title: "Coordinating catalog and circulation tasks",
      description:
        "Staff work across books, memberships, and lending records. Each task needs a clear entry point without losing the wider context.",
      solution:
        "The frontend separates these domains into dedicated routes while retaining a shared navigation and layout. Member history and borrow/return views bring related activity into context.",
    },
    outcome:
      "A dedicated frontend brings catalog, membership, circulation, and reporting tasks into a consistent administrative interface, with reusable forms and shared navigation.",
    sourceNote:
      "Frontend structure and Next.js/Tailwind dependencies checked against library-manager-frontend. NestJS/PostgreSQL are retained as owner-reported stack details. Screenshot from the original portfolio.",
    github: "https://github.com/Aarontamirat/library-manager-frontend",
  },
  {
    slug: "leave-management-system",
    number: "05",
    title: "Leave Management System",
    shortTitle: "Less friction in the approval flow.",
    category: "Workflow",
    discipline: "HR WORKFLOW AUTOMATION",
    summary:
      "An employee leave application connecting request submission, personal history, and administrative decisions.",
    image: "/projects/leave.png",
    imageAlt:
      "Original Leave Management System interface from Aaron’s published portfolio",
    accent: "teal",
    stack: ["React", "Express.js", "PostgreSQL", "Tailwind CSS"],
    role: "Frontend, API & database development",
    overview:
      "LeaveFlow is a separated React frontend and Express backend. Employees submit requests and review their own history, while administrative endpoints provide an overview and status decisions.",
    problem:
      "A leave request needs to move from employee submission to an administrative decision with clear ownership. Employees should see their own requests, and completed decisions should be handled deliberately.",
    features: [
      {
        title: "Request submission",
        description:
          "Create a request with leave type, start and end dates, and a reason.",
      },
      {
        title: "Personal request history",
        description:
          "Retrieve requests for the authenticated user, ordered by creation date.",
      },
      {
        title: "Administrative review",
        description:
          "Review employee requests and decide between pending, approved, and rejected states.",
      },
      {
        title: "Authenticated API",
        description:
          "Bearer token verification and dedicated administrative middleware protect request routes.",
      },
    ],
    architecture: [
      {
        label: "Presentation",
        technology: "React · Vite · Tailwind CSS",
        description:
          "Employee and administrative interfaces in a separate frontend application.",
      },
      {
        label: "Application",
        technology: "Express.js · JWT",
        description:
          "Authentication middleware and controllers for request creation, history, and status decisions.",
      },
      {
        label: "Persistence",
        technology: "PostgreSQL · node-postgres",
        description: "Parameterized SQL queries for users and leave requests.",
      },
    ],
    decisions: [
      {
        title: "Separate the interface from the API",
        description:
          "Independent frontend and backend repositories keep presentation and application logic distinct.",
      },
      {
        title: "Scope history to the authenticated user",
        description:
          "The personal-history query uses the user identity supplied by authentication middleware, instead of accepting an arbitrary user identifier.",
      },
      {
        title: "Use parameterized queries",
        description:
          "The controller passes query values separately from SQL text for request creation, lookup, and updates.",
      },
    ],
    challenge: {
      title: "Making an approval decision explicit",
      description:
        "Unrestricted status changes can make the request lifecycle ambiguous.",
      solution:
        "The status controller accepts a defined set of statuses, checks whether the request exists, and rejects changes to requests that have already been approved or rejected. Concurrent-update behavior remains a consideration for further hardening.",
    },
    outcome:
      "Employees can submit requests and review their own history. Administrative review uses a defined set of statuses, with checks for missing requests and decisions that have already been finalized.",
    sourceNote:
      "React/Express/PostgreSQL dependencies and request behavior checked against both LeaveFlow repositories. Screenshot from the original portfolio; it may show an earlier interface.",
    github: "https://github.com/Aarontamirat/leaveflow-frontend",
    additionalSource: {
      label: "Backend source",
      url: "https://github.com/Aarontamirat/leaveflow-backend",
    },
    liveUrl: "https://leaveflow-frontend-seven.vercel.app/",
    demoNote:
      "Public sign-in interface. An authorized account is required to access employee and administrative workflows.",
  },
  {
    slug: "insurance-claim-notifications-platform",
    number: "06",
    title: "Insurance Claim Notifications Platform",
    shortTitle: "A clearer claim journey.",
    category: "Workflow",
    discipline: "INSURANCE OPERATIONS",
    summary:
      "A claim workflow application covering submission, notifications, status tracking, and payment-related steps.",
    image: "/projects/claim.png",
    imageAlt:
      "Original Insurance Claim Notifications Platform interface from Aaron’s published portfolio",
    accent: "violet",
    stack: ["PHP MVC", "PostgreSQL", "Tailwind CSS"],
    role: "Application & database development",
    overview:
      "An insurance workflow project described in Aaron’s existing portfolio. It brings claim submission, notifications, progress tracking, and payment-related stages into an application experience.",
    problem:
      "A claim moves through several stages and involves information that needs to stay understandable to the people handling it. Submission and status communication should be part of a coherent journey.",
    features: [
      {
        title: "Claim submission",
        description:
          "A starting point for entering claim information into the workflow.",
      },
      {
        title: "Notifications",
        description: "Communication associated with the progress of a claim.",
      },
      {
        title: "Status tracking",
        description: "Visibility into the stage of a submitted claim.",
      },
      {
        title: "Payment workflow",
        description: "Payment-related stages within the wider claim lifecycle.",
      },
    ],
    architecture: [
      {
        label: "Presentation",
        technology: "PHP views · Tailwind CSS",
        description: "Interfaces for claim submission and progress visibility.",
      },
      {
        label: "Application",
        technology: "PHP MVC",
        description:
          "Separation of interface, application handling, and data responsibilities.",
      },
      {
        label: "Persistence",
        technology: "PostgreSQL",
        description: "Relational storage for the claim workflow.",
      },
    ],
    decisions: [
      {
        title: "Treat the claim as a lifecycle",
        description:
          "Submission, notification, status, and payment steps are presented as connected parts of the business workflow.",
      },
      {
        title: "Separate application responsibilities",
        description:
          "The owner-reported MVC approach separates presentation, handling, and data concerns. Detailed implementation decisions require source review.",
      },
    ],
    challenge: {
      title: "Keeping a multi-stage workflow understandable",
      description:
        "Claims handling crosses submission, review, communication, and payment-related stages.",
      solution:
        "The portfolio describes a connected submission and notification experience with status tracking. Detailed transition rules and delivery mechanisms are not published, so no specific implementation is asserted.",
    },
    outcome:
      "The project connects claim submission, notification, and progress tracking in an insurance workflow experience. Public presentation focuses on the user journey while keeping internal business information out of the case study.",
    sourceNote:
      "Scope and stack are taken from Aaron’s original public portfolio. No matching public source repository was verified. The original screenshot is used; internal business information is not added.",
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
