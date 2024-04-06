import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelComePageComponent } from './wel-come-page/wel-come-page.component';
import { SinupAndLoginPageComponent } from './sinup-and-login-page/sinup-and-login-page.component';
import { WinerListComponent } from './winer-list/winer-list.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'sessions/signin_&_signup',
    pathMatch: 'full'
  },
  {
    path: 'sessions',
    children: [
      {
        path: 'signin_&_signup',
        component: SinupAndLoginPageComponent,
        data: { title: 'signin_&_signup', breadcrumb: 'signin_&_signup', state: 'signin_&_signup' }
      },
    ]
  },
  {
    path: 'wel-come',
    children: [
      {
        path: 'congratulation/:name',
        component: WelComePageComponent,
        data: { title: 'wel-come', breadcrumb: 'wel-come', state: 'wel-come' }
      },
    ]
  },
  {
    path: 'winer',
    children: [
      {
        path: 'all-winers-list',
        component: WinerListComponent,
        data: { title: 'all-winers-list', breadcrumb: 'all-winers-list', state: 'all-winers-list' }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
