import React from 'react';
import { Layout } from '@/components/Layout';
import { EndpointDoc } from '@/components/EndpointDoc';

export default function GetProcess() {
  return (
    <Layout>
      <EndpointDoc 
        title="Consulta de Processo"
        method="GET"
        path="/api/processes/{processId}"
        description={
          <>
            <p>
              Retorna os detalhes e o status atual de um processo de assinatura. 
              Utilize este endpoint para verificar se todos os signatários já assinaram, acompanhar o andamento de cada parte e obter os metadados do processo.
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
            description: "Detalhes do processo retornados com sucesso.",
            example: `{
  "processId": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Contrato Comercial",
  "status": "in_progress",
  "createdAt": "2026-03-16T10:00:00Z",
  "signatories": [
    {
      "name": "Maria Oliveira",
      "email": "maria@exemplo.com",
      "status": "signed",
      "signedAt": "2026-03-16T11:45:00Z"
    },
    {
      "name": "João Silva",
      "email": "joao@empresa.com",
      "status": "pending"
    }
  ],
  "totalSignatories": 2,
  "signedCount": 1
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
            code: `curl -X GET https://sandbox.api.tecksign.com/api/processes/550e8400-e29b-41d4-a716-446655440000 \\
  -H "Authorization: Bearer YOUR_TOKEN_HERE"`
          },
          {
            language: "Node.js",
            code: `const processId = '550e8400-e29b-41d4-a716-446655440000';
const response = await fetch(\`https://sandbox.api.tecksign.com/api/processes/\${processId}\`, {
  headers: {
    'Authorization': 'Bearer YOUR_TOKEN_HERE'
  }
});

const data = await response.json();
console.log('Status do Processo:', data.status);`
          }
        ]}
      />
    </Layout>
  );
}
