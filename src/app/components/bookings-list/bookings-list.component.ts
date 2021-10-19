import { Component, OnInit } from '@angular/core';
import { BookingsService } from 'src/app/services/bookings.service';
import { Booking } from 'src/app/models/booking';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-bookings-list',
  templateUrl: './bookings-list.component.html',
  styleUrls: ['./bookings-list.component.scss']
})
export class BookingsListComponent implements OnInit {

  bookings: MatTableDataSource<Booking>;
  columnsToDisplay: string[] = ['customerName','location','date','actions'];

  constructor(private bookingsService: BookingsService) { }

  ngOnInit(): void {
    this.bookingsService.getBookings().subscribe(
      (response: Booking[])=>{
        this.bookings = new MatTableDataSource<Booking>(response);
      }, (error) =>
      {
        console.log(error);
      }
          )
  }

}
