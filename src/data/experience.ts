/**
 * Experience section content.
 *
 * Edit work history entries here — the Experience component reads from this
 * file. Each entry renders as a timeline item.
 */

export interface ExperienceEntry {
  role: string
  company: string
  period: string
  location: string
  type: string
  description: string
  achievements: string[]
  technologies: string[]
}

export const experienceData: ExperienceEntry[] = [
  {
    role: "Software Engineering Intern",
    company: "Synerz Technologies",
    period: "Jan 2023 - Jul 2023",
    location: "Remote",
    type: "Internship",
    description: "Designed and implemented scalable ETL/ELT pipelines, built data models, and developed interactive dashboards for business intelligence.",
    achievements: [
      "Built automated ETL pipelines processing 500K+ records daily using Python, SQL, and Apache Airflow",
      "Designed dimensional data models reducing query latency by 40% for analytics workloads",
      "Developed real-time dashboards with 99.9% uptime using modern BI tools",
      "Implemented data quality checks and monitoring reducing data incidents by 60%",
      "Collaborated with cross-functional teams to define data requirements and SLAs",
    ],
    technologies: ["Python", "SQL", "Apache Airflow", "PostgreSQL", "Tableau", "dbt", "Git"],
  },
  {
    role: "Data Engineering Project Lead",
    company: "University Capstone Project",
    period: "Sep 2022 - Dec 2022",
    location: "On-campus",
    type: "Academic",
    description: "Led a team of 4 to build an end-to-end ML platform for credit risk assessment with automated model training and deployment pipelines.",
    achievements: [
      "Architected microservices-based ML platform with FastAPI and Docker",
      "Implemented CI/CD pipelines for automated model training, validation, and deployment",
      "Built feature store and experiment tracking reducing model iteration time by 50%",
      "Achieved 92% AUC on credit risk prediction with ensemble methods",
      "Presented technical architecture to faculty panel and industry advisors",
    ],
    technologies: ["Python", "FastAPI", "Docker", "MLflow", "PostgreSQL", "React", "AWS"],
  },
  {
    role: "Full-Stack Developer (Freelance)",
    company: "Various Clients",
    period: "2021 - Present",
    location: "Remote",
    type: "Freelance",
    description: "Delivered custom web applications and data solutions for small businesses and startups.",
    achievements: [
      "Built 5+ production React/TypeScript applications with responsive design",
      "Developed RESTful APIs with FastAPI serving 10K+ daily requests",
      "Implemented automated testing suites achieving 85%+ code coverage",
      "Optimized database queries reducing API response times by 35%",
    ],
    technologies: ["React", "TypeScript", "FastAPI", "PostgreSQL", "Tailwind CSS", "Vercel"],
  },
]
