//setupJest.js or similar file
require('jest-fetch-mock').enableMocks()

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

global.navigator.geolocation = mockGeolocation
