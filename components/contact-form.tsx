"use client"

import { useState } from "react"
import emailjs from "@emailjs/browser"
import { motion } from "framer-motion"
import { X } from "lucide-react"
import { useLanguage } from "./language-provider"

interface ContactFormProps {
  isOpen: boolean
  onClose: () => void
}

export function ContactForm({ isOpen, onClose }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { t } = useLanguage()

  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    if (!serviceId || !templateId || !publicKey) {
      console.warn("EmailJS environment variables are missing.")

      // If we're in development, allow a local mock send so you can test the form
      // without configuring EmailJS. In production we keep the generic error.
      if (process.env.NODE_ENV !== "production") {
        console.warn("EmailJS env missing — using local mock send (dev only).")
        try {
          await new Promise((res) => setTimeout(res, 600))
          setSubmitted(true)
          setFormData({ name: "", email: "", message: "" })
          setTimeout(() => {
            setSubmitted(false)
            onClose()
          }, 1200)
        } catch (err) {
          console.error("Local mock send failed:", err)
          setError("Unable to send your message right now. Please try again later.")
        } finally {
          setIsSubmitting(false)
        }

        return
      }

      console.error("EmailJS environment variables are missing.")
      setError("Email service is unavailable. Please set up EmailJS and restart the app.")
      setIsSubmitting(false)
      return
    }

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          // Map our form fields to the template variable names used in EmailJS
          name: formData.name,
          email: formData.email,
          message: formData.message,
          // include reply_to in case the service/template uses it for headers
          reply_to: formData.email,
          // keep legacy keys too (harmless) for compatibility
          from_name: formData.name,
          from_email: formData.email,
        },
        publicKey
      )

      setSubmitted(true)
      setFormData({ name: "", email: "", message: "" })
      setTimeout(() => {
        setSubmitted(false)
        onClose()
      }, 2000)
    } catch (sendError) {
      console.error("Error sending message:", sendError)
      setError("Unable to send your message right now. Please try again later.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 1 : 0 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}
        transition={{ duration: 0.3 }}
      />

      {/* Form Container */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: isOpen ? 1 : 0.9, opacity: isOpen ? 1 : 0, y: isOpen ? 0 : 20 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        onClick={onClose}
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 ${
          isOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div onClick={(e) => e.stopPropagation()} className="relative w-full max-w-[68rem] max-h-[calc(100vh-4rem)] bg-background/95 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl overflow-hidden">
          {/* Close Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="absolute top-4 right-4 md:top-6 md:right-6 p-2 hover:bg-white/10 rounded-full transition-colors"
            aria-label="Close form"
          >
            <X className="w-5 h-5" />
          </motion.button>

          {/* Form Content */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 items-center min-h-[520px] h-full">
            {/* Image Side */}
            <div className="hidden lg:flex items-center justify-center overflow-hidden rounded-3xl min-h-[520px] h-full">
              <img
                src="/Contact_us.png"
                alt="Contact illustration"
                className="max-w-[70%] max-h-[70%] object-contain "
              />
            </div>

            <div className="space-y-6">
              {/* Header */}
              <div>
                <p className="font-mono text-xs tracking-[0.3em] text-emerald-500 mb-2">CONTACT</p>
                <h3 className="font-sans text-2xl md:text-3xl font-light">Let&apos;s Talk</h3>
              </div>

              {/* Success Message */}
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg"
                >
                  <p className="font-sans text-sm text-emerald-400">{t.contact.success}</p>
                </motion.div>
              )}

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg"
                >
                  <p className="font-sans text-sm text-red-300">{error}</p>
                </motion.div>
              )}

              {!submitted && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name Field */}
                  <div>
                    <label htmlFor="name" className="block font-mono text-xs tracking-widest text-muted-foreground mb-2">
                      {t.contact.name}
                    </label>
                    <motion.input
                      whileFocus={{ scale: 1.01 }}
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={t.contact.placeholderName}
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 font-sans text-sm placeholder-muted-foreground focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all duration-300"
                    />
                  </div>

                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block font-mono text-xs tracking-widest text-muted-foreground mb-2">
                      {t.contact.email}
                    </label>
                    <motion.input
                      whileFocus={{ scale: 1.01 }}
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t.contact.placeholderEmail}
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 font-sans text-base placeholder-muted-foreground focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all duration-300"
                    />
                  </div>

                  {/* Message Field */}
                  <div>
                    <label htmlFor="message" className="block font-mono text-xs tracking-widest text-muted-foreground mb-2">
                      {t.contact.message}
                    </label>
                    <motion.textarea
                      whileFocus={{ scale: 1.01 }}
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={t.contact.placeholderMessage}
                      rows={5}
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-5 font-sans text-base placeholder-muted-foreground focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all duration-300 resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-6 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-xs tracking-widest rounded-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? t.contact.submitting : t.contact.submit}
                  </motion.button>
                </form>
              )}

              {/* Footer Note */}
              <p className="font-mono text-xs text-muted-foreground text-center lg:text-left">
                Or email me directly at{" "}
                <a href="mailto:louiziyassine003@gmail.com" className="text-emerald-500 hover:underline">
                  louiziyassine003@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )
}
