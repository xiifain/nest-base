import { Delete, Param, ParseIntPipe } from '@nestjs/common';
import { Constructor } from './types';
import { BaseController } from './base.controller';

export function Deletable<TBase extends Constructor<BaseController>>(
  Base: TBase,
) {
  class _ extends Base {
    @Delete('hard/:id')
    async softDelete(@Param('id', ParseIntPipe) id: number): Promise<any> {
      return await this.service.hardDelete(+id);
    }
  }

  return _;
}
