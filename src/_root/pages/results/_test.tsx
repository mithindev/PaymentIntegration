import React from 'react';
import { useQuery } from '@tanstack/react-query';

const ExercisePlanResults = () => {
  // Use the same key as you set in useExerciseQuery
  const { data: exerciseData, isLoading, isError } = useQuery(['exerciseData'], {
    // This function is used to fetch data if it's not already cached
    queryFn: () => {
      console.log('this data is from res', exerciseData);      return null; // No need to fetch from an API; we're using cached data
    },
    staleTime: 5000, // Adjust as necessary for your caching needs
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading exercise data.</div>;
  }

  return (
    <div>
      <div>
        {/* Safeguard against undefined or null exerciseData */}
        {exerciseData ? exerciseData.length : 0}
      </div>
      <h1>Exercise Plan Recommendations</h1>
      {exerciseData && exerciseData.length > 0 ? (
        <div>
          <h2>Recommended Exercises:</h2>
          <ul>
            {exerciseData.map((exercise, index) => (
              <li key={index}>
                <strong>{exercise.name}</strong>: {exercise.instructions}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No exercise recommendations available.</p>
      )}
    </div>
  );
};

export default ExercisePlanResults;
