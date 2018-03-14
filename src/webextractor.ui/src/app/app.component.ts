import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private autofocus_enabled: boolean = true;

  ngAfterViewChecked() {

    this.autofocus_enabled && this.autofocusCallback();

  }

  onActivated() {

    this.autofocus_enabled = true;

  }

  autofocusCallback() {
    var ctrl = <HTMLInputElement>document.getElementsByClassName('autofocus')[0];
    if (ctrl == null)
      return;
    ctrl.classList.remove('autofocus');
    ctrl.focus();
    this.autofocus_enabled = false;

    // console.log('autofocus called');
  }

}