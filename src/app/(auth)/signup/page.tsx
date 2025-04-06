"use client"

import { redirect } from "next/navigation"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { PasswordInput } from "@/components/ui/password-input"
import { TextLink } from "@/components/ui/text-link"
import { register } from "@/api/services/auth"

const formSchema = z
  .object({
    email: z.string().email("Must be a valid email"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number.",
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password confirmation must match given password",
    path: ["confirmPassword"],
  })

export default function Signup() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const response = await register(values)
    if (response.ok) {
      redirect("/dashboard")
    }
  }

  return (
    <>
      <CardHeader>
        <CardTitle className="text-xl font-semibold tracking-tight md:text-2xl">
          Sign Up
        </CardTitle>
        <CardDescription>Sign up into our service</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-2 md:space-y-4"
          >
            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="john.doe@email.com"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is your registered email
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput {...field} />
                  </FormControl>
                  <FormDescription>This is your password</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Confirm Password */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <PasswordInput {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your password confirmation
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-between">
              <Button type="submit">Sign up</Button>
              <TextLink href="/signin" className="text-sm md:text-base">
                Already have an account?
              </TextLink>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <p className="mx-auto max-w-80 text-center text-sm leading-none font-medium">
          By proceeding, you agree with our{" "}
          <TextLink href="" target="_blank">
            terms of service
          </TextLink>{" "}
          and{" "}
          <TextLink href="" target="_blank">
            privacy policy
          </TextLink>
        </p>
      </CardFooter>
    </>
  )
}
