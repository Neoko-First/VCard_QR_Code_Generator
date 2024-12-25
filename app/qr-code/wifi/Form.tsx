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
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";

// Champs spécifiques pour les QR Codes Wi-Fi
const wifiFields = [
  {
    name: "ssid",
    label: "Nom du réseau (SSID)",
    placeholder: "MonWiFi",
    required: true,
  },
  {
    name: "password",
    label: "Mot de passe",
    placeholder: "motdepasse123",
    required: true,
  },
  {
    name: "encryption",
    label: "Type de cryptage",
    placeholder: "WPA, WPA2, WEP, ou vide",
    required: true,
  },
  {
    name: "hidden",
    label: "Réseau masqué",
    required: false,
  },
];

// Définition du schéma Zod
const wifiSchema = z.object({
  ssid: z.string().min(1, "Le SSID est requis"),
  password: z.string().min(1, "Le mot de passe est requis"),
  encryption: z.string().optional(), // Vide pour les réseaux ouverts
  hidden: z.boolean().optional(), // Réseau masqué
});

export function WifiQrCodeForm() {
  const [qrData, setQrData] = useState("");

  const form = useForm<z.infer<typeof wifiSchema>>({
    resolver: zodResolver(wifiSchema),
    defaultValues: {
      ssid: "Livebox-49F0",
      password: "KYL7 Ptrs crwh t2hR 5C",
      encryption: "WPA",
      hidden: true,
    },
  });

  function onSubmit(values: z.infer<typeof wifiSchema>) {
    // Format des données QR Code Wi-Fi
    const qrCodeData = `WIFI:T:${values.encryption || ""};S:${values.ssid};P:${
      values.password
    };H:${values.hidden ? "true" : "false"};`;

    console.log("WiFi QR Code Data:", qrCodeData);

    setQrData(qrCodeData);
  }

  return (
    <div className="px-4 flex gap-4 transition-all duration-300 ease-in-out">
      <div className="w-full flex flex-col gap-4">
        <h1>QR Code Wi-Fi</h1>
        <p>
          Générez un QR code pour connecter un appareil à votre réseau Wi-Fi
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-3">
              {wifiFields.map((field) => (
                <FormField
                  key={field.name}
                  control={form.control}
                  name={field.name as keyof z.infer<typeof wifiSchema>}
                  render={({ field: formField }) => (
                    <FormItem>
                      <FormLabel>
                        {field.label}
                        <span className="font-bold text-secondary">
                          {field.required ? " *" : ""}
                        </span>
                      </FormLabel>
                      <FormControl>
                        {field.name === "hidden" ? (
                          <Switch {...formField} />
                        ) : (
                          <Input
                            placeholder={field.placeholder}
                            {...formField}
                          />
                        )}
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
