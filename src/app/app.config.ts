import { ApplicationConfig } from "@angular/core";
import { provideRouter, withInMemoryScrolling } from "@angular/router";

import { routes } from "./app.routes";
import { provideClientHydration } from "@angular/platform-browser";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideHttpClient, withFetch } from "@angular/common/http";
import { provideToastr } from "ngx-toastr";

export const appConfig: ApplicationConfig = {
  // required animations providers
  providers: [
    
    // provideClientHydration(),

    provideToastr({
      timeOut: 10000,
      positionClass: "toast-bottom-right",
      preventDuplicates: true,
    }),
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: "enabled",
        anchorScrolling: "enabled",
      }),
    ),
    provideClientHydration(),
    provideAnimations(),
    provideHttpClient(),
  ],
};
