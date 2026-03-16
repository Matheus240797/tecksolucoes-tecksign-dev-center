import React from 'react';
import { Layout } from '@/components/Layout';
import { EndpointDoc } from '@/components/EndpointDoc';

export default function Authentication() {
  return (
    <Layout>
      <EndpointDoc 
        title="Gerar Token de Acesso"
        method="POST"
        path="/api/auth/token"
        description={
          <>
            <p className="mb-4">
              Obtém o token de acesso (JWT) para consumir os endpoints da plataforma Teck Sign.
              O token gerado tem validade de 1 hora.
            </p>
            <p>
              Você deve enviar as credenciais <code className="text-primary bg-primary/10 px-1">clientId</code> e <code className="text-primary bg-primary/10 px-1">clientSecret</code> no corpo da requisição. O token retornado deve ser incluído no header <code>Authorization: Bearer {`{token}`}</code> em todas as chamadas subsequentes.
            </p>
          </>
        }
        bodyParams={[
          {
            name: "clientId",
            type: "string",
            required: true,
            description: "ID do cliente fornecido pela equipe comercial da Teck Sign.",
            example: '"client_abc123"'
          },
          {
            name: "clientSecret",
            type: "string",
            required: true,
            description: "Chave secreta fornecida pela equipe comercial.",
            example: '"secret_xyz789"'
          }
        ]}
        responses={[
          {
            status: 200,
            description: "Token gerado com sucesso.",
            example: `{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR...",
  "tokenType": "Bearer",
  "expiresIn": 3600
}`
          },
          {
            status: 401,
            description: "Credenciais inválidas.",
            example: `{
  "statusCode": 401,
  "error": "Unauthorized",
  "message": "Credenciais inválidas"
}`
          }
        ]}
        examples={[
          {
            language: "cURL",
            code: `curl -X POST https://sandbox.api.tecksign.com/api/auth/token \\
  -H "Content-Type: application/json" \\
  -d '{
    "clientId": "client_abc123",
    "clientSecret": "secret_xyz789"
  }'`
          },
          {
            language: "Node.js",
            code: `const response = await fetch('https://sandbox.api.tecksign.com/api/auth/token', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    clientId: 'client_abc123',
    clientSecret: 'secret_xyz789'
  })
});

const data = await response.json();
console.log('Access Token:', data.accessToken);`
          },
          {
            language: "Python",
            code: `import requests

url = "https://sandbox.api.tecksign.com/api/auth/token"
payload = {
    "clientId": "client_abc123",
    "clientSecret": "secret_xyz789"
}

response = requests.post(url, json=payload)
data = response.json()

print(f"Access Token: {data['accessToken']}")`
          }
        ]}
      />
    </Layout>
  );
}
