import { Delete, Param, ParseIntPipe } from '@nestjs/common';
import { BaseController } from './base.controller';
import { Constructor } from './types';

export function Deletable<TBase extends Constructor<BaseController>>(
  Base: TBase,
) {
  class _ extends Base {
    @Delete('hard/:id')
    async hardDelete(@Param('id', ParseIntPipe) id: number): Promise<any> {
      return await this.service.hardDelete(+id);
    }
  }

  return _;
}
