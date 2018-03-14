import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ISite } from './../../../domain/interfaces/isite';
import { SitesService } from './../../../services/sites.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { LinksService } from '../../../services/links.service';

@Component({
  selector: 'app-site-links',
  templateUrl: './site-links.component.html',
  styleUrls: ['./site-links.component.css']
})
export class SiteLinksComponent implements OnInit {

  public site: ISite;
  public values: any;

  private page: number = 1;

  formLinks: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private siteService: SitesService,
    private linkService: LinksService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.formLinks = this.formBuilder.group({
      id: [null],
      siteId: [null, Validators.required],
      url: [null, Validators.required]
    });

    this.getSite();

  }

  getSite() {
    let id: string;
    this.route.params.subscribe(s => id = s.id);
    this.siteService.get(id).subscribe(s => this.site = s);
    this.linkService.allFromSite(id, this.page).subscribe(s => this.values = s);
  }

  createLink() {
    this.formLinks.controls.siteId.setValue(this.site.id);
    if (this.formLinks.valid) {
      this.linkService.create(this.formLinks.value).subscribe(() => this.getSite());
      this.formLinks.reset();
    }
  }

  deleteLink(id: string) {
    this.linkService.delete(id).subscribe(() => this.getSite());
  }


  goNext() {
    this.linkService.allFromSite(this.site.id, ++this.page).subscribe(s => this.values = s);
  }

  goLast() {
    this.page = this.values.pagination.totalPages;
    this.linkService.allFromSite(this.site.id, this.page).subscribe(s => this.values = s);
  }

  goPrevious() {
    this.linkService.allFromSite(this.site.id, --this.page).subscribe(s => this.values = s);
  }

  goFirst() {
    this.page = 1;
    this.linkService.allFromSite(this.site.id, this.page).subscribe(s => this.values = s);
  }


}
