import { AutoFormFieldProps } from "@autoform/react"
import React from "react"
import { Textarea } from "../../textarea"

export const TextAreaField: React.FC<AutoFormFieldProps> = ({
  inputProps,
  error,
  id,
}) => {
  const { key, ...props } = inputProps

  return (
    <Textarea
      id={id}
      className={error ? "border-destructive" : ""}
      {...props}
    />
  )
}
