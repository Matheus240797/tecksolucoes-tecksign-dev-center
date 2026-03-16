import React from 'react';
import { Layout } from '@/components/Layout';
import { CodeBlock } from '@/components/CodeBlock';
import { Separator } from '@/components/ui/separator';
import { motion } from 'framer-motion';
import { Server, Globe, ShieldCheck } from 'lucide-react';

export default function GettingStarted() {
  return (
    <Layout>
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl space-y-12"
      >
        <div>
          <h1 className="text-4xl font-display text-primary mb-6">Primeiros Passos</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Para integrar com a Teck Sign, você precisará de credenciais de acesso fornecidas pela nossa equipe comercial. O processo de integração geralmente envolve testar suas chamadas no ambiente Sandbox antes de mover para Produção.
          </p>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-display text-foreground flex items-center gap-3">
            <Server className="text-primary w-6 h-6" /> 
            Ambientes
          </h2>
          <p className="text-muted-foreground">A API da Teck Sign possui duas URLs base distintas dependendo do ambiente que você está acessando.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-card border border-border p-6 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
              <h3 className="text-xl font-bold text-foreground mb-2">Sandbox (Testes)</h3>
              <p className="text-sm text-muted-foreground mb-4">Utilize este ambiente durante o desenvolvimento. Documentos gerados aqui não possuem validade jurídica e não são tarifados.</p>
              <code className="block bg-background border border-border p-3 text-sm font-mono text-blue-400">
                https://sandbox.api.tecksign.com
              </code>
            </div>

            <div className="bg-card border border-border p-6 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
              <h3 className="text-xl font-bold text-foreground mb-2">Produção</h3>
              <p className="text-sm text-muted-foreground mb-4">Ambiente real. Documentos assinados possuem validade jurídica plena e geram cobrança conforme seu plano.</p>
              <code className="block bg-background border border-border p-3 text-sm font-mono text-primary">
                https://api.tecksign.com
              </code>
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-6">
          <h2 className="text-2xl font-display text-foreground flex items-center gap-3">
            <ShieldCheck className="text-primary w-6 h-6" />
            Credenciais
          </h2>
          <p className="text-muted-foreground">
            Você receberá um <code className="text-primary bg-primary/10 px-1 py-0.5">clientId</code> e um <code className="text-primary bg-primary/10 px-1 py-0.5">clientSecret</code> da nossa equipe. 
            Mantenha seu <code className="text-primary bg-primary/10 px-1 py-0.5">clientSecret</code> seguro e nunca o exponha em código frontend (navegador ou aplicativos mobile).
          </p>
          <div className="bg-[#0a111a] border-l-4 border-yellow-500 p-4 mt-4">
            <p className="text-yellow-500 font-semibold mb-1">Atenção à Segurança</p>
            <p className="text-sm text-yellow-500/80">A autenticação deve sempre ocorrer do seu servidor backend para a nossa API. Não tente autenticar diretamente de uma aplicação Single Page Application (SPA).</p>
          </div>
        </div>

        <Separator />

        <div className="space-y-6">
          <h2 className="text-2xl font-display text-foreground flex items-center gap-3">
            <Globe className="text-primary w-6 h-6" />
            Fluxo Básico de Integração
          </h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold shrink-0">1</div>
              <div>
                <h4 className="text-lg font-bold text-foreground">Autenticação</h4>
                <p className="text-muted-foreground">Troque suas credenciais por um Token JWT válido por 1 hora.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold shrink-0">2</div>
              <div>
                <h4 className="text-lg font-bold text-foreground">Geração de Processo</h4>
                <p className="text-muted-foreground">Envie o documento em Base64 e os dados dos signatários para criar um novo processo de assinatura.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold shrink-0">3</div>
              <div>
                <h4 className="text-lg font-bold text-foreground">Acompanhamento</h4>
                <p className="text-muted-foreground">Consulte o status do processo ou aguarde o recebimento de webhooks quando as assinaturas forem concluídas.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold shrink-0">4</div>
              <div>
                <h4 className="text-lg font-bold text-foreground">Download</h4>
                <p className="text-muted-foreground">Baixe o documento final assinado com a página de assinaturas e carimbos de tempo.</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Layout>
  );
}
