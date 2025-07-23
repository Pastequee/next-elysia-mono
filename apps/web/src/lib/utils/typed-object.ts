export function typedObjectEntries<T extends object>(
  obj: T
): [keyof T, T[keyof T]][] {
  return Object.entries(obj) as [keyof T, T[keyof T]][]
}

export function typedObjectKeys<T extends object>(obj: T): (keyof T)[] {
  return Object.keys(obj) as (keyof T)[]
}

export function typedObjectValues<T extends object>(obj: T): T[keyof T][] {
  return Object.values(obj) as T[keyof T][]
}
