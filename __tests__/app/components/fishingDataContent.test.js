import { render, screen } from '@testing-library/react'
import { describe, it, expect } from '@jest/globals'
import FishingDataContent from '@/app/components/fishingDataContent'
import '@testing-library/jest-dom'
import fishingDataJSON from '../../mockData/fishingData.json'
import userEvent from '@testing-library/user-event'

const data = fishingDataJSON

describe('FishingDataContent', () => {
  it('renders component', () => {
    render(<FishingDataContent data={data} />)

    const title = screen.getByText('Fish and Bait')

    expect(title).toBeInTheDocument()
  })
})
