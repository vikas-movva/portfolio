/**
 * About section content.
 *
 * Edit the text here — the About component reads from this file, so you don't
 * need to touch component markup to change what the section says.
 */

export interface AboutHighlight {
  label: string;
  value: string;
}

export interface AboutEducation {
  degree: string;
  institution: string;
  year: string;
  details: string;
}

export interface AboutData {
  summary: string[];
  education: AboutEducation[];
  highlights: AboutHighlight[];
  /** Optional callout box shown under the highlights grid. */
  lookingFor: {
    title: string;
    body: string;
    /** Words/phrases inside the body to emphasise in the primary colour. */
    emphasize: string;
  };
}

export const aboutData: AboutData = {
  summary: [
    "I'm a Software Engineer and Data Engineer with 2+ years of experience building scalable data pipelines, ETL/ELT processes, and intelligent systems. My background spans data engineering, machine learning, and full-stack development.",
    "Currently, I'm focused on architecting robust data infrastructure using modern tools like Apache Airflow, dbt, and Spark, while also building clean, performant web applications with React and TypeScript.",
    "I have a strong foundation in both software engineering and data science, allowing me to bridge the gap between technical implementation and business needs.",
    "When I'm not coding, you'll find me exploring new ML architectures, contributing to open-source projects, or playing volleyball!",
  ],
  education: [
    {
      degree: "Honours Bachelor of Science, Computer Science",
      institution: "Wilfrid Laurier University",
      year: "2021 - 2026",
      details:
        "Relevant coursework: Data Structures & Algorithms, Database Systems, Machine Learning, Distributed Systems, Software Engineering.",
    },
  ],
  highlights: [
    { label: "Years Experience", value: "2+" },
    { label: "Technologies", value: "10+" },
  ],
  lookingFor: {
    title: "What I'm Looking For",
    body: "I'm actively seeking opportunities where I can leverage my data engineering expertise to build scalable, reliable systems that solve real-world problems. I am particularly interested in roles involving ",
    emphasize: "data platform engineering, MLOps, or backend systems",
  },
};
