import * as z from "zod";

// ============================================================
// USER
// ============================================================
export const SignupValidation = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  username: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email(),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});

export const SigninValidation = z.object({
  email: z.string().email(),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});

export const ProfileValidation = z.object({
  file: z.custom<File[]>(),
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  username: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email(),
  bio: z.string(),
});

// ============================================================
// POST
// ============================================================
export const PostValidation = z.object({
  title: z.string().min(5, { message: "Minimum 5 characters." }).max(200, { message: "Maximum 200 caracters" }),
  caption: z.string().min(5, { message: "Minimum 5 characters." }).max(2200, { message: "Maximum 2,200 caracters" }),
  file: z.custom<File[]>(),
  location: z.string().min(1, { message: "This field is required" }).max(1000, { message: "Maximum 1000 characters." }),
  tags: z.string(),
});

//! REGESTRATION FORM

export const RegesterFormValidation = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  username: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email(),
  bio: z.string(),
  gender: z.enum(["Male", "Female", "Others"]),
});

//! REGESTRATION FORM

//!PAENATAL FORM

export const ParentalFormValidation = z.object({
  mom_query: z.object({
    PhysiologicalQueries: z.object({
      age: z.number().min(18, "Age must be 18 or above"),
      mestrual_history: z.string(),
      health_conditions: z.string(),
      complications_in_prev_pregnancy: z.string(),
      medications: z.string(),
    }),
    BiologicalQueries: z.object({
      present_reproductive_health: z.string(),
      diet_type: z.string(),
      life_style: z.string(),
      family_history_of_pregnancy_issues: z.string(),
      any_genetic_conditions: z.string(),
    }),
    EnviromentalAndEmotionalQueries: z.object({
      renumeration_made_a_year: z.number().min(0, "Income must be positive"),
      nationality: z.string(),
      current_place_of_living: z.string(),
      is_2_be_dad_husband: z.boolean(),
      are_you_emotionally_ready: z.string(),
      level_of_understanding_with_partner: z.string(),
      has_access_to_prenatal_care: z.boolean(),
      has_access_to_care_givers_for_baby: z.boolean(),
    }),
  }),
  dad_query: z.object({
    PhysiologicalQueries: z.object({
      age: z.number().min(18, "Age must be 18 or above"),
      health_conditions: z.string(),
      sexual_health: z.string(),
      fertility_history: z.string(),
      medications: z.string(),
    }),
    BiologicalQueries: z.object({
      present_reproductive_health: z.string(),
      diet_type: z.string(),
      life_style: z.string(),
      any_genetic_conditions_or_family_history_of_reproductive_issue: z.string(),
    }),
    EnviromentalAndEmotionalQueries: z.object({
      renumeration_made_a_year: z.number().min(0, "Income must be positive"),
      nationality: z.string(),
      current_place_of_living: z.string(),
      is_2_be_mom_wife: z.boolean(),
      are_you_emotionally_ready: z.string(),
      level_of_understanding_with_partner: z.string(),
    }),
  }),
});

//!PAENATAL FORM

//!APPOINTMENT FORM

export const CreateAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, "Select at least one doctor"),
  schedule: z.coerce.date(),
  reason: z
    .string()
    .min(2, "Reason must be at least 2 characters")
    .max(500, "Reason must be at most 500 characters"),
  note: z.string().optional(),
  cancellationReason: z.string().optional(),
});

export const ScheduleAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, "Select at least one doctor"),
  schedule: z.coerce.date(),
  reason: z.string().optional(),
  note: z.string().optional(),
  cancellationReason: z.string().optional(),
});

export const CancelAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, "Select at least one doctor"),
  schedule: z.coerce.date(),
  reason: z.string().optional(),
  note: z.string().optional(),
  cancellationReason: z
    .string()
    .min(2, "Reason must be at least 2 characters")
    .max(500, "Reason must be at most 500 characters"),
});

export function getAppointmentSchema(type: string) {
  switch (type) {
    case "create":
      return CreateAppointmentSchema;
    case "cancel":
      return CancelAppointmentSchema;
    default:
      return ScheduleAppointmentSchema;
  }
}

//! APPOINTMENT FORM

//! EXERCISE FORM

export const ExerciseFormValidation = z.object({
  user_id: z.string(),
  present_reproductive_health: z.string().nonempty("This field is required."),
  diet_type: z.enum(["vegetarian", "non-vegetarian", "vegan"]), // restricts to specific options
  life_style: z.string().nonempty("This field is required."), // assumes open string, but could restrict to specific options if necessary
  any_genetic_conditions: z.string().optional(), // optional field
  any_medical_conditions: z.string().optional(), // updated field name
  weight_in_kg: z.number().min(1, "Weight must be greater than 0."), // ensures weight is greater than 0
  height_in_feet: z.number().min(1, "Height must be greater than 0."), // ensures height is greater than 0
  age: z.number().min(1, "Age must be greater than 0."), // ensures age is greater than 0
  prev_pregnancy_complications: z.string().optional(), // optional field
  type_of_pregnancy: z.number().min(1).max(3), // 1 for single baby, 2 for twins, 3 for triplets or more
  medications_taken: z.string().optional(), // optional field
  delivery_method_preference: z.enum(["C-section", "Vaginal delivery"]), // restricts to specific options
  pelvic_or_back_pain: z.boolean(), // boolean value
  water_intake_in_liters_perday: z.number().min(0, "Water intake must be a non-negative number."), // ensures water intake is non-negative
  pregnancy_trimester: z.number().min(1).max(3), // restricts to 1st, 2nd, or 3rd trimester
  approximate_calorie_intake_per_day: z.number().min(0, "Calorie intake must be a non-negative number."), // ensures calorie intake is non-negative
  stress_levels: z.enum(["low", "med", "high"]), // restricts to low, med, or high
});



//! EXERCISE FORM
