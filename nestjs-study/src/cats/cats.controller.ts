import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Query,
  ParseIntPipe,
  Post,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { ForbiddenException } from './forbidden.exception';
import { HttpExceptionFilter } from 'src/http-exception.filter';
import { ValidationPipe } from 'src/validation.pipe';
import { RolesGuard } from 'src/roles.guard';
import { Roles } from 'src/roles.decorator';
import { LoggingInterceptor } from 'src/logging.interceptor';
import { TransformIntercepter } from 'src/transform.intercepter';

@Controller({ path: 'cats' })
@UseFilters(HttpExceptionFilter)
@UseGuards(RolesGuard)
@UseInterceptors(LoggingInterceptor, TransformIntercepter)
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  @Roles('admin')
  async create(@Body(new ValidationPipe()) createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Array<Cat>> {
    return this.catsService.findAll();
  }

  @Get('hello')
  test(@Query('id', new DefaultValuePipe(0), new ParseIntPipe()) id: number) {
    return { hi: 'hello', id };
  }

  @Get(':id')
  async findOne(@Param('id', new ParseIntPipe()) id: number): Promise<Cat> {
    return this.catsService.findOne(id);
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
