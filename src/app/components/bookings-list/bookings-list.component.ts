import { Component, OnInit } from '@angular/core';
import { BookingsService } from 'src/app/services/bookings.service';
import { Booking } from 'src/app/models/booking';

@Component({
  selector: 'app-bookings-list',
  templateUrl: './bookings-list.component.html',
  styleUrls: ['./bookings-list.component.scss']
})
export class BookingsListComponent implements OnInit {

  bookings: Booking[] = [];
  columnsToDisplay: string[] = ['customerName','location','date','actions'];

  constructor(private bookingsService: BookingsService) { }

  ngOnInit(): void {
    this.bookingsService.getBookings().subscribe(
      (response: Booking[])=>{
        this.bookings = response;
      }, (error) =>
      {
        console.log(error);
      }
          )
  }

}
