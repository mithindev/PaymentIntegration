import { ExerciseFormValidation } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button, Input } from '@/components/ui';
import { Loader } from 'lucide-react';
import { exercise_data, exercise_new } from './ex';


//^ CUSTOM HOOK FOR ExercisePlan Query
const useExerciseQuery = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (formData) => {
      const response = await fetch('http://127.0.0.1:8000/exercise-recommendation/recommend-exercises', {
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

      // const temp = exercise_new; 
      // console.log(temp);
      
      // return temp;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['exerciseData'], data);
      console.log('Form submitted successfully', data);
    },
    onError: (error) => {
      console.error('Error submitting form', error);
    },
  });
  
  return mutation;
};

const ExercisePlan = () => {
  const { id } = useParams();
  const mutation = useExerciseQuery();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  
  const handleSubmit = (data) => {
    localStorage.removeItem('exerciseResponse');

    setLoading(true); 

    setTimeout(() => {
      mutation.mutate(data, {
        onSuccess: (response) => {
          localStorage.setItem('exerciseResponse', JSON.stringify(response));

          navigate('/genai/exercise');
        },
      });
      setLoading(false); 
    }, 1000); 
  };
  
  
  const form = useForm({
    // resolver: zodResolver(ExerciseFormValidation),
    defaultValues: {
      "user_id": "66eae22e3167905e6a4b",
      "present_reproductive_health": "Healthy",
      "diet_type": "Vegetarian",
      "life_style": "Active",
      "any_genetic_conditions": "None",
      "any_medical_conitions": "None", 
      "weight_in_kg": 65,
      "height_in_feet": 161,
      "age": 30,
      "prev_pregnancy_complications": "None",
      "type_of_pregnancy": 1,
      "medications_taken": "Prenatal vitamins",
      "delivery_method_preference": "Vaginal delivery",
      "pelvic_or_back_pain": false,
      "water_intake_in_liters_perday": 2.5,
      "pregnancy_trimster": 2, 
      "approximate_calorie_intake_per_day": 2200,
      "stress_levels": "Moderate" 
    }    
  });  

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-7 w-full mt-4 max-w-5xl mx-auto p-10">
        <h3 className="h3-bold mb-4">Health Information</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Section 1: Personal Information */}
          <div className="col-span-1">
            <FormField control={form.control} name="age" render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Age:</FormLabel>
                <FormControl>
                  <Input type="number" className="shad-input" placeholder="Enter your age" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="weight_in_kg" render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Weight (in kg):</FormLabel>
                <FormControl>
                  <Input type="number" className="shad-input" placeholder="Enter your weight" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="height_in_feet" render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Height (in feet):</FormLabel>
                <FormControl>
                  <Input type="number" className="shad-input" placeholder="Enter your height" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField 
              control={form.control} 
              name="stress_levels" 
              render={({ field }) => (
                <FormItem>
                  {/* Label with improved spacing and styling */}
                  <FormLabel className="shad-form_label text-gray-300 mb-2">Stress Levels:</FormLabel>
                  
                  {/* Select dropdown with better spacing, rounded corners, and focus/hover effects */}
                  <FormControl>
                    <select 
                      className="shad-input bg-gray-800 text-gray-300 border border-gray-700 rounded-md py-2 px-3 w-full
                                focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200
                                hover:bg-gray-700"
                      {...field}
                    >
                      <option value="" disabled>Select stress level</option>
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </FormControl>
                  
                  {/* Form message */}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Section 2: Pregnancy Details */}
          <div className="col-span-1">
            <FormField control={form.control} name="present_reproductive_health" render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Present Reproductive Health:</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" placeholder="Enter details" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField 
              control={form.control} 
              name="diet_type" 
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="shad-form_label text-gray-300 mb-2">Diet Type:</FormLabel>
                  
                  <FormControl>
                    <select 
                      className="shad-input bg-gray-800 text-gray-300 border border-gray-700 rounded-md py-2 px-3 w-full
                                focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200
                                hover:bg-gray-700"
                      {...field}
                    >
                      <option value="" disabled>Select Diet Type</option>
                      <option value="low">Vegetarian</option>
                      <option value="medium">Non-Vegetarian</option>
                      <option value="high">Vegan</option>
                    </select>
                  </FormControl>
                  
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField 
              control={form.control} 
              name="pelvic_or_back_pain" 
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="shad-form_label text-gray-300 mb-2">Pelvic or Back Pain:</FormLabel>
                  
                  <FormControl>
                    <label className="flex items-center space-x-3">
                      <input 
                        type="checkbox" 
                        {...field} 
                        className="w-5 h-5 bg-gray-800 text-green-500 border-gray-700 rounded focus:ring-green-500 focus:ring-2 
                                  checked:bg-green-500 transition duration-200"
                      />
                      <span className="text-gray-300">Yes</span>
                    </label>
                  </FormControl>
                  
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField 
              control={form.control} 
              name="type_of_pregnancy" 
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="shad-form_label text-gray-300 mb-2">Type of Pregnancy:</FormLabel>
                  
                  <FormControl>
                    <select 
                      className="shad-input bg-gray-800 text-gray-300 border border-gray-700 rounded-md py-2 px-3 w-full
                                focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200
                                hover:bg-gray-700"
                      {...field}
                    >
                      <option value="" disabled>Select Type</option>
                      <option value="low">Single Baby</option>
                      <option value="medium">Twins</option>
                      <option value="high">Triplets</option>
                    </select>
                  </FormControl>
                  
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Section 3: Additional Health Information */}
        <h4 className="h4-bold mt-6">Additional Health Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField control={form.control} name="any_genetic_conditions" render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Any Genetic Conditions:</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" placeholder="Enter details" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="any_medical_conditions" render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Any Medical Conditions:</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" placeholder="Enter details" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="water_intake_in_liters_perday" render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Water Intake (liters/day):</FormLabel>
              <FormControl>
                <Input type="number" className="shad-input" placeholder="Enter water intake" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="approximate_calorie_intake_per_day" render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Approximate Calorie Intake (per day):</FormLabel>
              <FormControl>
                <Input type="number" className="shad-input" placeholder="Enter calorie intake" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>

        {/* Buttons */}
        <div className="flex gap-4 items-center justify-end mt-6">
          <Button type="button" className="shad-button_dark_4" onClick={() => navigate(-1)}>Cancel</Button>
          <Button type="submit" className={`shad-button_primary whitespace-nowrap ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={loading}>

            {loading && <Loader className="animate-spin mr-2 h-5 w-5 text-white" />}
            {loading ? 'Generating personalized exercise for you...' : 'Generate Exercise Plan'}
          </Button>
          {mutation.isLoading && <p className="text-sm text-gray-600">Submitting form...</p>}
          {mutation.isSuccess && <p className="text-sm text-green-600">Form submitted successfully!</p>}
        </div>
      </form>
    </Form>
  );
};


export default ExercisePlan;
