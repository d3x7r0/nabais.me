export type MenuEntries = Record<string, MenuEntry>

export type MenuEntry = {
  entries?: MenuEntries
  label: string

  path: string
}
