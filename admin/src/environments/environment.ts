// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseSite: {
    url: "http://159.8.246.2/Admin/Admin.svc",
    currency: "INR",
    // url: 'http://159.8.244.61/Admin/Admin.svc',
    bookHub: "http://159.8.244.61:11112",
    fancyHub: "http://159.8.246.2:21111",
    analyisHub: "http://159.8.246.2:11334",
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
