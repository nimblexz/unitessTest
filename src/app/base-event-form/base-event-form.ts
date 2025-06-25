import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'base-event-form',
  imports: [MatFormFieldModule, MatSelectModule, FormsModule, ReactiveFormsModule, MatInputModule, MatButtonModule, CommonModule],
  templateUrl: './base-event-form.html',
  styleUrl: './base-event-form.css',
  standalone: true
})
export class BaseEventFormComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, public dialogRef: MatDialogRef<BaseEventFormComponent>) {
  }

  form: any;

  ngOnInit() {
    this.form = new FormGroup({
      id: new FormControl(this.data?.event?.id ? this.data?.event?.id : null),
      name: new FormControl(this.data?.event?.name ? this.data?.event?.name : '', Validators.required),
      description: new FormControl(this.data?.event?.description ? this.data?.event?.description : '', Validators.required),
      location: new FormControl(this.data?.event?.location ? this.data?.event?.location : '', Validators.required),
      type: new FormControl(this.data?.event?.type ? this.data?.event?.type : '', Validators.required),
    });
    this.setFormField()
  }

  setData() {
    if (this.form.invalid) {
      return
    }
    this.dialogRef.close({
      ...this.form.value,
      id: this.data?.event === null ? this.data?.totalCount + 1 : this.data?.event?.id
    })
  }

  setFormField() {
    const type = this.form.get('type')?.value;
    this.form.removeControl('numberOfParticipants');
    this.form.removeControl('genreOfMusic');
    if (type === 'Спортивное') {
      this.form.addControl('numberOfParticipants', this.fb.control(this.data?.event?.numberOfParticipants ? this.data?.event?.numberOfParticipants : '', Validators.required));
    } else if (type === 'Музыкальное') {
      this.form.addControl('genreOfMusic', this.fb.control(this.data?.event?.genreOfMusic ? this.data?.event?.genreOfMusic : '', Validators.required));
    }
  }
}
