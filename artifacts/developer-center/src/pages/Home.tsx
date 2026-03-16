import React from 'react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { ArrowRight, Code, Shield, FileSignature, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const features = [
    {
      title: 'Integração Rápida',
      description: 'APIs RESTful com retornos em JSON claros e documentados para uma implementação sem fricção.',
      icon: Zap,
    },
    {
      title: 'Segurança Primeiro',
      description: 'Autenticação baseada em tokens JWT temporários e comunicação criptografada.',
      icon: Shield,
    },
    {
      title: 'Processos Complexos',
      description: 'Suporte para múltiplos signatários, ordem de assinatura e documentos auxiliares.',
      icon: FileSignature,
    },
    {
      title: 'Webhooks & Eventos',
      description: 'Seja notificado em tempo real quando um documento for assinado ou recusado.',
      icon: Code,
    }
  ];

  return (
    <Layout>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-16"
      >
        {/* Hero Section */}
        <div className="space-y-6 max-w-3xl">
          <div className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary text-sm font-mono border border-primary/20 mb-4">
            API v1.0.0
          </div>
          <h1 className="text-5xl md:text-6xl font-display text-foreground leading-tight">
            Construa o futuro da <span className="text-primary">Assinatura Digital</span>.
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Bem-vindo ao Developer Center da Teck Sign. Aqui você encontra toda a documentação, guias e referências de API necessárias para integrar nossa plataforma de assinaturas eletrônicas ao seu software.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Link href="/getting-started">
              <Button size="lg" className="font-display text-lg px-8 tracking-wide">
                Primeiros Passos <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/api-reference">
              <Button size="lg" variant="outline" className="font-display text-lg px-8 tracking-wide">
                API Reference
              </Button>
            </Link>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-12 border-t border-border">
          {features.map((feat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * idx }}
              className="bg-card border border-border p-6 hover:border-primary/50 transition-colors group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                <feat.icon className="w-24 h-24 text-primary" />
              </div>
              <feat.icon className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-display text-foreground mb-2">{feat.title}</h3>
              <p className="text-muted-foreground">{feat.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Quick Links */}
        <div className="bg-[#0a111a] border border-border p-8 mt-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-2xl font-display text-foreground mb-2">Pronto para testar?</h3>
            <p className="text-muted-foreground">Acesse nossa API Reference interativa e envie requisições reais.</p>
          </div>
          <Link href="/api-reference">
            <Button className="shrink-0 bg-white text-black hover:bg-gray-200 shadow-none font-bold px-8">
              Abrir Swagger UI
            </Button>
          </Link>
        </div>
      </motion.div>
    </Layout>
  );
}
