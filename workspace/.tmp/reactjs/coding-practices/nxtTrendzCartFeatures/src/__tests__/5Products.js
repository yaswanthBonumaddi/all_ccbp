import {BrowserRouter} from 'react-router-dom'
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import {render, screen, fireEvent} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Cookies from 'js-cookie'

import App from '../App'

const loginImage =
  'https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png'

const loginRoutePath = '/login'
const productsRoutePath = '/products'

const mockGetCookie = (returnToken = true) => {
  let mockedGetCookie
  if (returnToken) {
    mockedGetCookie = jest.fn(() => ({
      jwt_token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhamEiLCJyb2xlIjoiVVNFUiIsImlhdCI6MTYxOTY5MTMwN30.T--R95wvSdSpRlHWeKGbP3yTSq2wk196PqpqUamuM_g',
    }))
  } else {
    mockedGetCookie = jest.fn(() => undefined)
  }
  jest.spyOn(Cookies, 'get')
  Cookies.get = mockedGetCookie
}

const restoreGetCookieFns = () => {
  Cookies.get.mockRestore()
}

const renderWithBrowserRouter = (ui, {route = '/'} = {}) => {
  window.history.pushState({}, 'Test page', route)
  return render(ui, {wrapper: BrowserRouter})
}

const categoryOptions = [
  {
    name: 'Clothing',
    categoryId: '1',
  },
  {
    name: 'Electronics',
    categoryId: '2',
  },
  {
    name: 'Appliances',
    categoryId: '3',
  },
  {
    name: 'Grocery',
    categoryId: '4',
  },
  {
    name: 'Toys',
    categoryId: '5',
  },
]

const ratingsList = [
  {
    ratingId: '4',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png',
  },
  {
    ratingId: '3',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png',
  },
  {
    ratingId: '2',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png',
  },
  {
    ratingId: '1',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png',
  },
]

const productsResponse = {
  products: [
    {
      title: 'Front Load Machine',
      brand: 'Samsung',
      price: 22490,
      id: 24,
      image_url:
        'https://assets.ccbp.in/frontend/react-js/ecommerce/appliances-washing-machine.png',
      rating: 4.5,
    },
    {
      title: "Collider Black Dial Men's Watch",
      brand: 'Fossil',
      price: 14995,
      id: 33,
      image_url:
        'https://assets.ccbp.in/frontend/react-js/ecommerce/electronics-simple-belt-watch.png',
      rating: 4.3,
    },
    {
      title: 'True Wireless Earbuds',
      brand: 'LG',
      price: 13499,
      id: 18,
      image_url:
        'https://assets.ccbp.in/frontend/react-js/ecommerce/appliances-ear-buds.png',
      rating: 4.4,
    },
    {
      title: "Maritime Men's Watch",
      brand: 'Titan',
      price: 11999,
      id: 35,
      image_url:
        'https://assets.ccbp.in/frontend/react-js/ecommerce/electronics-tatar-watch.png',
      rating: 4.3,
    },
    {
      title: "Neutra Analog Men's Watch",
      brand: 'Fossil',
      price: 10995,
      id: 34,
      image_url:
        'https://assets.ccbp.in/frontend/react-js/ecommerce/electronics-simple-watch.png',
      rating: 4.1,
    },
    {
      title: 'Monsters Charm Toy',
      brand: 'Trendytap',
      price: 8600,
      id: 48,
      image_url:
        'https://assets.ccbp.in/frontend/react-js/ecommerce/toys-minnos.png',
      rating: 4.2,
    },
    {
      title: 'Privateer Quartz Watch',
      brand: 'Fossil',
      price: 8122,
      id: 31,
      image_url:
        'https://assets.ccbp.in/frontend/react-js/ecommerce/electronics-royal-black-watch.png',
      rating: 4.4,
    },
    {
      title: 'Podcast Microphone',
      brand: 'MAONO',
      price: 5555,
      id: 22,
      image_url:
        'https://assets.ccbp.in/frontend/react-js/ecommerce/appliances-singing-mike.png',
      rating: 4.4,
    },
    {
      title: 'Virgin Avocado Oil',
      brand: 'ProV',
      price: 4144,
      id: 42,
      image_url:
        'https://assets.ccbp.in/frontend/react-js/ecommerce/grocery-oil.png',
      rating: 4.4,
    },
    {
      title: 'Warm Up Jacket',
      brand: 'Monte Carlo',
      price: 2796,
      id: 11,
      image_url:
        'https://assets.ccbp.in/frontend/react-js/ecommerce/clothes-sim-jacket.png',
      rating: 4.4,
    },
  ],
}

