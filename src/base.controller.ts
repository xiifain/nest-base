import { IBaseService } from './interface.base.service';

export class BaseController {
  constructor(public service: IBaseService) {}
}
