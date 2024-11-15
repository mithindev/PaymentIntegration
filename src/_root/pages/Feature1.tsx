import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input, Button } from "@/components/ui";

import { ParentalFormValidation } from "@/lib/validation";
import { useState } from "react";
import { Loader } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// ^ CUSTOM HOOK FOR PreNatal Query
const usePreNatalQuery = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (formData) => {
      const response = await fetch('http://localhost:8000/prenatal/prenatal_advice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      return response.json(); 

      // const result = {"final_decision_about_having_baby":"You are in good health and your circumstances are favorable for having a baby.","improvements_to_make":["The would-be dad's moderate lifestyle with smoking or drinking habits could be improved.  Quitting these habits would significantly improve chances of conception and a healthy pregnancy"],"negative_factors":["The dad's moderate lifestyle, which suggests smoking or drinking, could negatively impact fertility and the baby's health.  "],"positive_factors":["Both partners are emotionally ready for a baby.","The couple is married, indicating a stable relationship.","They have access to prenatal care, ensuring a healthy pregnancy.","They have access to caregivers, indicating support after the baby's arrival. ","The to-be mom's vegetarian diet is generally considered healthy, but it's important to ensure she's getting enough iron and vitamin B12, which are crucial for pregnancy.","The couple lives in New York, offering access to good healthcare and support systems.","The to-be mom has a regular menstrual cycle, which is a positive sign for fertility.","Both partners are within a healthy age range for having children.","The to-be mom is proactive about her health, taking vitamins, which is beneficial for pregnancy.","They have a high level of understanding, indicating good communication and a strong relationship.","Their combined income suggests financial stability, which is helpful for raising a family."],"scores_for_plot":{"dad_biological_and_physiological_score":8,"dad_emotional_score":9,"dad_enviroment_score":10,"mom_biological_and_physiological_score":9,"mom_emotional_score":10,"mom_enviroment_score":9}}
      // return result;
    },
    
    onSuccess: (data) => {
      queryClient.setQueryData(['prenatalData'], data);
      console.log('Form submitted successfully', data);
    },
    onError: (error) => {
      console.error('Error submitting form', error);
    },
  });

  return mutation;
};

