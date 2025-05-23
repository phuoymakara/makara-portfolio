"use client"

import { useRef, useState } from "react"
import { motion } from "framer-motion"
import { Mail, MapPin, Phone, Send, Loader2, AlertCircle } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { SendEmail } from "../actions/mail"
import { Turnstile } from "next-turnstile";


const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

type FormData = z.infer<typeof formSchema>

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [turnstileStatus, setTurnstileStatus] = useState<
  "success" | "error" | "expired" | "required"
>("required");
const [error, setError] = useState<string | null>(null);
const [isLoading, setIsLoading] = useState(false);
const formRef = useRef<HTMLFormElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    try {
      await SendEmail(data);

      //
      setError(null);
    setIsLoading(true);

    if (!formRef.current) {
      setIsLoading(false);
      return;
    }

    if (turnstileStatus !== "success") {
      setError("Please verify you are not a robot");
      setIsLoading(false);
      return;
    }

    const formData = new FormData(formRef.current);

    const token = formData.get("cf-turnstile-response");
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({ token, email, password }),
      });

      if (response.ok) {
       // router.push("/success");
       console.log('Turnstile....success')
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      console.log(err)
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }

      //

      //console.log('FORM')
      // Here you would typically send the form data to your backend
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call
      setSubmitSuccess(true)
      reset()
      setTimeout(() => setSubmitSuccess(false), 3000)
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      id="contact"
      className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-900 transition-colors duration-300 overflow-hidden relative"
    >
      <div className="container mx-auto px-6 relative z-10">
        <motion.h2
          className="text-4xl font-bold mb-12 text-center dark:text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Get in Touch
        </motion.h2>
        <div className="flex flex-col lg:flex-row gap-12">
          <motion.div
            className="lg:w-1/3"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-semibold mb-6 dark:text-white">Contact Information</h3>
              <div className="space-y-6">
                <a
                  href="mailto:phuoymakara@gmail.com"
                  className="flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                >
                  <Mail className="w-6 h-6 mr-3 text-blue-600" />
                  phuoymakara@gmail.com
                </a>
                <a
                  href="tel:++85587596644"
                  className="flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                >
                  <Phone className="w-6 h-6 mr-3 text-blue-600" />
                  +855 87 596 644
                </a>
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <MapPin className="w-6 h-6 mr-3 text-blue-600" />
                  Phnom Penh, Cambodia
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div
            className="lg:w-2/3"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Name
                  </label>
                  <input
                    id="name"
                    aria-label="name"
                    autoComplete="name"
                    {...register("name")}
                    type="text"
                    className={`w-full px-4 py-2 rounded-md border ${
                      errors.name ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white`}
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    id="email"
                    autoComplete="email"
                    aria-label="email"
                    {...register("email")}
                    type="email"
                    className={`w-full px-4 py-2 rounded-md border ${
                      errors.email ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white`}
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
                </div>
              </div>
              <div className="mt-6">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Subject
                </label>
                <input
                  id="subject"
                  autoComplete="subject"
                  aria-label="subject"
                  {...register("subject")}
                  type="text"
                  className={`w-full px-4 py-2 rounded-md border ${
                    errors.subject ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white`}
                />
                {errors.subject && <p className="mt-1 text-sm text-red-500">{errors.subject.message}</p>}
              </div>
              <div className="mt-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  autoComplete="message"
                  aria-label="message"
                  {...register("message")}
                  rows={4}
                  className={`w-full px-4 py-2 rounded-md border ${
                    errors.message ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white`}
                ></textarea>
                {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>}
              </div>
              <div>
              <Turnstile
              className="dark:bg-black dark:text-white"
              siteKey={`0x4AAAAAABCZHo7RK0hYJZNG`}
              retry="auto"
              refreshExpired="auto"
              sandbox={process.env.NODE_ENV === "development"}
              onError={() => {
                setTurnstileStatus("error");
                setError("Security check failed. Please try again.");
              }}
              onExpire={() => {
                setTurnstileStatus("expired");
                setError("Security check expired. Please verify again.");
              }}
              onLoad={() => {
                setTurnstileStatus("required");
                setError(null);
              }}
              onVerify={() => {
                setTurnstileStatus("success");
                setError(null);
                ///console.log(token)
              }}
            />
              </div>
                {error && (
                <div
                  className="flex items-center gap-2 text-red-500 text-sm mb-2"
                  aria-live="polite"
                >
                  <AlertCircle size={16} />
                  <span>{error}</span>
                </div>
              )}
              <div className="mt-6">
                <button

                  type="submit"
                  disabled={isSubmitting||isLoading||turnstileStatus!=='success'}
                  className={`w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center ${
                    isSubmitting ? "opacity-75 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <Send className="w-5 h-5 mr-2" />}
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </div>
              {submitSuccess && (
                <div className="mt-4 p-4 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-md">
                  Message sent successfully!
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
      <div className="absolute bottom-0 right-0 w-64 h-64 -mb-32 -mr-32 opacity-20">
        {/* <Image src="/placeholder.svg?height=256&width=256" alt="Decorative background" width={256} height={256} /> */}
      </div>
    </section>
  )
}

