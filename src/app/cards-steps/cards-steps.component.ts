import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ticketService } from 'src/service/ticketService.service';

@Component({
  selector: 'app-cards-steps',
  templateUrl: './cards-steps.component.html',
  styleUrls: ['./cards-steps.component.css'],
})
export class CardsStepsComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<CardsStepsComponent>,
    @Inject(MAT_DIALOG_DATA) public editCardData: any,
    public formbuilder: FormBuilder,
    public ticketService: ticketService
  ) {
    if (editCardData) {
      this.setFormsData(editCardData);
    }
  }
  public answers = [
    { label: 'yes', checked: false },
    { label: 'no', checked: false },
  ];
  public Cities: string[] = ['Lahore', 'Multan', 'Kaisten', 'Muenster', 'Rubi'];

  public lahoreQuestions: string[] = [
    'Is Lahore your favorite City?',
    'Are you lived in Lahore?',
  ];
  public multanQuestions: string[] = [
    'Is Multan your favorite City?',
    'Are you lived in Multan?',
  ];
  public kaistenQuestions: string[] = [
    'Is Kaisten your favorite City?',
    'Are you lived in Kaisten?',
  ];
  public muensterQuestions: string[] = [
    'Is Muenster your favorite City?',
    'Are you lived in Muenster?',
  ];
  public rubiQuestions: string[] = [
    'Is Rubi your favorite City?',
    'Are you lived in Rubi?',
  ];

  public infoFormGroup = this.formbuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
  });

  public questionFormGroup = this.formbuilder.group({
    lahore: this.formbuilder.array(['', '']),
    multan: this.formbuilder.array(['', '']),
    kaisten: this.formbuilder.array(['', '']),
    muenster: this.formbuilder.array(['', '']),
    rubi: this.formbuilder.array(['', '']),
  });

  public locationFormGroup = this.formbuilder.group({
    location: ['Lahore', Validators.required],
  });
  public isLinear = true;

  ngOnInit(): void {}

  setFormsData(data: any): void {
    this.infoFormGroup.get('name')?.setValue(data.infoData.name);
    this.infoFormGroup.get('description')?.setValue(data.infoData.description);
    this.locationFormGroup
      .get('location')
      ?.setValue(data.locationData.location);
    Object.keys(this.questionFormGroup.controls).forEach((element) => {
      this.setValue(element, data);
    });
  }

  setValue(element: any, data: any) {
    for (let i = 0; i < 2; i++) {
      this.questionFormGroup.controls[element].value[i] =
        data.questionData[element][i];
    }
  }

  getChecked(form: string, index: number, label: string): boolean {
    return label == this.questionFormGroup.controls[form].value[index];
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  updateForm(formName: string, index: number, value: string) {
    this.questionFormGroup.controls[formName].value[index] = value;
  }

  submitBtn(): void {
    if (
      this.infoFormGroup.valid &&
      this.questionFormGroup.valid &&
      this.locationFormGroup.valid
    ) {
      let completeObj = {
        infoData: this.infoFormGroup.value,
        questionData: this.questionFormGroup.value,
        locationData: this.locationFormGroup.value,
      };
      this.ticketService.postCard(completeObj).subscribe((res) => {
        if (res) {
          this.dialogRef.close({ event: 'submit' });
        }
      });
    } else {
      alert('All Inputs required');
    }
  }

  updateBtn(): void {
    let completeObj = {
      infoData: this.infoFormGroup.value,
      questionData: this.questionFormGroup.value,
      locationData: this.locationFormGroup.value,
    };
    this.ticketService
      .updateCard(completeObj, this.editCardData.id)
      .subscribe((res) => {
        if (res) {
          this.dialogRef.close({ event: 'submit' });
        }
      });
  }
}
