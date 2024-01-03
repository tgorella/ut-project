export const transformDate = (date: string | number) => {
    const result = new Date(Number(date)).toISOString().split('T')[0].split('-').reverse().join('.')
    return result
}