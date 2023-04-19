const mongoose = require("mongoose");

const moredetialsSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    required: true,
    auto: true,
  },
  demographics: {
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    homeAddress: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
      match: /^\+?[0-9]{1,3}-?[0-9]{6,12}$/,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
    },
    professionalAddress: {
      type: String,
      required: true,
    },
    qualifications: {
      type: String,
      required: true,
    },
    aboutYou: {
      type: String,
      required: true,
    },
    currentEmployer: {
      type: String,
      required: true,
    },
    gmcNumber: {
      type: String,
      required: true,
      unique: true,
      match: /^[A-Z]\d{6}$/i,
    },
  },

  professionalExp: {
    fieldsOfExpertise: { type: [String], required: true },
    yearsOfExperience: { type: Number, validate: { validator: /^[0-9]*$/ } },
    yearsOfExpPerField: { type: Map, of: Number },
    keywords: { type: [String], default: [] },
    numberOfCompletedCases: { type: Number, required: true },
    typeOfExpertWork: { type: [String], required: true },
    civilCaseReportsOptions: { type: [String], required: true },
    criminalCaseReportsOptions: { type: [String], required: true },
    criminalCasesDefence: { type: Number, },
    criminalCasesProsecution: {
      type: Number,
    
    },
    civilCasesDefendant: { type: Number, },
    civilCasesClaimant: { type: Number, },
    numberOfAppearances: { type: Number, validate: { validator: /^[0-9]*$/ } },
    faceToFace: { type: Boolean },
    jointInstructions: { type: Boolean },
    externalVetting: { type: Boolean },
    externalVettingDetails: { type: String },
  },

  rate: {
    writingReport: {
      rate: {
        type: Number,
        validate: /^[0-9]*$/,
      },
      type: {
        type: String,
        default: "hourly",
      },
    },
    activitiesOutOfOriginalInstruction: {
      rate: {
        type: Number,
        validate: /^[0-9]*$/,
      },
      type: {
        type: String,
        default: "hourly",
      },
    },
    attendingCourt: {
      rate: {
        type: Number,
        validate: /^[0-9]*$/,
      },
      type: {
        type: String,
        default: "hourly",
      },
    },
    travellingTime: {
      rate: {
        type: Number,
        validate: /^[0-9]*$/,
      },
      type: {
        type: String,
        default: "hourly",
      },
    },
    classOfPublicTravelOptions: {
      type: [String],
      required: true,
    },
    courtCancellation: {

      // ------ implement it ----
      // noFeeDaysNotice: {
      //   type: Number,
      //   required: true,
      //   validate: /^[0-9]*$/,
      // },
      feeDaysNotice1: {
        daysNotice: {
          type: Number,
          required: true,
          validate: /^[0-9]*$/,
        },
        feeAmount: {
          type: Number,
          required: true,
          validate: /^[0-9]*$/,
        },
      },
      feeDaysNotice2: {
        daysNotice: {
          type: Number,
          required: true,
          validate: /^[0-9]*$/,
        },
        feeAmount: {
          type: Number,
          required: true,
          validate: /^[0-9]*$/,
        },
      },
    },
    // offerFreeConsultation: {
    //   type: Boolean,
    // },
    freeTimeLimitYesNo: {
      type: Boolean,
    },
    freeTimeLimit: {
      type: String,
    },
  },
  orgDetails: {
    servicesThroughOrganization: {
      type: Boolean,
      required: true,
    },
    organizationName: {
      type: String,
      default: "",
    },
    registrationNumber: {
      type: String,
      default: "",
    },
    vatChargeOption: {
      type: Boolean,
      required: true,
    },
    vatNumber: {
      type: String,
      validate: /^[0-9]*$/,
      default: "",
    },
  },
  paymentTerms: {
    preTrialWorkForPubliclyFundedCasesOption: {
      type: Boolean,
      required: true,
    },
    noOfDaysForOtherWork: {
      type: Number,
      validate: /^[0-9]*$/,
    },
    latePaymentInterestRate: {
      type: Number,
      validate: /^[0-9]*$/,
    },
    dataControllerOrProcessorOption: {
      type: String,
      enum: ["controller", "processor"],
      required: true,
    },
    acceptTermsAndConditions: {
      type: Boolean,
      required: true,
    },
  },
  files: {
    cv: {
      type: String,
      required: true,
    },
  },
});

module.exports = mongoose.model("MoreDetails", moredetialsSchema);
