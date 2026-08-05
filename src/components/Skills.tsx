import { motion } from 'framer-motion'

const skillsCategories = [
  {
    category: "Languages",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
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
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
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
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
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
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
    ),
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
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
    skills: [
      { name: "GCP (BigQuery, Cloud Run)", level: 75 },
      { name: "AWS (Lambda, S3, RDS)", level: 70 },
      { name: "Git/GitHub Actions", level: 90 },
      { name: "Linux/Shell Scripting", level: 80 },
      { name: "VS Code/JetBrains", level: 95 },
    ],
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
}

const categoryVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
}

const skillVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } }
}

export default function Skills() {
  return (
    <section
      id="skills"
      className="py-24 md:py-32 px-6 bg-dark"
      aria-labelledby="skills-title"
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
            variants={categoryVariants}
            className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 border border-primary/20"
          >
            Technical Skills
          </motion.span>
          <motion.h2
            id="skills-title"
            variants={categoryVariants}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            <span className="text-white">Technologies & </span>
            <br />
            <span className="text-primary">Tools I Use</span>
          </motion.h2>
          <motion.p
            variants={categoryVariants}
            className="text-lg text-gray-400 max-w-2xl mx-auto"
          >
            A curated stack built through real-world projects and continuous learning.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillsCategories.map((cat, catIndex) => (
            <motion.div
              key={cat.category}
              variants={categoryVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: catIndex * 0.1 }}
              className="p-6 rounded-2xl bg-darker border border-gray-700/50 hover:border-primary/30 transition-all"
            >
              <div className="flex items-center gap-3 mb-6">
                <motion.div
                  className="p-3 rounded-xl bg-primary/10 text-primary"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  {cat.icon}
                </motion.div>
                <motion.h3
                  className="text-xl font-bold text-white"
                  whileInView={{ x: [ -20, 0 ] }}
                  viewport={{ once: true }}
                >
                  {cat.category}
                </motion.h3>
              </div>

              <div className="space-y-4">
                {cat.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    variants={skillVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ delay: skillIndex * 0.05 }}
                    className="group"
                  >
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-200 font-medium">{skill.name}</span>
                      <motion.span
                        className="text-primary font-mono text-sm"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                      >
                        {skill.level}%
                      </motion.span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-primary to-primary/70"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3, type: 'spring', stiffness: 100, damping: 15 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-gray-500 mb-4">
            Always expanding my toolkit — currently exploring:
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {["Rust", "Kubernetes", "GraphQL", "Apache Kafka", "Terraform"].map((tech) => (
              <motion.span
                key={tech}
                className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20 hover:bg-primary/20 transition-all cursor-default"
                whileHover={{ scale: 1.05, y: -2 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}