import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/auth/login.service';
import { LoginRequest } from '../../services/auth/login-request';
import { HttpClient} from '@angular/common/http';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export default class LoginComponent implements OnInit {
  errorMessage: string = '';
  loginForm:FormGroup;
  userLoginOn:boolean=false;

  constructor(private formBuilder:FormBuilder, private router:Router, private loginService: LoginService, private http:HttpClient){
    this.loginForm=this.formBuilder.group({
      userId:['', [Validators.required]],
      password:['',[Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  login(){
    if(this.loginForm.valid){
      this.loginService.login(this.loginForm.value as LoginRequest).subscribe({
        next: response =>{
          console.log(response);
          if(response==='Login successful'){
            this.loginService.setSession(response);
            this.router.navigate(['/dashboard']);
            
          } else {
            this.errorMessage = 'Invalid credentials';
          }
        },
        error: error =>{console.error("There was an error with the POST request", error);}
      }
      );
    } else {
      this.loginForm.markAllAsTouched();
      alert("Error al iniciar sesión");
    }
  }
}
