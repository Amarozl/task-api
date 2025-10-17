import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { Task } from 'src/task/entities/task.entity'; // Importe a entidade Task

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @IsNotEmpty()
  @Column()
  description: string;

  // Relação inversa (opcional): uma categoria pode ter várias tarefas
  @OneToMany(() => Task, (task) => task.category)
  tasks: Task[];
}
