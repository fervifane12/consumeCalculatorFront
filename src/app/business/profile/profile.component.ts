import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from '../../services/profile/profile.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export default class ProfileComponent {
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

  ngOnInit(): void{
    this.route.data.subscribe(data =>{
      this.formType = data['formType']
    })
    this.userId = this.route.snapshot.paramMap.get('userId');
    this.getUser();
  }

  getUser(){
    this.profileService.getUser(String(this.userId)).subscribe(
      response=> {console.log("GET was succesful.", response);
        this.profileForm.patchValue(response);
      },
      error=> {console.error("There was an error with the GET request.", error);
      }
    )
  }

  updateUser(){
    const userId = String (this.userId);
    const body = this.profileForm.value;
    this.profileService.updateUser(userId, body).subscribe(
      response =>{
        console.log("PUT was successful", response);
      },
      error =>{
        console.error("There was an error with the PUT request", error);
      }
    )
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
    if(this.userId){
      this.updateUser();
    } else {
      this.createUser();
    }
  }
}
