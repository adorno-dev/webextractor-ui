import { LinksService } from './../../services/links.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ISite } from '../../domain/interfaces/isite';
import { SitesService } from '../../services/sites.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ExpressionsService } from '../../services/expressions.service';

@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.css']
})
export class SitesComponent implements OnInit {

  public sites = [];

  formSites: FormGroup;

  constructor(
    private siteService: SitesService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {

    this.formSites = this.formBuilder.group({
      id: [null],
      name: [null, Validators.required],
      domain: [null, Validators.required]
    });

    this.allSites();

  }

  allSites() {
    this.sites = [];
    this.siteService.all().subscribe(all => all.forEach(site => this.sites.push(site)));
  }

  createSite() {
    if (this.formSites.valid) {
      this.siteService.create(this.formSites.value).subscribe(() => this.allSites());
      this.formSites.reset();
    }
  }

  deleteSite(id: string) {
    this.siteService.delete(id).subscribe(() => this.allSites());
  }

}
