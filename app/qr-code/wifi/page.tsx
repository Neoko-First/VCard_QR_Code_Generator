import { Metadata } from "next";
import { WifiQrCodeForm } from "./Form";

export const metadata: Metadata = {
  title: "QR Code Wifi",
  description: "Générez un QR code permettant de copier le code wifi",
};

export default function Wifi() {
  return <WifiQrCodeForm />;
}
