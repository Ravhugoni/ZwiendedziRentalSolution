import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgToastService } from 'ng-angular-popup';
import { Booking } from 'src/app/model/booking';
import { BookingService } from 'src/app/services/booking.service';
import { CompanyService } from 'src/app/services/company.service';
import { ProductsService } from 'src/app/services/products.service';
import { UserService } from 'src/app/services/user.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-booking-modal',
  templateUrl: './booking-modal.component.html',
  styleUrls: ['./booking-modal.component.scss']
})
export class BookingModalComponent implements OnInit {

  public sub!:any;

  BookingForm: FormGroup = new FormGroup({
    comp_id: new FormControl(''),
    user_id: new FormControl(''),
    car_id: new FormControl(''),
    pickup_date: new FormControl(''),
    dropoff_date: new FormControl(''),
    bk_status: new FormControl(''),
    bk_statuss: new FormControl('')
  });

  bid!:any;
  company!:any;
  bookings!: Booking;
  users!:any;
  decoded!:any;
  public loggedEmail:string = sessionStorage.getItem('loggedEmail');
  submitted = false;

  constructor(private modalService: NgbModal, private bookingService: BookingService, private productsService: ProductsService, private companyService: CompanyService, private userServive:UserService, private router: Router,private route: ActivatedRoute, private toast: NgToastService, public fb: FormBuilder) { 
    
    this.bookingService.GetList().subscribe((res:any) => {
      // this.bookings = res;
      let result = res;
      this.bookings = result.filter(ress => String(ress.id) === String(this.bid))

      if(this.bookings != undefined){
        this.BookingForm.setValue({  
          comp_id: this.bookings[0].comp_id,
          user_id: this.bookings[0].user_id,
          car_id: this.bookings[0].car_id,
          pickup_date: this.bookings[0].pickup_date,
          dropoff_date: this.bookings[0].dropoff_date,
          bk_status:this.bookings[0].bk_status,
          bk_statuss:this.bookings[0].bk_status
          }); 
      }
      
    });
  }

  myForm() {
    this.BookingForm = this.fb.group({
      comp_id: ['', [Validators.required ]],
      user_id: [''],
      car_id: [''],
      pickup_date: ['', [Validators.required ]],
      dropoff_date: ['', [Validators.required ]],
      bk_status:[''],
      bk_statuss:['']
    });
  }
  ngOnInit(): void {

    this.myForm();

    this.sub = this.route.params.subscribe(params => {
      return this.bid = params['id'];
    });

    console.log(this.bid);

    this.bookingService.GetList().subscribe((res:any) => {
      // this.bookings = res;
      let result = res;
      this.bookings = result.filter(ress => String(ress.id) === String(this.bid))
      console.log(this.bookings.carName);
    });


      console.log(this.BookingForm.value);

      // get company list
    this.companyService.GetList().subscribe((res:any) => {
      this.company = res;
    });

    //get users list
    this.userServive.GetAllUsers().subscribe((res:any) => {
      let result = res;
      
      this.users = result.filter(ress => ress.email === this.loggedEmail)
      console.log(this.users);
    });

  }

  updateBooking()
  {
    
    if(this.users[0].usertype =='admin')
    {
      let bookingDetails = {
        comp_id:this.BookingForm.value.comp_id,
        user_id: this.users[0].id,
        pickup_date: this.BookingForm.value.pickup_date,
        dropoff_date: this.BookingForm.value.dropoff_date,
        bk_status: this.BookingForm.value.bk_statuss
      }

      console.log(bookingDetails);

      this.bookingService.update(this.bid, bookingDetails).subscribe((next) => {
        this.router.navigate(['/booking']);
        this.toast.success({detail:'Success',summary:'Successfully Updated!', sticky:false,position:'tr', duration:6000})
        this.submitted = false;
      })

    }
    else{

      let bookingDetails = {
        comp_id:this.BookingForm.value.comp_id,
        user_id: this.users[0].id,
        pickup_date: this.BookingForm.value.pickup_date,
        dropoff_date: this.BookingForm.value.dropoff_date,
        bk_status: this.bookings[0].bk_status
      }

      console.log(bookingDetails);
      
      this.bookingService.update(this.bid, bookingDetails).subscribe((next) => {
        this.router.navigate(['/booking']);
        this.toast.success({detail:'Success',summary:'Successfully Updated!', sticky:false,position:'tr', duration:6000})
        this.submitted = false;
      })

    }


  }

  get formValidation(): { [key: string]: AbstractControl } {
    return this.BookingForm.controls;
  }


}
