import type { MenuEntries, MenuEntry } from '../../../types'
import { matchesRoute, matchesTree } from '../../../router/match'

type InternalMenuEntry = Omit<MenuEntry, 'entries'> & {
  matches: boolean
  matchesExact: boolean
  entries?: InternalMenuEntry[]
}

export function transformEntries(
  entries?: MenuEntries,
  pathname?: string,
  d = 0,
): InternalMenuEntry[] | undefined {
  if (d > 10) {
    throw new Error('Excessive depth in menu entries')
  }

  if (!entries) {
    return
  }

  return Object.values(entries).map(entry => {
    const mapped: InternalMenuEntry = {
      label: entry.label,
      path: entry.path,
      matches: matchesTree(entry.path, pathname),
      matchesExact: matchesRoute(entry.path, pathname),
    }

    if (entry.entries) {
      mapped.entries = transformEntries(entry.entries, pathname, d + 1)

      mapped.matches = mapped.matches ||
        (mapped.entries?.some(entry => entry.matches) ?? false)
    }

    return mapped
  })
}
