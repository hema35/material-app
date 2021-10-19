import { NgModule } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';

const MaterialComponents = [MatButtonModule,
MatIconModule,
MatInputModule,
MatSelectModule,
MatChipsModule,
MatTableModule
];

@NgModule({
  imports: [ MaterialComponents ],
  exports: [ MaterialComponents ]
})
export class MaterialModule { }
