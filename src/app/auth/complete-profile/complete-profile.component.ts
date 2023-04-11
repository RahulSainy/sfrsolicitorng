import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { AuthService } from '../auth.service';

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
    { value: 'family', viewValue: 'Family' },
    { value: 'criminal', viewValue: 'Criminal' },
    { value: 'immigration', viewValue: 'Immigration' },
    { value: 'property', viewValue: 'Property' },
    { value: 'commercial', viewValue: 'Commercial' },
  ];
  //types of expert work
  expertWorkOptions: string[] = ['Civil', 'Criminal'];
  isEditable = false;
  // Variables for keyword chips
  keywordCtrl = new FormControl();
  filteredKeywords!: any;
  keywords: string[] = ['Expert witness'];

  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [13, 188];

  // demographics!:FormGroup
  // professionalExp!:FormGroup

  @ViewChild('keywordInput') keywordInput!: ElementRef<HTMLInputElement>;
  constructor(private fb: FormBuilder, public authService: AuthService) {}

  ngOnInit(): void {
    const fieldsOfExpGroup: any = {};
    this.fieldsOfExpertiseOptions.forEach((field) => {
      fieldsOfExpGroup[field.value] = [
        '',
        [ Validators.pattern('^[0-9]*$')],
      ];
    });

    this.demographicsFormGroup = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      homeAddress: ['', Validators.required],
      contact: ['', [Validators.pattern('^\\+?[0-9]{1,3}-?[0-9]{6,12}$')]], // Phone number with country code and optional hyphen
      email: ['', [Validators.required, Validators.email]],
      // phone: ['', [Validators.required, Validators.pattern(/^\+?[0-9]{8,}$/)]],

      professionalAddress: ['', Validators.required],
      qualifications: ['', Validators.required],
      aboutYou: ['', Validators.required],
      currentEmployer: ['', Validators.required],
      gmcNumber: [
        '',
        [Validators.required, Validators.pattern(/^[A-Z]\d{6}$/i)],
      ],
    });

    this.professionalExpFormGroup = this.fb.group({
      fieldsOfExpertise: ['', [Validators.required, Validators.minLength(1)]],
      // yearsOfExperience: [
      //   '',
      //   [Validators.required, Validators.pattern('^[0-9]*$')],
      // ],
      yearsOfExpPerField: this.fb.group(fieldsOfExpGroup),
      keywords: ['', [Validators.required, Validators.minLength(1)]],
      numberOfCompletedCases: [
        '',
        [Validators.required, Validators.pattern('^[0-9]*$')],
      ],
      typeOfExpertWork: [[], [Validators.required, Validators.minLength(1)]],
      civilCaseReportsOptions: [
        [],
        [Validators.required, Validators.minLength(1)],
      ], // provide initial value
      criminalCaseReportsOptions: [
        [],
        [Validators.required, Validators.minLength(1)],
      ], // provide initial value
      criminalCasesDefence: ['', [Validators.pattern('^[0-9]*$')]], // Only numbers allowed
      criminalCasesProsecution: ['', [Validators.pattern('^[0-9]*$')]], // Only numbers allowed
      civilCasesDefendant: ['', [Validators.pattern('^[0-9]*$')]], // Only numbers allowed
      civilCasesClaimant: ['', [Validators.pattern('^[0-9]*$')]], // Only numbers allowed
      numberOfAppearances: ['', [Validators.pattern('^[0-9]*$')]], // Only numbers allowed
      faceToFace: [false],
      jointInstructions: [false],
      externalVetting: [false],
      externalVettingDetails: ['', Validators.maxLength(50)],
    });

    this.rateFormGroup = this.fb.group({
      writingReport: this.fb.group({
        rate: ['', [Validators.pattern('^[0-9]*$')]], // Only numbers allowed
        type: ['hourly'], // Default value is hourly
      }),
      activitiesOutOfOriginalInstruction: this.fb.group({
        rate: ['', [Validators.pattern('^[0-9]*$')]], // Only numbers allowed
        type: ['hourly'], // Default value is hourly
      }),
      attendingCourt: this.fb.group({
        rate: ['', [Validators.pattern('^[0-9]*$')]], // Only numbers allowed
        type: ['hourly'], // Default value is hourly
      }),
      travellingTime: this.fb.group({
        rate: ['', [Validators.pattern('^[0-9]*$')]], // Only numbers allowed
        type: ['hourly'], // Default value is hourly
      }),
      classOfPublicTravelOptions: [[], Validators.required],

      courtCancellation: this.fb.group({
        //  ---------------- implement it -------------
        // noFeeDaysNotice: [
        //   null,
        //   [Validators.required, Validators.pattern('^[0-9]*$')],
        // ], // Only numbers allowed
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
      // -----------------------------------------------??????????------------
      // offerFreeConsultation: [''],
      freeTimeLimitYesNo: [false, Validators.required],
      freeTimeLimit: [''],
    });

    this.orgDetailsFormGroup = this.fb.group({
      servicesThroughOrganization: [false, Validators.required],
      organizationName: [''],
      registrationNumber: [''],
      vatChargeOption: [false, Validators.required],
      vatNumber: ['', [Validators.pattern('^[0-9]*$')]],
    });
    this.paymentTermsFormGroup = this.fb.group({
      preTrialWorkForPubliclyFundedCasesOption: [false, Validators.required],
      noOfDaysForOtherWork: [
        '',
        [Validators.required, Validators.pattern(/^[0-9]*$/)],
      ],
      latePaymentInterestRate: ['', [Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      dataControllerOrProcessorOption: ['', Validators.required],
      acceptTermsAndConditions: [false, Validators.requiredTrue],
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
  }
  openTermsAndConditions() {
    window.open('/terms-and-conditions', '_blank');
  }

  addKeyword(event: any): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.keywords.push(value.trim());
    }

    if (input) {
      input.value = '';
    }

    this.professionalExpFormGroup.controls['keywords'].setValue(
      this.keywords.join(', ')
    );
  }

  removeKeyword(keyword: string): void {
    const index = this.keywords.indexOf(keyword);

    if (index >= 0) {
      this.keywords.splice(index, 1);
    }

    this.professionalExpFormGroup.controls['keywords'].setValue(
      this.keywords.join(', ')
    );
  }
  selectedKeyword(event: any): void {
    this.keywords.push(event.option.viewValue);
    this.keywordInput.nativeElement.value = '';
    this.professionalExpFormGroup.controls['keywords'].setValue(
      this.keywords.join(', ')
    );
  }

  filterKeywords(event: any): void {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();

    this.filteredKeywords = this.keywords.filter(
      (keyword: string) => keyword.toLowerCase().indexOf(filterValue) === 0
    );
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
    if (this.registrationForm.invalid) {
      console.log('invalid form:', this.registrationForm.value);
      Object.keys(this.registrationForm.controls).forEach((field) => {
        const control = this.registrationForm.get(field);
        if (control!.invalid) {
          console.log(`${field} has errors:`, control!.errors);
        }

        Object.keys(this.professionalExpFormGroup.controls).forEach((key) => {
          const controlErrors = this.professionalExpFormGroup.get(key)!.errors;
          if (controlErrors != null) {
            Object.keys(controlErrors).forEach((keyError) => {
              console.log(
                'Key control: ' +
                  key +
                  ', keyError: ' +
                  keyError +
                  ', err value: ',
                controlErrors[keyError]
              );
            });
          }
        });
      });
      return;
    }

    // if (this.registrationForm.invalid) {
    //   console.log('invalid', this.registrationForm.value);
    //   return;
    // }
    this.authService.updateFrom(this.registrationForm.value).subscribe(
      (response) => console.log('success', response),
      (error) => console.error('error', error)
    );
    console.log('onsubmit : ', this.registrationForm.value);
  }
}
