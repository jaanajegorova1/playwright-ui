#All activities are done from Terminal / Command Prompt.
#How to setup project:
npm ci
npm install @faker-js/faker

#How to run local env.:
npm i serve --save-dev
npm run local

#How to set APP_URL:
set APP_URL=https://fe-delivery.tallinn-learning.ee/signin

#How to launch test cases:

#How to run all test cases - for all 3 browsers:
npx playwright test TLFormTests.spec.ts

#How to run all test cases - for each browser separately:
npx playwright test TLFormTests.spec.ts --project=chromium
npx playwright test TLFormTests.spec.ts --project=firefox
npx playwright test TLFormTests.spec.ts --project=webkit

#How to run one test case on one browser in debug mode:
test.only... + 
npx playwright test TLFormTests.spec.ts --debug --project=chromium