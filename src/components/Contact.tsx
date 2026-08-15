import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  contactData,
  socialLinks,
  deriveSocialHref,
  contactSubjects,
} from '../data'
import type { ContactIconName } from '../data'
import SectionHeading from './SectionHeading'
import RotatingRings from './RotatingRings'

/** Icon map keyed by the string names used in src/data/contact.ts. */
const socialIcons: Record<ContactIconName, React.ReactNode> = {
  email: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  linkedin: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  ),
  github: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
  ),
  twitter: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
    </svg>
  ),
  obsidian: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19.355 18.538a68.967 68.959 0 0 0 1.858-2.954.81.81 0 0 0-.062-.9c-.516-.685-1.504-2.075-2.042-3.362-.553-1.321-.636-3.375-.64-4.377a1.707 1.707 0 0 0-.358-1.05l-3.198-4.064a3.744 3.744 0 0 1-.076.543c-.106.503-.307 1.004-.536 1.5-.134.29-.29.6-.446.914l-.31.626c-.516 1.068-.997 2.227-1.132 3.59-.124 1.26.046 2.73.815 4.481.128.011.257.025.386.044a6.363 6.363 0 0 1 3.326 1.505c.916.79 1.744 1.922 2.415 3.5zM8.199 22.569c.073.012.146.02.22.02.78.024 2.095.092 3.16.29.87.16 2.593.64 4.01 1.055 1.083.316 2.198-.548 2.355-1.664.114-.814.33-1.735.725-2.58l-.01.005c-.67-1.87-1.522-3.078-2.416-3.849a5.295 5.295 0 0 0-2.778-1.257c-1.54-.216-2.952.19-3.84.45.532 2.218.368 4.829-1.425 7.531zM5.533 9.938c-.023.1-.056.197-.098.29L2.82 16.059a1.602 1.602 0 0 0 .313 1.772l4.116 4.24c2.103-3.101 1.796-6.02.836-8.3-.728-1.73-1.832-3.081-2.55-3.831zM9.32 14.01c.615-.183 1.606-.465 2.745-.534-.683-1.725-.848-3.233-.716-4.577.154-1.552.7-2.847 1.235-3.95.113-.235.223-.454.328-.664.149-.297.288-.577.419-.86.217-.47.379-.885.46-1.27.08-.38.08-.72-.014-1.043-.095-.325-.297-.675-.68-1.06a1.6 1.6 0 0 0-1.475.36l-4.95 4.452a1.602 1.602 0 0 0-.513.952l-.427 2.83c.672.59 2.328 2.316 3.335 4.711.09.21.175.43.253.653z" />
    </svg>
  ),
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}

