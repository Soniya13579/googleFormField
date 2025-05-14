import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FillFormDialogComponent } from '../admin/fill-form-dialog/fill-form-dialog.component';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {
  rowData: Array<any> = [];
  colDefs = [
    { field: 'id', headerName: 'ID' },
    { field: 'formName', headerName: 'Form Name' },
    { 
      field: 'filledOn', 
      headerName: 'Filled On', 
      valueFormatter: (params: any) => new Date(params.value).toLocaleString() // Format timestamp to readable date
    },
    { 
      field: 'action', 
      headerName: 'Actions',
      cellRenderer: (params: any) => {
        const container = document.createElement('div');

        // Preview Button
        const previewButton = document.createElement('button');
        previewButton.innerHTML = '👁️ Preview';
        previewButton.title = 'Preview';
        previewButton.style.border = 'none';
        previewButton.style.background = 'none';
        previewButton.style.cursor = 'pointer';
        previewButton.onclick = () => this.previewForm(params.data);

        container.appendChild(previewButton);
        return container;
      }
    }
  ];

  constructor(private router: Router, private dialog: MatDialog) {}

  ngOnInit(): void {
    // Retrieve filled forms from localStorage
    const storedForms = localStorage.getItem('filledForms');
    if (storedForms) {
      this.rowData = JSON.parse(storedForms);
    }
  }

  previewForm(form: any) {
    this.router.navigate(['/preview-form'], { state: { data: form } });
  }

  openFillFormDialog() {
    const dialogRef = this.dialog.open(FillFormDialogComponent, {
      height: '400px',
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Form selected to fill:', result);
      }
    });
  }
}
