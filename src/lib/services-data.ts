import { Service } from "./types";

export const services: Service[] = [
  {
    id: "web-development",
    title: "Custom Web Development",
    description:
      "We build high-performance, scalable web applications tailored to your business needs. From complex enterprise platforms to elegant marketing sites, our team delivers pixel-perfect solutions with clean, maintainable code.",
    icon: "Globe",
    technologies: ["React", "Next.js", "Node.js", "TypeScript", "PostgreSQL", "MongoDB"],
    features: [
      "Responsive design for all devices",
      "Server-side rendering for SEO",
      "Progressive Web App capabilities",
      "Performance optimization",
      "Accessibility compliance",
    ],
  },
  {
    id: "saas-development",
    title: "SaaS Product Development",
    description:
      "Transform your idea into a market-ready SaaS product. We handle everything from architecture design to deployment, building multi-tenant, subscription-ready platforms that scale with your business.",
    icon: "Cloud",
    technologies: ["React", "Next.js", "Node.js", "Stripe", "AWS", "PostgreSQL"],
    features: [
      "Multi-tenant architecture",
      "Subscription & billing integration",
      "User management & authentication",
      "Analytics dashboard",
      "API-first design",
    ],
  },
  {
    id: "mobile-development",
    title: "Mobile App Development",
    description:
      "Create powerful cross-platform mobile experiences that delight users. We leverage modern frameworks to build native-feeling apps for iOS and Android from a single codebase.",
    icon: "Smartphone",
    technologies: ["React Native", "Flutter", "Firebase", "Node.js", "Swift", "Kotlin"],
    features: [
      "Cross-platform development",
      "Native performance",
      "Offline-first capabilities",
      "Push notifications",
      "App Store optimization",
    ],
  },
  {
    id: "api-development",
    title: "API Development",
    description:
      "Design and build robust, secure, and well-documented APIs that power your applications. We create RESTful and GraphQL APIs that integrate seamlessly with your ecosystem.",
    icon: "Code",
    technologies: ["Node.js", "Express", "GraphQL", "PostgreSQL", "Redis", "Docker"],
    features: [
      "RESTful & GraphQL APIs",
      "Authentication & authorization",
      "Rate limiting & caching",
      "Comprehensive documentation",
      "Versioning & backward compatibility",
    ],
  },
  {
    id: "cloud-infrastructure",
    title: "Cloud Infrastructure",
    description:
      "Architect and manage scalable cloud infrastructure that keeps your applications running smoothly. We design cost-effective, highly available cloud solutions on AWS, GCP, and Azure.",
    icon: "Server",
    technologies: ["AWS", "GCP", "Azure", "Terraform", "Kubernetes", "Docker"],
    features: [
      "Infrastructure as Code",
      "Auto-scaling configurations",
      "Disaster recovery planning",
      "Cost optimization",
      "Security hardening",
    ],
  },
  {
    id: "devops-automation",
    title: "DevOps & Automation",
    description:
      "Streamline your development workflow with modern DevOps practices. We implement CI/CD pipelines, monitoring, and automation that accelerate delivery and improve reliability.",
    icon: "Settings",
    technologies: ["Docker", "Kubernetes", "Jenkins", "GitHub Actions", "Terraform", "Prometheus"],
    features: [
      "CI/CD pipeline setup",
      "Container orchestration",
      "Infrastructure monitoring",
      "Automated testing",
      "Release management",
    ],
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design",
    description:
      "Craft intuitive, visually stunning interfaces that users love. Our design process combines user research, prototyping, and iterative testing to create experiences that drive engagement and conversions.",
    icon: "Palette",
    technologies: ["Figma", "Adobe XD", "Sketch", "InVision", "Principle", "Zeplin"],
    features: [
      "User research & personas",
      "Wireframing & prototyping",
      "Design system creation",
      "Usability testing",
      "Brand identity design",
    ],
  },
  {
    id: "ai-automation",
    title: "AI & Automation",
    description:
      "Leverage the power of artificial intelligence to automate processes and gain actionable insights. We build custom AI solutions, chatbots, and intelligent automation workflows.",
    icon: "Brain",
    technologies: ["Python", "TensorFlow", "OpenAI", "LangChain", "FastAPI", "PostgreSQL"],
    features: [
      "Custom AI model development",
      "Chatbot & virtual assistants",
      "Process automation",
      "Data analysis & insights",
      "Natural language processing",
    ],
  },
];
