export const useQueryKeys = {
  saveActive: () => ['saves', 'active'] as const,
  saveId: (id: string) => ['save', id] as const,
}

// export type UseQueryKeys = typeof useQueryKeys
