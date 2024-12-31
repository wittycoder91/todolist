import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { CoreEntity } from "./core.entity";

@Entity("todolist")
export class TodolistEntity extends CoreEntity {
  @PrimaryGeneratedColumn("uuid")
  uuid;
  @Column({ type: "varchar", nullable: true })
  title;
  @Column({ type: "varchar", nullable: false })
  description;
  @Column({ type: "boolean", nullable: false })
  status;
  @Column({ type: "datetime", nullable: false })
  date;
}
