import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  public rout:any;

  constructor(private router: Router) { }

  ngOnInit(): void {

    if(this.router.url === "/"){
      this.rout = this.router.url;
    }
    if(this.router.url === "/promotion")
    {
      this.rout = this.router.url;
    }
    
  }

}
