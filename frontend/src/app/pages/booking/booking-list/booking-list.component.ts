import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgToastService } from 'ng-angular-popup';
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
  
  constructor(private modalService: NgbModal, private bookingService: BookingService, private productsService: ProductsService, private companyService: CompanyService, private userServive:UserService, private router: Router,private route: ActivatedRoute, private toast: NgToastService, public fb: FormBuilder) { 
  }
  ngOnInit(): void {

    this.bookingService.GetList().subscribe((res:any) => {
      this.bookings = res;

      // let result = res;
      // this.bookings = result.filter(ress => ress.id === 3)

    });
  }

}
