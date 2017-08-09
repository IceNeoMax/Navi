import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from "@angular/router";
import { TransferState } from '../../modules/transfer-state/transfer-state';

@Component({
  selector: 'home-view',
  template: `<h3 style="color: #f00">{{ message }}</h3>`
})
export class HomeView implements OnInit {
  constructor(
    private transferState: TransferState,
    private _router: Router,
  ) {}

  ngOnInit() {
    console.log("home");
    let lang = JSON.parse(localStorage.getItem('lang'));
    let listMenu = JSON.parse(localStorage.getItem('listMenu'+lang.langId));
    if(lang!=null && listMenu!=null)
      this._router.navigate(['/p/'+lang.langId+'/'+listMenu[0].id+'/'+listMenu[0].slug]);
    else
      this._router.navigate(['/p/5/324/vglobal-en']);
  }
}
