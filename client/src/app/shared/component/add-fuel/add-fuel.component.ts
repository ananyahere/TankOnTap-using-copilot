import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-fuel',
  templateUrl: './add-fuel.component.html',
  styleUrls: ['./add-fuel.component.css']
})
export class AddFuelComponent {
  constructor(
    public dialogRef: MatDialogRef<AddFuelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
    
}
