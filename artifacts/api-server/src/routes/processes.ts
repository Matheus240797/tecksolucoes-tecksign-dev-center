import { Router, type IRouter, type Request, type Response, type NextFunction } from "express";
import {
  CreateProcessBody,
  GetProcessParams,
  GetProcessResponse,
  GetProcessDocumentsParams,
  GetProcessDocumentsResponse,
} from "@workspace/api-zod";
import { randomUUID } from "crypto";

const router: IRouter = Router();

function authenticate(req: Request, res: Response, next: NextFunction) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer ")) {
    res.status(401).json({
      statusCode: 401,
      error: "Unauthorized",
      message: "Token de acesso não fornecido. Use Authorization: Bearer {token}",
    });
    return;
  }
  next();
}

const processStore: Map<string, {
  processId: string;
  title: string;
  status: string;
  createdAt: string;
  expiresAt?: string;
  signatories: Array<{ name: string; email: string; status: string; signedAt?: string }>;
}> = new Map();

router.post("/processes", authenticate, (req, res) => {
  const parsed = CreateProcessBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({
      statusCode: 400,
      error: "Bad Request",
      message: "Dados inválidos: " + parsed.error.issues.map((i) => i.message).join(", "),
    });
    return;
  }

  const { title, signatories, expiresAt } = parsed.data;
  const processId = randomUUID();
  const createdAt = new Date().toISOString();

  const process = {
    processId,
    title,
    status: "pending",
    createdAt,
    expiresAt: expiresAt ? new Date(expiresAt).toISOString() : undefined,
    signatories: signatories.map((s) => ({
      name: s.name,
      email: s.email,
      status: "pending" as const,
    })),
  };

  processStore.set(processId, process);

  res.status(201).json({
    processId,
    status: "pending",
    createdAt,
    signingUrl: `https://app.tecksign.com/process/${processId}`,
  });
});

router.get("/processes/:processId", authenticate, (req, res) => {
  const params = GetProcessParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ statusCode: 400, error: "Bad Request", message: "processId inválido" });
    return;
  }

  const { processId } = params.data;
  const process = processStore.get(processId);

  if (!process) {
    res.status(404).json({
      statusCode: 404,
      error: "Not Found",
      message: "Processo não encontrado",
    });
    return;
  }

  const data = GetProcessResponse.parse({
    processId: process.processId,
    title: process.title,
    status: process.status,
    createdAt: process.createdAt,
    expiresAt: process.expiresAt,
    signatories: process.signatories,
    totalSignatories: process.signatories.length,
    signedCount: process.signatories.filter((s) => s.status === "signed").length,
  });

  res.json(data);
});

router.get("/processes/:processId/documents", authenticate, (req, res) => {
  const params = GetProcessDocumentsParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ statusCode: 400, error: "Bad Request", message: "processId inválido" });
    return;
  }

  const { processId } = params.data;
  const process = processStore.get(processId);

  if (!process) {
    res.status(404).json({
      statusCode: 404,
      error: "Not Found",
      message: "Processo não encontrado",
    });
    return;
  }

  const data = GetProcessDocumentsResponse.parse({
    processId,
    documents: [
      {
        documentId: randomUUID(),
        name: `${process.title.toLowerCase().replace(/\s+/g, "-")}.pdf`,
        type: "original",
        downloadUrl: `https://storage.tecksign.com/documents/${processId}/original.pdf`,
        sizeBytes: 204800,
        createdAt: process.createdAt,
      },
    ],
  });

  res.json(data);
});

export default router;
