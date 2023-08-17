type Mods = Record<string, boolean | string>

function classNames(
  cls: string,
  mods?: Mods,
  additional?: string[]
): string {
  return [
    cls,
    ...additional,
    ...Object.keys(mods).filter((key) => mods[key] === true),
  ].join(' ')
}
export default classNames