import { motion } from "framer-motion";
import { educationData } from "../data";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function Education() {
  return (
    <section
      id="education"
      className="py-24 md:py-32 px-6 bg-darker scroll-mt-20"
      aria-labelledby="education-title"
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
            Education
          </motion.span>
          <motion.h2
            id="education-title"
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            <span className="text-white">My Academic </span>
            <br />
            <span className="text-primary">Background</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-400 max-w-2xl mx-auto"
          >
            The formal foundation behind my engineering and data work.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {educationData.map((edu) => (
            <motion.div
              key={edu.degree}
              variants={cardVariants}
              className="p-6 rounded-2xl bg-dark/50 border border-gray-700/50 hover:border-primary/30 transition-all"
              whileHover={{ y: -4 }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                <h3 className="text-xl font-semibold text-white">
                  {edu.degree}
                </h3>
                <span className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-full font-medium">
                  {edu.year}
                </span>
              </div>
              <p className="text-primary font-medium">{edu.institution}</p>
              <p className="text-gray-400 text-sm mt-2">{edu.details}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
