import React from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CodeBlock } from '@/components/CodeBlock';
import { motion } from 'framer-motion';

export interface ParamDef {
  name: string;
  type: string;
  required: boolean;
  description: string;
  example?: string;
}

interface EndpointDocProps {
  title: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  description: React.ReactNode;
  headers?: ParamDef[];
  pathParams?: ParamDef[];
  bodyParams?: ParamDef[];
  responses: {
    status: number;
    description: string;
    schema?: React.ReactNode;
    example?: string;
  }[];
  examples: {
    language: string;
    code: string;
  }[];
}

export function EndpointDoc({
  title,
  method,
  path,
  description,
  headers,
  pathParams,
  bodyParams,
  responses,
  examples
}: EndpointDocProps) {
  
  const getMethodColor = (m: string) => {
    switch (m.toUpperCase()) {
      case 'GET': return 'get';
      case 'POST': return 'post';
      case 'PUT': return 'put';
      case 'DELETE': return 'delete';
      default: return 'default';
    }
  };

  const renderParamsTable = (params: ParamDef[], title: string) => {
    if (!params || params.length === 0) return null;
    return (
      <div className="mt-8">
        <h3 className="text-xl font-display mb-4 text-foreground">{title}</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Parameter</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {params.map((p, idx) => (
              <TableRow key={idx}>
                <TableCell className="font-mono text-sm">
                  {p.name}
                  {p.required && <span className="text-destructive ml-1">*</span>}
                </TableCell>
                <TableCell>
                  <code className="text-xs bg-muted px-1.5 py-0.5 text-primary">{p.type}</code>
                </TableCell>
                <TableCell>
                  <p className="text-sm text-muted-foreground">{p.description}</p>
                  {p.example && <p className="text-xs text-muted-foreground mt-1 opacity-70">e.g. {p.example}</p>}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-5xl mx-auto pb-24"
    >
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Badge variant={getMethodColor(method) as any} className="text-sm px-3 py-1 font-mono uppercase">
            {method}
          </Badge>
          <code className="text-lg font-mono text-foreground bg-card px-3 py-1 border border-border">
            {path}
          </code>
        </div>
        <h1 className="text-4xl font-display text-primary mb-4">{title}</h1>
        <div className="text-lg text-muted-foreground leading-relaxed">
          {description}
        </div>
      </div>

      <Separator className="my-8" />

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_400px] gap-12">
        <div className="space-y-10">
          {renderParamsTable(headers || [], "Headers")}
          {renderParamsTable(pathParams || [], "Path Parameters")}
          {renderParamsTable(bodyParams || [], "Request Body")}

          <div className="mt-8">
            <h3 className="text-xl font-display mb-4 text-foreground">Responses</h3>
            <div className="space-y-6">
              {responses.map((resp, idx) => (
                <div key={idx} className="border border-border bg-card">
                  <div className="px-4 py-3 border-b border-border bg-muted/30 flex items-center gap-3">
                    <span className={cn(
                      "font-mono font-bold",
                      resp.status >= 200 && resp.status < 300 ? "text-green-400" :
                      resp.status >= 400 ? "text-destructive" : "text-yellow-400"
                    )}>
                      {resp.status}
                    </span>
                    <span className="text-sm text-foreground">{resp.description}</span>
                  </div>
                  {resp.schema && (
                    <div className="p-4 border-b border-border">
                      <h4 className="text-sm font-semibold mb-2">Schema</h4>
                      {resp.schema}
                    </div>
                  )}
                  {resp.example && (
                    <div className="p-0">
                      <CodeBlock code={resp.example} language="json" className="border-none" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="xl:sticky xl:top-8 self-start space-y-6">
          <h3 className="text-xl font-display mb-4 text-foreground">Code Examples</h3>
          {examples.length > 0 && (
            <Tabs defaultValue={examples[0].language.toLowerCase()} className="w-full">
              <TabsList className="w-full justify-start rounded-none bg-card border border-border p-0 h-auto">
                {examples.map(ex => (
                  <TabsTrigger 
                    key={ex.language} 
                    value={ex.language.toLowerCase()}
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-muted/50 data-[state=active]:shadow-none py-2 px-4 font-mono text-xs uppercase"
                  >
                    {ex.language}
                  </TabsTrigger>
                ))}
              </TabsList>
              {examples.map(ex => (
                <TabsContent key={ex.language} value={ex.language.toLowerCase()} className="mt-0">
                  <CodeBlock code={ex.code} language={ex.language.toLowerCase()} className="border-t-0" />
                </TabsContent>
              ))}
            </Tabs>
          )}
        </div>
      </div>
      
      <div className="mt-20 pt-8 border-t border-border flex justify-between items-center text-sm text-muted-foreground">
        <span>Teck Sign Developer Center</span>
        <span>Last updated: {new Date().toLocaleDateString()}</span>
      </div>
    </motion.div>
  );
}
