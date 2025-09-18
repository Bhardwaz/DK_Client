import { describe, it, expect } from 'vitest'

// Example utility function to test
function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price, 0)
}

describe('Helper Functions', () => {
  it('calculates total correctly', () => {
    const items = [
      { price: 10 },
      { price: 20 },
      { price: 30 }
    ]
    expect(calculateTotal(items)).toBe(60)
  })

  it('handles empty array', () => {
    expect(calculateTotal([])).toBe(0)
  })
})