const PrenatalAdviceForm = () => {
  const mutation = usePreNatalQuery();
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(ParentalFormValidation),
    defaultValues: {
      "mom_query": {
        "PhysiologicalQueries": {
          "age": 30,
          "mestrual_history": "regular",
          "health_conditions": "none",
          "complications_in_prev_pregnancy": "none",
          "medications": "vitamins"
        },
        "BiologicalQueries": {
          "present_reproductive_health": "good",
          "diet_type": "vegetarian",
          "life_style": "active",
          "family_history_of_pregnancy_issues": "none",
          "any_genetic_conditions": "none"
        },
        "EnviromentalAndEmotionalQueries": {
          "renumeration_made_a_year": 50000,
          "nationality": "American",
          "current_place_of_living": "New York",
          "is_2_be_dad_husband": true,
          "are_you_emotionally_ready": "yes",
          "level_of_understanding_with_partner": "high",
          "has_access_to_prenatal_care": true,
          "has_access_to_care_givers_for_baby": true
        }
      },
      "dad_query": {
        "PhysiologicalQueries": {
          "age": 32,
          "health_conditions": "none",
          "sexual_health": "good",
          "fertility_history": "no issues",
          "medications": "none"
        },
        "BiologicalQueries": {
          "present_reproductive_health": "good",
          "diet_type": "non-vegetarian",
          "life_style": "moderate",
          "any_genetic_conditions_or_family_history_of_reproductive_issue": "none"
        },
        "EnviromentalAndEmotionalQueries": {
          "renumeration_made_a_year": 60000,
          "nationality": "American",
          "current_place_of_living": "New York",
          "is_2_be_mom_wife": true,
          "are_you_emotionally_ready": "yes",
          "level_of_understanding_with_partner": "high"
        }
      }
    }
  });

  // @ts-ignore
  const handleSubmit = (data) => {
    mutation.mutate(data, {
      onSuccess: () => {
        navigate('/genai/pna');
      },
    });
  };


  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-7 w-full mt-4 max-w-5xl mx-auto p-[20px]">
    <div className="bg-black text-white p-6 rounded-lg mb-6 border border-gray-700 animate-fade-in">
      <h2 className="text-2xl font-bold mb-4 text-green-400">About This Analysis</h2>
      
      <p className="mb-4">
        In this section, both you and your partner will provide information about your health, lifestyle, and family history. Based on the data you enter, <span className="font-semibold text-green-400">Thottil AI</span> will generate an analysis to help you understand whether it is the right time to have a baby.
      </p>

      <p className="mb-4">
        The AI considers multiple factors including:
      </p>
      
      <ul className="list-disc list-inside space-y-2 mb-4">
        <li>
          <span className="text-red-400">Reproductive health</span> of both parents
        </li>
        <li>
          <span className="text-green-400">Family history</span> of pregnancy-related issues
        </li>
        <li>
          Current <span className="text-yellow-400">lifestyle</span> and health conditions
        </li>
        <li>
          Any <span className="text-blue-400">medications</span> or genetic conditions
        </li>
      </ul>

      <p className="mb-4">
        Based on these inputs, <span className="font-semibold text-green-400">Thottil AI</span> will provide personalized suggestions. Please note that this is an advisory tool, and you should consult a healthcare professional before making any final decisions.
      </p>
      
      <p className="font-semibold text-red-400">
        <span className="text-white">Privacy Notice:</span> For your privacy, none of the information you provide in this form is saved.
      </p>
    </div>

      
      {/* //& Mom Query: Physiological */}
      <div className="mb-6">
        <h3 className="h3-bold mb-4">Mom - Physiological Queries</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Age */}
          <FormField
            control={form.control}
            name="mom_query.PhysiologicalQueries.age"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Age (in years)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Enter mother's age" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Menstrual History */}
          <FormField
            control={form.control}
            name="mom_query.PhysiologicalQueries.mestrual_history"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Menstrual History</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Describe last menstrual period or cycle history" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Health Conditions */}
          <FormField
            control={form.control}
            name="mom_query.PhysiologicalQueries.health_conditions"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Existing Health Conditions</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Enter any known health conditions (e.g., diabetes, hypertension)" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Complications in Previous Pregnancy */}
          <FormField
            control={form.control}
            name="mom_query.PhysiologicalQueries.complications_in_prev_pregnancy"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Previous Pregnancy Complications</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Describe any complications in previous pregnancies (if any)" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Medications */}
          <FormField
            control={form.control}
            name="mom_query.PhysiologicalQueries.medications"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Current Medications</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="List any current medications or supplements" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>



      {/* Mom Query: Biological */}
      <div className="flex flex-col gap-3">
  <h3 className="h3-bold">Mom - Biological Queries</h3>
  
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* Present Reproductive Health */}
    <FormField
      control={form.control}
      name="mom_query.BiologicalQueries.present_reproductive_health"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="shad-form_label">Present Reproductive Health</FormLabel>
          <FormControl>
            <Input type="text" placeholder="Describe current reproductive health status" className="shad-input" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    {/* Diet Type */}
    <FormField
      control={form.control}
      name="mom_query.BiologicalQueries.diet_type"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="shad-form_label">Diet Type</FormLabel>
          <FormControl>
            <Input type="text" placeholder="Enter your dietary preferences or restrictions" className="shad-input" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    {/* Life Style */}
    <FormField
      control={form.control}
      name="mom_query.BiologicalQueries.life_style"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="shad-form_label">Lifestyle</FormLabel>
          <FormControl>
            <Input type="text" placeholder="Describe your lifestyle (e.g., active, sedentary)" className="shad-input" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    {/* Family History of Pregnancy Issues */}
    <FormField
      control={form.control}
      name="mom_query.BiologicalQueries.family_history_of_pregnancy_issues"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="shad-form_label">Family History of Pregnancy Issues</FormLabel>
          <FormControl>
            <Input type="text" placeholder="Mention any family history of pregnancy-related problems" className="shad-input" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    {/* Any Genetic Conditions */}
    <FormField
      control={form.control}
      name="mom_query.BiologicalQueries.any_genetic_conditions"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="shad-form_label">Any Genetic Conditions</FormLabel>
          <FormControl>
            <Input type="text" placeholder="Specify any known genetic conditions" className="shad-input" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </div>
