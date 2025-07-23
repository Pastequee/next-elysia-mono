export const todosQueryKeys = {
  all: ['todos'] as const,
  item: (id: string) => [...todosQueryKeys.all, id] as const,
  list: () => [...todosQueryKeys.all, 'list'] as const,
}
