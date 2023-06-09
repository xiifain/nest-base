import { Delete, Param, ParseIntPipe, Post } from '@nestjs/common';
import { BaseController } from './base.controller';
import { Constructor } from './types';

export function SoftDeleteRestorable<TBase extends Constructor<BaseController>>(
  Base: TBase,
) {
  class _ extends Base {
    @Delete(':id')
    async softDelete(@Param('id', ParseIntPipe) id: number): Promise<any> {
      return await this.service.softDelete(+id);
    }

    @Post('restore/:id')
    async restore(@Param('id', ParseIntPipe) id: number): Promise<any> {
      return await this.service.restore(+id);
    }
  }

  return _;
}
