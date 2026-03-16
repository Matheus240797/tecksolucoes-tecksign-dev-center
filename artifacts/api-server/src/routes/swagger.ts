import { Router, type IRouter } from "express";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import jsYaml from "js-yaml";

const __dirname = dirname(fileURLToPath(import.meta.url));

const router: IRouter = Router();

router.get("/swagger.json", (_req, res) => {
  try {
    const specPath = resolve(__dirname, "../../../../lib/api-spec/openapi.yaml");
    const yamlContent = readFileSync(specPath, "utf-8");
    const spec = jsYaml.load(yamlContent);
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.json(spec);
  } catch (err) {
    console.error("Failed to load OpenAPI spec:", err);
    res.status(500).json({ error: "Could not load OpenAPI spec" });
  }
});

export default router;
