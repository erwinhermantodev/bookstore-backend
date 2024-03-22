import { Pool } from "pg";
import { Customer } from "../entities/Customer";

const pool = new Pool({
  connectionString: "postgres://postgres:postgres@localhost:5433/bookstore_db",
});

export class CustomerRepository {
  async getAllCustomers(): Promise<Customer[]> {
    const client = await pool.connect();
    try {
      const result = await client.query("SELECT * FROM customer");
      return result.rows;
    } finally {
      client.release();
    }
  }

  async getCustomerById(id: number): Promise<Customer | undefined> {
    const client = await pool.connect();
    try {
      const result = await client.query(
        "SELECT * FROM customer WHERE id = $1",
        [id]
      );
      return result.rows[0];
    } finally {
      client.release();
    }
  }

  async createCustomer(newCustomer: Customer): Promise<Customer> {
    const client = await pool.connect();
    try {
      const { name, points } = newCustomer;
      const result = await client.query(
        "INSERT INTO customer (name, points) VALUES ($1, $2) RETURNING *",
        [name.toString(), points.toString()]
      );
      return result.rows[0];
    } finally {
      client.release();
    }
  }

  async updateCustomer(updatedCustomer: Customer): Promise<boolean> {
    const client = await pool.connect();
    try {
      const { id, name, points } = updatedCustomer;
      if (id === undefined) {
        throw new Error("Book ID is undefined");
      }
      const result = await client.query(
        "UPDATE customer SET name = $1, points = $2 WHERE id = $3",
        [name.toString(), points.toString(), id.toString()]
      );
      return result.rowCount !== null && result.rowCount > 0;
    } finally {
      client.release();
    }
  }

  async deleteCustomer(id: number): Promise<boolean> {
    const client = await pool.connect();
    try {
      const result = await client.query("DELETE FROM customer WHERE id = $1", [
        id,
      ]);
      return result.rowCount !== null && result.rowCount > 0;
    } finally {
      client.release();
    }
  }
}
