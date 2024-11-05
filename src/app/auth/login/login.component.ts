import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export default class LoginComponent implements OnInit {

  loginForm:FormGroup;
  userLoginOn:boolean=false;

  constructor(private formBuilder:FormBuilder, private router:Router ){
    this.loginForm=this.formBuilder.group({
      userId:['', [Validators.required]],
      password:['',[Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  login(){
    if(this.loginForm.valid){
      this.userLoginOn=true;
      console.log(this.userLoginOn);
      this.router.navigateByUrl('/dashboard');
      this.loginForm.reset();
    } else {
      this.loginForm.markAllAsTouched();
      alert("Error al iniciar sesión");
    }
  }
}
