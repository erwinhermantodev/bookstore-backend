import { Request, Response } from "express";
import { Book } from "../entities/Book";
import { BookRepository } from "../repositories/bookRepository";

const bookRepo = new BookRepository();

export const getBooks = async (req: Request, res: Response): Promise<void> => {
  try {
    const books: Book[] = await bookRepo.getAllBooks();
    res.json(books);
  } catch (error: any) {
    console.log("error");
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const getBookById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const book: Book | undefined = await bookRepo.getBookById(Number(id));
    if (!book) {
      res.status(404).json({ message: "Book not found" });
      return;
    }
    res.json(book);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createBook = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id, title, writer, cover_image, point, tags } = req.body;
  const newBook: Book = { id, title, writer, cover_image, point, tags };
  try {
    const createdBook: Book = await bookRepo.createBook(newBook);
    res.status(201).json(createdBook);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateBook = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { title, writer, cover_image, point, tags } = req.body;
  const updatedBook: Book = {
    id: Number(id),
    title,
    writer,
    cover_image,
    point,
    tags,
  };
  try {
    const result = await bookRepo.updateBook(updatedBook);
    if (result) {
      res.json(updatedBook);
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteBook = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const result = await bookRepo.deleteBook(Number(id));
    if (result) {
      res.json({ message: "Book deleted successfully" });
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
