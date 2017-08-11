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
  public isLoadding = false;
  public message: string;
  public sub:any;
  public pageData:any;
  public bg:string = "http://www.vglobal.asia/adminpanel/wp-content/uploads/2017/08/Simulation.jpg";
  public logo:string;
  public logoBanner:string;
  constructor(
      private transferState: TransferState,
      private _route: ActivatedRoute,
      private _http: Http
    ) {}

  ngOnInit() {
    this._getData();
  }
  _getData(){
    this.sub = this._route.params.subscribe(params => {
        let langId = params['langId'],
            pageId = params['pageId'];
        this.isLoadding = false;
        this._http.get('http://www.vglobal.asia/adminpanel/wp-json/wp/v2/posts/'+pageId).subscribe(data => {
            this.pageData = data.json();
            this._getbanner(this.pageData.better_featured_image.source_url);
            let img =  this._getImg(this.pageData.excerpt.rendered);
            this.logo = img.logo;
            this.logoBanner = img.logoBanner;
            this.isLoadding = true;
        });
    });   
  }
  _getbanner(bg) {
    this.bg = bg;
    let banner = document.getElementById('banner');
    banner.style.backgroundImage = "url('"+this.bg+"')";
  }

    _getImg(str:string){
        let n = str.length;
        str = str.substr(3,n-8);
        str = str.replace(/&#8220;/g,'"');
        str = str.replace(/&#8221;/g,'"');
        let result:any = JSON.parse(str);
        return result;
    }


}

@Pipe({ name: 'safeHtml'})
export class SafeHtmlPipe implements PipeTransform  {
  constructor(private sanitized: DomSanitizer) {}
  transform(value) {
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}
