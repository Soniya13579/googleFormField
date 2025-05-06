import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-preview-form',
  standalone: false,
  templateUrl: './preview-form.component.html',
  styleUrls: ['./preview-form.component.scss']
})
export class PreviewFormComponent implements OnInit {
  formName: string = '';
  formFields: any[] = [];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // Retrieve form data from route parameters
    const formData = history.state.data;
    if (formData) {
      this.formName = formData.name;
      this.formFields = formData.fields;
    }
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }
}
