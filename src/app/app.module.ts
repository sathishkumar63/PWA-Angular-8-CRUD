import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './shared-modules/material/material.module';
import { httpInterceptorProviders } from './core/interceptors';
import { AppComponent } from './app.component';
import { ApiService } from './core/service/api.service';
import { RequestCacheService } from './core/service/request-cache.service';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ConfirmationDialogComponent } from './dialog/confirmation-dialog/confirmation-dialog.component';
import { EditDialogComponent } from './dialog/edit-dialog/edit-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ConfirmationDialogComponent,
    EditDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  entryComponents: [ConfirmationDialogComponent, EditDialogComponent],
  providers: [RequestCacheService, httpInterceptorProviders, ApiService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(router: Router) { }
}
