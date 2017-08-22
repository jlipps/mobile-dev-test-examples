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
  browserName: 'Safari',
  automationName: 'XCUITest',
  noReset: true
}

// tell webdriverio which server to connect to
const wdOpts = {
  desiredCapabilities,
  host: 'localhost',
  port: 4723
};

describe('XCUITest - Safari', function () {
  // give this test a generous mocha timeout
  this.timeout(120000);

  // initialize the webdriverio client
  const client = wd.remote(wdOpts);

  before(async () => {
    // start the session
    await client.init();
  });

  it('should add two numbers', async () => {
    await client.background(-1);
    await client.context('NATIVE_APP');
    console.log(await client.getSource());
  });

  after(async () => {
    // clean up the session whether the test passed or failed
    await client.end();
  });
});