export default function Contact() {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitStatus('submitting')

    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      })

      // FormSubmit's AJAX endpoint returns JSON { success, message }.
      // The plain (non-AJAX) endpoint also returns HTTP 200 but with an HTML
      // page when the form isn't activated yet, which made the UI report
      // success while no email was actually sent. So we must check data.success.
      const data = await response.json().catch(() => null)
      if (response.ok && data?.success) {
        setSubmitStatus('success')
        form.reset()
        setTimeout(() => setSubmitStatus('idle'), 5000)
      } else {
        setSubmitStatus('error')
      }
    } catch {
      setSubmitStatus('error')
    }
  }

  return (
    <section
      id="contact"
      className="relative overflow-hidden py-24 md:py-32 px-6 bg-surface-alt scroll-mt-20"
      aria-labelledby="contact-title"
    >
      <div className="section-aurora" aria-hidden="true" />
      <RotatingRings position="bottom-left" size={280} />
      <div className="relative z-10 max-w-7xl mx-auto">
        <SectionHeading
          id="contact-title"
          eyebrow="Get In Touch"
          title={
            <>
              Let's Work <span className="text-accent">Together</span>
            </>
          }
          subtitle="Have a project in mind or just want to say hi? I'd love to hear from you."
        />

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div
              variants={itemVariants}
              className="space-y-8"
            >
              <motion.div
                variants={itemVariants}
                className="p-6 rounded-2xl bg-card border border-border"
              >
                <h3 className="text-xl font-bold text-content mb-6 flex items-center gap-3">
                  <span className="w-1 h-8 bg-accent rounded-full"></span>
                  Let's Connect
                </h3>
                <div className="space-y-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.name}
                      href={deriveSocialHref(social.source, contactData)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-4 p-4 rounded-xl bg-field/50 border border-border hover:border-accent/30 hover:bg-field transition-all"
                      whileHover={{ x: 4 }}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <motion.div
                        className="p-3 rounded-xl bg-accent/10 text-accent group-hover:bg-accent group-hover:text-on-accent transition-all"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        {socialIcons[social.icon]}
                      </motion.div>
                      <div className="flex-1">
                        <p className="font-semibold text-content group-hover:text-accent transition-colors">
                          {social.name}
                        </p>
                        <p className="text-sm text-content-muted">{social.description}</p>
                      </div>
                      <svg className="w-5 h-5 text-content-faint group-hover:text-accent transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="p-6 rounded-2xl bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20"
              >
                <h3 className="text-xl font-bold text-content mb-4 flex items-center gap-3">
                  <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Availability
                </h3>
                <div className="flex items-center gap-3 mb-3">
                  <motion.div
                    className="w-3 h-3 rounded-full bg-green-500"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    aria-hidden="true"
                  />
                  <span className="text-green-400 font-medium">{contactData.availability}</span>
                </div>
                <p className="text-content-muted text-sm">
                  Based in {contactData.location} • Open to remote & hybrid roles
                </p>
                <p className="text-content-faint text-sm mt-2">
                  Typically responds within 24 hours
                </p>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2 }}
          >
            <motion.form
              onSubmit={handleSubmit}
              action="https://formsubmit.co/ajax/vikas.s.movva@gmail.com"
              method="POST"
              variants={itemVariants}
              className="p-8 rounded-2xl bg-card border border-border"
              noValidate
            >
              <h3 className="text-xl font-bold text-content mb-6 flex items-center gap-3">
                  <span className="w-1 h-8 bg-accent rounded-full"></span>
                  Send a Message
                </h3>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-content-soft mb-2">
                    Name *
                  </label>
                  <motion.input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-field border border-border-strong text-content placeholder-content-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                    whileFocus={{ scale: 1.01 }}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-content-soft mb-2">
                    Email *
                  </label>
                  <motion.input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-field border border-border-strong text-content placeholder-content-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                    whileFocus={{ scale: 1.01 }}
                  />
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="subject" className="block text-sm font-medium text-content-soft mb-2">
                  Subject *
                </label>
                <motion.select
                  id="subject"
                  name="subject"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-field border border-border-strong text-content focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all appearance-none"
                  whileFocus={{ scale: 1.01 }}
                >
                  <option value="" disabled>Select a topic</option>
                  {contactSubjects.map((s) => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </motion.select>
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-content-soft mb-2">
                  Message *
                </label>
                <motion.textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl bg-field border border-border-strong text-content placeholder-content-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all resize-none"
                  whileFocus={{ scale: 1.01 }}
                  placeholder="Tell me about your project, role, or just say hi..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={submitStatus === 'submitting'}
                className="w-full px-8 py-4 rounded-xl bg-accent text-on-accent font-semibold text-lg hover:bg-accent-hover transition-all disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-surface"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {submitStatus === 'submitting' ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-on-accent" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Sending...
                  </>
                ) : submitStatus === 'success' ? (
                  <>
                    <svg className="-ml-1 mr-3 h-5 w-5 text-on-accent" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Message Sent!
                  </>
                ) : (
                  'Send Message'
                )}
              </motion.button>

              {submitStatus === 'error' && (
                <motion.p
                  className="mt-4 text-center text-red-400 text-sm"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  Something went wrong. Please try again or email me directly.
                </motion.p>
              )}

              <motion.p
                className="mt-6 text-center text-sm text-content-faint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Or email me directly at{' '}
                <a href={`mailto:${contactData.email}`} className="text-accent hover:underline font-medium">
                  {contactData.email}
                </a>
              </motion.p>
            </motion.form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
