import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Subject } from 'rxjs';

import { BookingService } from '../services/booking.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  EditProfileForm: FormGroup = new FormGroup({
    firstname: new FormControl(),
    lastname: new FormControl(),
    phone: new FormControl(),
    email: new FormControl()
  });
  public loggedEmail:string = sessionStorage.getItem('loggedEmail');

  public bookings!:any;
  public users!: any;
  sub!: any;
  uid!: any;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  submitted = false;

  constructor( private bookingService:  BookingService , private userServive: UserService, private route: ActivatedRoute, private router: Router, private toast: NgToastService, public fb: FormBuilder) { }

  myForm() {
    this.EditProfileForm = this.fb.group({
      firstname: ['', [ Validators.required ]],
      lastname: ['', [ Validators.required ]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required,Validators.minLength(10),Validators.maxLength(10)]]
    });
  }

  ngOnInit(): void { 

      this.myForm();

     this.bookingService.GetList().subscribe((res:any) => {
      // this.bookings = res;

      let result = res;
      this.bookings = result.filter(ress => ress.email === this.loggedEmail)
      console.log(this.bookings)
      this.dtTrigger.next(this.users);

      this.sub = this.route.params.subscribe(params => {
        return this.uid = params['id']
      })
  
    });

  console.log(this.uid);

    this.userServive.GetAllUsers().subscribe((res:any) => {
        let result = res;
        this.users = result.filter(res => res.email === this.loggedEmail);

        console.log(this.users)

        if(this.users!= undefined)
        {
          this.EditProfileForm.setValue({
            firstname: this.users[0].firstname,
            lastname: this.users[0].lastname,
            email: this.users[0].email,
            phone: this.users[0].phone
          })
        }
    })

  this.dtOptions = {
    pagingType: 'full_numbers',
    pageLength: 5,
    lengthMenu : [5, 10, 25],
    processing: true
   };

}

ngOnDestroy(): void {
  this.dtTrigger.unsubscribe();
}
  get formValidation(): { [key: string]: AbstractControl } {
    return this.EditProfileForm.controls;
  }

  
  UpdateUser()
  {
    // let id=localStorage.getItem('user_id');
    // console.log(id)
      this.submitted = true;

      if(this.EditProfileForm.value.firstname != '')
      {
        let userDetails = {
          firstname:this.EditProfileForm.value.firstname,
          lastname: this.EditProfileForm.value.lastname,
          email: this.EditProfileForm.value.email,
          phone: this.EditProfileForm.value.phone
        }
    
        console.log(userDetails);


        this.userServive.updateProfile(Number.parseInt(this.uid), userDetails).subscribe((next:any) => {
          this.openSuccess();
          this.router.navigate(['/profile']);

          this.toast.success({detail:'success',summary:'Successfully Updated!', sticky:false,position:'tr', duration:6000})
          this.submitted = false;
        });
    }
    else
    {
      console.log('Successfully Updated!');
      this.openWarning();
    }
 
}

openWarning(){
  this.toast.warning({detail:'Warning',summary:'Please fill in all the fields...!', sticky:true,position:'tr'})
}
openSuccess(){
  this.toast.success({detail:'Success',summary:'Successfully updated!', sticky:true,position:'tr'})
}
}


  
