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
import { signIn } from "@/api/services/auth"

const formSchema = z.object({
  email: z.string().min(2).max(50).email(),
  password: z.string().min(8),
})

export default function Signin() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const response = await signIn(values)
    if (response.ok) {
      redirect("/dashboard")
    }
  }

  return (
    <>
      <CardHeader>
        <CardTitle className="text-xl font-semibold tracking-tight md:text-2xl">
          Sign In
        </CardTitle>
        <CardDescription>Sign in into our service</CardDescription>
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
            <div className="flex items-center justify-between">
              <Button type="submit">Sign in</Button>
              <TextLink href="/signup" className="text-sm md:text-base">
                Don&apos;t have an account?
              </TextLink>
            </div>
            <div className="flex items-center justify-center">
              <TextLink href="/recovery" className="text-sm">
                Forgot your password?
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
