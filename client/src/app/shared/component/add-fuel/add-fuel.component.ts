import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-fuel',
  templateUrl: './add-fuel.component.html',
  styleUrls: ['./add-fuel.component.css']
})
export class AddFuelComponent {
  addCartForm: FormGroup = {} as FormGroup; 

  constructor(
    public dialogRef: MatDialogRef<AddFuelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.addCartForm = this.fb.group({
      quantity: [null, [Validators.required, Validators.min(1)]],
      unit: [null, Validators.required]
    });
  }
    
}
