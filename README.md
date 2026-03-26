# SauceDemo Playwright TypeScript Framework

End-to-end test automation for [SauceDemo](https://www.saucedemo.com) 
using Playwright + TypeScript.

## Project Structure
- `pages/` — Page Object Model classes
- `tests/smoke/` — Smoke tests
- `tests/regression/` — Regression tests
- `tests/features/` — Feature tests
- `tests/api/` — API interception tests
- `utils/` — Test data and fixtures

## Run Tests
npm install
npx playwright install

# Run by tag
npx playwright test --grep "@smoke"
npx playwright test --grep "@regression"
npx playwright test --grep "@feature-login"
npx playwright test --grep "@api"

# View report
npx playwright show-report

## Tech Stack
- Playwright
- TypeScript
- Page Object Model
- Cross-browser (Chrome, Firefox, Safari)