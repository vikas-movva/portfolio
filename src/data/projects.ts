/**
 * Projects section content.
 *
 * Edit project entries here — the Projects component reads from this file.
 * The component derives its types from `projectsData`, so adding/removing
 * fields here will surface as type errors in the component (intentionally).
 */

export interface ProjectLink {
  github: string | null
  demo: string | null
}

export interface Project {
  title: string
  description: string
  longDescription: string
  image: string
  technologies: string[]
  category: string
  highlights: string[]
  links: ProjectLink
  featured: boolean
}

export const projectsData: Project[] = [
  {
    title: "ML Portfolio Platform",
    description: "A full-stack machine learning platform for model experimentation, versioning, and deployment with real-time monitoring.",
    longDescription: "Built an end-to-end ML platform enabling data scientists to train, version, and deploy models with automated CI/CD pipelines. Features include experiment tracking, model registry, A/B testing framework, and real-time performance monitoring.",
    image: "🤖",
    technologies: ["React", "TensorFlow", "Flask", "GCP", "Docker", "MLflow"],
    category: "ML/AI",
    highlights: ["Automated model training pipelines", "Real-time inference API", "Experiment tracking dashboard", "A/B testing framework"],
    links: {
      github: "https://github.com/vikas/ml-portfolio",
      demo: "https://ml-portfolio-demo.vercel.app",
    },
    featured: true,
  },
  {
    title: "Credit Risk Analysis Engine",
    description: "Advanced credit risk assessment system using ensemble ML models with explainable AI for financial decision making.",
    longDescription: "Developed a production-ready credit risk engine achieving 92% AUC using gradient boosting and neural network ensembles. Integrated SHAP explainability for regulatory compliance and automated model retraining pipelines.",
    image: "💳",
    technologies: ["Python", "XGBoost", "PyTorch", "SHAP", "FastAPI", "PostgreSQL"],
    category: "Data Science",
    highlights: ["92% AUC on test set", "SHAP explainability", "Automated retraining", "Regulatory compliant"],
    links: {
      github: "https://github.com/vikas/credit-risk-engine",
      demo: null,
    },
    featured: true,
  },
  {
    title: "Real-Time Data Pipeline",
    description: "Scalable ETL pipeline processing 1M+ events/day with Apache Airflow, featuring data quality monitoring and alerting.",
    longDescription: "Designed and implemented a robust data orchestration platform handling high-volume streaming and batch workloads. Includes automated data quality checks, lineage tracking, and Slack/email alerting for pipeline failures.",
    image: "📊",
    technologies: ["Apache Airflow", "Python", "PostgreSQL", "dbt", "Docker", "Slack API"],
    category: "Data Engineering",
    highlights: ["1M+ events/day", "Data quality monitoring", "Automated alerting", "Lineage tracking"],
    links: {
      github: "https://github.com/vikas/data-pipeline",
      demo: null,
    },
    featured: true,
  },
  {
    title: "TaskFlow - Project Management App",
    description: "Modern project management application with real-time collaboration, Kanban boards, and team analytics.",
    longDescription: "Built a full-stack project management tool featuring real-time updates via WebSockets, drag-and-drop Kanban boards, sprint planning, and team velocity analytics. Deployed with zero-downtime CI/CD.",
    image: "📋",
    technologies: ["React", "TypeScript", "Node.js", "Socket.io", "PostgreSQL", "Tailwind"],
    category: "Web App",
    highlights: ["Real-time collaboration", "Drag-and-drop boards", "Sprint analytics", "Team dashboards"],
    links: {
      github: "https://github.com/vikas/taskflow",
      demo: "https://taskflow-app.vercel.app",
    },
    featured: false,
  },
  {
    title: "DevMetrics - Developer Analytics",
    description: "GitHub analytics dashboard providing insights into team productivity, code quality, and delivery metrics.",
    longDescription: "Created an analytics platform that integrates with GitHub API to visualize team performance, code review patterns, deployment frequency, and DORA metrics. Features automated weekly reports.",
    image: "📈",
    technologies: ["React", "FastAPI", "PostgreSQL", "GitHub API", "Chart.js", "Docker"],
    category: "Web App",
    highlights: ["DORA metrics tracking", "Code review analytics", "Automated reports", "Team comparisons"],
    links: {
      github: "https://github.com/vikas/devmetrics",
      demo: null,
    },
    featured: false,
  },
  {
    title: "MLOps Pipeline Template",
    description: "Production-ready MLOps template with CI/CD, model monitoring, feature store, and automated retraining.",
    longDescription: "Open-source MLOps framework implementing best practices for ML lifecycle management. Includes GitHub Actions workflows, model drift detection, feature store integration, and multi-environment deployments.",
    image: "🔧",
    technologies: ["Python", "GitHub Actions", "MLflow", "Evidently", "Feast", "Kubernetes"],
    category: "MLOps",
    highlights: ["CI/CD for ML", "Drift detection", "Feature store", "Multi-env deploy"],
    links: {
      github: "https://github.com/vikas/mlops-template",
      demo: null,
    },
    featured: false,
  },
]
