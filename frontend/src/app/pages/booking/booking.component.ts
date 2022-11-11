import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BookingModalComponent } from './booking-modal/booking-modal.component';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {

  constructor(private modalService: NgbModal, private bookingService: BookingService) { }

  bookings: any;

  ngOnInit(): void {

    this.bookingService.getAll().subscribe((result)=>{
      this.bookings = result;
          
  });

  // open_booking_modal() {
  //   const modalRef = this.modalService.open(BookingModalComponent, { size: "lg" });
  //   modalRef.componentInstance.id=2;
  
  // }
}
}
