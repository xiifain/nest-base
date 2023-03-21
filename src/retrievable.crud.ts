import { Get, Param, ParseIntPipe } from '@nestjs/common';
import { Constructor } from './types';
import { BaseController } from './base.controller';

export function Retrievable<TBase extends Constructor<BaseController>>(
  Base: TBase,
) {
  class _ extends Base {
    @Get(':id')
    async find(@Param('id', ParseIntPipe) id: number): Promise<any> {
      return await this.service.find(+id);
    }
  }

  return _;
}
