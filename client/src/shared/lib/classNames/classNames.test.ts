import classNames from './ClassNames'

describe('classNames', () => {
    test('with only first param', () => {
        expect(classNames('someClass')).toBe('someClass')
    }),
    test('with additional classes', () => {
        expect(classNames('someClass', {}, ['class1', 'class2'])).toBe('someClass class1 class2')
    }),
    test('with mods', () => {
        const expected = 'someClass class1 class2 hovered selected'
        expect(classNames('someClass', {'hovered': true, 'selected': true}, ['class1', 'class2'])).toBe(expected)
    }),

    test('with mods false', () => {
        const expected = 'someClass class1 class2 selected'
        expect(classNames('someClass', {'hovered': false, 'selected': true}, ['class1', 'class2'])).toBe(expected)
    }),
    test('with mods undefined', () => {
        const expected = 'someClass class1 class2 hovered'
        expect(classNames('someClass', {'hovered': true, 'selected': undefined}, ['class1', 'class2'])).toBe(expected)
    })
})