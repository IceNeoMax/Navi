import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TransferState } from '../../modules/transfer-state/transfer-state';

@Component({
  selector: 'home-view',
  template: `<h3 style="color: #f00">{{ message }}</h3>`
})
export class HomeView implements OnInit {
  public message: string;

  constructor(private transferState: TransferState) {}

  ngOnInit() {
    this.message = this.transferState.get('message');
    console.log("gb",JSON.parse(localStorage.getItem('langList')));
  }
}
