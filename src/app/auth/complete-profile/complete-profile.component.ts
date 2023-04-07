import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  fieldOfExpertise: string[] = ['Option 1', 'Option 2', 'Option 3'];
  expertiseOptions: string[] = ['Option 1', 'Option 2', 'Option 3'];
  civilCaseReportsOptions: string[] = ['Option 1', 'Option 2', 'Option 3'];
  criminalCaseReportsOptions: string[] = ['Option 1', 'Option 2', 'Option 3'];
  paymentTermOptions: string[] = ['Option 1', 'Option 2', 'Option 3'];
  //types of expert work
  expertWorkOptions: string[] = ['Civil', 'Criminal'];
  isEditable = false;

  // demographics!:FormGroup
  // professionalExp!:FormGroup
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
     this.demographicsFormGroup = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      homeAddress: [''],
      phoneNumber: ['', [Validators.pattern('^\\+?[0-9]{1,3}-?[0-9]{6,12}$')]], // Phone number with country code and optional hyphen
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required,Validators.pattern(/^\+?[0-9]{8,}$/)]],

      professionalAddress: [''],
      qualifications: [''],
      aboutYou: [''],
      currentEmployer: [''],
      gmcNumber: ['',[Validators.required,Validators.pattern(/^[A-Z]\d{6}$/i)]],
    });

     this.professionalExpFormGroup = this.fb.group({
      fieldsOfExpertise: ['', Validators.required],
      yearsOfExperience: ['', [Validators.pattern('^[0-9]*$')]], // Only numbers allowed
      keywords: [''],
      numberOfCompletedCases: ['', Validators.required],
      typeOfExpertWork: ['', Validators.required],
      // typesOfCivilCases: this.fb.group({
        civilCaseReportsOptions: ['', [Validators.required]], // provide initial value
      // }),
      // typesOfCriminalCases: this.fb.group({
        criminalCaseReportsOptions: ['Option 1',Validators.required], // provide initial value
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
    console.log(this.registrationForm)
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
