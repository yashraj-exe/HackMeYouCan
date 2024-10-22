import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AppAuthServiceService } from '../service/app-auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sinup-and-login-page',
  templateUrl: './sinup-and-login-page.component.html',
  styleUrls: ['./sinup-and-login-page.component.scss']
})
export class SinupAndLoginPageComponent implements OnInit {

  title = 'hackMeDummyBrute';

  isSinupForm: boolean = true;
  isLogin() {
    if (this.isSinupForm) {
      this.isSinupForm = false;
      this.ngOnInit();
    }
  }
  isSignup() {
    if (!this.isSinupForm) {
      this.isSinupForm = true;
      this.ngOnInit();
    }
  }
  constructor(private fb: FormBuilder,
    private authService: AppAuthServiceService,
    private router: Router,
  ) {

  }
  sinup: FormGroup;
  get sinupControls(): any { return this.sinup?.controls; }
  login: FormGroup;
  get loginControls(): any { return this.login?.controls; }

  ngOnInit() {
    this.backgroundCode();
    this.sinup = this.fb.group({
      userName: [{ value: "", disabled: false }, [Validators.required, Validators.minLength(2), Validators.maxLength(25), Validators.pattern('(^[a-zA-Z\. ]+$)')]],
      section: [{ value: "", disabled: false }, [Validators.required]],
      rollno: [{ value: "", disabled: false }, [Validators.required]],
      email: [{ value: "", disabled: false }, [Validators.required, Validators.pattern(this.emailRegex)]],
      phone: [{ value: "", disabled: false }, [Validators.required, Validators.pattern(this.phoneRegex)]],
    });

    this.login = this.fb.group({
      email: [{ value: "", disabled: false }, [Validators.required, Validators.pattern(this.emailRegex)]],
      password: [{ value: "", disabled: false }, [Validators.required]],
    });
  }

  backgroundCode() {
    // Background code.
    const cavas: any = document.querySelector('canvas');
    const ctx = cavas?.getContext('2d');
    const width = window?.innerWidth;
    cavas.width = window?.innerWidth;
    const height = window?.innerHeight;
    cavas.height = window?.innerHeight;
    const str = "A+jk js:2 @dfs 17 tr YY ufds M5r P87 #18 $!& ^dfs $Ew er JH # $ * . (! ;) , : :";
    const matrix = str.split('');

    const font = 12;
    const col = width / font;
    const arr: any[] = [];

    for (let i = 0; i < col; i++) {
      arr[i] = 1;
    }

    const draw = () => {
      ctx.fillStyle = "rgba(0,0,0,0.05)";
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = "#00FF00";
      ctx.font = `${font}px system-ui`;

      for (let i = 0; i < arr.length; i++) {
        const txt = matrix[Math.floor(Math.random() * matrix.length)];
        ctx.fillText(txt, i * font, arr[i] * font);

        if (arr[i] * font > height && Math.random() > 0.975) {
          arr[i] = 0;
        }
        arr[i]++;
      }
    }

    setInterval(draw, 50);

    window.addEventListener('resize', () => location.reload());
  }
  // Signup Form validaions
  emailRegex: any = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  phoneRegex: any = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

  message: string = "";
  validateSignupForm = (value: any) => {
    console.log('====================================');
    console.log(value);
    console.log('====================================');
    const req = {
      "name": value?.userName,
      "email": value?.email,
      "phone": value?.phone,
      "section": value?.section,
      "rollNumber": value?.rollno
    }

    console.log(">>>>>>>>>>>>>>", req);

    this.getItemSub = this.authService?.post(req, 'user/register').subscribe((res: any) => {
      console.log(res);
      if (res?.status === 'SUCCESS') {
        this.isLogin();
        this.myFunction("success");
        this.message = res?.message;
      }
      else {
        this.myFunction("error");
        this.message = res?.message;
      }
    });
  }

  // Login Form validaions
  validateLoginForm = (value: any) => {
    this.getItemSub = this.authService?.post(value, 'user/login').subscribe((res: any) => {
      console.log(res);
      if (res?.status === 'SUCCESS') {
        sessionStorage.setItem('token', res?.token);
        this.myFunction("success");
        this.message = res?.message;
        setTimeout(() => {
          this.router.navigateByUrl(`wel-come/congratulation/${res?.message}`);
        }, 1500);
      } else {
        this.myFunction("error");
        this.message = res?.message;
      }
    });
  }

  public getItemSub: Subscription;

  // ngOnDestroy
  ngOnDestroy(): void {
    if (this.getItemSub) {
      this.getItemSub.unsubscribe();
    }
  }

  myFunction(status: string) {
    const x: any = document.querySelector("#snackbar")?.classList;
    // x.className = "show";
    console.log(x);
    
    x.add("show", status);
    setTimeout(() => { x.remove("show", status); }, 4000);
  }

  getLeaderBoard(){
    this.router.navigateByUrl(`winer/all-winers-list`);
  }
}
