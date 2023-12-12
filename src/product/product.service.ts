import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private readonly productRepository: Repository<Product>
  ) {}

  // Create a new Product
  async create(createProductDto: CreateProductDto): Promise<Product> {
    return this.productRepository.save(createProductDto);
  }

  // Find all 
  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  // Find One
  async findOne(id: number): Promise<Product> {
    return this.productRepository.findOne({where: {id: id}});
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<any> {
    return this.productRepository.update(id, updateProductDto);
  }

  async remove(id: number): Promise<any> {
    return this.productRepository.delete(id);
  }
}
