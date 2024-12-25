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
    placeholder: "Alexandre",
    required: true,
  },
  { name: "lastname", label: "Nom", placeholder: "Artisien", required: true },
  {
    name: "phone",
    label: "Téléphone",
    placeholder: "0667274669",
    required: true,
  },
  {
    name: "fixphone",
    label: "Téléphone fixe",
    placeholder: "0254789654",
    required: false,
  },
  { name: "fax", label: "Fax", placeholder: "0254789655", required: false },
  {
    name: "email",
    label: "Email",
    placeholder: "example@gmail.com",
    required: true,
  },
  {
    name: "company",
    label: "Entreprise",
    placeholder: "RouleMarcel",
    required: true,
  },
  {
    name: "jobtitle",
    label: "Fonction",
    placeholder: "Développeur web",
    required: true,
  },
  {
    name: "street",
    label: "Rue",
    placeholder: "30 avenue de l'Europe",
    required: true,
  },
  {
    name: "city",
    label: "Ville",
    placeholder: "Les Ponts-de-Cé",
    required: true,
  },
  {
    name: "state",
    label: "État",
    placeholder: "Maine et Loire",
    required: true,
  },
  { name: "country", label: "Pays", placeholder: "France", required: true },
  {
    name: "website",
    label: "Site web",
    placeholder: "https://www.alexandre-artisien.fr",
    required: true,
  },
  {
    name: "note",
    label: "Note",
    placeholder: "Ce contact est privé",
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
      firstname: "Alexandre",
      lastname: "Artisien",
      phone: "0667274669",
      fixphone: "",
      fax: "",
      email: "alexandre.artisien@gmail.com",
      company: "RouleMarcel",
      jobtitle: "Développeur web",
      street: "30 avenue de l'Europe",
      city: "Les Ponts-de-Cé",
      state: "Maine et Loire",
      country: "France",
      website: "https://www.alexandre-artisien.fr",
      note: "N'hésitez pas à me contacter si vous avez des questions",
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
                        <Input placeholder={field.placeholder} {...formField} />
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
