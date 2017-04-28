const path = require('path');
const wd = require('webdriverio');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.should();
chai.use(chaiAsPromised);

// define the platform we want to automate
const desiredCapabilities = {
  platformName: 'Mac',
  deviceName: 'Mac',
  app: "Calculator.app"
}

// tell webdriverio which server to connect to
const wdOpts = {
  desiredCapabilities,
  host: 'localhost',
  port: 4723
};

describe('Mac - Calculator', function () {
  // give this test a generous mocha timeout
  this.timeout(120000);

  // initialize the webdriverio client
  const client = wd.remote(wdOpts);

  function getButton (btn) {
    return `/AXApplication[@AXTitle='Calculator']/AXWindow[0]/AXGroup[1]/AXButton[@AXDescription='${btn}']`;
  }

  before(async () => {
    // start the session
    await client.init();
    //await client.timeoutsImplicitWait(5000);
    await client.click(getButton('clear'));
    await client.click(getButton('clear'));
  });

  it('should multiply some numbers', async () => {
    // perform the multiplication steps
    await client.click(getButton('nine'));
    await client.click(getButton('multiply'));
    await client.click(getButton('seven'));
    await client.click(getButton('equals'));
    // now we need to verify the display is correct.
    // currently the mac driver has a problem finding the display element
    // but it does put its value in the source, so just verify that
    // we have the correct value in the source as a proxy for this
    const src = await client.getSource();
    src.should.match(/AXDescription="main display"[^>]+AXValue="63"/);
  });

  after(async () => {
    // clean up the session whether the test passed or failed
    await client.end();
  });
});
