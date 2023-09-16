export const DEFAULT_GROUP = '__default__'

export function ensureGroup(group?: string) {
  return group || DEFAULT_GROUP
}

let COUNTER = 0

export function ensureID(id?: string) {
  return id || `lightbox_entry_${COUNTER++}`
}
