"use client"

import { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
})

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    // Simulate form submission
    setTimeout(() => {
      console.log(values)
      setSubmitMessage("Thank you for your message. We'll get back to you soon!")
      setIsSubmitting(false)
      form.reset()
    }, 2000)
  }

  return (
    <section id="contact" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl font-extrabold text-center mb-8 text-[#00BCD4]">Contact Us</h2>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Your name" 
                          {...field} 
                          className="w-full h-12 border-gray-200 focus:border-[#00BCD4] focus:ring-[#00BCD4]" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Email</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Your email" 
                          {...field} 
                          className="w-full h-12 border-gray-200 focus:border-[#00BCD4] focus:ring-[#00BCD4]" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Your message" 
                          {...field} 
                          className="w-full min-h-[120px] border-gray-200 focus:border-[#00BCD4] focus:ring-[#00BCD4]" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  className="w-full h-12 bg-[#00BCD4] hover:bg-[#0097A7] transition-colors"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Form>
            {submitMessage && (
              <p className="mt-4 text-center text-green-600">{submitMessage}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

