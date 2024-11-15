import React, { useEffect, useState } from 'react';
import { DietPlanPreview, ExercisePlanPreview, SkeletonPreview } from './results/preview';
import ChatBot from './chatBot';


export const Home = () => {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const dietPlan = JSON.parse(localStorage.getItem('dietPlan'));
    const exercisePlan = JSON.parse(localStorage.getItem('exerciseResponse'));

    const availablePlans = [];
    if (dietPlan) availablePlans.push({ type: 'Diet Plan', details: dietPlan });
    if (exercisePlan) availablePlans.push({ type: 'Exercise Plan', details: exercisePlan });

    setPlans(availablePlans);
  }, []);

  return (
    <div className="flex  min-h-screen p-6 space-x-6">
      <div className="w-[70%] bg-gray-900 p-6 shadow-lg rounded-lg">
        {/* <ChatBot /> */}
      </div>

      <div className="w-[30%] bg-gray-900 p-6 shadow-lg rounded-lg">
        {/* <div className="space-y-4">
         {plans.length > 0 ? <h2 className="text-2xl font-semibold text-green-400 mb-4">Generated Plans</h2>: <></>}
          {plans.length > 0 ? (
            plans.map((plan, index) => (
              <div key={index} className="text-white">
                {plan.type === 'Diet Plan' && <DietPlanPreview />}
                {plan.type === 'Exercise Plan' && <ExercisePlanPreview />}
              </div>
            ))
          ) : (
            <SkeletonPreview />
          )}
        </div> */}
        <SkeletonPreview />
      </div>
    </div>
  );
};