</div>


      {/* Mom Query: EnviromentalAndEmotionalQueries */}

      <div className="flex flex-col gap-3">
  <h3 className="h3-bold">Mom - Biological Queries</h3>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <FormField
      control={form.control}
      name="mom_query.EnviromentalAndEmotionalQueries.renumeration_made_a_year"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="shad-form_label">How much money did you earn last year?</FormLabel>
          <FormControl>
            <Input
              type="number"
              className="shad-input"
              placeholder="Enter amount in currency"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    <FormField
      control={form.control}
      name="mom_query.EnviromentalAndEmotionalQueries.nationality"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="shad-form_label">What is your nationality?</FormLabel>
          <FormControl>
            <Input
              type="text"
              className="shad-input"
              placeholder="Enter your nationality"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    <FormField
      control={form.control}
      name="mom_query.EnviromentalAndEmotionalQueries.current_place_of_living"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="shad-form_label">Where do you currently live?</FormLabel>
          <FormControl>
            <Input
              type="text"
              className="shad-input"
              placeholder="Enter your city or location"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    <FormField
      control={form.control}
      name="mom_query.EnviromentalAndEmotionalQueries.are_you_emotionally_ready"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="shad-form_label">Do you feel emotionally ready for this?</FormLabel>
          <FormControl>
            <Input
              type="text"
              className="shad-input"
              placeholder="Yes or No"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    <FormField
      control={form.control}
      name="mom_query.EnviromentalAndEmotionalQueries.level_of_understanding_with_partner"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="shad-form_label">How well do you understand your partner?</FormLabel>
          <FormControl>
            <Input
              type="text"
              className="shad-input"
              placeholder="Describe your understanding level"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </div>


        {/* //TODO
        is_2_be_dad_husband: true,
        has_access_to_prenatal_care: true,
        has_access_to_care_givers_for_baby: true, */}
      </div>

      {/* Dad Query: Physiological */}
      <div className="flex flex-col gap-3">
  <h3 className="h3-bold">Dad - Physiological Queries</h3>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <FormField
      control={form.control}
      name="dad_query.PhysiologicalQueries.age"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="shad-form_label">What is your age?</FormLabel>
          <FormControl>
            <Input
              type="number"
              className="shad-input"
              placeholder="Enter your age"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    <FormField
      control={form.control}
      name="dad_query.PhysiologicalQueries.health_conditions"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="shad-form_label">Do you have any health conditions?</FormLabel>
          <FormControl>
            <Input
              type="text"
              className="shad-input"
              placeholder="List any health conditions"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    <FormField
      control={form.control}
      name="dad_query.PhysiologicalQueries.sexual_health"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="shad-form_label">How would you describe your sexual health?</FormLabel>
          <FormControl>
            <Input
              type="text"
              className="shad-input"
              placeholder="Describe your sexual health"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    <FormField
      control={form.control}
      name="dad_query.PhysiologicalQueries.fertility_history"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="shad-form_label">What is your fertility history?</FormLabel>
          <FormControl>
            <Input
              type="text"
              className="shad-input"
              placeholder="Provide details about your fertility history"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    <FormField
      control={form.control}
      name="dad_query.PhysiologicalQueries.medications"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="shad-form_label">What medications are you currently taking?</FormLabel>
          <FormControl>
            <Input
              type="text"
              className="shad-input"
              placeholder="List your medications"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </div>

      </div>

      {/* //!Dad Query: BiologicalQueries */}

      <div className="flex flex-col gap-3">
  <h3 className="h3-bold">Dad - Biological Queries</h3>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <FormField
      control={form.control}
      name="dad_query.BiologicalQueries.present_reproductive_health"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="shad-form_label">How would you describe your current reproductive health?</FormLabel>
          <FormControl>
            <Input
              type="text"
              className="shad-input"
              placeholder="Provide details about your reproductive health"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    <FormField
      control={form.control}
      name="dad_query.BiologicalQueries.diet_type"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="shad-form_label">What type of diet do you follow?</FormLabel>
          <FormControl>
            <Input
              type="text"
              className="shad-input"
              placeholder="e.g., vegetarian, vegan, balanced"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    <FormField
      control={form.control}
      name="dad_query.BiologicalQueries.life_style"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="shad-form_label">How would you describe your lifestyle?</FormLabel>
          <FormControl>
            <Input
              type="text"
              className="shad-input"
              placeholder="Active, sedentary, etc."
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    <FormField
      control={form.control}
      name="dad_query.BiologicalQueries.any_genetic_conditions_or_family_history_of_reproductive_issue"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="shad-form_label">Do you have any genetic conditions or a family history of reproductive issues?</FormLabel>
          <FormControl>
            <Input
              type="text"
              className="shad-input"
              placeholder="Specify any relevant conditions or history"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </div>
