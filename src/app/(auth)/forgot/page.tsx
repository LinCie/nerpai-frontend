"use client"

import { z } from "zod"
import { redirect } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
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
import { TextLink } from "@/components/ui/text-link"

const formSchema = z.object({
  email: z.string().min(2).max(50).email(),
})

export default function Forgot() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const promise = () =>
      new Promise((resolve) => setTimeout(() => resolve(values), 2000))

    toast.promise(promise, {
      loading: "Processing your request...",
      success: "A recovery link has been sent to your email",
      error: "There is an error while sending your recovery link",
    })
    redirect("/signin")
  }

  return (
    <>
      <CardHeader>
        <CardTitle className="text-xl font-semibold tracking-tight md:text-2xl">
          Reset your password
        </CardTitle>
        <CardDescription>
          Please provide us with your email so we can send you your recovery
          link
        </CardDescription>
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

            <div className="flex items-center justify-between">
              <Button type="submit">Send link</Button>
              <TextLink href="/signin" className="text-sm md:text-base">
                Recalled your password?
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
