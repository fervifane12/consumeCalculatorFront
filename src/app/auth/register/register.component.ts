import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfileService } from '../../services/profile/profile.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export default class RegisterComponent {
  
  userId: string | null = null;
  profileForm: FormGroup;
  formType: string = '';

  constructor(private profileService:ProfileService, private route: ActivatedRoute, private formBuilder: FormBuilder){
    this.profileForm = this.formBuilder.group({
      userId:['', Validators.required],
      full_name:['', Validators.required],
      email:['', Validators.required],
      password:['', Validators.required],
      address:['', Validators.required]
    })
  }
  createUser(){
    const body = this.profileForm.value;
    this.profileService.createUser(body).subscribe(
      response =>{
        console.log("POST was successful", response);
      },
      error =>{
        console.error("There was an error with the POST request", error);
      }
    )
  }
  onSubmit() {
    this.createUser
  }
  ngOnInit(): void{
    this.route.data.subscribe(data =>{
      this.formType = data['formType']
    })
  }

}
