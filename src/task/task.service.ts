import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { Category } from '../category/entities/category.entity';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    const category = await this.categoryRepository.findOne({
      where: { id: createTaskDto.categoryId },
    });
    if (!category) {
      throw new NotFoundException(
        `Category with ID ${createTaskDto.categoryId} not found`,
      );
    }

    const task = new Task();
    task.title = createTaskDto.title;
    task.description = createTaskDto.description;
    task.dueDate = createTaskDto.dueDate;
    task.category = category;

    return this.taskRepository.save(task);
  }

  async findAll() {
    return this.taskRepository.find({ relations: ['category'] });
  }

  async findOne(id: number) {
    const task = await this.taskRepository.findOne({
      where: { id },
      relations: ['category'],
    });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  async markAsCompleted(id: number, updateTaskDto) {
    const task = await this.taskRepository.findOne({
      where: { id },
      relations: ['category'],
    });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    task.isCompleted = updateTaskDto.isCompleted;
    return this.taskRepository.save(task);
  }

  async remove(id: number) {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    await this.taskRepository.remove(task);
  }

  async findByCategory(categoryId: number) {
    const category = await this.categoryRepository.findOne({
      where: { id: categoryId },
    });
    if (!category) {
      throw new NotFoundException(`Category with ID ${categoryId} not found`);
    }

    return this.taskRepository.find({
      where: { category: { id: categoryId } },
      relations: ['category'],
    });
  }
}