</div>


      {/* //!Dad Query: EnviromentalAndEmotionalQueries */}

      <div className="flex flex-col gap-3">
  <h3 className="h3-bold">Dad - Physiological Queries</h3>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <FormField
      control={form.control}
      name="dad_query.EnviromentalAndEmotionalQueries.renumeration_made_a_year"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="shad-form_label">What is your annual income?</FormLabel>
          <FormControl>
            <Input
              type="number"
              className="shad-input"
              placeholder="Enter your income for the year"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    <FormField
      control={form.control}
      name="dad_query.EnviromentalAndEmotionalQueries.nationality"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="shad-form_label">What is your nationality?</FormLabel>
          <FormControl>
            <Input
              type="text"
              className="shad-input"
              placeholder="Enter your nationality"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    <FormField
      control={form.control}
      name="dad_query.EnviromentalAndEmotionalQueries.current_place_of_living"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="shad-form_label">Where do you currently live?</FormLabel>
          <FormControl>
            <Input
              type="text"
              className="shad-input"
              placeholder="Enter your current location"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    <FormField
      control={form.control}
      name="dad_query.EnviromentalAndEmotionalQueries.are_you_emotionally_ready"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="shad-form_label">Are you emotionally ready for parenthood?</FormLabel>
          <FormControl>
            <Input
              type="text"
              className="shad-input"
              placeholder="Yes or No"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    <FormField
      control={form.control}
      name="dad_query.EnviromentalAndEmotionalQueries.level_of_understanding_with_partner"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="shad-form_label">How well do you understand your partner?</FormLabel>
          <FormControl>
            <Input
              type="text"
              className="shad-input"
              placeholder="Describe your understanding"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </div>
</div>


      {/* Submit Button */}
      <div className="flex gap-4 items-center justify-end mx-auto py-10">
        <Button
          type="button"
          className="shad-button_dark_4"
          onClick={() => navigate(-1)}>
          Cancel
        </Button>
        <Button
          type="submit"
          className="shad-button_primary whitespace-nowrap"
          disabled={loading}
        >
          {loading && <Loader />}
          Submit
        </Button>

        {mutation.isLoading && <p>Submitting form...</p>}
        {mutation.isSuccess && <p>Form submitted successfully!</p>}
      </div>
    </form>
    </Form>
  );
};

export default PrenatalAdviceForm;
