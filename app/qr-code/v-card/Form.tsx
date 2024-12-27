"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import QrCode from "@/components/QrCode";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";

// Configuration des champs pour simplifier la gestion
const fields = [
  {
    name: "firstname",
    label: "Prénom",
    required: true,
  },
  { name: "lastname", label: "Nom", required: true },
  {
    name: "phone",
    label: "Téléphone",
    required: true,
  },
  {
    name: "fixphone",
    label: "Téléphone fixe",
    required: false,
  },
  { name: "fax", label: "Fax", required: false },
  {
    name: "email",
    label: "Email",
    required: true,
  },
  {
    name: "company",
    label: "Entreprise",
    required: true,
  },
  {
    name: "jobtitle",
    label: "Fonction",
    required: true,
  },
  {
    name: "street",
    label: "Rue",
    required: true,
  },
  {
    name: "city",
    label: "Ville",
    required: true,
  },
  {
    name: "state",
    label: "État",
    required: true,
  },
  { name: "country", label: "Pays", required: true },
  {
    name: "website",
    label: "Site web",
    required: true,
  },
  {
    name: "note",
    label: "Note",
    required: false,
  },
];

// Définition du schéma Zod
const formSchema = z.object({
  firstname: z.string(),
  lastname: z.string(),
  phone: z.string().regex(/^\d+$/, "Numéro de téléphone invalide"),
  fixphone: z
    .string()
    .regex(/^\d*$/, "Numéro de téléphone fixe invalide")
    .optional(),
  fax: z.string().regex(/^\d*$/, "Numéro de fax invalide").optional(),
  email: z.string().email("Adresse email invalide"),
  company: z.string(),
  jobtitle: z.string(),
  street: z.string(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  website: z.string().url("URL invalide"),
  note: z.string(),
});

export function VCardForm() {
  const [qrData, setQrData] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      phone: "",
      fixphone: "",
      fax: "",
      email: "",
      company: "",
      jobtitle: "",
      street: "",
      city: "",
      state: "",
      country: "",
      website: "",
      note: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${values.firstname} ${values.lastname}
N:${values.lastname};${values.firstname};;;
TEL;TYPE=CELL:${values.phone}
${values.fixphone ? `TEL;TYPE=WORK:${values.fixphone}` : ""}
${values.fax ? `TEL;TYPE=FAX:${values.fax}` : ""}
EMAIL;TYPE=INTERNET:${values.email}
ORG:${values.company}
TITLE:${values.jobtitle}
ADR;TYPE=WORK:;;${values.street};${values.city};${values.state};;${
      values.country
    }
URL:${values.website}
NOTE:${values.note}
END:VCARD`;

    console.log("vCard Data:", vcard);

    setQrData(vcard);
  }

  return (
    <div className="px-4 flex gap-4 transition-all duration-300 ease-in-out">
      <div className="w-full flex flex-col gap-4">
        <h1>QR Code vCard</h1>
        <p>Générez un QR code permettant de créer un contact</p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-3">
              {fields.map((field) => (
                <FormField
                  key={field.name}
                  control={form.control}
                  name={field.name as keyof z.infer<typeof formSchema>}
                  render={({ field: formField }) => (
                    <FormItem>
                      <FormLabel>
                        {field.label}
                        <span className="font-bold text-secondary">
                          {field.required ? " *" : ""}
                        </span>
                      </FormLabel>
                      <FormControl>
                        <Input {...formField} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              <div className="col-span-2 text-center">
                <Button type="submit">Générer le QR code</Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
      {qrData && (
        <div className="sticky top-2 w-[200px] h-[200px]">
          <QrCode value={qrData} />
        </div>
      )}
    </div>
  );
}
