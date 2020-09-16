import '@testing-library/jest-dom/extend-expect'

test('test common matcher', () => {
  expect(2 + 2).toBe(4)
  expect(2 + 2).not.toBe(5)
})
