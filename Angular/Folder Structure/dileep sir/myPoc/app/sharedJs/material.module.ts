import { NgModule } from '@angular/core';
import { 
    MatFormFieldModule, 
    MatInputModule, 
    MatCheckboxModule, 
    MatButtonModule, 
    MatSelectModule, 
    MatProgressSpinnerModule, 
    MatTooltipModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatIconModule,
    MatPaginatorModule,
} from '@angular/material';

@NgModule({
    imports: [
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        MatButtonModule,
        MatSelectModule,
        MatProgressSpinnerModule,
        MatTooltipModule,
        MatTableModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatDialogModule,
        MatIconModule,
        MatPaginatorModule                 
    ],
    exports: [
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        MatButtonModule,
        MatSelectModule,
        MatProgressSpinnerModule,
        MatTooltipModule,
        MatTableModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatDialogModule,
        MatIconModule,
        MatPaginatorModule        
    ]
})
export class MaterialModule {}