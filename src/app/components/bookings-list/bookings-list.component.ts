import { Component, OnInit, ViewChild } from '@angular/core';
import { BookingsService } from 'src/app/services/bookings.service';
import { Booking } from 'src/app/models/booking';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-bookings-list',
  templateUrl: './bookings-list.component.html',
  styleUrls: ['./bookings-list.component.scss']
})
export class BookingsListComponent implements OnInit {

  bookings: MatTableDataSource<Booking>;
  columnsToDisplay: string[] = ['customerName','location','date','actions'];
  @ViewChild(MatPaginator) paginator:MatPaginator;

  constructor(private bookingsService: BookingsService) { }

  ngOnInit(): void {
    this.bookingsService.getBookings().subscribe(
      (response: Booking[])=>{
        this.bookings = new MatTableDataSource<Booking>(response);
        this.bookings.paginator = this.paginator;
      }, (error) =>
      {
        console.log(error);
      }
          )
  }

}
