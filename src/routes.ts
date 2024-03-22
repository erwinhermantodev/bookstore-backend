import express from "express";
import bookRoutes from "./controllers/bookController";
import orderRoutes from "./controllers/orderController";
import customerRoutes from "./controllers/customerController";

const router = express.Router();

router.use("/books", bookRoutes);
router.use("/orders", orderRoutes);
router.use("/customers", customerRoutes);

export default router;
