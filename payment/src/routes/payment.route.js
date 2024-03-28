import { Router } from "express";
import {
  createPaymentController,
  generatePayController,
} from "../controllers/index.js";

const router = Router();

router.route("/").post(createPaymentController);

router.route("/pay").post(generatePayController);

export default router;
