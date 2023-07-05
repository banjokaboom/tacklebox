import { describe, it, expect } from '@jest/globals'
import '@testing-library/jest-dom'
import Regulations from '@/app/classes/Regulations'

describe('Regulations', () => {
  it('initializes with empty values', () => {
    const regulations = new Regulations()

    expect(regulations.freshwaterRegulations.length).toBe(0)
    expect(regulations.freshwaterRegulationsLink).toBe('')
    expect(regulations.saltwaterRegulations.length).toBe(0)
    expect(regulations.saltwaterRegulationsLink).toBe('')
  })
})
