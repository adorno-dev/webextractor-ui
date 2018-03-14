import { ILink } from './../../../domain/interfaces/ilink';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExpressionsService } from './../../../services/expressions.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LinksService } from '../../../services/links.service';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-site-expressions',
  templateUrl: './site-expressions.component.html',
  styleUrls: ['./site-expressions.component.css']
})
export class SiteExpressionsComponent implements OnInit {

  public isFocus: boolean = true;

  public link: ILink;
  public values: any;
  public expressions = [];

  private page: number = 1;

  formExpressions: FormGroup;
  formSearch: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private linkService: LinksService,
    private expressionService: ExpressionsService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.formExpressions = this.formBuilder.group({
      id: [null],
      linkId: [null, Validators.required],
      value: [null, Validators.required]
    });

    this.formSearch = this.formBuilder.group({
      id: [null],
      search: [null, Validators.required]
    });

    this.getLink();
  }

  getLink() {
    let id: string;
    this.route.params.subscribe(s => id = s.id);
    this.linkService.get(id).subscribe(s => this.link = s);
    this.getValues(id);
  }

  getValues(id: string) {
    this.linkService.getValues(id, this.page).subscribe(s => this.values = s);
  }

  allExpressions() {
    this.expressions = [];
    this.expressionService.all().subscribe(all => all.forEach(expression => this.expressions.push(expression)));
  }

  createExpression() {
    this.formExpressions.controls.linkId.setValue(this.link.id);
    if (this.formExpressions.valid) {
      this.page = 1;
      this.expressionService.create(this.formExpressions.value).subscribe(() => this.getLink());
      this.formExpressions.reset();
      this.formSearch.reset();
    }
  }

  deleteExpression(id: string) {
    this.expressionService.delete(id).subscribe(() => this.getLink());
    this.formSearch.reset();
  }

  onSearch() {
    let search = this.formSearch.controls.search.valid ? this.formSearch.controls.search.value : '';
    let expression = this.formExpressions.controls.value.valid ? this.formExpressions.controls.value.value : '';
    this.linkService.getSearchValues(this.link.id, search, expression).subscribe(s => this.values = s);
    this.page = 1;
  }

  goNext() {
    this.page++;
    this.formExpressions.controls.value.valid ?
      this.linkService.getPreviewValues(this.link.id, this.formExpressions.controls.value.value, this.page).subscribe(s => this.values = s) :
      this.getValues(this.link.id);
  }

  goLast() {
    this.page = this.values.pagination.totalPages;
    this.formExpressions.controls.value.valid ?
      this.linkService.getPreviewValues(this.link.id, this.formExpressions.controls.value.value, this.page).subscribe(s => this.values = s) :
      this.getValues(this.link.id);
  }

  goPrevious() {
    this.page--;
    this.formExpressions.controls.value.valid ?
      this.linkService.getPreviewValues(this.link.id, this.formExpressions.controls.value.value, this.page).subscribe(s => this.values = s) :
      this.getValues(this.link.id);
  }

  goFirst() {
    this.page = 1;
    this.formExpressions.controls.value.valid ?
      this.linkService.getPreviewValues(this.link.id, this.formExpressions.controls.value.value, this.page).subscribe(s => this.values = s) :
      this.getValues(this.link.id);
  }

}
