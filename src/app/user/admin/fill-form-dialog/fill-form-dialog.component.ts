import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fill-form-dialog',
  templateUrl: './fill-form-dialog.component.html',
  styleUrls: ['./fill-form-dialog.component.scss']
})
export class FillFormDialogComponent implements OnInit {
  formsCreated: Array<any> = [];

  constructor(
    private dialogRef: MatDialogRef<FillFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Retrieve forms created by the admin from localStorage
    const storedData = localStorage.getItem('dashboardData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      this.formsCreated = parsedData.formsCreated || [];
    }
  }

  fillForm(form: any) {
    this.dialogRef.close();
    this.router.navigate(['/preview-form'], { state: { data: form } });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
