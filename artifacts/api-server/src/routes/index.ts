import { Router, type IRouter } from "express";
import healthRouter from "./health";
import authRouter from "./auth";
import processesRouter from "./processes";
import swaggerRouter from "./swagger";

const router: IRouter = Router();

router.use(healthRouter);
router.use(authRouter);
router.use(processesRouter);
router.use(swaggerRouter);

export default router;
