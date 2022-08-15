# Dissolve - Car Lottery

Dissolve is a simple car lottery registration app, based on Vue.js.

The app is currently designed for mobile use. Please refer to the bottom of the page for further improvements.
A user can register and navigate back and forth between the registration steps. Refreshing the page loads unsaved data to the form.
Some basic analytics are recorded as well.

## The stack

Frontend:
- Vue.js 3 with Vite 
- TypeScript
- Axios
- Tailwind

Backend
- Node.js
- Express.js

## Installations

1. Clone
2. From the root directory run `npm install` from the terminal
3. Run `npm run install:all` to install both the front and the backend or install each one separately
4. Create an `.env` file in `/client` and `/server` as described in the example files `/.env.example`. For this demo purpose you can just rename `.env.example` to `.env`
5. From the root directory run `npm run start` to start both the front and the backend concurrently
6. Visit the url logged to the terminal

Note that Vite supports Node.js versions 14.18+, 16+

## Further improvements and bugs

Given a tight deadline, some things can be improved on at a later time. Things like:

- improvement: unit tests and E2E tests
- improvement: desktop and tablet responsive design
- feature: progress bar
- known bug: resetting an application for the SECOND time crashes the app. To replicate: register once -> click on "Start a new application" -> register again. The second time you start an application will crash the app.
