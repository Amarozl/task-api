import { PrimaryGeneratedColumn, Entity, Column, JoinColumn, ManyToOne } from 'typeorm';
import { Category } from 'src/category/entities/category.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true }) // Permite que description seja opcional
  description?: string;

  @Column({ default: false })
  isCompleted: boolean;

  @Column({ nullable: true }) // Permite que dueDate seja opcional
  dueDate?: Date;

  // Relação Many-to-One com Category
  @ManyToOne(() => Category, (category) => category.tasks)
  @JoinColumn({ name: 'categoryId' }) // Define a coluna categoryId no banco
  category: Category;
}
