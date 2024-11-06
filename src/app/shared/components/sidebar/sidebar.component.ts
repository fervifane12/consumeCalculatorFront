import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LoginService } from '../../../services/auth/login.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgIf],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit{
  
  userLoginOn:boolean = false;

  constructor(private http:HttpClient, private loginService:LoginService) { }

  ngOnInit(): void {
  }

  isLogedIn(){
    if (this.loginService.isLoggedIn()){
      this.userLoginOn=true;
      console.log(this.userLoginOn);
    } 
  }
}
