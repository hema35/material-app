import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CustomErrorStateMatcher } from 'src/app/helpers/customErrorStateMatcher';
import { CitiesService } from 'src/app/services/cities.service';
import { CountriesService } from 'src/app/services/countries.service';
import { City } from 'src/app/models/City';
import { tap, switchMap, debounceTime } from 'rxjs/operators';
@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent implements OnInit {
  countries: any;
  formGroup: FormGroup;
  customErrorStateMatcher: CustomErrorStateMatcher =
    new CustomErrorStateMatcher();
  cities: City[] = [];
  isCitiesLoading:boolean = false;

  constructor(
    private countriesService: CountriesService,
    private citiesService: CitiesService
  ) {
    this.formGroup = new FormGroup({
      email: new FormControl(null),
      customerName: new FormControl(null),
      country: new FormControl(null),
      city: new FormControl(null),
      receiveNewsLetters: new FormControl(null),
    });
  }

  ngOnInit(): void {
    this.countriesService.getCountries().subscribe(
      (response) => {
        this.countries = response;
      },
      (error) => {
        console.log(error);
      }
    );

    this.citiesService.getCities(this.formGroup.controls['city'].value).subscribe(
      (response) => {
        this.cities = response;
      },
      (error) => {
        console.log(error);
      }
    );
    //ngOnit
    this.getFormControl("city").valueChanges
    .pipe(
      debounceTime(500),

      //tap: do something before making http request
      tap(()=>{
        this.cities = [];
        this.isCitiesLoading = true;
      }),

      //switchMap
      switchMap((value:any)=>{
        return this.citiesService.getCities(value);
      })

    ).subscribe((response)=>{
      this.cities=response;
      this.isCitiesLoading = false;
    });
  }
  getFormControl(controlName: string): FormControl {
    return this.formGroup.get(controlName) as FormControl;
  }

  getErrorMessage(controlName: string, errorType: string): string {
    switch (controlName) {
      case 'customerName': {
        if (errorType === 'required') return 'you must specify ';
        else if (errorType === 'maxlength')
          return 'can contain upto 30 characters';
        else if (errorType === 'pattern') return 'can contain alphabets';
        else return '';
      }

      case 'email': {
        if (errorType === 'required') return 'you must specify ';
        else if (errorType === 'email')
          return '<strong>Email</strong>should be in correct format';
        else return '';
      }

      case 'country': {
        if (errorType === 'required') return 'you must select ';
        else return '';
      }

      default:
        return '';
    }
  }
}
