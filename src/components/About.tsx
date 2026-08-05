import { motion } from 'framer-motion'

const aboutData = {
  summary: [
    "I'm a Software Engineer and Data Engineer with 2+ years of experience building scalable data pipelines, ETL/ELT processes, and intelligent systems. My background spans data engineering, machine learning, and full-stack development.",
    "Currently, I'm focused on architecting robust data infrastructure using modern tools like Apache Airflow, dbt, and Spark, while also building clean, performant web applications with React and TypeScript.",
    "I thrive at the intersection of data and product — turning raw data into actionable insights that drive business decisions. When I'm not coding, you'll find me exploring new ML architectures or contributing to open-source projects."
  ],
  education: [
    {
      degree: "Bachelor of Technology in Computer Science",
      institution: "University Name",
      year: "2020 - 2024",
      details: "Graduated with honors. Relevant coursework: Data Structures & Algorithms, Database Systems, Machine Learning, Distributed Systems, Software Engineering."
    }
  ],
  highlights: [
    { label: "Years Experience", value: "2+" },
    { label: "Projects Delivered", value: "15+" },
    { label: "Technologies", value: "10+" },
    { label: "Certifications", value: "3" },
  ]
}

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  }

  return (
    <section
      id="about"
      className="py-24 md:py-32 px-6 bg-darker"
      aria-labelledby="about-title"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.span
            variants={itemVariants}
            className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 border border-primary/20"
          >
            About Me
          </motion.span>
          <motion.h2
            id="about-title"
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            <span className="text-white">Get to Know </span>
            <br />
            <span className="text-primary">Me Better</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-400 max-w-2xl mx-auto"
          >
            A snapshot of my journey, education, and what drives me as an engineer.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div
              variants={itemVariants}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="w-1 h-8 bg-primary rounded-full"></span>
                Professional Summary
              </h3>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                {aboutData.summary.map((paragraph, index) => (
                  <motion.p
                    key={index}
                    variants={itemVariants}
                    className="transition-colors"
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>

              <motion.div
                variants={itemVariants}
                className="pt-6 border-t border-gray-700"
              >
                <h3 className="text-2xl font-bold text-white flex items-center gap-3 mb-4">
                  <span className="w-1 h-8 bg-primary rounded-full"></span>
                  Education
                </h3>
                <div className="space-y-4">
                  {aboutData.education.map((edu, index) => (
                    <motion.div
                      key={index}
                      variants={cardVariants}
                      className="p-6 rounded-2xl bg-dark/50 border border-gray-700/50 hover:border-primary/30 transition-all"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                        <h4 className="text-xl font-semibold text-white">{edu.degree}</h4>
                        <span className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-full font-medium">
                          {edu.year}
                        </span>
                      </div>
                      <p className="text-primary font-medium">{edu.institution}</p>
                      <p className="text-gray-400 text-sm mt-2">{edu.details}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 gap-4"
            >
              {aboutData.highlights.map((highlight) => (
                <motion.div
                  key={highlight.label}
                  variants={cardVariants}
                  className="p-6 rounded-2xl bg-dark/50 border border-gray-700/50 hover:border-primary/30 transition-all text-center group"
                  whileHover={{ y: -4, scale: 1.02 }}
                >
                  <motion.div
                    className="text-4xl md:text-5xl font-bold text-primary mb-2"
                    whileInView={{ scale: [0, 1.2, 1] }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  >
                    {highlight.value}
                  </motion.div>
                  <p className="text-gray-400 font-medium">{highlight.label}</p>
                  <motion.div
                    className="w-0 h-0.5 bg-primary mx-auto mt-4 group-hover:w-full transition-all duration-300"
                  />
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-10 p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20"
            >
              <h4 className="text-lg font-semibold text-primary mb-3 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                What I'm Looking For
              </h4>
              <p className="text-gray-300 leading-relaxed">
                I'm actively seeking opportunities where I can leverage my data engineering expertise to build scalable, 
                reliable systems that solve real-world problems. Particularly interested in roles involving 
                <span className="text-primary font-medium">data platform engineering, MLOps, or backend systems</span> 
                at companies that value clean code, thoughtful architecture, and continuous learning.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}