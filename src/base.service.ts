import {
  DeepPartial,
  FindOptionsRelations,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { Deserialize, PaginatedDeserialize } from './decorator';
import { IBaseService } from './interface.base.service';
import { Deserializer } from './types';

export class BaseService<
  T extends { id: number | string },
  C extends DeepPartial<T> = T,
> implements IBaseService
{
  constructor(
    private readonly repository: Repository<T>,
    private readonly _: Deserializer,
  ) {}

  @PaginatedDeserialize
  async findAllPaginated(
    options: FindOptionsWhere<T>,
    relations: FindOptionsRelations<T>,
    page: number,
    limit: number,
    url?: string,
  ): Promise<any> {
    const [result, total] = await this.repository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      relations: relations,
      where: options,
    });
    return {
      data: result,
      previous:
        page > 1 ? `${url.replace(/page=[^&]+/, 'page=' + (page - 1))}` : null,
      next:
        (page - 1) * limit + result.length < total
          ? url.includes('page=')
            ? `${url.replace(/page=[^&]+/, 'page=' + (page + 1))}`
            : url.includes('/?')
            ? `${url}&page=${page + 1}`
            : `${url}?page=${page + 1}`
          : null,
    };
  }

  @Deserialize
  async findAll(
    options: FindOptionsWhere<T>,
    relations: FindOptionsRelations<T>,
  ): Promise<any[]> {
    return await this.repository.find({ where: options, relations: relations });
  }

  @Deserialize
  async find(id: number): Promise<DeepPartial<T>> {
    return await this.repository.findOneByOrFail({
      id,
    } as FindOptionsWhere<T>);
  }

  @Deserialize
  async create(dto: C): Promise<DeepPartial<T>> {
    return await this.repository.save(dto);
  }

  @Deserialize
  async update(id: number, dto: DeepPartial<T>): Promise<DeepPartial<T>> {
    return await this.repository.save({ ...dto, id } as DeepPartial<T>);
  }

  @Deserialize
  async softDelete(id: number): Promise<{ message: string }> {
    const result = await this.repository.softDelete(id);
    if (result) {
      return { message: 'Deleted successfully' };
    }
    throw new Error('Entity deletion failed');
  }

  @Deserialize
  async restore(id: number): Promise<{ message: string }> {
    const result = await this.repository.restore(id);
    if (result) {
      return { message: 'Recovered successfully' };
    }
    throw new Error('Entity recover failed');
  }

  @Deserialize
  async hardDelete(id: number): Promise<{ message: string }> {
    const result = await this.repository.delete(id);
    if (result) {
      return { message: 'Deleted successfully' };
    }
    throw new Error('Entity deletion failed');
  }
}
