import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {
countries:any;
formGroup: FormGroup;
customErrorStateMatcher: CustomErrorStateMatcher = new CustomErrorStateMatcher();
cities:any[]=[
  {id:1, cityName:"Abudhabi"},
  {id:2, cityName:"Abudhabi"},
  {id:2, cityName:"Amsterdam"},
  {id:3, cityName:"Berlin"},
  {id:4, cityName:"Chicago"},
  {id:5, cityName:"Doha"},
  {id:6, cityName:"Dubai"},
  {id:7, cityName:"Istanbul"},
  {id:8, cityName:"Lasvegas"},
  {id:9, cityName:"London"},
  {id:10, cityName:"LosAngeles"},
  {id:11, cityName:"Moscow"},
  {id:12, cityName:"Newyork"},
  {id:13, cityName:"Paris"},
  {id:14, cityName:"SanFransico"},
  {id:15, cityName:"Seoul"},
  {id:16, cityName:"Singapore"},
  {id:17, cityName:"Sydney"},
  {id:18, cityName:"Tokyo"},
  {id:19, cityName:"Toronto"},
  {id:20, cityName:"Washington"},
];

  constructor(private countriesService:CountriesService) {
    this.formGroup = new FormGroup(
      {
        email: new FormControl(null),
        customerName: new FormControl(null),
        country: new FormControl(null),
        city: new FormControl(null)
      }
    )
   }

  ngOnInit(): void {
  }

}
