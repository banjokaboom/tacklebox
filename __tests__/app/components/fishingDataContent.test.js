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

    const title = screen.getByText('Basic Fishing Info')

    expect(title).toBeInTheDocument()
  })

  it('opens tip modals when clicked', async () => {
    const user = userEvent.setup()

    render(<FishingDataContent data={data} />)

    const tipButton = await screen.findAllByTitle(
      'Click to learn how to use this'
    )

    user.click(tipButton[0])

    const modalTitle = await screen.findByLabelText('Tackle Modal')

    expect(modalTitle).toBeInTheDocument()
  })

  it('closes tip modal when clicking close button', async () => {
    const user = userEvent.setup()

    render(<FishingDataContent data={data} />)

    const tipButton = await screen.findAllByTitle(
      'Click to learn how to use this'
    )

    user.click(tipButton[0])

    const modalTitle = await screen.findByLabelText('Tackle Modal')

    expect(modalTitle).toBeInTheDocument()

    const closeButton = screen.getByText('Close')

    await user.click(closeButton)

    expect(modalTitle).not.toBeInTheDocument()
  })

  it('all tip modals open and close', async () => {
    const user = userEvent.setup()

    render(<FishingDataContent data={data} />)

    const tipButtons = await screen.findAllByTitle(
      'Click to learn how to use this'
    )

    for (let buttonCount = 0; buttonCount < tipButtons.length; buttonCount++) {
      user.click(tipButtons[buttonCount])

      const modalTitle = await screen.findByLabelText('Tackle Modal')

      expect(modalTitle).toBeInTheDocument()

      const closeButton = screen.getByText('Close')

      await user.click(closeButton)

      expect(modalTitle).not.toBeInTheDocument()
    }
  })
})
