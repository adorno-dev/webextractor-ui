import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SitesComponent } from './pages/sites/sites.component';
import { SiteLinksComponent } from './pages/sites/site-links/site-links.component';
import { SiteExpressionsComponent } from './pages/sites/site-expressions/site-expressions.component';

const routes: Routes = [
  { path: '', component: SitesComponent },
  { path: 'links/:id', component: SiteLinksComponent },
  { path: 'expressions/:id', component: SiteExpressionsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
