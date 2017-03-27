import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { WorldMapComponent } from './worldmap/worldmap.component';
import { MapService } from './map.service';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    WorldMapComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule
  ],
  providers: [MapService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
