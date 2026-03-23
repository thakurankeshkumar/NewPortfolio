import { createRequire } from "module";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, "../.env.local") });

const { default: connectDB } = await import("./mongodb.js");
const { default: Hero } = await import("./models/Hero.js");
const { default: SkillCategory } = await import("./models/SkillCategory.js");
const { default: Project } = await import("./models/Project.js");
const { default: Service } = await import("./models/Service.js");
const { default: About } = await import("./models/About.js");

async function seedAll() {
    try {
        await connectDB();
        console.log("🌱 Seeding database...");

        // Hero
        await Hero.deleteMany({});
        await Hero.create({
            name: "Alex Chen",
            badge: "OPEN TO WORK · B.TECH CSE 3RD YEAR",
            description: "I build full-stack web applications — clean architecture, fast APIs, and interfaces that stay out of your way.",
            stack: ["Next.js", "Node", "PostgreSQL", "TypeScript"],
            stats: {
                year: "3rd",
                yearLabel: "YEAR · B.TECH",
                projects: "12+",
                hackathons: "2×",
                techDomains: "6",
            },
            availableFor: ["Full-Stack Projects", "Internships", "Freelance Work"],
            email: "hello@alexchen.dev",
            githubUrl: "https://github.com",
            linkedinUrl: "https://linkedin.com",
            resumeUrl: "/resume.pdf",
        });
        console.log("✅ Hero seeded");

        // Skills
        await SkillCategory.deleteMany({});
        await SkillCategory.insertMany([
            { icon: "code", title: "LANGUAGES", skills: ["Python", "C++", "Java", "JavaScript", "TypeScript", "SQL", "Bash"], order: 1 },
            { icon: "globe", title: "FRONTEND", skills: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "Redux", "HTML5 / CSS3"], order: 2 },
            { icon: "server", title: "BACKEND & APIS", skills: ["Node.js", "Express", "REST APIs", "GraphQL", "FastAPI", "WebSockets", "JWT / OAuth"], order: 3 },
            { icon: "database", title: "DATABASE & CLOUD", skills: ["PostgreSQL", "MongoDB", "Redis", "Prisma", "AWS (S3, EC2)", "Vercel", "Supabase"], order: 4 },
            { icon: "tool", title: "DEVOPS & TOOLING", skills: ["Docker", "Git / GitHub", "CI/CD", "Linux", "Nginx", "GitHub Actions"], order: 5 },
            { icon: "cpu", title: "AI & DATA SCIENCE", skills: ["TensorFlow", "scikit-learn", "Pandas", "NumPy", "LLM APIs", "Jupyter"], order: 6 },
        ]);
        console.log("✅ Skills seeded");

        // Projects
        await Project.deleteMany({});
        await Project.insertMany([
            {
                number: 1, title: "Nexus — Algo Trading Engine", year: "2024",
                description: "High-frequency trading bot with real-time market data ingestion, automated strategy execution, and a React dashboard for live P&L monitoring.",
                tags: ["PYTHON", "C++", "REDIS", "WEBSOCKETS", "REACT"],
                type: "PERSONAL", role: "FULL-STACK ARCHITECT", featured: true, order: 1,
            },
            {
                number: 2, title: "Lumina Analytics", year: "2024",
                description: "Enterprise-grade business intelligence dashboard. ML-backed predictive models surface actionable insights from large datasets in under 300ms.",
                tags: ["NEXT.JS", "TYPESCRIPT", "POSTGRESQL", "TENSORFLOW"],
                type: "FREELANCE", role: "LEAD DEVELOPER", featured: true, order: 2,
            },
        ]);
        console.log("✅ Projects seeded");

        // Services
        await Service.deleteMany({});
        await Service.insertMany([
            { icon: "layers", badge: "CORE SERVICE", title: "Full-Stack Web Applications", description: "End-to-end product development — database schema, REST/GraphQL APIs, and pixel-precise frontends. Built on Next.js, Node.js, and PostgreSQL.", order: 1 },
            { icon: "refresh", badge: "ONGOING", title: "Maintenance & Support", description: "Bug fixes, dependency upgrades, performance tuning, and feature additions. Your product keeps running without breaking what already works.", order: 2 },
            { icon: "search", badge: "AUDIT", title: "Code Review & Audit", description: "Structured review covering architecture, security gaps, and performance bottlenecks — with a concrete refactoring roadmap.", order: 3 },
            { icon: "zap", badge: "OPTIMISATION", title: "Performance Optimisation", description: "Profiling, query optimisation, caching strategies, and frontend bundle analysis. Real metrics before and after.", order: 4 },
            { icon: "code", badge: "INTEGRATION", title: "API Design & Integration", description: "Clean versioned REST or GraphQL APIs, and integrating third-party services — payments, auth, notifications, AI — into your stack.", order: 5 },
            { icon: "message", badge: "ADVISORY", title: "Technical Consultation", description: "Architecture planning, stack selection, or a second opinion before a major build decision. 1-on-1, no fluff.", order: 6 },
        ]);
        console.log("✅ Services seeded");

        // About
        await About.deleteMany({});
        await About.create({
            bio: [
                "I'm a third-year CSE student who got into programming through competitive algorithms and stayed for product-building. My foundation is low-level — C++ systems, memory management, data structures under pressure — and I apply that rigour when architecting backends that need to hold up at scale.",
                "On the frontend, I care about clarity: interfaces that load fast, communicate intent, and stay out of the user's way. I use Next.js as my primary framework and prefer keeping the full stack — from schema migrations to UI state — in one coherent mental model.",
                "I've competed in hackathons, contributed to open-source projects, and taken on freelance work where the brief was thin and the scope evolved fast. I'm comfortable with ambiguity, and I ask questions before I write code.",
            ],
            achievements: ["2× Hackathon Winner", "AWS Cloud Practitioner", "Open Source Contributor", "Dean's List · GPA 3.9"],
            timeline: [
                { period: "2023 – Present", title: "Freelance Full-Stack Developer", organization: "Independent", orgType: "INDEPENDENT", description: "Custom web applications and APIs across analytics platforms, SaaS MVPs, and developer tooling.", order: 1 },
                { period: "2022 – Present", title: "B.Tech — Computer Science & Engineering", organization: "Technical University", orgType: "TECHNICAL UNIVERSITY", description: "Specialisations in Distributed Systems and AI. GPA 3.9 / 4.0. Active in competitive programming.", order: 2 },
                { period: "Summer 2023", title: "Software Engineering Intern", organization: "Technova Solutions", orgType: "TECHNOVA SOLUTIONS", description: "Rewrote core database queries with indexing and batching — reduced average dashboard load time by 42%.", order: 3 },
            ],
        });
        console.log("✅ About seeded");

        console.log("\n🎉 All data seeded successfully!");
        process.exit(0);
    } catch (error) {
        console.error("❌ Seed failed:", error.message);
        process.exit(1);
    }
}

seedAll();