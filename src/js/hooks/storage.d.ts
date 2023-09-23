export function useLocalStorage<T>(key: string, defaultValue?:  T): [T | undefined, (value: T) => T | undefined]

export function useSessionStorage<T>(key: string, defaultValue?:  T): [T | undefined, (value: T) => T | undefined]
