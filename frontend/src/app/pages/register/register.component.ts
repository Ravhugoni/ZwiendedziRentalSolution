import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  

  AddUserForm: FormGroup = new FormGroup({
    firstname: new FormControl(),
    lastname: new FormControl(),
    phone: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
    confirmPass: new FormControl()
  });

  submitted = false;

  public usertype: any;
 
  constructor(private userServive:UserService, private router: Router, private toast: NgToastService, public fb: FormBuilder) { 
    this.myForm();
  }

  myForm() {
    this.AddUserForm = this.fb.group({
      firstname: ['', [ Validators.required ]],
      lastname: ['', [ Validators.required ]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
      password: ['', [ Validators.required ]],
      confirmPass: ['',[ Validators.required ]]
    });
  }

  ngOnInit(): void {

  }

  get formValidation(): { [key: string]: AbstractControl } {
    return this.AddUserForm.controls;
  }

  
  AddUser()
  {
    
      this.submitted = true;

      if(this.AddUserForm.value.confirmPass === this.AddUserForm.value.password && this.AddUserForm.value.firstname != '')
      {
        let userDetails = {
          firstname:this.AddUserForm.value.firstname,
          lastname: this.AddUserForm.value.lastname,
          email: this.AddUserForm.value.email,
          phone: this.AddUserForm.value.phone,
          password: this.AddUserForm.value.password,
          usertype: "client"
        }
    
        console.log(userDetails);
    
        this.userServive.AddUser(userDetails).subscribe((next:any) => {
            console.log('Add successfully!');
            this.openSuccess();
            this.router.navigate(['/']);

            sessionStorage.setItem('token', JSON.stringify(userDetails)); 
 
            this.submitted = false;
          }, (err) => {
            this.toast.warning({detail:'Warning',summary:'Fillup the form or Email already exist', sticky:true,position:'tr'})
        });
      }
      else
      {
        this.openWarning();
      }
   
  }

  openWarning(){
    this.toast.warning({detail:'Warning',summary:'Password does not match', sticky:true,position:'tr'})
  }
  openSuccess(){
    this.toast.success({detail:'Success',summary:'Successfully register!', sticky:true,position:'tr'})
  }
 
}
