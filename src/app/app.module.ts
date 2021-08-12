import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { GlobeComponent } from './components/globe/globe.component';
import { GlobeDemoPageComponent } from './pages/globe-demo-page/globe-demo-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    GlobeComponent,
    GlobeDemoPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
