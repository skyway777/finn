import WebsiteParser from './js/website-parser.js'

(async() => {

  let parser = new WebsiteParser()

  try {
    await parser.start('https://www.vfsvisaservicesrussia.com/Global-Appointment/Account')

  } catch (ex) {
    console.log(`Error while loading website: ${ex.message}`)
  }

})()