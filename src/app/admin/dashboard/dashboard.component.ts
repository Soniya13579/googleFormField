import { Component, OnInit } from '@angular/core';
import type { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { CreateFormComponent } from '../create-form/create-form.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { once } from 'events';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  formsCreated: Array<{ name: string; [key: string]: any }> = [];
  rowData: Array<object> = [];
  gridApi!: GridApi;
  
  // Column Definitions: Defines the columns to be displayed.
  colDefs: ColDef[] = [
    { field: "formId", headerName: "Form ID" },
    { field: "formName", headerName: "Form Name",
      onCellClicked: (event: any) => {
        if (event.colDef.field === 'formName') {
          const form = this.formsCreated.find(f => f['name'] === event.data.formName);
          if (form) {
            this.viewForm(form);
          }
        }
      }
     },
    { 
      field: "createdOn", 
      headerName: "Created On",
      valueFormatter: params => new Date(params.value).toLocaleString() // Format timestamp to readable date
    },
    { field: "action", headerName: "Action",
      cellRenderer: (params:any) => `
        <button class="edit-btn" title="Edit">Edit</button>
        <button class="delete-btn" title="Delete">Delete</button>
      `,
     onCellClicked: (event: any) => {
        if (event.colDef.field === 'action') {
          const form = this.formsCreated.find(f => f['name'] === event.data.formName);
          if (form) {
            this.editForm(form);
          }
        }
      }
    },
  ];

  constructor(private dialog: MatDialog, private router: Router) { }

  ngOnInit() {
    // Retrieve data from localStorage on component load
    const storedData = localStorage.getItem("dashboardData");

    if (storedData) {
      const parsedData = JSON.parse(storedData);
      this.formsCreated = parsedData.formsCreated || [];
      this.rowData = parsedData.rowData || [];
    }
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api; // Store the grid API instance
    this.gridApi.sizeColumnsToFit(); // Automatically size columns to fit the grid width
  }

  addForm() {
    let dialogRef = this.dialog.open(CreateFormComponent, {
      height: '400px',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result) {
        this.rowData = [
          ...this.rowData, // Spread existing rowData
          {
            formId: this.rowData.length + 1,
            formName: result.name,
            createdOn: Date.now(), // Store timestamp
          }
        ];
        this.formsCreated.push(result);

        // Store updated data in localStorage as a single object
        const dashboardData = {
          formsCreated: this.formsCreated,
          rowData: this.rowData
        };
        localStorage.setItem("dashboardData", JSON.stringify(dashboardData));

        console.log(this.rowData);
      }
    });
  }

  viewForm(form: any) {
    this.router.navigate(['/preview-form'], { state: { data: form } });
  }

  editForm(form: any) {
    const dialogRef = this.dialog.open(CreateFormComponent, {
      height: '600px',
      width: '800px',
      data: form // Pass the existing form data for editing
    });

    dialogRef.afterClosed().subscribe(updatedForm => {
      if (updatedForm) {
        const index = this.rowData.findIndex((row: any) => row.formId === form.formId);
        if (index !== -1) {
          this.rowData[index] = {
            ...this.rowData[index],
            formName: updatedForm.name
          };
          this.formsCreated[index] = updatedForm;

          const dashboardData = {
            formsCreated: this.formsCreated,
            rowData: this.rowData
          };
          localStorage.setItem('dashboardData', JSON.stringify(dashboardData));
        }
      }
    });
  }

  deleteForm(form: any) {
    if (confirm(`Are you sure you want to delete the form "${form.formName}"?`)) {
      this.rowData = this.rowData.filter((row: any) => row.formId !== form.formId);
      this.formsCreated = this.formsCreated.filter(f => f.name !== form.formName);

      const dashboardData = {
        formsCreated: this.formsCreated,
        rowData: this.rowData
      };
      localStorage.setItem('dashboardData', JSON.stringify(dashboardData));
    }
  }
}
