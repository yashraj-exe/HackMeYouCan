import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppAuthServiceService } from '../service/app-auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wel-come-page',
  templateUrl: './wel-come-page.component.html',
  styleUrls: ['./wel-come-page.component.scss']
})
export class WelComePageComponent implements OnInit {

  getToken: any = "";
  constructor(
    private authService: AppAuthServiceService,
    private router: Router
  ) {
    this.getToken = sessionStorage.getItem('token');


  }

  message: string = "";

  ngOnInit(): void {
    if (this.getToken !== null && this.getToken !== undefined && this.getToken !== "") {
      this.background();
      // this.conten();
      this.getItemSub = this.authService?.get('user/winner').subscribe((res: any) => {
        console.log(res);
        if (res?.status === 'SUCCESS') {
          this.message = res?.message;
        }
      });
    } else {
      this.router?.navigateByUrl('sessions/signin_&_signup');
    }
  }

  public getItemSub: Subscription;

  // ngOnDestroy
  ngOnDestroy(): void {
    if (this.getItemSub) {
      this.getItemSub.unsubscribe();
    }
  }

  background() {
    const canvas: any = document.getElementById("fallingLeavesCanvas");
    const ctx = canvas.getContext("2d");
    const leaves: any[] = [];
    const numLeaves = 100;

    canvas.width = window?.innerWidth;
    canvas.height = window?.innerHeight;

    function createLeaf() {
      return {
        x: Math.random() * canvas?.width,
        y: Math.random() * 18 + 2,
        size: Math.random() * 22 + 3, // Random size between 3 and 25
        speed: Math.random() * 3 + 1, // Random speed between 1 and 4
        color: `rgba(${Math.random() * 200 + 50}, ${Math.random() * 200 + 50}, ${Math.random() * 200 + 50}, ${Math.random() * 0.8 + 0.2})`, // Random color
        //color: `rgba(255, ${Math.random() * 100 + 100}, 0, ${Math.random() * 0.8 + 0.2})`, // Random orange-ish color
        //color: '#000A',
        rotation: Math.random() * 360 // Random initial rotation
      };
    }

    function createLeaves() {
      for (let i = 0; i < numLeaves; i++) {
        leaves.push(createLeaf());
      }
    }

    function updateLeaves() {
      for (let i = 0; i < leaves.length; i++) {
        const leaf = leaves[i];
        leaf.y += leaf.speed;
        leaf.x += 1.0 * Math.sin(leaf.y / leaf.size);

        if (leaf.y > canvas.height) {
          // Reset the leaf when it goes below the canvas
          leaf.y = -20;
          leaf.x = Math.random() * canvas.width;
        }
      }
    }

    function drawLeaves() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < leaves.length; i++) {
        const leaf = leaves[i];

        ctx.save();
        ctx.translate(leaf.x + leaf.size / 2, leaf.y + leaf.size / 2);
        ctx.rotate((leaf.rotation * Math.PI) / 180);
        ctx.fillStyle = leaf.color;
        ctx.fillRect(-leaf.size / 2, -leaf.size / 2, leaf.size, leaf.size);

        //ctx.beginPath();
        //ctx.arc(200,150,leaf.size,0,0.5*Math.PI);
        //ctx.arc(200+leaf.size,150+leaf.size,leaf.size,Math.PI, 1.5*Math.PI);
        //ctx.fillStyle = leaf.color;
        //ctx.fill();
        //ctx.closePath();  

        ctx.restore();
      }
    }

    function animate() {
      updateLeaves();
      drawLeaves();
      requestAnimationFrame(animate);
    }

    function onWindowResize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    window.addEventListener("resize", onWindowResize);
    createLeaves();
    animate();

    function changeTextColor() {
      const textContainer: any = document.getElementById("text-container");
      const words: any = textContainer.innerText.split(" ");

      const coloredWords = words.map((word: any) => {
        const randomColor = getRandomColor();
        return `<span style="color: ${randomColor};">${word}</span>`;
      });

      textContainer.innerHTML = coloredWords.join(" ");
    }

    function getRandomColor() {
      const letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }

    //function getRandomColor() {
    //  return Math.random() * 0xffffff;
    //}

    setInterval(changeTextColor, 500);
  }

  conten() {
    let interations = 0;
    const letters = ("abcdefghijklmnopqrstuvwxyz").toUpperCase();
    const element: any = document.querySelector("#winYou");
    element.onmouseover = (event: any) => {
      const element_II: any = document.querySelector("h1");
      const interval = setInterval(() => {
        element_II.innerText = element_II?.innerText.split("")
          .map((letter: any, index: number) => {
            if (index < interations) {
              return this.message[index];
            }
            return letters[Math.floor(Math.random() * 26)]
          }).join("");
        if (interations >= this.message.length) {
          clearInterval(interval);
        }
        interations += 1 / 3;
      }, 50);
    }
  }

}
