import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-form',
  standalone: false,
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss']
})
export class CreateFormComponent implements OnInit {
  formName: string = '';
  formFields: Array<any> = [];
  selectedFieldType: string = 'text';
  fieldLabel: string = '';
  fieldOptions: string = '';

  constructor(
    private dialogRef: MatDialogRef<CreateFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    if (this.data) {
      // Load existing form data for editing
      this.formName = this.data.name;
      this.formFields = this.data.fields || [];
    }
  }

  addField() {
    const newField: any = {
      type: this.selectedFieldType,
      label: this.fieldLabel,
      options: this.fieldOptions ? this.fieldOptions.split(',') : []
    };
    this.formFields.push(newField);

    // Reset inputs
    this.selectedFieldType = 'text';
    this.fieldLabel = '';
    this.fieldOptions = '';
  }

  deleteField(index: number) {
    this.formFields.splice(index, 1);
  }

  saveForm() {
    if (!this.formName.trim()) {
      alert('Please enter a name for the form.');
      return;
    }

    const formData = {
      name: this.formName,
      fields: this.formFields
    };

    this.dialogRef.close(formData); // Pass the form data back to the parent component
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
