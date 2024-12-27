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
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

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
              <FormField
                control={form.control}
                name="ssid"
                render={({ field: formField }) => (
                  <FormItem>
                    <FormLabel>SSID</FormLabel>
                    <FormControl>
                      <Input placeholder="MonWiFi" {...formField} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field: formField }) => (
                  <FormItem>
                    <FormLabel>Mot de passe</FormLabel>
                    <FormControl>
                      <Input placeholder="motdepasse123" {...formField} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="encryption"
                render={({ field: formField }) => (
                  <FormItem>
                    <FormLabel>Type de cryptage</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="WPA, WPA2, WEP, ou vide"
                        {...formField}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="hidden"
                render={({ field: formField }) => (
                  <FormItem>
                    <FormLabel>Réseau masqué</FormLabel>
                    <FormControl>
                      <Switch
                        checked={formField.value}
                        onCheckedChange={formField.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
