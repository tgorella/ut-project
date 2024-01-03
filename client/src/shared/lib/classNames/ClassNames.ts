export type Mods = Record<string, boolean | string | undefined>

function classNames(
    cls: string | undefined,
    mods: Mods = {},
    additional: Array<string | undefined> = []
): string {
    return [
        cls,
        ...additional.filter(Boolean),
        ...Object.keys(mods).filter((key) => mods[key] === true),
    ].join(' ')
}
export default classNames