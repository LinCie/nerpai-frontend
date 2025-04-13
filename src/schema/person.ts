import { z } from "zod"
import { ZodProvider } from "@autoform/zod"
import { buildZodFieldConfig } from "@autoform/react"
import { FieldTypes } from "@/components/ui/autoform"

const fieldConfig = buildZodFieldConfig<
  FieldTypes,
  {
    isImportant?: boolean
  }
>()

const personSchema = z.object({
  number: z
    .string({
      required_error: "number is required",
      invalid_type_error: "number must be a string",
    })
    .superRefine(
      fieldConfig({
        label: "Number",
        description: "This is your number",
        fieldType: "string",
        inputProps: {
          placeholder: "+62-564-486-871",
        },
      }),
    ),

  username: z
    .string({
      required_error: "username is required",
      invalid_type_error: "username must be a string",
    })
    .regex(/^(?=[a-z0-9._]*[a-z])[a-z0-9._]+$/, {
      message:
        "username must contain only lowercase letters, numbers, underscores (_) or periods (.), and must include at least one letter",
    })
    .superRefine(
      fieldConfig({
        label: "Username",
        description: "This is your username",
        fieldType: "string",
        inputProps: {
          placeholder: "ahmad.hae",
        },
      }),
    ),

  fullName: z
    .string({
      invalid_type_error: "full name must be a string",
    })
    .optional()
    .refine(
      (val) => {
        if (val) {
          return /^[A-Za-zÀ-ÖØ-öø-ÿ]+([ '-][A-Za-zÀ-ÖØ-öø-ÿ]+)*$/.test(val)
        }
        return true
      },
      {
        message:
          "Full name must only contain letters, spaces, apostrophes, or hyphens, and must start and end with a letter",
      },
    )
    .superRefine(
      fieldConfig({
        label: "Full Name",
        description: "This is your full name",
        fieldType: "string",
        inputProps: {
          placeholder: "Muhammad Farhan Mansur",
        },
      }),
    ),

  birthDate: z
    .string()
    .optional()
    .superRefine(
      fieldConfig({
        label: "Birth Date",
        description: "This is your birth date",
        fieldType: "date",
      }),
    ),

  deathDate: z
    .string()
    .optional()
    .superRefine(
      fieldConfig({
        label: "Death Date",
        description: "This is your death date",
        fieldType: "date",
      }),
    ),

  sex: z
    .enum(["male", "female", "other"])
    .optional()
    .superRefine(
      fieldConfig({
        label: "Sex",
        description: "This is your sex",
        fieldType: "select",
        inputProps: {
          placeholder: "Select your gender",
        },
      }),
    ),

  address: z
    .object({
      country: z
        .string({
          invalid_type_error: "country must be a string",
        })
        .optional()
        .superRefine(
          fieldConfig({
            label: "Country",
            description: "This is your country",
            fieldType: "string",
            inputProps: {
              placeholder: "Indonesia",
            },
          }),
        ),
      province: z
        .string({
          invalid_type_error: "province must be a string",
        })
        .optional()
        .superRefine(
          fieldConfig({
            label: "Province",
            description: "This is your province",
            fieldType: "string",
            inputProps: {
              placeholder: "Jawa Timur",
            },
          }),
        ),
      city: z
        .string({
          invalid_type_error: "city must be a string",
        })
        .optional()
        .superRefine(
          fieldConfig({
            label: "City",
            description: "This is your city",
            fieldType: "string",
            inputProps: {
              placeholder: "Blitar",
            },
          }),
        ),
      street: z
        .string({
          invalid_type_error: "street must be a string",
        })
        .optional()
        .superRefine(
          fieldConfig({
            label: "Street",
            description: "This is your street",
            fieldType: "string",
            inputProps: {
              placeholder: "JL Iman Bonjol",
            },
          }),
        ),
      postal: z
        .string({
          invalid_type_error: "postal code must be a string",
        })
        .optional()
        .superRefine(
          fieldConfig({
            label: "Postal Code",
            description: "This is your postal code",
            fieldType: "string",
            inputProps: {
              placeholder: "69420",
            },
          }),
        ),
    })
    .optional(),

  status: z
    .enum(["active", "inactive"], {
      errorMap: () => ({
        message: "status must be either 'active' or 'inactive'",
      }),
    })
    .superRefine(
      fieldConfig({
        label: "Status",
        description: "This is your status",
        fieldType: "select",
        inputProps: {
          placeholder: "Select your status",
        },
      }),
    ),

  notes: z
    .string()
    .optional()
    .superRefine(
      fieldConfig({
        label: "Notes",
        description: "This is your notes",
        fieldType: "textarea",
        inputProps: {
          placeholder: "Enter your notes",
        },
      }),
    ),
})

const personSchemaProvider = new ZodProvider(personSchema)

interface IPerson extends z.output<typeof personSchema> {
  id: number
}

export { personSchema, personSchemaProvider }
export type { IPerson }
