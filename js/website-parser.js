import Notify from './notify.js'

import {
  Builder,
  By,
  until
} from 'selenium-webdriver';


export default class {
  constructor() {
    this.driver = new Builder().forBrowser('firefox').build();
    this.notify = new Notify();
  }

  async try_to_add_visitor() {
    try {
      let visa_type_c = await this.driver.findElement(By.css('select#VisaCategoryId > option:nth-child(2)')).click()
      await this.driver.findElement(By.css('#btnContinue')).click()

      await this.driver.wait(until.titleIs('VFS : Список заявителей'), 10000)
      this.driver.findElement(By.css('a.submitbtn')).click()

      this.notify.send('NOTIFY_COMPLETE', '==============================Login OK==========================================')
    } catch (ex) {
      this.notify.send('NOTIFY_WARNING', '=============================NEED RELOGIN=====================================')
    }
  }

  async start(url) {

    await this.driver.get('https://www.vfsvisaservicesrussia.com/Global-Appointment/Account')
    await this.driver.wait(until.titleIs('VFS : Выбрать город'), 60000);
    await this.driver.wait(until.elementLocated(By.css('select#LocationId > option')), 3000)

    while (true) {
      //When we don't have "no places avaliable" message, trying to add new visitor
      try {
        let spb_option = this.driver.findElement(By.css('select#LocationId > option:nth-child(2)')).click()

        let error_element = this.driver.findElement(By.css('#LocationError'))
        await this.driver.wait(until.elementTextContains(error_element, "Нет доступных мест"), 3000)

      } catch (ex) {
        this.try_to_add_visitor();
      }

      await this.driver.controlFlow().timeout(15000)
    }
  }
}