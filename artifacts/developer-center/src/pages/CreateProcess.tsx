import React from 'react';
import { Layout } from '@/components/Layout';
import { EndpointDoc } from '@/components/EndpointDoc';

export default function CreateProcess() {
  return (
    <Layout>
      <EndpointDoc 
        title="Geração de Processo"
        method="POST"
        path="/api/processes"
        description={
          <>
            <p className="mb-4">
              Cria um novo processo de assinatura digital. Um processo representa um fluxo completo de assinatura que pode envolver um ou mais signatários e documentos.
            </p>
            <p>
              Após criado, o processo retorna um <code className="text-primary">processId</code> que deve ser utilizado para consultar o status e baixar os documentos assinados posteriormente.
            </p>
          </>
        }
        headers={[
          {
            name: "Authorization",
            type: "string",
            required: true,
            description: "Token JWT no formato Bearer.",
            example: "Bearer eyJhbG..."
          }
        ]}
        bodyParams={[
          {
            name: "title",
            type: "string",
            required: true,
            description: "Título identificador do processo.",
            example: '"Contrato de Prestação de Serviços"'
          },
          {
            name: "documentBase64",
            type: "string",
            required: true,
            description: "Documento em formato PDF, codificado em Base64.",
            example: '"JVBERi0xLjQKJc..."'
          },
          {
            name: "signatories",
            type: "array",
            required: true,
            description: "Lista de objetos contendo os dados de cada signatário."
          },
          {
            name: "signatories[].name",
            type: "string",
            required: true,
            description: "Nome completo do signatário.",
            example: '"João da Silva"'
          },
          {
            name: "signatories[].email",
            type: "string",
            required: true,
            description: "E-mail do signatário (usado para envio de notificações).",
            example: '"joao@empresa.com"'
          },
          {
            name: "signatories[].cpf",
            type: "string",
            required: false,
            description: "CPF do signatário, apenas números.",
            example: '"12345678900"'
          },
          {
            name: "message",
            type: "string",
            required: false,
            description: "Mensagem customizada enviada no corpo do e-mail para os signatários."
          },
          {
            name: "expiresAt",
            type: "string",
            required: false,
            description: "Data limite para conclusão das assinaturas no formato ISO 8601.",
            example: '"2026-04-15T23:59:59Z"'
          }
        ]}
        responses={[
          {
            status: 201,
            description: "Processo criado com sucesso.",
            example: `{
  "processId": "550e8400-e29b-41d4-a716-446655440000",
  "status": "pending",
  "createdAt": "2026-03-16T10:00:00Z",
  "signingUrl": "https://app.tecksign.com/process/550e8400..."
}`
          },
          {
            status: 400,
            description: "Erros de validação (ex: Base64 inválido, e-mail mal formatado).",
            example: `{
  "statusCode": 400,
  "error": "Bad Request",
  "message": "Formato de email inválido na posição 0"
}`
          }
        ]}
        examples={[
          {
            language: "cURL",
            code: `curl -X POST https://sandbox.api.tecksign.com/api/processes \\
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "Contrato Comercial",
    "documentBase64": "JVBERi0xLjQKJcfs...",
    "signatories": [
      {
        "name": "Maria Oliveira",
        "email": "maria@exemplo.com",
        "cpf": "00011122233"
      }
    ]
  }'`
          },
          {
            language: "Node.js",
            code: `const response = await fetch('https://sandbox.api.tecksign.com/api/processes', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_TOKEN_HERE',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    title: 'Contrato Comercial',
    documentBase64: 'JVBERi0xLjQKJcfs...',
    signatories: [
      {
        name: 'Maria Oliveira',
        email: 'maria@exemplo.com'
      }
    ]
  })
});

const data = await response.json();
console.log('Processo ID:', data.processId);`
          }
        ]}
      />
    </Layout>
  );
}
