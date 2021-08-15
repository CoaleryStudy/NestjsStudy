import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  UseFilters,
} from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat-dto';
import { ForbiddenException } from './forbidden.exception';
import { HttpExceptionFilter } from 'src/http-exception.filter';

@UseFilters(HttpExceptionFilter)
@Controller({ path: 'cats' })
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Array<Cat>> {
    return this.catsService.findAll();
  }

  @Get('exception')
  throwSomeException(): never {
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }

  @Get('customEx')
  throwSomeCustomException(): never {
    throw new HttpException(
      { status: HttpStatus.FORBIDDEN, error: 'This is a custom message' },
      HttpStatus.FORBIDDEN,
    );
  }

  @Get('customExClass')
  throwSomeCustomExceptionCalss(): never {
    throw new ForbiddenException();
  }
}
