const path = require('path');
const wd = require('webdriverio');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.should();
chai.use(chaiAsPromised);

// define the platform we want to automate
const desiredCapabilities = {
  platformName: 'iOS',
  platformVersion: '10.2',
  deviceName: 'iPhone 7',
  app: path.resolve(__dirname, '..', 'apps', 'TestApp10.2.app.zip'),
  noReset: true
}

// tell webdriverio which server to connect to
const wdOpts = {
  desiredCapabilities,
  host: 'localhost',
  port: 4723
};

describe('XCUITest - Testapp', function () {
  // give this test a generous mocha timeout
  this.timeout(120000);

  // initialize the webdriverio client
  const client = wd.remote(wdOpts);

  before(async () => {
    // start the session
    await client.init();
  });

  it('should add two numbers', async () => {
    await client.setValue('~IntegerA', '9');
    await client.setValue('~IntegerB', '7');
    await client.click('~ComputeSumButton');
    const result = await client.getValue('~Answer');
    result.should.eql('16');
  });

  after(async () => {
    // clean up the session whether the test passed or failed
    await client.end();
  });
});
