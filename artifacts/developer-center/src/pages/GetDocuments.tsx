import React from 'react';
import { Layout } from '@/components/Layout';
import { EndpointDoc } from '@/components/EndpointDoc';

export default function GetDocuments() {
  return (
    <Layout>
      <EndpointDoc 
        title="Consulta de Documentos"
        method="GET"
        path="/api/processes/{processId}/documents"
        description={
          <>
            <p className="mb-4">
              Retorna os documentos associados a um processo de assinatura. A resposta inclui os documentos originais e, quando o processo for finalizado, os documentos com as respectivas folhas de assinatura.
            </p>
            <p>
              <strong>Atenção:</strong> Os links de download retornados (<code className="text-primary bg-primary/10 px-1">downloadUrl</code>) são temporários e expiram em 60 minutos por razões de segurança. Se o link expirar, faça uma nova requisição a este endpoint para gerar novas URLs.
            </p>
          </>
        }
        headers={[
          {
            name: "Authorization",
            type: "string",
            required: true,
            description: "Token JWT no formato Bearer."
          }
        ]}
        pathParams={[
          {
            name: "processId",
            type: "string (UUID)",
            required: true,
            description: "ID único do processo gerado durante a criação.",
            example: '"550e8400-e29b-41d4-a716-446655440000"'
          }
        ]}
        responses={[
          {
            status: 200,
            description: "Lista de documentos retornada com sucesso.",
            example: `{
  "processId": "550e8400-e29b-41d4-a716-446655440000",
  "documents": [
    {
      "documentId": "660e8400-e29b-41d4-a716-446655440001",
      "name": "contrato_original.pdf",
      "type": "original",
      "downloadUrl": "https://storage.tecksign.com/tmp/abc123xyz...",
      "sizeBytes": 204800,
      "createdAt": "2026-03-16T10:00:00Z"
    },
    {
      "documentId": "660e8400-e29b-41d4-a716-446655440002",
      "name": "contrato_assinado.pdf",
      "type": "signed",
      "downloadUrl": "https://storage.tecksign.com/tmp/def456uvw...",
      "sizeBytes": 245000,
      "createdAt": "2026-03-16T11:50:00Z"
    }
  ]
}`
          },
          {
            status: 404,
            description: "Processo não encontrado.",
            example: `{
  "statusCode": 404,
  "error": "Not Found",
  "message": "Processo não localizado"
}`
          }
        ]}
        examples={[
          {
            language: "cURL",
            code: `curl -X GET https://sandbox.api.tecksign.com/api/processes/550e8400-e29b-41d4-a716-446655440000/documents \\
  -H "Authorization: Bearer YOUR_TOKEN_HERE"`
          },
          {
            language: "Node.js",
            code: `const processId = '550e8400-e29b-41d4-a716-446655440000';
const response = await fetch(\`https://sandbox.api.tecksign.com/api/processes/\${processId}/documents\`, {
  headers: {
    'Authorization': 'Bearer YOUR_TOKEN_HERE'
  }
});

const data = await response.json();
const signedDoc = data.documents.find(d => d.type === 'signed');

if (signedDoc) {
  console.log('Baixe o documento assinado aqui:', signedDoc.downloadUrl);
}`
          }
        ]}
      />
    </Layout>
  );
}