const productDetailsResponse = {
  id: 16,
  image_url:
    'https://assets.ccbp.in/frontend/react-js/ecommerce/clothes-simple-formal.png',
  title: 'Embroidered Net Gown',
  price: 62990,
  description:
    'Color, style and ceremonial importance of the gown. Enhance your beauty by after wearing this Vibrant,Gorgeous and beautiful Wedding Gown. ',
  brand: 'Manyavar',
  total_reviews: 879,
  rating: 3,
  availability: 'In Stock',
}

const primeDealsResponse = {
  prime_deals: [
    {
      id: 1001,
      image_url:
        'https://assets.ccbp.in/frontend/react-js/ecommerce/appliances-silver-hair-dryer.png',
      title: 'Hair Dryer',
      style: 'Philips HP8100/46 Hair Dryer - Salon Dry Compact',
      price: 760,
      description: 'Advanced concentrator technology with quick-heat head. ',
      brand: 'Phillips',
      total_reviews: 5463,
      rating: 3.9,
      availability: 'In Stock',
    },
    {
      id: 1002,
      image_url:
        'https://assets.ccbp.in/frontend/react-js/ecommerce/toys-people-toys.png',
      title: 'Minifigures',
      style: 'Minifigures',
      price: 760,
      description:
        'Collect all mystery minifigures in the new series 11 and grow your LEGO Minifigure Collection. ',
      brand: 'LEGO',
      total_reviews: 5463,
      rating: 3.9,
      availability: 'In Stock',
    },
    {
      id: 1003,
      image_url:
        'https://assets.ccbp.in/frontend/react-js/ecommerce/electronics-short-tri-pod.png',
      title: 'Lightweight Tripod',
      style: 'Lightweight Tripod',
      price: 760,
      description:
        'Adjustable-height tripod made of lightweight aluminum, Recommended max load weight is 2 Kg for optimal performance. ',
      brand: 'LEGO',
      total_reviews: 5463,
      rating: 3.9,
      availability: 'In Stock',
    },
  ],
}

const productsApiUrl = 'https://apis.ccbp.in/products'
const primeDealsApiUrl = 'https://apis.ccbp.in/prime-deals'

const handlers = [
  rest.get(primeDealsApiUrl, (req, res, ctx) =>
    res(ctx.json(primeDealsResponse)),
  ),
  rest.get(productsApiUrl, (req, res, ctx) => res(ctx.json(productsResponse))),
  rest.get('https://apis.ccbp.in/products/:id', (req, res, ctx) =>
    res(ctx.status(401)),
  ),
]

const server = setupServer(...handlers)

const originalFetch = window.fetch

