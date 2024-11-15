import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface ExerciseTypes {
  exercise_name: string;
  reason_for_the_suggested_exercise: string,
  total_duration_of_the_exercise_in_minutes: number;
  benefits: string[];
  instructions: string[];
  precautions: string[];
  'reference-images': string[];
  'reference-links'?: string[]; 
}

const Exercise = () => {
  const [expandedExercise, setExpandedExercise] = useState<number | null>(null);
  const [selectedExercise, setSelectedExercise] = useState<number | null>(null);
  const [exercisePlan, setExercisePlan] = useState<ExerciseTypes[]>([]);

  const [linkTitles, setLinkTitles] = useState({});
  const [showLinks, setShowLinks] = useState(false);

  const toggleLinksVisibility = () => {
    setShowLinks(!showLinks);
  };


  const fetchTitle = async (link, index) => {
    try {
      const response = await fetch(link, { mode: 'cors' });
      const htmlText = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlText, 'text/html');
      const title = doc.querySelector('title').innerText;
      setLinkTitles((prevTitles) => ({ ...prevTitles, [index]: title }));
    } catch (error) {
      console.error('Error fetching title for link:', link, error);
    }
  };

  useEffect(() => {
    // Retrieve data from localStorage
    const savedResponse = localStorage.getItem('exerciseResponse');

    if (savedResponse) {
      setExercisePlan(JSON.parse(savedResponse));
    }
  }, []);

  useEffect(() => {
    exercisePlan.forEach((exercise, i) => {
      exercise['reference-links']?.forEach((link, j) => {
        fetchTitle(link, `${i}-${j}`);
      });
    });
  }, [exercisePlan]);


  return (
    <div className="text-white min-h-screen p-8 mb-10">
      <div className="bg-gray-800 text-white p-8 rounded-lg border border-gray-700 shadow-lg mb-10">
        <h2 className="text-4xl font-bold text-green-400 mb-6 text-center">Personalized Exercise Plans with GenAI</h2>
        <p className="text-lg text-gray-300 mb-6 text-center">
          Our AI-powered system generates custom exercise plans, tailored specifically to you. By considering your
          medical history, fitness level, personal preferences, and health goals, we provide a plan designed just for
          you.
        </p>
        <ul className="text-gray-400 space-y-3 text-center">
          <li>✔️ Customized to your health data</li>
          <li>✔️ Adjusts based on medical conditions and reports</li>
          <li>✔️ Adapts to your fitness level and lifestyle</li>
          <li>✔️ Created to help you meet your health and wellness goals</li>
        </ul>
        <p className="text-center text-gray-400 mt-6">Let our AI help you take control of your fitness journey with precision and care.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-10">
        {exercisePlan.map((exercise, index) => (
          <motion.div
            key={index}
            className="bg-gray-800 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
            onClick={() => setSelectedExercise(selectedExercise === index ? null : index)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="text-3xl font-semibold mb-4 text-green-300">{exercise.exercise_name}</h2>
            <p className="text-sm mb-4 text-gray-400">Duration: {exercise.total_duration_of_the_exercise_in_minutes} minutes</p>
            <p className="text-sm mb-4 text-gray-400"><span className='font-semibold text-green-600'>Why this exercise is recommended for you: </span>{exercise.reason_for_the_suggested_exercise}</p>
            <img
              src={exercise['reference-images'][0]}
              alt={exercise.exercise_name}
              className="rounded-lg object-cover mb-4 w-full h-48"
            />

            {selectedExercise === index && (
              <div className="mt-4">

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2 text-teal-400">Benefits:</h3>
                  <ul className="list-none space-y-2">
                    {exercise.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center">
                        <span className="w-2.5 h-2.5 bg-green-500 rounded-full inline-block mr-2 animate-ping"></span>
                        <p>{benefit}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2 text-teal-400">Instructions:</h3>
                  <ol className="list-decimal list-inside space-y-2 pl-4">
                    {exercise.instructions.map((instruction, i) => (
                      <li key={i}>{instruction}</li>
                    ))}
                  </ol>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2 text-teal-400">Precautions:</h3>
                  <ul className="list-none space-y-2">
                    {exercise.precautions.map((precaution, i) => (
                      <li key={i} className="flex items-center">
                        <span className="w-2.5 h-2.5 bg-red-500 rounded-full inline-block mr-2 animate-bounce"></span>
                        <p>{precaution}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 text-teal-400">Reference Images:</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {exercise['reference-images'].map((image, i) => (
                      <img
                        key={i}
                        src={image}
                        alt={`exercise ${index} image ${i}`}
                        className="rounded-lg transform hover:scale-105 transition-transform duration-300 shadow-md"
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <div className="mb-10">
        <p className="text-lg text-gray-300 mb-6 text-center">
          Your medical reports and personal health information power these carefully curated resources.
        </p>

        <div className="text-center mb-6">
          <button
            onClick={toggleLinksVisibility}
            className="px-4 py-2 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-colors"
          >
            {showLinks ? 'Hide' : 'Show'} Reference Links
          </button>
        </div>

        {showLinks && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {exercisePlan.map((exercise, i) => (
              exercise['reference-links'] && exercise['reference-links'].map((link, j) => (
                <motion.div
                  key={j}
                  whileHover={{ scale: 1.05 }}
                  className="relative group bg-gray-700 p-4 rounded-md transition-all duration-300 hover:bg-gray-600"
                >
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline text-sm"
                  >
                    {linkTitles[`${i}-${j}`] || `Reference ${j + 1}`} {/* Use title if available, else fallback */}
                  </a>
                </motion.div>
              ))
            ))}
          </div>
        )}
    </div>


    </div>
  );
};

export default Exercise;
