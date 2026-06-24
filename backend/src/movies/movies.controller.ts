import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

// Configure multer local disk storage
const multerOptions = {
  storage: diskStorage({
    destination: './uploads',
    filename: (req: any, file: any, callback: any) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      callback(null, `movie-${uniqueSuffix}${extname(file.originalname)}`);
    },
  }),
  fileFilter: (req: any, file: any, callback: any) => {
    if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|webp)$/)) {
      return callback(new BadRequestException('Solo se permiten archivos de imagen.'), false);
    }
    callback(null, true);
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
};

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  async findAll(@Query('search') search?: string, @Query('genre') genre?: string) {
    return this.moviesService.findAll(search, genre);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.moviesService.getPublicMovieDetail(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @UseInterceptors(FileInterceptor('poster', multerOptions))
  async create(
    @Body() createMovieDto: CreateMovieDto,
    @UploadedFile() file: any,
  ) {
    if (!file) {
      throw new BadRequestException('El póster de la película es requerido.');
    }
    
    // Set the poster URL path
    createMovieDto.posterUrl = `/uploads/${file.filename}`;
    
    return this.moviesService.create(createMovieDto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @UseInterceptors(FileInterceptor('poster', multerOptions))
  async update(
    @Param('id') id: string,
    @Body() updateMovieDto: UpdateMovieDto,
    @UploadedFile() file?: any,
  ) {
    if (file) {
      updateMovieDto.posterUrl = `/uploads/${file.filename}`;
    }
    return this.moviesService.update(id, updateMovieDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async remove(@Param('id') id: string) {
    await this.moviesService.remove(id);
    return { message: 'Película eliminada correctamente.' };
  }
}
