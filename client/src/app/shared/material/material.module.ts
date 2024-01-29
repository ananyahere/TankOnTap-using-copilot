import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        MatSnackBarModule,
        MatDialogModule
    ],
    exports: [
        MatSnackBarModule,
        MatDialogModule
    ]
})
export class MaterialModule { }
