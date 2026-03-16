import { Router, type IRouter } from "express";
import { AuthenticateBody, AuthenticateResponse } from "@workspace/api-zod";

const router: IRouter = Router();

router.post("/auth/token", (req, res) => {
  const parsed = AuthenticateBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({
      statusCode: 400,
      error: "Bad Request",
      message: "clientId e clientSecret são obrigatórios",
    });
    return;
  }

  const { clientId, clientSecret } = parsed.data;

  if (!clientId || !clientSecret) {
    res.status(401).json({
      statusCode: 401,
      error: "Unauthorized",
      message: "Credenciais inválidas",
    });
    return;
  }

  const payload = Buffer.from(
    JSON.stringify({ clientId, iat: Date.now(), exp: Date.now() + 3600000 })
  ).toString("base64");

  const mockToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${payload}.mock_signature`;

  const data = AuthenticateResponse.parse({
    accessToken: mockToken,
    tokenType: "Bearer",
    expiresIn: 3600,
  });

  res.json(data);
});

export default router;
