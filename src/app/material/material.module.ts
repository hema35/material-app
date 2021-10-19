import { NgModule } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatChipsModule } from '@angular/material/chips';

const MaterialComponents = [MatButtonModule,
MatIconModule,
MatInputModule,
MatSelectModule,
MatChipsModule
];

@NgModule({
  imports: [ MaterialComponents ],
  exports: [ MaterialComponents ]
})
export class MaterialModule { }
