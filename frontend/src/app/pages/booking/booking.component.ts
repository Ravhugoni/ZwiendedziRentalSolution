import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BookingModalComponent } from './booking-modal/booking-modal.component';
import { BookingService } from 'src/app/services/booking.service';
import { CompanyService } from 'src/app/services/company.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {

  public sub!:any;
  public cars!:any[];

  BookingForm: FormGroup = new FormGroup({
    comp_id: new FormControl(''),
    user_id: new FormControl(''),
    car_id: new FormControl(''),
    pickup_date: new FormControl(''),
    dropoff_date: new FormControl('')
  });

  submitted = false;

  constructor(private modalService: NgbModal, private bookingService: BookingService, private productsService: ProductsService, private companyService: CompanyService, private userServive:UserService, private router: Router,private route: ActivatedRoute, private toast: NgToastService, public fb: FormBuilder) { 
    this.myForm();
  }

  myForm() {
    this.BookingForm = this.fb.group({
      comp_id: ['', [Validators.required ]],
      user_id: [''],
      car_id: [''],
      pickup_date: ['', [Validators.required ]],
      dropoff_date: ['', [Validators.required ]]
    });
  }

  bookings: any[];
  users: any[];
  company: any;
  cid!:number;

  ngOnInit(): void {

    this.sub = this.route.params.subscribe(params => {
      return this.cid = params['id'];
    });

    if(this.cid > 0)
    {
    //     //filter list by car_id
      this.productsService.GetList().subscribe((res:any) => {
        let result = res;

        console.log(result);
        console.log(this.cid);
        
        this.cars = result.filter(carRess => String(carRess.id) === String(this.cid))
        console.log(this.cars)
      });

    }
    else{
      console.log("No car Id");
    }

    this.userServive.GetAllUsers().subscribe((res:any) => {
      // this.users = res;
      let result = res;
      this.users = result.filter(ress => ress.email === "test@mail.com")
      console.log(this.users);
    });

    this.bookingService.GetList().subscribe((res:any) => {
      this.bookings = res;

      // let result = res;
      // this.bookings = result.filter(ress => ress.id === 3)

    });

    this.companyService.GetList().subscribe((res:any) => {
      this.company = res;
    });

  }

  
  get formValidation(): { [key: string]: AbstractControl } {
    return this.BookingForm.controls;
  }

  addBooking()
  { 
    this.submitted = true;
    if(this.BookingForm.value.comp_id != null && this.BookingForm.value.comp_id != '')
    {

      let bookingDetails = {
        comp_id:this.BookingForm.value.comp_id,
        user_id: this.users[0].id,
        car_id: this.cid,
        pickup_date: this.BookingForm.value.pickup_date,
        dropoff_date: this.BookingForm.value.dropoff_date,
        bk_status: 'pending'
      }
  
      console.log(bookingDetails);
  
      this.bookingService.AddBooking(bookingDetails).subscribe((next:any) => {
          console.log('Add successfully!');
          this.openSuccess();
          this.submitted = false;
        });
    }
    else{

    }
  }
  openSuccess(){
    this.toast.success({detail:'Success',summary:'Successfully Booked!', sticky:true,position:'tr'})
  }
  openWarning(){
    this.toast.warning({detail:'Warning',summary:'Sorry! something went wrong', sticky:true,position:'tr'})
  }

}
