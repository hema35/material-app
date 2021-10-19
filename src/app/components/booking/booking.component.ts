import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomErrorStateMatcher } from 'src/app/helpers/customErrorStateMatcher';
import { CitiesService } from 'src/app/services/cities.service';
import { CountriesService } from 'src/app/services/countries.service';
import { City } from 'src/app/models/City';
import { tap, switchMap, debounceTime, map, startWith } from 'rxjs/operators';
import { Fruit } from 'src/app/models/fruit';
import { Observable } from 'rxjs';
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
  isCitiesLoading: boolean = false;
  //checkbox group
  hobbies: any[] = [
    { id: 1, hobbyName: 'Music' },
    { id: 2, hobbyName: 'Food' },
    { id: 3, hobbyName: 'Travel' },
    { id: 4, hobbyName: 'Pets' },
    { id: 5, hobbyName: 'Hiking' },
  ];

  //date picker
  minDate: Date = new Date('1950-01-01');
  maxDate: Date = new Date('2010-12-31');
  dateHint: string = 'Choose date of birth';
  startDate: Date = new Date('2002-01-02');

  dateFilter(date: any) {
    return date && date.getDay() !== 0 && date.getDay() !== 6;
  }

  onDateChange() {
    if (this.formGroup.value.dateOfBirth) {
      let date = new Date(this.formGroup.value.dateOfBirth);
      this.dateHint = `You born on ${date
        .toString()
        .substr(0, date.toString().indexOf(''))}`;
    } else {
      this.dateHint = 'Choose date of birth';
    }
  }

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
      hobbies: new FormArray([]),
      allHobbies: new FormControl(false),
      gender: new FormControl(null, [Validators.required]),
      dateOfBirth: new FormControl(null),
      studyPeriodStart: new FormControl(null),
      studyPeriodEnd: new FormControl(null),
      expertiseLevel: new FormControl(null),
      fruits: new FormControl(null),
    });

    //add form controls to form array
    this.hobbies.forEach(() => {
      this.hobbiesFormArray.push(new FormControl(false));
    });

    //chips
    this.AllCountriesClicked();

    //chips with autocomplete
    this.filteredFruits = this.getFormControl("fruits").valueChanges.pipe(startWith(""),
    map((fruit: string|null)=>{
      return fruit?
      (()=>{
        return this.allFruits.filter(fruitObj => fruitObj.name.toLowerCase().indexOf(fruit.toLowerCase())===0);
      } )()
      : this.allFruits.slice();
    }));
  }

  get hobbiesFormArray(): FormArray {
    return this.formGroup.get('hobbies') as FormArray;
  }

  //executes when the user clicks on all checkbox
  onAllHobbiesCheckBoxChange() {
    this.hobbiesFormArray.controls.forEach((hobby, index: any) => {
      this.hobbiesFormArray
        .at(index)
        .patchValue(this.formGroup.value.allHobbies);
    });
  }

  //returns true,if all hobby checkboxes are checked
  allHobbiesSelected(): boolean {
    return true; // this.hobbiesFormArray.value.every(val => val === true);
  }

  noHobbiesSelected(): boolean {
    return false; // this.hobbiesFormArray.value.every(val => val === false);
  }
  onHobbyChange(i: any) {
    if (this.allHobbiesSelected())
      this.formGroup.patchValue({ allHobbies: true });
    else this.formGroup.patchValue({ allHobbies: false });
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

    this.citiesService.getCities(this.formGroup.controls.city.value).subscribe(
      (response) => {
        this.cities = response;
      },
      (error) => {
        console.log(error);
      }
    );
    //ngOnit
    this.getFormControl('city')
      .valueChanges.pipe(
        debounceTime(500),

        //tap: do something before making http request
        tap(() => {
          this.cities = [];
          this.isCitiesLoading = true;
        }),

        //switchMap
        switchMap((value: any) => {
          return this.citiesService.getCities(value);
        })
      )
      .subscribe((response) => {
        this.cities = response;
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

      case 'gender': {
        if (errorType === 'required') return 'Gender must be male or female';
        else return '';
      }

      default:
        return '';
    }
  }

  onOKClick() {
    console.log('ok chip clicked');
  }

  //chips
  All: boolean = true;
  UK: boolean = false;
  USA: boolean = false;
  banks: any[] = [];
  banksOfUK: any[] = [
    { bankName: 'HSBC', countryName: 'UK' },
    { bankName: 'Royal Bank of Scotland', countryName: 'UK' },
  ];
  banksOfUSA: any[] = [
    { bankName: 'JP Morgan Chase', countryName: 'USA' },
    { bankName: 'Bank of America', countryName: 'USA' },
  ];

  AllCountriesClicked() {
    this.banks = [...this.banksOfUK, ...this.banksOfUSA];
    this.All = true;
    this.UK = false;
    this.USA = false;
  }

  UKClicked() {
    this.banks = [...this.banksOfUK];
    this.All = false;
    this.UK = true;
    this.USA = false;
  }

  USAClicked() {
    this.banks = [...this.banksOfUSA];
    this.All = false;
    this.UK = false;
    this.USA = true;
  }

  //chips with autocomplete
  allFruits: Fruit[] = [
    {name: "Apple"},
    {name: "Apricot"},
    {name: "Banana"},
    {name: "Blueberry"},
    {name: "Grape"},
    {name: "HOneydew"},
    {name: "Kiwi"},
    {name: "Lemon"},
    {name: "Mandarin"},
    {name: "Mango"},
    {name: "Nectarine"},
    {name: "Orange"},
    {name: "strawberry"},
    {name: "Watermelon"}
  ];
  filteredFruits:Observable<Fruit[]>;
}
