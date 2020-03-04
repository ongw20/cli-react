import { launch, Browser, Page } from 'puppeteer'

describe('example', () => {
  let browser: Browser
  let page: Page

  beforeAll(async () => {
    browser = await launch({
      defaultViewport: {
        width: 1200,
        height: 800,
      },
    })
    page = await browser.newPage()
  })

  afterAll(async () => {
    await browser.close()
  })

  it('should open login page', async () => {
    await page.goto('https://example.com/')
    await page.screenshot({ path: 'screenshots/example.png' })
  })
})
