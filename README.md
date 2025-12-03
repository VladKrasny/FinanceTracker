# Finance Tracker

Single page application for tracking personal finance built with Vue 3

## Features

- Add income and expense transactions
- Custom categories created by the user
- Filter by type, category, and date range
- Summary: total income, total expenses, and current balance
- Data persistence
- Responsive layout (desktop and mobile friendly)

## Tech Stack

- [Vue 3](https://vuejs.org/) (Options API, JavaScript)
- [Vite](https://vitejs.dev/)
- Plain CSS
- `localStorage` for persistence

## Git Workflow

- Do not commit directly to `main`.
- Every task is implemented in a separate branch from `main`.
- Branch naming must follow a specific format:
  - start with combination of your first and last name. For example **Vald Krasny** will be `vkrasny/...`
  - include type of changes:
    - `../feat/...` for new features
    - `../fix/...` for bug fixes
    - `../chore/...` for configs or refactors
  - include the related issue id: `../1234/`
  - here is the complete example: `vkrasny/chore/0/initialize-repository`

Examples:

- `vkrasny/feat/123/add-transaction-form`
- `vkrasny/fix/321/transaction-form-validation`
- `vkrasny/chore/0/initialize-repository`

- Every branch must be merged via Pull Request.
- Each PR must:
  - рave a clear, descriptive title
  - reference the related issue (e.g. Closes #1)
  - include a short summary of changes
  - (optional) include screenshots/video for UI changes
- Commit messages should follow [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) specification
- When merging to `main` only squash merge is available in order to have a clear history

## Code Style

- Prefer small, focused components.
- Use Options API
- Use `props` and `emits` for communication between parent and child components.
- Use `computed` properties instead of recalculating values in templates.
