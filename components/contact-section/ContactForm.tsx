"use client";

import { useForm } from "react-hook-form";
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ContactFormData {
  email: string;
  subject: string;
  message: string;
}

export const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>();

  async function onSubmit(data: ContactFormData) {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to send message");
      }

      toast.success("Message sent successfully!");
      reset();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to send message"
      );
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6 w-full">
      <Field>
        <FieldLabel htmlFor="email">Email</FieldLabel>
        <FieldContent>
          <Input
            id="email"
            type="email"
            placeholder="your.email@example.com"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
          />
          <FieldError errors={[errors.email]} />
        </FieldContent>
      </Field>

      <Field>
        <FieldLabel htmlFor="subject">Subject</FieldLabel>
        <FieldContent>
          <Input
            id="subject"
            type="text"
            placeholder="What's this about?"
            {...register("subject", {
              required: "Subject is required",
              minLength: {
                value: 3,
                message: "Subject must be at least 3 characters",
              },
            })}
          />
          <FieldError errors={[errors.subject]} />
        </FieldContent>
      </Field>

      <Field>
        <FieldLabel htmlFor="message">Message</FieldLabel>
        <FieldContent>
          <Textarea
            id="message"
            placeholder="Tell me about your project or just say hello..."
            rows={6}
            {...register("message", {
              required: "Message is required",
              minLength: {
                value: 10,
                message: "Message must be at least 10 characters",
              },
            })}
          />
          <FieldError errors={[errors.message]} />
        </FieldContent>
      </Field>

      <Button type="submit" variant="default" className="w-full sm:w-auto">
        Send Message
      </Button>
    </form>
  );
};
