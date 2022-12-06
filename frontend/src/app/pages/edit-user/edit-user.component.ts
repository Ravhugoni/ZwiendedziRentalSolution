import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { Users } from 'src/app/model/users';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})


export class EditUserComponent implements OnInit {



  EditUserForm: FormGroup = new FormGroup({
    firstname: new FormControl(),
    lastname: new FormControl(),
    phone: new FormControl(),
    email: new FormControl()
  });
  id!:any;
  uid!:any;
  sub!:any;
  users!:Users;

  submitted = false;

  public usertype: any;
 
  constructor(private userServive:UserService, private router: Router,private route: ActivatedRoute,
     private toast: NgToastService, public fb: FormBuilder, private spinnerService: NgxSpinnerService) { }

  myForm() {
    this.EditUserForm = this.fb.group({
      firstname: ['', [ Validators.required ]],
      lastname: ['', [ Validators.required ]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required,Validators.minLength(10),Validators.maxLength(10)]]
    });
  }

  ngOnInit(): void {

    this.myForm();
    this.showSpinner();

    this.sub = this.route.params.subscribe(params => {
      return this.uid = params['id'];
    });

    console.log(this.uid);

    this.userServive.GetAllUsers().subscribe((res:any) => {
        let result = res;
        this.users = result.filter(ures => String(ures.id) === String(this.uid))
        console.log(this.users)

        if(this.users!= undefined)
        {
          this.EditUserForm.setValue({
            firstname: this.users[0].firstname,
            lastname: this.users[0].lastname,
            email: this.users[0].email,
            phone: this.users[0].phone
          })
        }
    })


  }

  get formValidation(): { [key: string]: AbstractControl } {
    return this.EditUserForm.controls;
  }

  
  UpdateUser()
  {
    // let id=localStorage.getItem('user_id');
    // console.log(id)
      this.submitted = true;

      if(this.EditUserForm.value.firstname != '')
      {
        let userDetails = {
          firstname:this.EditUserForm.value.firstname,
          lastname: this.EditUserForm.value.lastname,
          email: this.EditUserForm.value.email,
          phone: this.EditUserForm.value.phone
        }
    
        console.log(userDetails);
    
        this.userServive.updateUser(this.uid, userDetails).subscribe((next) => {
            // console.log('Successfully Updated!');
            this.openSuccess();
            this.router.navigate(['/admin/users']);
 
            this.toast.success({detail:'success',summary:'Successfully Updated!', sticky:false,position:'tr', duration:6000})
            this.submitted = false;
          });
      }
      else
      {
        console.log('Successfully UNUpdated!');
        this.openWarning();
      }
   
  }

  showSpinner(): void {
    this.spinnerService.show();

    setTimeout(() => {
      this.spinnerService.hide();
    }, 1000); // 2 seconds
  }

  openWarning(){
    this.toast.warning({detail:'Warning',summary:'Please fill in all the fields...!', sticky:true,position:'tr'})
  }
  openSuccess(){
    this.toast.success({detail:'Success',summary:'Successfully updated!', sticky:true,position:'tr'})
  }
}

