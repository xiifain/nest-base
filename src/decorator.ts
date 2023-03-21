import { plainToClassFromExist, plainToInstance } from 'class-transformer';
import { IPaginated } from './types';

export function Deserialize(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor,
) {
  const original = descriptor.value;
  if (typeof original == 'function') {
    descriptor.value = async function (...args) {
      const result = await original.apply(this, args);
      if (this._[propertyKey]) {
        return plainToInstance(this._[propertyKey], result);
      }
      return result;
    };
  }
  return descriptor;
}

export function PaginatedDeserialize(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor,
) {
  const original = descriptor.value;
  if (typeof original == 'function') {
    descriptor.value = async function (...args) {
      const result = await original.apply(this, args);
      const type = this._.findAll;
      return plainToClassFromExist(
        new IPaginated<typeof type>(type as () => void),
        result,
      );
    };
  }
  return descriptor;
}
