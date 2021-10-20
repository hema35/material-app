import { Component, OnInit, ViewChild } from '@angular/core';
import { BookingsService } from 'src/app/services/bookings.service';
import { Booking } from 'src/app/models/booking';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-bookings-list',
  templateUrl: './bookings-list.component.html',
  styleUrls: ['./bookings-list.component.scss']
})
export class BookingsListComponent implements OnInit {

  bookings: MatTableDataSource<Booking>;
  columnsToDisplay: string[] = ['customerName','location','date','actions'];
  @ViewChild(MatPaginator) paginator:MatPaginator;
  @ViewChild(MatSort) sort:MatSort;
  rows: Booking[]=[];
  isLoadingCompleted: boolean=false;

  constructor(private bookingsService: BookingsService) { }

  ngOnInit(): void {
    this.bookingsService.getBookings().subscribe(
      (response: Booking[])=>{
        //create data source based on the response
        this.bookings = new MatTableDataSource<Booking>(response);

        //paginator
        this.bookings.paginator = this.paginator;

        //sort
        this.bookings.sort = this.sort;

        //footer
        this.rows = response;

        //isLoadingcompleted

        this.isLoadingCompleted = true;

      }, (error) =>
      {
        console.log(error);
      }
          )
  }

}
