import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from "@angular/router";

@Component({
  selector: 'home-view',
  template: ``
})
export class HomeView implements OnInit {
  constructor(
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
