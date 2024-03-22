import { Pool } from "pg";
import { Book } from "../entities/Book";
import { AppDataSource } from "../data-source";
import { Repository } from "typeorm";

const pool = new Pool({
  connectionString: "postgres://postgres:postgres@localhost:5433/bookstore_db",
});

export class BookRepository {
  async getAllBooks(): Promise<Book[]> {
    const client = await pool.connect();
    try {
      const result = await client.query("SELECT * FROM book");
      return result.rows;
    } finally {
      client.release();
    }
  }

  async getBookById(id: number): Promise<Book | undefined> {
    const client = await pool.connect();
    try {
      const result = await client.query("SELECT * FROM book WHERE id = $1", [
        id,
      ]);
      return result.rows[0];
    } finally {
      client.release();
    }
  }

  async createBook(newBook: Book): Promise<Book> {
    const client = await pool.connect();
    try {
      const { title, writer, cover_image, point, tags } = newBook;
      const imageUrl = cover_image.toString(); // Ensure cover_image is a string
      const result = await client.query(
        "INSERT INTO book (title, writer, cover_image, point, tags) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [
          title.toString(),
          writer.toString(),
          imageUrl,
          point.toString(),
          tags.toString(),
        ]
      );
      return result.rows[0];
    } finally {
      client.release();
    }
  }

  async updateBook(updatedBook: Book): Promise<boolean> {
    const client = await pool.connect();
    try {
      const { id, title, writer, cover_image, point, tags } = updatedBook;
      if (id === undefined) {
        throw new Error("Book ID is undefined");
      }
      const imageUrl = cover_image.toString(); // Ensure cover_image is a string
      const result = await client.query(
        "UPDATE book SET title = $1, writer = $2, cover_image = $3, point = $4, tags = $5 WHERE id = $6",
        [
          title.toString(),
          writer.toString(),
          imageUrl,
          point.toString(),
          tags.toString(),
          id.toString(),
        ]
      );
      return result.rowCount !== null && result.rowCount > 0; // Perform null check on result.rowCount
    } finally {
      client.release();
    }
  }

  async deleteBook(id: number): Promise<boolean> {
    const client = await pool.connect();
    try {
      const result = await client.query("DELETE FROM book WHERE id = $1", [id]);
      return result.rowCount !== null && result.rowCount > 0;
    } finally {
      client.release();
    }
  }
}

const getBookRepository = (): Repository<Book> => {
  return AppDataSource.getRepository(Book);
};
