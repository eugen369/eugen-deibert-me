import {
    ApplicationConfig,
    importProvidersFrom,
    provideBrowserGlobalErrorListeners
} from '@angular/core'
import { provideRouter } from '@angular/router'
import { routes } from './app.routes'
import { provideHttpClient } from '@angular/common/http'
import { provideStore } from '@ngrx/store'
import { blogReducer } from './store/blog/blog.reducer'
import { EffectsModule, provideEffects } from '@ngrx/effects'
import { provideStoreDevtools } from '@ngrx/store-devtools'
import { BlogEffects } from './store/blog/blog.effects'
import { environment } from './environment'

export const appConfig: ApplicationConfig = {
    providers: [
        provideBrowserGlobalErrorListeners(),
        provideRouter(routes),
        provideHttpClient(),
        provideStore({
            blog: blogReducer
        }),
        importProvidersFrom(EffectsModule.forRoot([BlogEffects])),
        // provideEffects([BlogEffects]),
        provideStoreDevtools({
            maxAge: 25,
            logOnly: environment.production
        })
    ]
}
