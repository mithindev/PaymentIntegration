import { useQueryClient } from '@tanstack/react-query';
import {
  TextRevealCard,
} from '@/components/ui/md/text-reveal-card';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register necessary chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Prenatal = () => {
  const queryClient = useQueryClient();

  const prenatalData = queryClient.getQueryData(['prenatalData']);

  if (!prenatalData) {
    return <div className="text-center text-white">No prenatal data available. Please submit the form first.</div>;
  }

  const { //@ts-ignore
    final_decision_about_having_baby, //@ts-ignore
    improvements_to_make, //@ts-ignore
    negative_factors, //@ts-ignore
    positive_factors, //@ts-ignore
    scores_for_plot
  } = prenatalData;

  const chartData = {
    labels: ['Biological & Physiological', 'Emotional', 'Environment'],
    datasets: [
      {
        label: "Dad's Score",
        data: [
          scores_for_plot.dad_biological_and_physiological_score,
          scores_for_plot.dad_emotional_score,
          scores_for_plot.dad_enviroment_score,
        ],
        backgroundColor: 'rgba(54, 162, 235, 0.5)', // Blue for Dad
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        label: "Mom's Score",
        data: [
          scores_for_plot.mom_biological_and_physiological_score,
          scores_for_plot.mom_emotional_score,
          scores_for_plot.mom_enviroment_score,
        ],
        backgroundColor: 'rgba(75, 192, 192, 0.5)', // Green for Mom
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'white', // Legend text color
        },
      },
      title: {
        display: true,
        text: 'Comparison of Scores (Mom vs Dad)',
        color: 'white', // Title text color
      },
    },
    scales: {
      x: {
        ticks: {
          color: 'white', // X-axis label color
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          color: 'white', // Y-axis label color
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="flex flex-col h-screen w-full px-5 md:px-10 text-white p-10">
      <div className="w-full flex flex-col items-center space-y-6">

      {final_decision_about_having_baby === "You are in good health and your circumstances are favorable for having a baby." && (
          <div className="bg-gray-800 shadow-md rounded-lg p-6 mb-8 py-15">
            <TextRevealCard text={"Know your Results!"} revealText={final_decision_about_having_baby}></TextRevealCard>
          </div>
      )}
      

      {/* Improvements to Make Section */}
      <div className="max-w-4xl mx-auto bg-gray-800 shadow-lg rounded-lg p-6 mb-8 border-l-4 border-yellow-400">
        <h2 className="text-2xl font-bold text-yellow-400 mb-4">Improvements to Make</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-300">
          {improvements_to_make.map((improvement: string, index: number) => (
            <li key={index} className="transition duration-200 hover:text-yellow-300">{improvement}</li>
          ))}
        </ul>
      </div>

      {/* Negative Factors Section */}
      <div className="max-w-4xl mx-auto bg-gray-800 shadow-lg rounded-lg p-6 mb-8 border-l-4 border-red">
        <h2 className="text-2xl font-bold text-red mb-4">Negative Factors</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-300">
          {negative_factors.map((factor: string, index: number) => (
            <li key={index} className="transition duration-200 hover:text-red">{factor}</li>
          ))}
        </ul>
      </div>


      <div className="max-w-4xl mx-auto bg-gray-800 shadow-lg rounded-lg p-8 mb-10">
        <h2 className="text-3xl font-bold text-green-400 mb-6 text-center">Positive Factors</h2>
        <ul className="space-y-4">
          {positive_factors.map((factor: string, index: number) => (
            <li key={index} className="flex items-center bg-gray-700 p-4 rounded-lg shadow-md transition-transform transform hover:scale-105">
              <div className="flex-shrink-0 w-10 h-10 bg-green-400 text-white flex items-center justify-center rounded-full mr-4">
                {index + 1}
              </div>
              <p className="text-lg text-gray-100 font-semibold">{factor}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="max-w-4xl mx-auto bg-gray-800 shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-blue-400 mb-4">Scores</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-700 rounded-lg shadow-md">
            <h3 className="text-gray-300 font-semibold">Dad's Biological & Physiological Score:</h3>
            <p className="text-gray-100">{scores_for_plot.dad_biological_and_physiological_score}/10</p>
          </div>
          <div className="p-4 bg-gray-700 rounded-lg shadow-md">
            <h3 className="text-gray-300 font-semibold">Mom's Biological & Physiological Score:</h3>
            <p className="text-gray-100">{scores_for_plot.mom_biological_and_physiological_score}/10</p>
          </div>
          <div className="p-4 bg-gray-700 rounded-lg shadow-md">
            <h3 className="text-gray-300 font-semibold">Dad's Emotional Score:</h3>
            <p className="text-gray-100">{scores_for_plot.dad_emotional_score}/10</p>
          </div>
          <div className="p-4 bg-gray-700 rounded-lg shadow-md">
            <h3 className="text-gray-300 font-semibold">Mom's Emotional Score:</h3>
            <p className="text-gray-100">{scores_for_plot.mom_emotional_score}/10</p>
          </div>
          <div className="p-4 bg-gray-700 rounded-lg shadow-md">
            <h3 className="text-gray-300 font-semibold">Dad's Environment Score:</h3>
            <p className="text-gray-100">{scores_for_plot.dad_enviroment_score}/10</p>
          </div>
          <div className="p-4 bg-gray-700 rounded-lg shadow-md">
            <h3 className="text-gray-300 font-semibold">Mom's Environment Score:</h3>
            <p className="text-gray-100">{scores_for_plot.mom_enviroment_score}/10</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto bg-gray-800 shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-blue-400 mb-4">Scores Comparison</h2>

          {/* Bar Chart */}
          <div className="p-4 bg-gray-700 rounded-lg shadow-md">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>
      {final_decision_about_having_baby === "Bad news" && (
          <div className="bg-gray-800 shadow-md rounded-lg p-6 mb-8 py-15">
            <TextRevealCard text={final_decision_about_having_baby} revealText={final_decision_about_having_baby}></TextRevealCard>
          </div>
      )}
    </div>
    </div>
  );
};

export default Prenatal;
