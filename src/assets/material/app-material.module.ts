import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  MatButtonModule, MatCardModule, MatCheckboxModule,
  MatDialogModule, MatDividerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatListModule, MatTableModule,
  MatTabsModule,
  MatToolbarModule
} from '@angular/material';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    MatIconModule,
    MatTabsModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatListModule,
    MatCardModule,
    MatDividerModule,
    MatCheckboxModule,

    MatTableModule
  ],
  exports: [
    MatIconModule,
    MatTabsModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,

    MatListModule,
    MatCardModule,
    MatDividerModule,
    MatCheckboxModule,

    MatTableModule
  ]
})
export class AppMaterialModule {
}
