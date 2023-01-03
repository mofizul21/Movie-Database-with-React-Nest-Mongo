import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MovieDocument } from './movie.schema';

@Injectable()
export class MovieService {
  constructor(
    @InjectModel('Movie')
    private readonly movieModel: Model<MovieDocument>,
  ) {}

  async create(title: string, year: number): Promise<MovieDocument> {
    const newMovie = new this.movieModel({ title, year });
    return newMovie.save();
  }

  async findAll(): Promise<MovieDocument[]> {
    return this.movieModel.find().exec();
  }

  async find(id: string): Promise<MovieDocument> {
    return this.movieModel.findById(id).exec();
  }

  async update(
    id: string,
    newTitle: string,
    newYear: number,
  ): Promise<MovieDocument> {
    const existingMovie = await this.find(id);

    if (!existingMovie) {
      throw new NotFoundException(`Movie with the id ${id} not found!`);
    }

    existingMovie.title = newTitle ?? existingMovie.title;
    existingMovie.year = newYear ?? existingMovie.year;

    return existingMovie.save();
  }

  async delete(id: string) {
    return this.movieModel.deleteOne({ _id: id }).exec();
  }
}
