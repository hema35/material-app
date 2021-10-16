import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CountriesService } from 'src/app/services/countries.service';
import { Validators } from '@angular/forms';
import { CustomErrorStateMatcher } from 'src/app/helpers/customErrorStateMatcher';
@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {
countries:any;
formGroup: FormGroup;
customErrorStateMatcher: CustomErrorStateMatcher = new CustomErrorStateMatcher();

  constructor(private countriesService: CountriesService) {
    this.formGroup = new FormGroup(
      {
        email: new FormControl(null,[Validators.required,Validators.email]),
        customerName: new FormControl(null,[Validators.required,Validators.maxLength(30),Validators.pattern('^[A-Za-z]*$')]),
        country: new FormControl(null,[Validators.required])
      }
    )
   }

  ngOnInit(): void {
  }
  getFormControl(controlName:string):FormControl{
return this.formGroup.get(controlName) as FormControl;
  }

  getErrorMessage(controlName:string,errorType:string):string{
  switch(controlName){
    case "customerName":
      {
        if(errorType === "required")
        return "you must specify ";
        else if(errorType === "maxlength")
        return "can contain upto 30 characters";
        else if(errorType === "pattern")
        return "can contain alphabets";
        else
        return "";
      }

      case "email":
        {
          if(errorType === "required")
          return "you must specify ";
          else if(errorType === "email")
          return "<strong>Email</strong>should be in correct format";
          else
          return "";
        }

        case "country":
          {
            if(errorType === "required")
            return "you must select ";

            else
            return "";
          }

          default: return"";
  }
  }

}
