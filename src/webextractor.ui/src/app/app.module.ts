import { ExpressionsService } from './services/expressions.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { SitesComponent } from './pages/sites/sites.component';
import { SitesService } from './services/sites.service';
import { LinksService } from './services/links.service';
import { SiteLinksComponent } from './pages/sites/site-links/site-links.component';
import { SiteExpressionsComponent } from './pages/sites/site-expressions/site-expressions.component';




@NgModule({
  declarations: [
    AppComponent,
    SitesComponent,
    SiteLinksComponent,
    SiteExpressionsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [SitesService, LinksService, ExpressionsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
