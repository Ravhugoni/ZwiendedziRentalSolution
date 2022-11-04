import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  AddUserForm = new FormGroup({
    firstname:new FormControl(),
    lastname: new FormControl(),
    email: new FormControl(),
    phone: new FormControl(),
    password: new FormControl(),
    usertype: new FormControl(),
    confirmPass: new FormControl()
  })

  constructor(private userServive:UserService) { }

  ngOnInit(): void {

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
        usertype: this.AddUserForm.value.usertype
      }
  
      console.log(userDetails);
  
      this.userServive.AddUser(userDetails).subscribe((next:any) => {
          console.log('Add successfully!');
        }, (err) => {
      });
    }
    else
    {
      console.log("password does not match");
    }
   
  }

}
