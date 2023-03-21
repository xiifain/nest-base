import { FindOptionsRelations, FindOptionsWhere } from 'typeorm';

export interface IBaseService {
  findAllPaginated(
    options: FindOptionsWhere<any>,
    relations: FindOptionsRelations<any>,
    page: number,
    limit: number,
    url?: string,
  ): Promise<any>;
  findAll(
    options: FindOptionsWhere<any>,
    relations: FindOptionsRelations<any>,
  ): Promise<any[]>;
  find(id: number);
  create(dto: any): Promise<any>;
  update(id: number, dto: any): Promise<any>;
  softDelete(id: number): Promise<any>;
  restore(id: number): Promise<any>;
  hardDelete(id: number): Promise<any>;
}
