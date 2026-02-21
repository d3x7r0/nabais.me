export type MenuEntries = MenuEntry[]

export type MenuEntry = {
  entries?: MenuEntry[]
  label: string

  path: string
}
