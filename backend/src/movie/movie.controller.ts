import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt.guards';
import { MovieDocument } from './movie.schema';
import { MovieService } from './movie.service';

@Controller('movie')
export class MovieController {
  constructor(private movieService: MovieService) {}

  @Post()
  createMovie(
    @Body('title') title: string,
    @Body('year') year: number,
  ): Promise<MovieDocument> {
    return this.movieService.create(title, year);
  }

  @Get()
  findAllMovie(): Promise<MovieDocument[]> {
    return this.movieService.findAll();
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  findProduct(@Param('id') id: string): Promise<MovieDocument> {
    return this.movieService.find(id);
  }

  @Patch(':id')
  updateProduct(
    @Param('id') id: string,
    @Body('title') title: string,
    @Body('year') year: number,
  ): Promise<MovieDocument> {
    return this.movieService.update(id, title, year);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.movieService.delete(id);
  }
}
