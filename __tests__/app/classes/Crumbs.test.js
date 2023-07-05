import { describe, it, expect } from '@jest/globals'
import '@testing-library/jest-dom'
import Crumbs from '@/app/classes/Crumbs'

describe('Crumbs', () => {
  it('initializes with empty values', () => {
    const crumbs = new Crumbs()

    expect(crumbs.links.length).toBe(0)
  })
})
