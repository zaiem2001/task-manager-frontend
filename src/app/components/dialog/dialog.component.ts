import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  styleUrls: ['./dialog.component.css'],
  template: `
    <div class="new-list-container">
      <h3 mat-dialog-title>{{ data.title }}</h3>
      <div mat-dialog-content class="form-container">
        <div class="form-field">
          <input type="text" [(ngModel)]="title" />
        </div>
      </div>
      <div mat-dialog-actions class="mat-actions">
        <button mat-button class="create-list-btn" [mat-dialog-close]="title">
          Create
        </button>
        <button mat-button class="cancel-btn" (click)="onCancel()">
          Cancel
        </button>
      </div>
    </div>
  `,
})
export class DialogComponent {
  title: string = '';
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string }
  ) {}

  onCancel() {
    this.dialogRef.close();
  }
}
