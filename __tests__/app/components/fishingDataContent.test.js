import { render, screen } from '@testing-library/react'
import { describe, it, expect } from '@jest/globals'
import FishingDataContent from '@/app/components/fishingDataContent'
import '@testing-library/jest-dom'
import fishingDataJSON from '../../mockData/fishingData.json'

const data = fishingDataJSON

describe('FishingDataContent', () => {
  it('renders component', () => {
    render(<FishingDataContent data={data} />)

    const title = screen.getByText('Bait')

    expect(title).toBeInTheDocument()
  })
})
