# ContactManagementUi

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.6 and node version 18.17.0.

## Get started

### Clone the repo

```shell
git clone https://github.com/neltonf/contact-management-ui.git
cd contact-management-ui
```

### Install npm packages

Install the `npm` packages described in the `package.json` and verify that it works:

```shell
npm install
npm start
```

The `npm start` command builds (compiles TypeScript and copies assets) the application into `dist/`, watches for changes to the source files, and runs `lite-server` on port `4200`.

Shut it down manually with `Ctrl-C`.

#### npm scripts

These are the most useful commands defined in `package.json`:

- `npm start` - runs the TypeScript compiler, asset copier, and a server at the same time, all three in "watch mode".
- `npm run build` - runs the TypeScript compiler and asset copier once.
- `npm run build:watch` - runs the TypeScript compiler and asset copier in "watch mode"; when changes occur to source files, they will be recompiled or copied into `dist/`.
- `npm run lint` - runs `tslint` on the project files.
- `npm run serve` - runs `lite-server`.

These are the test-related scripts:

- `npm test` - builds the application and runs Intern tests (both unit and functional) one time.
- `npm run ci` - cleans, lints, and builds the application and runs Intern tests (both unit and functional) one time.

## Development server

- Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

- Clone and Run the [Contact Managment .NET API](https://github.com/neltonf/contact-management-api)

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
