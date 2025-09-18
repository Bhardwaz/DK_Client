import { describe, it, expect, vi } from 'vitest'

if (typeof global === 'undefined') {
  var global = globalThis;
}

global.fetch = vi.fn()

describe('API Calls', () => {
  it('fetches user data', async () => {
    const mockUser = { id: 1, name: 'John Doe' }
    
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockUser,
    })

    // Your actual API function here
    const fetchUser = async (id) => {
      const response = await fetch(`/api/users/${id}`)
      return response.json()
    }

    const user = await fetchUser(1)
    expect(user).toEqual(mockUser)
    expect(fetch).toHaveBeenCalledWith('/api/users/1')
  })
})