export type MenuEntries = Record<string, MenuEntry>

export type MenuEntry = {
  path: string
  label: string

  entries?: MenuEntries
}