describe(':::RJSCPFOQQB_TEST_SUITE_5:::Products Route tests', () => {
  beforeAll(() => {
    server.listen()
  })

  afterAll(() => {
    server.close()
  })

  afterEach(() => {
    server.resetHandlers()
    window.fetch = originalFetch
  })

  it(':::RJSCPFOQQB_TEST_41:::When the "/products" is provided in the URL by an unauthenticated user then the page should be redirected to LoginRoute and consists of an HTML image element with the given login image URL as src and alt as "website login":::5:::', async () => {
    mockGetCookie(false)
    renderWithBrowserRouter(<App />, {route: productsRoutePath})
    expect(window.location.pathname).toBe(loginRoutePath)
    const loginImgs = screen.getAllByRole('img', {
      name: /website login/i,
      exact: false,
    })
    expect(loginImgs[0]).toBeInTheDocument()
    expect(loginImgs[0].src).toBe(loginImage)
    restoreGetCookieFns()
  })

  it(':::RJSCPFOQQB_TEST_42:::Products Route should consist of HTML input element with type attribute value as "search":::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />, {route: productsRoutePath})

    expect(
      await screen.findByText(/Front Load Machine/i, {
        exact: false,
      }),
    ).toBeInTheDocument()

    expect(screen.getByRole('searchbox')).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCPFOQQB_TEST_43:::Products Route should consist of HTML paragraph elements with text content equal to the "name" value of each item in categoryOptions provided:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />, {route: productsRoutePath})
    expect(
      await screen.findByText(/Front Load Machine/i, {
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByText(categoryOptions[0].name, {exact: false}),
    ).toBeInTheDocument()
    expect(
      screen.getByText(categoryOptions[0].name, {exact: false}).tagName,
    ).toBe('P')
    expect(
      screen.getByText(categoryOptions[1].name, {exact: false}),
    ).toBeInTheDocument()
    expect(
      screen.getByText(categoryOptions[0].name, {exact: false}).tagName,
    ).toBe('P')
    expect(
      screen.getByText(categoryOptions[2].name, {exact: false}),
    ).toBeInTheDocument()
    expect(
      screen.getByText(categoryOptions[0].name, {exact: false}).tagName,
    ).toBe('P')
    expect(
      screen.getByText(categoryOptions[3].name, {exact: false}),
    ).toBeInTheDocument()
    expect(
      screen.getByText(categoryOptions[0].name, {exact: false}).tagName,
    ).toBe('P')
    expect(
      screen.getByText(categoryOptions[4].name, {exact: false}),
    ).toBeInTheDocument()
    expect(
      screen.getByText(categoryOptions[0].name, {exact: false}).tagName,
    ).toBe('P')
    restoreGetCookieFns()
  })

  it(':::RJSCPFOQQB_TEST_44:::Products Route should consist of HTML image elements with alt value equal to "rating {ratingId}" and src value equal to "imageUrl" value of each item in ratingsList provided:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />, {route: productsRoutePath})
    expect(
      await screen.findByText(/Front Load Machine/i, {
        exact: false,
      }),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('img', {name: /rating 1/, exact: false}),
    ).toBeInTheDocument()
    expect(screen.getByRole('img', {name: /rating 1/, exact: false}).src).toBe(
      ratingsList[3].imageUrl,
    )
    expect(
      screen.getByRole('img', {name: /rating 2/, exact: false}),
    ).toBeInTheDocument()
    expect(screen.getByRole('img', {name: /rating 2/, exact: false}).src).toBe(
      ratingsList[2].imageUrl,
    )
    expect(
      screen.getByRole('img', {name: /rating 3/, exact: false}),
    ).toBeInTheDocument()
    expect(screen.getByRole('img', {name: /rating 3/, exact: false}).src).toBe(
      ratingsList[1].imageUrl,
    )
    expect(
      screen.getByRole('img', {name: /rating 4/, exact: false}),
    ).toBeInTheDocument()
    expect(screen.getByRole('img', {name: /rating 4/, exact: false}).src).toBe(
      ratingsList[0].imageUrl,
    )
    restoreGetCookieFns()
  })

  it(':::RJSCPFOQQB_TEST_45:::Products Route should consist of HTML button element with text content as "Clear Filters":::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />, {route: productsRoutePath})
    expect(
      await screen.findByText(/Front Load Machine/i, {
        exact: false,
      }),
    ).toBeInTheDocument()

    expect(screen.getByRole('button', {name: /Clear Filters/i, exact: false}))
    restoreGetCookieFns()
  })

  it(':::RJSCPFOQQB_TEST_46:::When Products Route is opened, an HTTP GET request should be made to productsApiUrl with all the query parameters and their initial values:::5:::', async () => {
    mockGetCookie()

    const mockFetchFunction = jest.fn().mockImplementation(url => {
      if (url === 'https://apis.ccbp.in/prime-deals') {
        return {
          ok: true,
          json: () => Promise.resolve(primeDealsResponse),
        }
      }
      return {
        ok: true,
        json: () => Promise.resolve(productsResponse),
      }
    })
    window.fetch = mockFetchFunction
    renderWithBrowserRouter(<App />, {route: productsRoutePath})

    expect(
      await screen.findByText(/Front Load Machine/i, {
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(mockFetchFunction.mock.calls[1][0]).toMatch('title_search=')
    expect(mockFetchFunction.mock.calls[1][0]).toMatch('rating=')
    expect(mockFetchFunction.mock.calls[1][0]).toMatch('category=')

    restoreGetCookieFns()
  })

  it(':::RJSCPFOQQB_TEST_47:::When the Products Route is opened, then the products received in the HTTP GET request response should be displayed:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />, {route: productsRoutePath})
    expect(
      await screen.findByText(/Front Load Machine/i, {
        exact: false,
      }),
    ).toBeInTheDocument()

    expect(
      screen.getByText(productsResponse.products[0].title),
    ).toBeInTheDocument()
    expect(
      screen.getByText(productsResponse.products[1].title),
    ).toBeInTheDocument()
    expect(
      screen.getByText(productsResponse.products[2].title),
    ).toBeInTheDocument()
    expect(
      screen.getByText(productsResponse.products[3].title),
    ).toBeInTheDocument()
    expect(
      screen.getByText(productsResponse.products[4].title),
    ).toBeInTheDocument()
    expect(
      screen.getByText(productsResponse.products[5].title),
    ).toBeInTheDocument()
    expect(
      screen.getByText(productsResponse.products[6].title),
    ).toBeInTheDocument()
    expect(
      screen.getByText(productsResponse.products[7].title),
    ).toBeInTheDocument()
    expect(
      screen.getByText(productsResponse.products[8].title),
    ).toBeInTheDocument()
    expect(
      screen.getByText(productsResponse.products[9].title),
    ).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it(':::RJSCPFOQQB_TEST_48:::When a value is provided in the HTML input element for search and the Enter key is pressed, an HTTP GET request should be made with the value provided in the HTML input element as the value to query parameter "title_search":::5:::', async () => {
    mockGetCookie()

    const mockFetchFunction = jest.fn().mockImplementation(url => {
      if (url === 'https://apis.ccbp.in/prime-deals') {
        return {
          ok: true,
          json: () => Promise.resolve(primeDealsResponse),
        }
      }
      return {
        ok: true,
        json: () => Promise.resolve(productsResponse),
      }
    })
    window.fetch = mockFetchFunction
    renderWithBrowserRouter(<App />, {route: productsRoutePath})

    expect(
      await screen.findByText(/Front Load Machine/i, {
        exact: false,
      }),
    ).toBeInTheDocument()

    userEvent.type(screen.getByRole('searchbox'), 'machine')
    fireEvent.keyDown(screen.getByRole('searchbox'), {
      key: 'Enter',
      keyCode: 13,
      which: 13,
    })

    expect(mockFetchFunction.mock.calls[2][0]).toMatch('title_search=machine')

    expect(
      await screen.findByText(/Front Load Machine/i, {
        exact: false,
      }),
    ).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it(':::RJSCPFOQQB_TEST_49:::When a category is clicked, an HTTP GET request should be made with the id of the category as the value to query parameter "category":::5:::', async () => {
    mockGetCookie()

    const mockFetchFunction = jest.fn().mockImplementation(url => {
      if (url === 'https://apis.ccbp.in/prime-deals') {
        return {
          ok: true,
          json: () => Promise.resolve(primeDealsResponse),
        }
      }
      return {
        ok: true,
        json: () => Promise.resolve(productsResponse),
      }
    })
    window.fetch = mockFetchFunction
    renderWithBrowserRouter(<App />, {route: productsRoutePath})

    expect(
      await screen.findByText(/Front Load Machine/i, {
        exact: false,
      }),
    ).toBeInTheDocument()

    userEvent.click(screen.getByText(/Grocery/i, {exact: false}))

    expect(mockFetchFunction.mock.calls[2][0]).toMatch('category=4')
    expect(
      await screen.findByText(/Front Load Machine/i, {
        exact: false,
      }),
    ).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it(':::RJSCPFOQQB_TEST_50:::When a rating is clicked, an HTTP GET request should be made with the id of the rating as the value to query parameter "rating":::5:::', async () => {
    mockGetCookie()

    const mockFetchFunction = jest.fn().mockImplementation(url => {
      if (url === 'https://apis.ccbp.in/prime-deals') {
        return {
          ok: true,
          json: () => Promise.resolve(primeDealsResponse),
        }
      }
      return {
        ok: true,
        json: () => Promise.resolve(productsResponse),
      }
    })
    window.fetch = mockFetchFunction
    renderWithBrowserRouter(<App />, {route: productsRoutePath})

    expect(
      await screen.findByText(/Front Load Machine/i, {
        exact: false,
      }),
    ).toBeInTheDocument()

    userEvent.click(screen.getByRole('img', {name: /rating 4/i, exact: false}))
    expect(mockFetchFunction.mock.calls[2][0]).toMatch(/rating=4/)

    expect(
      await screen.findByText(/Front Load Machine/i, {
        exact: false,
      }),
    ).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it(':::RJSCPFOQQB_TEST_51:::When all the filters in Products Route are applied and the "Clear Filters" button is clicked, then an HTTP GET request should be made to productsApiUrl with initial values of the query parameters:::5:::', async () => {
    mockGetCookie()

    const mockFetchFunction = jest.fn().mockImplementation(url => {
      if (url === 'https://apis.ccbp.in/prime-deals') {
        return {
          ok: true,
          json: () => Promise.resolve(primeDealsResponse),
        }
      }
      return {
        ok: true,
        json: () => Promise.resolve(productsResponse),
      }
    })
    window.fetch = mockFetchFunction
    renderWithBrowserRouter(<App />, {route: productsRoutePath})

    userEvent.type(screen.getByRole('searchbox'), 'machine')
    fireEvent.keyDown(screen.getByRole('searchbox'), {
      key: 'Enter',
      keyCode: 13,
      which: 13,
    })
    userEvent.click(screen.getByText(/Grocery/i, {exact: false}))
    userEvent.click(screen.getByRole('img', {name: /rating 4/i, exact: false}))

    expect(mockFetchFunction.mock.calls[4][0]).toMatch('title_search=machine')
    expect(mockFetchFunction.mock.calls[4][0]).toMatch('category=4')
    expect(mockFetchFunction.mock.calls[4][0]).toMatch('rating=4')

    userEvent.click(
      screen.getByRole('button', {name: /Clear Filters/i, exact: false}),
    )

    expect(mockFetchFunction.mock.calls[5][0]).not.toMatch(
      'title_search=machine',
    )
    expect(mockFetchFunction.mock.calls[5][0]).not.toMatch('category=4')
    expect(mockFetchFunction.mock.calls[5][0]).not.toMatch('rating=4')

    expect(mockFetchFunction.mock.calls[5][0]).toMatch('title_search=')
    expect(mockFetchFunction.mock.calls[5][0]).toMatch('category=')
    expect(mockFetchFunction.mock.calls[5][0]).toMatch('rating=')
    expect(mockFetchFunction.mock.calls[5][0]).toMatch('sort_by=')
    expect(
      await screen.findByText(/Front Load Machine/i, {
        exact: false,
      }),
    ).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it(':::RJSCPFOQQB_TEST_52:::Each product card should be wrapped with the Link from react-router-dom:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />, {route: productsRoutePath})
    expect(
      await screen.findByText(/Front Load Machine/i, {
        exact: false,
      }),
    ).toBeInTheDocument()

    expect(screen.getAllByRole('link').length).toBeGreaterThanOrEqual(13)
    restoreGetCookieFns()
  })

  it(':::RJSCPFOQQB_TEST_53:::When the HTTP GET request made is unsuccessful, then failure view should be displayed:::5:::', async () => {
    mockGetCookie()

    const mockFetchFunction = jest.fn().mockImplementation(() => ({
      ok: false,
      json: () => Promise.resolve({}),
    }))
    window.fetch = mockFetchFunction
    renderWithBrowserRouter(<App />, {route: productsRoutePath})

    expect(
      await screen.findByRole('img', {
        name: /all-products-error/i,
        exact: false,
      }),
    ).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it(':::RJSCPFOQQB_TEST_54:::When the HTTP GET request made to productsApiUrl returns products list as empty, then no products view should be displayed:::5:::', async () => {
    mockGetCookie()

    const mockFetchFunction = jest.fn().mockImplementation(url => {
      if (url === 'https://apis.ccbp.in/prime-deals') {
        return {
          ok: true,
          json: () => Promise.resolve(primeDealsResponse),
        }
      }
      return {
        ok: true,
        json: () => Promise.resolve({products: []}),
      }
    })
    window.fetch = mockFetchFunction
    renderWithBrowserRouter(<App />, {route: productsRoutePath})

    expect(
      await screen.findByRole('img', {name: /no products/i, exact: false}),
    ).toBeInTheDocument()
    expect(
      await screen.findByRole('heading', {
        name: /No Products Found/i,
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(
      await screen.findByText(
        /We could not find any products. Try other filters/i,
        {exact: false},
      ),
    ).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it(':::RJSCPFOQQB_TEST_55:::When a Product card is clicked in Products Route, then the page should be navigated to the Product Item Details route with "/product-details/:id" in the URL path:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />, {route: productsRoutePath})
    expect(
      await screen.findByText(/Front Load Machine/i, {
        exact: false,
      }),
    ).toBeInTheDocument()

    userEvent.click(screen.getByText(productsResponse.products[0].title))

    expect(window.location.pathname).toMatch('products/24')
    restoreGetCookieFns()
  })
})
