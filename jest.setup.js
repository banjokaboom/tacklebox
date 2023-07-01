//setupJest.js or similar file
require('jest-fetch-mock').enableMocks()

let copyText = ''

const mockGeolocation = {
  // eslint-disable-next-line
  getCurrentPosition: jest.fn().mockImplementationOnce((success) =>
    Promise.resolve(
      success({
        coords: {
          latitude: 51.1,
          longitude: 45.3,
        },
      })
    )
  ),
  // eslint-disable-next-line
  watchPosition: jest.fn(),
}

const mockClipboard = {
  // eslint-disable-next-line
  writeText: (text) => (copyText = text),
  // eslint-disable-next-line
  readText: () => copyText,
}

global.navigator.geolocation = mockGeolocation
global.navigator.clipboard = mockClipboard
