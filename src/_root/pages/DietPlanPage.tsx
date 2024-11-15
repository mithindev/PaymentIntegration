import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
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
import { dietplan } from './ex';
import axios from 'axios';

const useDietQuery = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (formData) => {
      // Convert formData into a query string
      const queryParams = new URLSearchParams({
        rep: JSON.stringify(formData),  // Stringify the formData object
        location: formData.location,    // Add location directly
      });

      // Send the GET request with the query parameters
      const response = await axios.post(`http://127.0.0.1:8001/?${queryParams}`);

      return response.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['dietData'], data);
      localStorage.setItem('dietPlan', JSON.stringify(data));
      console.log('Form submitted successfully', data);
    },
    onError: (error) => {
      console.error('Error submitting form', error);
    },
  });

  return mutation;
};




const DietPlanPage = () => {
  const mutation = useDietQuery();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (data) => {
    console.log(data);
    mutation.mutate(data, {
      onSuccess: () => {
        navigate('/genai/dietplan');
      },
    });
  };

  // const handleSubmit = (data) => {
  //   setLoading(true); 
  //   setTimeout(() => {
  //     mutation.mutate(data, {
  //       onSuccess: () => {
  //         navigate('/genai/dietplan');
  //       },
  //     });
  //     setLoading(false);
  //   }, 5000); 
  // };

  const form = useForm({
    defaultValues: {
      "name": "Meghan Markle",
      "age": 42,
      "height": "5'6\" (168 cm)",
      "weight": "126 lbs (57 kg)",
      "location": "North India",
      "pre_pregnancy_weight": "126 lbs (57 kg)",
      "trimester": "N/A",
      "pregnancies_before": 2,
      "health_conditions": "None publicly known",
      "food_allergies": "None publicly known",
      "medications": "Prenatal vitamins",
      "food_preferences": "Mostly plant-based, occasional non-vegetarian meals",
      "dietary_restrictions": "Focus on organic and fresh food",
      "meals_per_day": 3,
      "cravings_or_aversions": "Cravings for pasta and french fries",
      "nutritional_goals": "Maintaining a healthy weight and balanced diet",
      "nutrients_focus": "Folic acid, iron, calcium"
    }
  });

  

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-7 w-full mt-4 max-w-5xl mx-auto p-10">
        <h3 className="h3-bold mb-4">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { label: 'Name:', name: 'name', type: 'text' },
            { label: 'Age:', name: 'age', type: 'number', min: 0 },
            { label: 'Height (cm):', name: 'height', type: 'number', min: 0, placeholder: 'Enter height in cm' },
            { label: 'Weight (kg):', name: 'weight', type: 'number', min: 0, placeholder: 'Enter weight in kg' },
            { label: 'Location:', name: 'location', type: 'text', placeholder: 'City, State' },
            { label: 'Pre-pregnancy Weight (kg):', name: 'pre_pregnancy_weight', type: 'number', min: 0 },
            { label: 'Trimester:', name: 'trimester', type: 'text', placeholder: 'e.g., 1st, 2nd, 3rd' },
            { label: 'Previous Pregnancies:', name: 'pregnancies_before', type: 'number', min: 0 },
          ].map(({ label, name, type, ...props }) => (
            <FormField key={name} control={form.control} name={name} render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">{label}</FormLabel>
                <FormControl>
                  <Input type={type} className="shad-input" {...field} {...props} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
          ))}
        </div>

        <h3 className="h3-bold mb-4 mt-8">Health and Nutrition</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { label: 'Health Conditions:', name: 'health_conditions', type: 'text', placeholder: 'List any health conditions' },
            { label: 'Food Allergies:', name: 'food_allergies', type: 'text', placeholder: 'e.g., nuts, gluten' },
            { label: 'Medications:', name: 'medications', type: 'text', placeholder: 'Current medications' },
            { label: 'Food Preferences:', name: 'food_preferences', type: 'text', placeholder: 'e.g., vegetarian, vegan' },
            { label: 'Dietary Restrictions:', name: 'dietary_restrictions', type: 'text', placeholder: 'e.g., dairy-free' },
            { label: 'Meals Per Day:', name: 'meals_per_day', type: 'number', min: 1 },
            { label: 'Cravings or Aversions:', name: 'cravings_or_aversions', type: 'text', placeholder: 'What are you craving or avoiding?' },
            { label: 'Nutritional Goals:', name: 'nutritional_goals', type: 'text', placeholder: 'e.g., gain weight, lose weight' },
            { label: 'Nutrients Focus:', name: 'nutrients_focus', type: 'text', placeholder: 'e.g., protein, vitamins' },
          ].map(({ label, name, type, ...props }) => (
            <FormField key={name} control={form.control} name={name} render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">{label}</FormLabel>
                <FormControl>
                  <Input type={type} className="shad-input" {...field} {...props} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
          ))}
        </div>

        <div className="flex gap-4 items-center justify-end mt-6">
        <Button type="button" className="shad-button_dark_4" onClick={() => navigate(-1)}>Cancel</Button>
        <Button type="submit" className={`shad-button_primary whitespace-nowrap ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={loading}>
          {loading && <Loader className="animate-spin mr-2 h-5 w-5 text-white" />}
          {loading ? 'Generating personalized diet for you...' : 'Generate Diet Plan'}
          </Button>
          {mutation.isLoading && <p className="text-sm text-gray-600">Submitting form...</p>}
          {mutation.isSuccess && <p className="text-sm text-green-600">Form submitted successfully!</p>}
        </div>
      </form>
    </Form>

  );
};

export default DietPlanPage;
