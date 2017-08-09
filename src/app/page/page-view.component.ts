import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TransferState } from '../../modules/transfer-state/transfer-state';
import { ActivatedRoute } from '@angular/router';
import { Http } from "@angular/http";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'page-view',
  templateUrl: './page-view.component.html'
})
export class PageView implements OnInit {
  public message: string;
  public sub:any;
  public pageData:any;
  public bg:String = "http://www.vglobal.asia/adminpanel/wp-content/uploads/2017/08/Simulation.jpg";
  constructor(
      private transferState: TransferState,
      private _route: ActivatedRoute,
      private _http: Http
    ) {}

  ngOnInit() {
    this._getData();
    let banner = document.getElementById('banner');
    banner.style.backgroundImage = "url('"+this.bg+"')";
  }
  _getData(){
    this.sub = this._route.params.subscribe(params => {
        let langId = params['langId'],
            pageId = params['pageId'];
        if(localStorage.getItem('listMenu'+langId)!=null) {
            let listPage = JSON.parse(localStorage.getItem('listMenu'+langId));
            this.pageData = listPage.find((element)=>{
                return element.id = pageId;
            });
            //localStorage.setItem('logo', JSON.stringify(this.pageData.));
        }
        this._http.get('http://www.vglobal.asia/adminpanel/wp-json/wp/v2/posts/'+pageId).subscribe(data => {
            this.pageData = data.json();
        });
    });   
  }
}

@Pipe({ name: 'safeHtml'})
export class SafeHtmlPipe implements PipeTransform  {
  constructor(private sanitized: DomSanitizer) {}
  transform(value) {
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}
