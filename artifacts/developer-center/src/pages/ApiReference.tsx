import React from 'react';
import { Layout } from '@/components/Layout';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

export default function ApiReference() {
  return (
    <Layout>
      <div className="max-w-[1400px] mx-auto bg-card border border-border p-4 shadow-2xl relative z-10">
        <div className="mb-4 pb-4 border-b border-border flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-display text-primary">Interactive API Reference</h1>
            <p className="text-muted-foreground text-sm mt-1">Explore and test the Teck Sign API endpoints directly from your browser.</p>
          </div>
          <div className="hidden md:flex gap-2">
            <span className="px-2 py-1 bg-secondary text-xs font-mono text-muted-foreground border border-border">OpenAPI 3.1.0</span>
          </div>
        </div>
        
        {/* 
          We render the Swagger UI pointing to the local API spec. 
          In a real deployed environment, this URL would point to your NestJS backend swagger.json
          e.g., https://api.tecksign.com/api-json
        */}
        <div className="swagger-dark-wrapper min-h-[800px]">
          <SwaggerUI url="/api/swagger.json" docExpansion="list" />
        </div>
      </div>
    </Layout>
  );
}
