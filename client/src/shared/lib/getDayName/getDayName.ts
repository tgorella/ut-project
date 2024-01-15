export function getDayName (date: string) {
    const daysNames = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб']
    
    const index = new Date(date).getDay()
    return daysNames[index]
}