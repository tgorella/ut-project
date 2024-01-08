export const transformDate = (date: string ) => {
    if (date) {
        const result = date.split('T')[0].split('-').reverse().join('.')
        return result
    }
    return ''
}