import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-complete-profile',
  templateUrl: './complete-profile.component.html',
  styleUrls: ['./complete-profile.component.css'],
})
export class CompleteProfileComponent implements OnInit {
  isLinear = false;
  registrationForm!: FormGroup;

  demographicsFormGroup!: FormGroup;
  professionalExpFormGroup!: FormGroup;
  rateFormGroup!: FormGroup;
  orgDetailsFormGroup!: FormGroup;
  paymentTermsFormGroup!: FormGroup;
  filesFormGroup!: FormGroup;
  // Dropdown list options
  expertiseOptions: string[] = ['Option 1', 'Option 2', 'Option 3'];
  civilCaseReportOptions = [
    'none',
    'Triage / screening report',
    'Breach of Duty desktop report',
    'Breach of Duty and Causation report',
    'Causation desktop report',
    'Condition and Prognosis report',
    'Breach of duty, Causation, Condition and Prognosis report',
    'Causation, Condition and Prognosis report',
  ];
  criminalCaseReportsOptions = [
    'none',
    'Competency to stand trial',
    'Criminal responsibility',
    'Mitigation report',
    'Victim impact statement',
    'Risk assessment',
    'Sentencing recommendation',
    'Appeals and post-conviction relief',
  ];
  paymentTermOptions: string[] = ['Option 1', 'Option 2', 'Option 3'];
  fieldsOfExpertiseOptions = [
    { value: 'field1', viewValue: 'Field 1' },
    { value: 'field2', viewValue: 'Field 2' },
    { value: 'field3', viewValue: 'Field 3' },
  ];
  //types of expert work
  expertWorkOptions: string[] = ['Civil', 'Criminal'];
  isEditable = false;
  // Variables for keyword chips
  keywordCtrl = new FormControl();
  filteredKeywords!: Observable<string[]>;
  keywords: string[] = ['Expert witness'];

  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [13, 188];

  // demographics!:FormGroup
  // professionalExp!:FormGroup

  @ViewChild('keywordInput') keywordInput!: ElementRef<HTMLInputElement>;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    const fieldsOfExpGroup: { [key: string]: any } = {};

    this.fieldsOfExpertiseOptions.forEach((field) => {
      fieldsOfExpGroup[field.value] = new FormControl('', [
        Validators.pattern('^[0-9]*$'),
      ]);
    });

