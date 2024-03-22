import "reflect-metadata";
import { DataSource } from "typeorm";
import { Book } from "./entities/Book";
import { Customer } from "./entities/Customer";
import { Order } from "./entities/Order";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5433,
  username: "postgres",
  password: "postgres",
  database: "bookstore_db",
  synchronize: true,
  logging: false,
  entities: [Book, Customer, Order],
  migrations: [],
  subscribers: [],
});
