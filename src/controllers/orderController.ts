import express from "express";
import { getOrders, createOrder, cancelOrder } from "../services/orderService";

const router = express.Router();

router.get("/", getOrders);
router.post("/", createOrder);
router.delete("/:id", cancelOrder);

export default router;
