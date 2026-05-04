# Bets Demo App

A single-page betting bulletin app built with React, Redux Toolkit, and TypeScript.

Displays a live odds bulletin fetched from a remote API, grouped by date. Users can select odds and build a coupon that sticks to the bottom of the screen.

## Stack

- React 18 + TypeScript
- Redux Toolkit
- `@tanstack/react-virtual` for virtualized list rendering
- CSS Modules
- Webpack 5

## Quick start

```bash
npm install
npm start        # dev server -> http://localhost:3000
npm run build    # production bundle -> dist/
npm test         # watch mode
npm run test:run # single run (CI)
```

## Project structure

```
src/
  components/
    bulletin/   # odds table, rows, date headers, odd cells
    coupon/     # sticky coupon panel and items
  store/        # Redux slices and selectors
  pages/        # App root
  types/        # shared TypeScript interfaces
  utils/        # API fetch and data parsing
  data/         # mock data
```
