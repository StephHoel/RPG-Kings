export type ActiveSaveState = {
  // Note: `activeSaveId` uses `undefined` to represent a missing value, not `null`.
  // This is a breaking change from previous versions that used `string | null`.
  // Consumers should check for `undefined` instead of `null`.
  activeSaveId: string | undefined
  isLoading: boolean
  error: unknown
}
