import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppAuthServiceService } from '../service/app-auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-winer-list',
  templateUrl: './winer-list.component.html',
  styleUrls: ['./winer-list.component.scss']
})
export class WinerListComponent implements OnInit {

  constructor(
    private authService: AppAuthServiceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllData();
  }

  public getItemSub: Subscription;

  // ngOnDestroy
  ngOnDestroy(): void {
    if (this.getItemSub) {
      this.getItemSub.unsubscribe();
    }
  }

  allWiners: any[] = [];
  getAllData() {
    this.getItemSub = this.authService?.get('users/get_winners').subscribe((res: any) => {
      console.log(res);
      if (res?.status === 'SUCCESS') {
        this.allWiners = [...res?.data].sort((a, b) => a?.hitCount - b?.hitCount);
      }
    });
  }

  isExit() {
    this.router.navigateByUrl(`sessions/signin_&_signup`);
  }

}
