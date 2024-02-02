import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        MatSnackBarModule,
        MatDialogModule
    ],
    exports: [
        MatSnackBarModule,
        MatDialogModule,
        MatPaginatorModule
    ]
})
export class MaterialModule { }
