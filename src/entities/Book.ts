import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  writer!: string;

  @Column()
  cover_image!: string;

  @Column()
  point!: number;

  @Column("simple-array")
  tags!: string[];
}
