import { Link } from "wouter";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h1 className="text-9xl font-display text-primary opacity-20 select-none">404</h1>
        <h2 className="text-3xl font-bold mt-4 mb-2">Página não encontrada</h2>
        <p className="text-muted-foreground max-w-md mb-8">
          A documentação ou endpoint que você está procurando não existe ou foi movido.
        </p>
        <Link href="/">
          <Button>Voltar para o Início</Button>
        </Link>
      </div>
    </Layout>
  );
}
