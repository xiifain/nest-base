import { ClassConstructor, Exclude, Type } from 'class-transformer';

export type Constructor<T> = new (...args: any[]) => T;

export interface Deserializer {
  findAll?: ClassConstructor<any> | ClassConstructor<IPaginated<any>> | false;
  find?: ClassConstructor<any> | false;
  create?: ClassConstructor<any> | false;
  update?: ClassConstructor<any> | false;
  delete?: ClassConstructor<any> | false;
}

export class IPaginated<T> {
  @Exclude()
  private type: () => void;

  @Type((options) => {
    return (options.newObject as IPaginated<T>).type;
  })
  data: T[];
  previous: string | null;
  next: string | null;

  constructor(type: () => void) {
    this.type = type;
  }
}
