import { QRCodeSVG } from "qrcode.react";
import { useRef } from "react";
import { Button } from "./ui/button";
import { Download } from "lucide-react";

interface QrCodeProps {
  value: string; // Contenu du QR Code (requis)
  title?: string; // Titre pour le QR Code
  size?: number; // Taille du QR Code
  bgColor?: string; // Couleur de fond
  fgColor?: string; // Couleur des pixels
  level?: "L" | "M" | "Q" | "H"; // Niveau de correction d'erreur
}

export default function QrCode({
  value,
  title = "QR Code",
  size = 200,
  bgColor = "#ffffff",
  fgColor = "#000000",
  level = "L",
}: QrCodeProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  // Télécharger en SVG
  const downloadAsSVG = () => {
    if (svgRef.current) {
      const svgData = new XMLSerializer().serializeToString(svgRef.current);
      const blob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "qrcode.svg";
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  // Télécharger en PNG
  const downloadAsPNG = () => {
    if (svgRef.current) {
      const svgData = new XMLSerializer().serializeToString(svgRef.current);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) return;

      const img = new Image();
      const svgBlob = new Blob([svgData], {
        type: "image/svg+xml;charset=utf-8",
      });
      const url = URL.createObjectURL(svgBlob);

      img.onload = () => {
        canvas.width = size;
        canvas.height = size;
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, size, size);
        URL.revokeObjectURL(url);

        const pngUrl = canvas.toDataURL("image/png");
        const a = document.createElement("a");
        a.href = pngUrl;
        a.download = "qrcode.png";
        a.click();
      };

      img.src = url;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className=" bg-white p-2">
        <QRCodeSVG
          ref={svgRef}
          value={value}
          title={title}
          size={size}
          bgColor={bgColor}
          fgColor={fgColor}
          level={level}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Button onClick={downloadAsPNG}>
          <Download />
          Image (PNG)
        </Button>
        <Button onClick={downloadAsSVG}>
          <Download />
          Vecteur (SVG)
        </Button>
      </div>
    </div>
  );
}
