import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Inject } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ClientProxy } from '@nestjs/microservices';

@Controller('products')
export class ProductController {
  constructor(
    private productService: ProductService,
    @Inject('PRODUCT_SERVICE') private readonly client: ClientProxy
  ) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    const product = await this.productService.create(createProductDto);

    this.client.emit('product_created', product)
    return product
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    await this.productService.update(+id, updateProductDto);
    const product = await this.productService.findOne(+id)

    this.client.emit('product_updated', product)
    return product
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.productService.remove(+id);

    this.client.emit('product_deleted', id)
  }

  @Post('/:id/like')
  async like(@Param('id') id: number) {
    const product = await this.productService.findOne(id)
    const data = {
      likes: product.likes+1
    }

    return this.productService.update(id, data)
  }
}