    this.demographicsFormGroup = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      homeAddress: [''],
      phoneNumber: ['', [Validators.pattern('^\\+?[0-9]{1,3}-?[0-9]{6,12}$')]], // Phone number with country code and optional hyphen
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?[0-9]{8,}$/)]],

      professionalAddress: [''],
      qualifications: [''],
      aboutYou: [''],
      currentEmployer: [''],
      gmcNumber: [
        '',
        [Validators.required, Validators.pattern(/^[A-Z]\d{6}$/i)],
      ],
    });

    this.professionalExpFormGroup = this.fb.group({
      fieldsOfExpertise: ['', Validators.required],
      yearsOfExperience: ['', [Validators.pattern('^[0-9]*$')]],
      yearsOfExpPerField: this.fb.group(fieldsOfExpGroup),
      keywords: [''],
      numberOfCompletedCases: ['', Validators.required],
      typeOfExpertWork: [[], Validators.required],
      // typesOfCivilCases: this.fb.group({
      civilCaseReportsOptions: ['', [Validators.required]], // provide initial value
      // }),
      // typesOfCriminalCases: this.fb.group({
      criminalCaseReportsOptions: ['', Validators.required], // provide initial value
      // }),
      // ratioOfInstructions: this.fb.group({
      // criminalCases: this.fb.group({
      criminalCasesDefence: ['', [Validators.pattern('^[0-9]*$')]], // Only numbers allowed
      criminalCasesProsecution: ['', [Validators.pattern('^[0-9]*$')]], // Only numbers allowed
      // }),
      // civilCases: this.fb.group({
      civilCasesDefendant: ['', [Validators.pattern('^[0-9]*$')]], // Only numbers allowed
      civilCasesClaimant: ['', [Validators.pattern('^[0-9]*$')]], // Only numbers allowed
      // }),
      // }),
      // courtAppearances: this.fb.group({
      numberOfAppearances: ['', [Validators.pattern('^[0-9]*$')]], // Only numbers allowed
      faceToFace: [''],
      jointInstructions: [''],
      externalVetting: [''],
      externalVettingDetails: [''],
      // }),
    });

    this.rateFormGroup = this.fb.group({
      writingReport: ['', [Validators.pattern('^[0-9]*$')]], // Only numbers allowed
      activitiesOutOfOriginalInstruction: [
        '',
        [Validators.pattern('^[0-9]*$')],
      ], // Only numbers allowed
      attendingCourt: ['', [Validators.pattern('^[0-9]*$')]], // Only numbers allowed
      travellingTime: ['', [Validators.pattern('^[0-9]*$')]], // Only numbers allowed
      classOfPublicTravelOptions: [''],

      courtCancellation: this.fb.group({
        noFeeDaysNotice: [
          null,
          [Validators.required, Validators.pattern('^[0-9]*$')],
        ], // Only numbers allowed
        feeDaysNotice1: this.fb.group({
          daysNotice: [
            null,
            [Validators.required, Validators.pattern('^[0-9]*$')],
          ], // Only numbers allowed
          feeAmount: [
            null,
            [Validators.required, Validators.pattern('^[0-9]*$')],
          ], // Only numbers allowed
        }),
        feeDaysNotice2: this.fb.group({
          daysNotice: [
            null,
            [Validators.required, Validators.pattern('^[0-9]*$')],
          ], // Only numbers allowed
          feeAmount: [
            null,
            [Validators.required, Validators.pattern('^[0-9]*$')],
          ], // Only numbers allowed
        }),
      }),
      offerFreeConsultation: [''],
      freeTimeLimit: [''],
    });

    this.orgDetailsFormGroup = this.fb.group({
      servicesThroughOrganization: [''],
      nameOfOrg: [''],
      vatChargeOption: [''],
      vatNumber: ['', [Validators.pattern('^[0-9]*$')]],
    });
    this.paymentTermsFormGroup = this.fb.group({
      preTrialWorkForPubliclyFundedCasesOption: [''],
      noOfDaysForOtherWork: ['', Validators.pattern('^[0-9]$')],
      latePaymentInterestRate: ['', Validators.pattern('^[0-9]$')],
      dataControllerOrProcessorOption: [''],
    });

    this.filesFormGroup = this.fb.group({
      cv: ['', Validators.required],
    });

    this.registrationForm = this.fb.group({
      demographics: this.demographicsFormGroup,
      professionalExp: this.professionalExpFormGroup,
      rate: this.rateFormGroup,
      orgDetails: this.orgDetailsFormGroup,
      paymentTerms: this.paymentTermsFormGroup,
      files: this.filesFormGroup,
    });

    console.log(this.registrationForm);
  }

  addKeyword(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.keywords.push(value);
    }
    event.chipInput!.clear();
    this.keywordCtrl.setValue(null);
  }

  removeKeyword(keyword: string): void {
    const index = this.keywords.indexOf(keyword);
    if (index >= 0) {
      this.keywords.splice(index, 1);
    }
  }

  selectedKeyword(event: MatAutocompleteSelectedEvent): void {
    this.keywords.push(event.option.viewValue);
    this.keywordInput.nativeElement.value = '';
    this.keywordCtrl.setValue(null);
  }

  selectedFile: any = null;
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] ?? null;
  }

  // onFileSelected(event: Event) {
  //   const fileInput = event.target as HTMLInputElement;
  //   if (fileInput && fileInput.files && fileInput.files.length > 0) {
  //     const file = fileInput.files[0];
  //     this.filesFormGroup.patchValue({
  //       cv: file
  //     });
  //   }
  // }
  onSubmit() {
    console.log(this.registrationForm.value);
  }
}
