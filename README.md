# mobile-dev-test-examples

Code samples for Mobile Dev+Test 2017.
### Setup

```
npm install
npm install -g mocha
```

And of course you need Appium correctly installed with all dependencies and so on.

### Organization

This is a platform demo, so automation examples are organized by platform, for
example `xcuitest`. Note that because these are demos, the code is not
structured in a very DRY way. This is so that each demo can be read
top-to-bottom without having to refer to other code files. Of course if you
were to write your own test suite, you would want to use general programming
best practices.

### Running the demos

* `mocha xcuitest/testapp.js` -- run an XCUITest-based test with an iOS app
