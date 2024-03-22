import { Request, Response } from "express";
import { Customer } from "../entities/Customer";
import { CustomerRepository } from "../repositories/customerRepository";

const customerRepo = new CustomerRepository();

export const getCustomers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const customers: Customer[] = await customerRepo.getAllCustomers();
    res.json(customers);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getCustomerById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const customer: Customer | undefined = await customerRepo.getCustomerById(
      Number(id)
    );
    if (!customer) {
      res.status(404).json({ message: "Customer not found" });
      return;
    }
    res.json(customer);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createCustomer = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id, name } = req.body;
  const newCustomer: Customer = {
    id,
    name,
    points: 100,
  }; // Initial points for new customer
  try {
    const createdCustomer: Customer = await customerRepo.createCustomer(
      newCustomer
    );
    res.status(201).json(createdCustomer);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCustomer = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { name, points } = req.body;
  const updatedCustomer: Customer = { id: Number(id), name, points };
  try {
    const result = await customerRepo.updateCustomer(updatedCustomer);
    if (result) {
      res.json(updatedCustomer);
    } else {
      res.status(404).json({ message: "Customer not found" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCustomer = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const result = await customerRepo.deleteCustomer(Number(id));
    if (result) {
      res.json({ message: "Customer deleted successfully" });
    } else {
      res.status(404).json({ message: "Customer not found" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
