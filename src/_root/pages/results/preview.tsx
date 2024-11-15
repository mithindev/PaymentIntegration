import { useNavigate } from 'react-router-dom';

export const DietPlanPreview = () => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate('/genai/dietplan');
  };

  return (
    <div className="w-full h-48 rounded-lg shadow-lg bg-gray-800 p-6 flex flex-col justify-between hover:bg-gray-700 transition-colors">
      <h3 className="text-xl font-semibold text-green-400">Diet Plan</h3>
      <p className="text-gray-300 mt-2 mb-4">Get your personalized diet plan.</p>
      <button
        onClick={handleViewDetails}
        className="self-start px-5 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
      >
        View
      </button>
    </div>
  );
};


export const ExercisePlanPreview = () => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate('/genai/exercise');
  };

  return (
    <div className="w-full h-48 rounded-lg shadow-lg bg-gray-800 p-6 flex flex-col justify-between hover:bg-gray-700 transition-colors">
      <h3 className="text-xl font-semibold text-green-400">Exercise Plan</h3>
      <p className="text-gray-300 mt-2 mb-4">Get your personalized exercise plan.</p>
      <button
        onClick={handleViewDetails}
        className="self-start px-5 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
      >
        View
      </button>
    </div>
  );
};

export const SkeletonPreview = () => {
  const navigate = useNavigate();
  const handleViewDetails = () => {
    navigate('/community');
  };

  return (
    <div className="w-full h-auto rounded-lg shadow-lg bg-gray-800 p-6 flex flex-col justify-between hover:bg-gray-700 transition-colors">
      <h3 className="text-2xl font-bold text-green-400">Welcome</h3>
      
      <p className="text-gray-300 mb-4">
      </p>

      <button
        onClick={handleViewDetails}
        className="self-start px-5 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
      >
        Community
      </button>
    </div>
  );
};




