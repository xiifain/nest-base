import { Body, Post, Type, UsePipes } from '@nestjs/common';
import { Constructor } from './types';
import { BaseController } from './base.controller';
import { AbstractValidationPipe } from './abstract.validation.pipe';

export function Creatable<TBase extends Constructor<BaseController>, T>(
  Base: TBase,
  createDTO: Type<T>,
) {
  class _ extends Base {
    @Post('')
    @UsePipes(
      new AbstractValidationPipe({ transform: true }, { body: createDTO }),
    )
    async create(@Body() dto: typeof createDTO): Promise<any> {
      return this.service.create(dto);
    }
  }

  return _;
}
