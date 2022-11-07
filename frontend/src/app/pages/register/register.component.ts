import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public usertype: any;

  AddUserForm = new FormGroup({
    firstname:new FormControl(),
    lastname: new FormControl(),
    email: new FormControl(),
    phone: new FormControl(),
    password: new FormControl(),
    confirmPass: new FormControl()
  })

  constructor(private userServive:UserService, private router: Router, private toast: NgToastService) { }

  ngOnInit(): void {

    // AddUserForm =
    // '', [Validators.required, Validators.email]
  }
  
  AddUser()
  {
    if(this.AddUserForm.value.confirmPass == this.AddUserForm.value.password)
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
        }, (err) => {
      });
    }
    else
    {
      this.openWarning();
      console.log("password does not match");
      
    }
   
  }

  openWarning(){
    this.toast.warning({detail:'Warning',summary:'Password does not match', sticky:true,position:'tr'})
  }
  openSuccess(){
    this.toast.success({detail:'Success',summary:'Successfully register!', sticky:true,position:'tr'})
  }
 
}
