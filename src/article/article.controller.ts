import { Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ArticleService } from './article.service';

@Controller('articles')
// @UseGuards()
export class ArticleController {
  constructor(
    private readonly articleService: ArticleService,
  ) {
  }

  @Post()
  // @UseGuards()
  async create() {
    return await this.articleService.createArticle()
  }

  @Get()
  async getQuery(
    @Query() query: any,
  ) {
    console.log('QUERY:', JSON.stringify(query, null, 4))
    return query
  }
}