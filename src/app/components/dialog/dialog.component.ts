import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

type DialogData = {
  title: string;
  type?: 'edit' | 'new';
  payload?: string;
};

@Component({
  selector: 'app-dialog',
  styleUrls: ['./dialog.component.css'],
  template: `
    <div class="new-list-container">
      <h3 mat-dialog-title>{{ data.title }}</h3>
      <div mat-dialog-content class="form-container">
        <div class="form-field">
          <input type="text" [(ngModel)]="payloadString" />
        </div>
      </div>
      <div mat-dialog-actions class="mat-actions">
        <button
          mat-button
          class="create-list-btn"
          [mat-dialog-close]="payloadString"
        >
          {{ data.type ? 'Update' : 'Create' }}
        </button>
        <button mat-button class="cancel-btn" (click)="onCancel()">
          Cancel
        </button>
      </div>
    </div>
  `,
})
export class DialogComponent implements OnInit {
  payloadString: string = '';
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {
    this.payloadString = this.data.payload || '';
  }

  onCancel() {
    this.dialogRef.close();
  }
}
