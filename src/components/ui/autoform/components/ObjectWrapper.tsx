import React from "react"
import { ObjectWrapperProps } from "@autoform/react"

export const ObjectWrapper: React.FC<ObjectWrapperProps> = ({
  label,
  children,
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">{label}</h3>
      <div className="grid grid-cols-2 gap-2 md:gap-4">{children}</div>
    </div>
  )
}
