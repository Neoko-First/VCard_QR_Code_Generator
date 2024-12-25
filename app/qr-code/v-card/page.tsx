import React from 'react'
import { VCardForm } from './Form'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "QR Code vCard",
  description: "Générez un QR code permettant de créer un contact",
};

export default function VCard() {
  return (
    <VCardForm />
  )
}
