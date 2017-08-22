const path = require('path');
const wd = require('webdriverio');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.should();
chai.use(chaiAsPromised);

// define the platform we want to automate
const desiredCapabilities = {
  platformName: 'Android',
  platformVersion: '8.0.0',
  deviceName: 'Android Emulator',
  app: path.resolve(__dirname, '..', 'apps', 'VodQA.apk'),
  automationName: 'UiAutomator2',
  noReset: true
}

// tell webdriverio which server to connect to
const wdOpts = {
  desiredCapabilities,
  host: 'localhost',
  port: 4723
};

describe('UiAutomator2 - VodQA', function () {
  // give this test a generous mocha timeout
  this.timeout(120000);

  // initialize the webdriverio client
  const client = wd.remote(wdOpts);

  before(async () => {
    // start the session
    await client.init();
    await client.timeoutsImplicitWait(5000);
  });

  it('should do a drag and drop', async () => {
    await client.click("~login");
    await client.click("~dragAndDrop");
    const dragLoc = await client.getLocation("~dragMe");
    const dropLoc = await client.getLocation("~dropzone");
    await client.touchAction([
        {action: "longPress", y: dragLoc.y + 10, x: dragLoc.x + 10},
        {action: "moveTo", y: dropLoc.y + 40, x: dragLoc.x + 20},
        {action: "release"}
    ]);
    const successXpath = "//android.widget.TextView[contains(@text, 'Circle dropped')]";
    await client.isExisting(successXpath).should.eventually.be.true;
  });

  after(async () => {
    // clean up the session whether the test passed or failed
    await client.end();
  });
});
