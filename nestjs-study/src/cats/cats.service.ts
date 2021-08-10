import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';

@Injectable()
export class CatsService {
  private readonly cats: Array<Cat> = [];

  create(cat: Cat): void {
    this.cats.push(cat);
  }

  findAll(): Array<Cat> {
    return this.cats;
  }
}
