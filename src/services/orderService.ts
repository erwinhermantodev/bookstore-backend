import { Request, Response } from "express";
import { Order } from "../entities/Order";
import { OrderRepository } from "../repositories/orderRepository";

const orderRepo = new OrderRepository();

export const getOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const orders: Order[] = await orderRepo.getAllOrders();
    res.json(orders);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { bookId } = req.body;
  // For simplicity, assume customerId is retrieved from authentication
  const customerId = 1; // Replace with actual customerId retrieval
  try {
    const createdOrder: Order = await orderRepo.createOrder(customerId, bookId);
    res.status(201).json(createdOrder);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const cancelOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const result = await orderRepo.cancelOrder(Number(id));
    if (result) {
      res.json({ message: "Order canceled successfully" });
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
