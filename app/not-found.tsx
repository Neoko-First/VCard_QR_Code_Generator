import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-full flex flex-col items-center justify-center gap-4">
      <h1>Erreur 404</h1>
      <p>Page non trouvée</p>
      <Button asChild>
        <Link href="/">Retourner à l&apos;accueil</Link>
      </Button>
    </div>
  );
}
