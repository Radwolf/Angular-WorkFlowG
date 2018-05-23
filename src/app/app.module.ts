import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './/app-routing.module';
import { SharedPipesModule } from './shared/pipes/shared-pipes.module';
import { TareaService } from './tarea/shared/tarea.service';
import { FakeBackendProvider } from './shared/interceptors/fakeBackendInterceptor';
import { JwtInterceptor } from './shared/interceptors/jwtIterceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    SharedPipesModule
  ],
  providers: [        
    TareaService,
    {
        provide: HTTP_INTERCEPTORS,
        useClass: JwtInterceptor,
        multi: true
      },

    // provider used to create fake backend
    FakeBackendProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
