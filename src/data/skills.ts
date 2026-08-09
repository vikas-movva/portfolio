/**
 * Skills section content (text only).
 *
 * Each category has an `icon` which is the name of a built-in icon (rendered
 * by the Skills component). The skill levels are numbers 0-100 used to fill
 * the progress bars.
 *
 * To add a new icon, add a key to `skillIcons` in the Skills component and a
 * matching `icon` value here. Keeping icon names as strings (not JSX) lets this
 * file stay JSX-free so it's easy to edit.
 */

export interface Skill {
  name: string
  level: number
}

export type SkillIconName =
  | 'code'
  | 'database'
  | 'lightbulb'
  | 'link'
  | 'cloud'

export interface SkillCategory {
  category: string
  icon: SkillIconName
  skills: Skill[]
}

export const skillsCategories: SkillCategory[] = [
  {
    category: "Languages",
    icon: 'code',
    skills: [
      { name: "Python", level: 95 },
      { name: "SQL", level: 90 },
      { name: "JavaScript/TypeScript", level: 85 },
      { name: "Java", level: 80 },
      { name: "HTML/CSS", level: 90 },
    ],
  },
  {
    category: "Data Engineering",
    icon: 'database',
    skills: [
      { name: "Apache Airflow", level: 85 },
      { name: "dbt", level: 80 },
      { name: "Apache Spark", level: 75 },
      { name: "ETL/ELT Pipelines", level: 90 },
      { name: "Data Modeling", level: 85 },
      { name: "PostgreSQL/MySQL", level: 85 },
    ],
  },
  {
    category: "ML/AI",
    icon: 'lightbulb',
    skills: [
      { name: "TensorFlow/Keras", level: 80 },
      { name: "PyTorch", level: 75 },
      { name: "Scikit-learn", level: 85 },
      { name: "LangChain", level: 70 },
      { name: "MLOps", level: 70 },
    ],
  },
  {
    category: "Web & Backend",
    icon: 'link',
    skills: [
      { name: "React/Next.js", level: 90 },
      { name: "FastAPI/Flask", level: 85 },
      { name: "Tailwind CSS", level: 90 },
      { name: "RESTful APIs", level: 85 },
      { name: "Docker", level: 80 },
    ],
  },
  {
    category: "Cloud & Tools",
    icon: 'cloud',
    skills: [
      { name: "GCP (BigQuery, Cloud Run)", level: 75 },
      { name: "AWS (Lambda, S3, RDS)", level: 70 },
      { name: "Git/GitHub Actions", level: 90 },
      { name: "Linux/Shell Scripting", level: 80 },
      { name: "VS Code/JetBrains", level: 95 },
    ],
  },
]

/** Technologies listed under "currently exploring" at the bottom of the section. */
export const exploringSkills: string[] = [
  "Rust", "Kubernetes", "GraphQL", "Apache Kafka", "Terraform",
]
