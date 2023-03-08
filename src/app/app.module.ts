import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { environment } from 'src/environments/environment';
import { LoadingSpinnerComponent } from './shared/components/loading-spinner/loading-spinner.component';
import { sharedReducer } from './store/shared/shared.reducer';
import { SHARED_STATE_NAME } from './store/shared/shared.selector';
import { appReducer } from './store/app.state';
import { AuthEffects } from './auth/store/auth.effects';
import { AuthInterceptor } from './shared/interceptor/auth.interceptor';
import { LoadingInterceptor } from './shared/interceptor/loading.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    EffectsModule.forRoot([AuthEffects]),
    StoreModule.forRoot(appReducer),
    StoreDevtoolsModule.instrument({
      logOnly: environment.production
    })
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi:true
  },{
    provide: HTTP_INTERCEPTORS,
    useClass: LoadingInterceptor,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
