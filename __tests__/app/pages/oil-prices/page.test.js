import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, screen, fireEvent } from '@testing-library/react'
import {
  describe,
  it,
  expect,
  beforeAll,
  afterAll,
  afterEach,
} from '@jest/globals'
import OilPrices from '@/app/home-maintenance/oil-prices/page'
import '@testing-library/jest-dom'

const server = setupServer(
  rest.get('/api/oilprices', (req, res, ctx) => {
    return res(
      ctx.json({
        price: '2.50',
        company: 'test',
        url: null,
        allOilPrices: [
          /* cspell:disable */
          {
            price: '2.849',
            company: 'VALUE OIL INC',
            url: 'https://www.newenglandoil.com/massachusetts/click.asp?x=https://getvalueoil.com/&y=10&z=63&a=MA1',
          },
          {
            price: '2.950',
            company: 'SHERMAN OIL',
            url: 'https://www.newenglandoil.com/massachusetts/click.asp?x=http://www.shermanoil.com&y=10&z=54&a=MA1',
          },
          {
            price: '2.990',
            company: 'THE HEATING OIL LADY',
            url: 'https://www.newenglandoil.com/massachusetts/click.asp?x=http://theoilladyhho.com&y=10&z=49&a=MA1',
          },
          {
            price: '2.990',
            company: 'FAIAS OIL',
            url: 'phones.asp?zone=10&ID=77',
          },
          {
            price: '2.999',
            company: 'MIDNIGHT OIL SERVICE',
            url: 'https://www.newenglandoil.com/massachusetts/click.asp?x=http://www.midnightoilservice.com&y=10&z=62&a=MA1',
          },
          {
            price: '2.999',
            company: 'PIONEER VALLEY OIL & PROPANE',
            url: 'https://www.newenglandoil.com/massachusetts/click.asp?x=http://www.pioneervalleyoil.com&y=10&z=78&a=MA1',
          },
          {
            price: '2.999',
            company: 'OIL4LESS & PROPANE',
            url: 'https://www.newenglandoil.com/massachusetts/click.asp?x=https://oil4less.us&y=10&z=79&a=MA1',
          },
          {
            price: '3.000',
            company: 'AMERICAN DISCOUNT OIL & PROPANE',
            url: 'https://www.newenglandoil.com/massachusetts/click.asp?x=http://www.americandiscountoil.com&y=10&z=58&a=MA1',
          },
          {
            price: '3.030',
            company: 'NYDAM OIL SVC',
            url: 'phones.asp?zone=10&ID=20&a=MA1',
          },
          {
            price: '3.040',
            company: 'CHARLTON OIL & PROPANE',
            url: 'https://www.newenglandoil.com/massachusetts/click.asp?x=http://www.charltonoil.com&y=10&z=7&a=MA1',
          },
          {
            price: '3.040',
            company: 'LEBLANC OIL LLC',
            url: 'https://www.newenglandoil.com/massachusetts/click.asp?x=https://www.leblancoil.org&y=10&z=8&a=MA1',
          },
          {
            price: '3.050',
            company: 'SOUTHBRIDGE TIRE CO',
            url: 'https://www.newenglandoil.com/massachusetts/click.asp?x=http://www.southbridgetire.com&y=10&z=38&a=MA1',
          },
          {
            price: '3.050',
            company: 'LMT Oil, Inc.',
            url: 'https://www.newenglandoil.com/massachusetts/click.asp?x=https://www.lmtoil.com&y=10&z=40&a=MA1',
          },
          {
            price: '3.050',
            company: 'CAMS OIL SERVICE',
            url: 'phones.asp?zone=10&ID=57',
          },
          {
            price: '3.090',
            company: 'BLACKSTONE VALLEY OIL',
            url: 'https://www.newenglandoil.com/massachusetts/click.asp?x=http://www.blackstonevalleyoil.com&y=10&z=30&a=MA1',
          },
          {
            price: '3.090',
            company: 'OLD MAN OIL',
            url: 'https://www.newenglandoil.com/massachusetts/click.asp?x=https://www.OldManOil.net&y=10&z=32&a=MA1',
          },
          {
            price: '3.090',
            company: 'PATRIOT LIQUID ENERGY',
            url: 'https://www.newenglandoil.com/massachusetts/click.asp?x=http://www.patriotliquidenergy.com&y=10&z=44&a=MA1',
          },
          {
            price: '3.090',
            company: 'LAVOIE ENERGY SERVICES',
            url: 'https://www.newenglandoil.com/massachusetts/click.asp?x=https://lavoieheatingservice.com&y=10&z=51&a=MA1',
          },
          {
            price: '3.099',
            company: 'HARRIS OIL CO',
            url: 'phones.asp?zone=10&ID=22',
          },
          {
            price: '3.099',
            company: 'ALS OIL SERVICE',
            url: 'https://www.newenglandoil.com/massachusetts/click.asp?x=https://www.alsoilservice.com&y=10&z=34&a=MA1',
          },
          {
            price: '3.099',
            company: 'RADIO OIL CO',
            url: 'https://www.newenglandoil.com/massachusetts/click.asp?x=http://www.radiooil.com&y=10&z=61&a=MA1',
          },
          {
            price: '3.100',
            company: 'RED STAR OIL CO.',
            url: 'phones.asp?zone=10&ID=13',
          },
          {
            price: '3.140',
            company: 'PETERSON OIL SVC',
            url: 'https://www.newenglandoil.com/massachusetts/click.asp?x=http://www.petersonoil.com&y=10&z=21&a=MA1',
          },
          {
            price: '3.159',
            company: 'CONGERS HEATING & COOLING',
            url: 'https://www.newenglandoil.com/massachusetts/click.asp?x=http://www.congersheatingandcooling.com&y=10&z=75&a=MA1',
          },
          {
            price: '3.180',
            company: 'M.J. MEEHAN EXCAVATING',
            url: 'https://www.newenglandoil.com/massachusetts/click.asp?x=http://www.orderyouroil.com&y=10&z=76&a=MA1',
          },
          {
            price: '3.199',
            company: 'KENS OIL & HEATING INC',
            url: 'https://www.newenglandoil.com/massachusetts/click.asp?x=https://www.kensoilandheating.com&y=10&z=23&a=MA1',
          },
          {
            price: '3.199',
            company: 'JUST OIL INC',
            url: 'https://www.newenglandoil.com/massachusetts/click.asp?x=http://www.just-oil.com&y=10&z=37&a=MA1',
          },
          {
            price: '3.200',
            company: 'ENDICOTT OIL SERVICE',
            url: 'phones.asp?zone=10&ID=36',
          },
          {
            price: '3.290',
            company: 'NALA INDUSTRIES INC',
            url: 'https://www.newenglandoil.com/massachusetts/click.asp?x=https://nalaindustries.com&y=10&z=26&a=MA1',
          },
          {
            price: '3.390',
            company: 'GLOW OIL',
            url: 'https://www.newenglandoil.com/massachusetts/click.asp?x=http://www.glowoil.com&y=10&z=46&a=MA1',
          },
          {
            price: '3.400',
            company: 'UNIVERSAL OIL COMPANY',
            url: 'https://www.newenglandoil.com/massachusetts/click.asp?x=http://www.univoil.com&y=10&z=48&a=MA1',
          },
          {
            price: '4.290',
            company: 'NORTHERN ENERGY LLC',
            url: 'phones.asp?zone=10&ID=50',
          },
          /* cspell:enable */
        ],
      })
    )
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('OilPrices', () => {
  it('renders a heading', () => {
    render(<OilPrices />)

    const heading = screen.getByRole('heading', {
      name: /Heating Oil Prices/i,
    })

    expect(heading).toBeInTheDocument()
  })

  it('renders when loading MA zone 1', async () => {
    render(<OilPrices />)

    const stateLabel = await screen.findByText('State')
    expect(stateLabel).toBeInTheDocument()

    const stateCombobox = await screen.findByRole('combobox')
    fireEvent.change(stateCombobox, {
      target: { value: 'massachusetts' },
    })

    const zoneLabel = await screen.findByText('Zone')
    expect(zoneLabel).toBeInTheDocument()

    const comboboxes = await screen.findAllByRole('combobox')
    fireEvent.change(comboboxes[1], {
      target: { value: '1' },
    })

    const message = await screen.findByText(
      'Successfully loaded oil prices for zone: 1'
    )

    expect(message).toBeInTheDocument()
  })

  it('renders when loading RI zone 1', async () => {
    render(<OilPrices />)

    const stateLabel = await screen.findByText('State')
    expect(stateLabel).toBeInTheDocument()

    const stateCombobox = await screen.findByRole('combobox')
    fireEvent.change(stateCombobox, {
      target: { value: 'rhodeisland' },
    })

    const zoneLabel = await screen.findByText('Zone')
    expect(zoneLabel).toBeInTheDocument()

    const comboboxes = await screen.findAllByRole('combobox')
    fireEvent.change(comboboxes[1], {
      target: { value: '1' },
    })

    const message = await screen.findByText(
      'Successfully loaded oil prices for zone: 1'
    )

    expect(message).toBeInTheDocument()
  })

  it('renders when loading NH zone 1', async () => {
    render(<OilPrices />)

    const stateLabel = await screen.findByText('State')
    expect(stateLabel).toBeInTheDocument()

    const stateCombobox = await screen.findByRole('combobox')
    fireEvent.change(stateCombobox, {
      target: { value: 'newhampshire' },
    })

    const zoneLabel = await screen.findByText('Zone')
    expect(zoneLabel).toBeInTheDocument()

    const comboboxes = await screen.findAllByRole('combobox')
    fireEvent.change(comboboxes[1], {
      target: { value: '1' },
    })

    const message = await screen.findByText(
      'Successfully loaded oil prices for zone: 1'
    )

    expect(message).toBeInTheDocument()
  })

  it('renders when loading ME zone 1', async () => {
    render(<OilPrices />)

    const stateLabel = await screen.findByText('State')
    expect(stateLabel).toBeInTheDocument()

    const stateCombobox = await screen.findByRole('combobox')
    fireEvent.change(stateCombobox, {
      target: { value: 'maine' },
    })

    const zoneLabel = await screen.findByText('Zone')
    expect(zoneLabel).toBeInTheDocument()

    const comboboxes = await screen.findAllByRole('combobox')
    fireEvent.change(comboboxes[1], {
      target: { value: '1' },
    })

    const message = await screen.findByText(
      'Successfully loaded oil prices for zone: 1'
    )

    expect(message).toBeInTheDocument()
  })

  it('renders when loading CT zone 1', async () => {
    render(<OilPrices />)

    const stateLabel = await screen.findByText('State')
    expect(stateLabel).toBeInTheDocument()

    const stateCombobox = await screen.findByRole('combobox')
    fireEvent.change(stateCombobox, {
      target: { value: 'connecticut' },
    })

    const zoneLabel = await screen.findByText('Zone')
    expect(zoneLabel).toBeInTheDocument()

    const comboboxes = await screen.findAllByRole('combobox')
    fireEvent.change(comboboxes[1], {
      target: { value: '1' },
    })

    const message = await screen.findByText(
      'Successfully loaded oil prices for zone: 1'
    )

    expect(message).toBeInTheDocument()
  })
})
