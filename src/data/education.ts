/**
 * Education section content.
 *
 * Edit education entries here — the Education component reads from this file.
 * Each entry renders as a card.
 */

export interface AboutEducation {
  degree: string;
  institution: string;
  year: string;
  details: string;
}

export const educationData: AboutEducation[] = [
  {
    degree: "Honours Bachelor of Science, Computer Science",
    institution: "Wilfrid Laurier University",
    year: "2021 - 2026",
    details:
      "Relevant coursework: Data Structures & Algorithms, Database Systems, Machine Learning, Distributed Systems, Software Engineering.",
  },
];
