import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { BookingService } from 'src/app/services/booking.service';
import { CompanyService } from 'src/app/services/company.service';
import { ProductsService } from 'src/app/services/products.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.scss']
})
export class BookingListComponent implements OnInit {

  bookings!:any;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  
  constructor(private modalService: NgbModal, private bookingService: BookingService, 
    private productsService: ProductsService, private companyService: CompanyService, 
    private userServive:UserService, private router: Router,private route: ActivatedRoute, 
    private toast: NgToastService, public fb: FormBuilder,private spinnerService: NgxSpinnerService) { 
  }
  ngOnInit(): void {

    this.showSpinner();
    this.bookingService.GetList().subscribe((res:any) => {
      this.bookings = res;

      this.dtTrigger.next(this.bookings);
      // let result = res;
      // this.bookings = result.filter(ress => ress.id === 3)

    });

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      lengthMenu : [5, 10, 25],
      processing: true
     };

  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  showSpinner(): void {
    this.spinnerService.show();

    setTimeout(() => {
      this.spinnerService.hide();
    }, 1000); // 2 seconds
  }

}
