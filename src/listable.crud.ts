import {
  DefaultValuePipe,
  Get,
  ParseBoolPipe,
  ParseIntPipe,
  Query,
  Req,
} from '@nestjs/common';
import { Constructor } from './types';
import { BaseController } from './base.controller';
import { Request } from 'express';

export function Listable<TBase extends Constructor<BaseController>>(
  Base: TBase,
) {
  class _ extends Base {
    @Get()
    async findAll(
      @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
      @Query('limit', new DefaultValuePipe(20), ParseIntPipe)
      limit = 20,
      @Query('paginated', new DefaultValuePipe(true), ParseBoolPipe)
      paginated = true,
      @Req() req: Request,
    ): Promise<any[]> {
      if (!paginated) {
        return this.service.findAll({}, {});
      }
      return this.service.findAllPaginated(
        {},
        {},
        +page,
        +limit,
        `${req.protocol}://localhost:8000/auth${req.originalUrl}`,
      );
    }
  }

  return _;
}
