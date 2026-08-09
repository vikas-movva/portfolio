/**
 * Experience section content.
 *
 * Edit work history entries here — the Experience component reads from this
 * file. Each entry renders as a timeline item.
 */

export interface ExperienceEntry {
  role: string;
  company: string;
  period: string;
  location: string;
  type: string;
  description: string;
  /** Optional text rendered in bold at the end of `description`. */
  descriptionHighlight?: string;
  achievements: string[];
  technologies: string[];
  /** Optional external link (paper, project, etc.). Renders a "View Paper" button. */
  link?: string;
}

export const experienceData: ExperienceEntry[] = [
  {
    role: "Software Engineering Intern",
    company: "Synerz Technologies",
    period: "Jan 2023 - Dec 2023",
    location: "Remote",
    type: "Internship",
    description:
      "Designed and implemented scalable ETL/ELT pipelines, built data models, and developed interactive dashboards for business intelligence.",
    achievements: [
      "Built automated ETL pipelines processing 500K+ records daily using Python, SQL, and Apache Airflow",
      "Designed dimensional data models reducing query latency by 40% for analytics workloads",
      "Developed real-time dashboards with 99.9% uptime using modern BI tools",
      "Implemented data quality checks and monitoring reducing data incidents by 60%",
      "Collaborated with cross-functional teams to define data requirements and SLAs",
    ],
    technologies: [
      "Python",
      "SQL",
      "Apache Airflow",
      "PostgreSQL",
      "Tableau",
      "dbt",
      "Git",
    ],
  },
  {
    role: "Machine Learning Research (Co-Author)",
    company: "Wilfrid Laurier University",
    period: "2024",
    location: "Waterloo, ON",
    type: "Research",
    description:
      "Co-authored a peer-reviewed IEEE publication applying machine learning to predict psychiatric diagnoses among undergraduate students using demographic, lifestyle, and psychometric survey data collected during the COVID-19 pandemic. ",
    descriptionHighlight: "IEEE CCECE 2025 [Accepted]",
    achievements: [
      "Co-authored 'Mind Matters: Harnessing Machine Learning to Predict Psychiatric Diagnoses in University Students with Real-World Data', published in IEEE Xplore",
      "Engineered features from multi-section survey data, aggregating psychometric scales (GAD-2, CAMS-R, DERS-16) and consolidating hobby/demographic attributes into model-ready features",
      "Applied SMOTE to address class imbalance, improving minority-class precision and recall across all classifiers",
      "Evaluated 4 classifiers (SVM, MLP, Gradient Boosting, Naive Bayes) using confusion matrices, ROC curves, and precision-recall curves; the MLP achieved the highest AUC of 0.77",
      "Demonstrated a scalable, low-cost approach for institutions to proactively identify at-risk students using non-invasive survey data",
    ],
    technologies: [
      "Python",
      "scikit-learn",
      "Multi-layer Perceptron",
      "Support Vector Machines",
      "Gradient Boosting",
      "SMOTE",
      "Data Visualization",
    ],
    link: "/portfolio/PsychiatricDiagnoses.pdf",
  },
];
