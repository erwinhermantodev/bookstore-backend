import { Pool } from "pg";
import { Order } from "../entities/Order";

const pool = new Pool({
  connectionString:
    "postgres://postgres.idhksanzvgpvecyplzhw:0In8huQDbcnefH4r@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres",
});

export class OrderRepository {
  async getAllOrders(): Promise<Order[]> {
    const client = await pool.connect();
    try {
      const result = await client.query("SELECT * FROM order");
      return result.rows;
    } finally {
      client.release();
    }
  }

  async createOrder(customerId: number, bookId: number): Promise<Order> {
    const client = await pool.connect();
    try {
      const timestamp = new Date();
      const result = await client.query(
        "INSERT INTO orders (customer_id, book_id, timestamp) VALUES ($1, $2, $3) RETURNING *",
        [customerId.toString(), bookId.toString(), timestamp.toString()]
      );
      return result.rows[0];
    } finally {
      client.release();
    }
  }

  async cancelOrder(id: number): Promise<boolean> {
    const client = await pool.connect();
    try {
      const result = await client.query("DELETE FROM order WHERE id = $1", [
        id,
      ]);
      return result.rowCount !== null && result.rowCount > 0;
    } finally {
      client.release();
    }
  }
}
