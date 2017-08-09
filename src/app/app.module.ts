import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeView } from './home/home-view.component';
import { PageView, SafeHtmlPipe } from './page/page-view.component';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    RouterModule.forRoot([
      { path: 'home', component: HomeView, pathMatch: 'full'},
      { path: 'p/:langId/:pageId/:pageSlug', component: PageView, pathMatch: 'full'},
      { path: '', redirectTo: '/home', pathMatch: 'full'},
      { path: '**', redirectTo: '/home', pathMatch: 'full'}
    ])
  ],
  declarations: [ AppComponent, HomeView, PageView, SafeHtmlPipe ],
  exports: [ AppComponent ]
})
export class AppModule {}
