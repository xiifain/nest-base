import {
  Body,
  Param,
  ParseIntPipe,
  Patch,
  Type,
  UsePipes,
} from '@nestjs/common';
import { Constructor } from './types';
import { BaseController } from './base.controller';
import { AbstractValidationPipe } from './abstract.validation.pipe';

export function Updatable<TBase extends Constructor<BaseController>, T>(
  Base: TBase,
  updateDTO: Type<T>,
) {
  class _ extends Base {
    @Patch(':id')
    @UsePipes(
      new AbstractValidationPipe({ transform: true }, { body: updateDTO }),
    )
    async update(
      @Param('id', ParseIntPipe) id: number,
      @Body() dto: typeof updateDTO,
    ): Promise<any> {
      return this.service.update(+id, dto);
    }
  }

  return _;
}
