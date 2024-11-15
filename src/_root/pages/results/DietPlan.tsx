import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
// import { dietplan } from '../ex';

const DietPlan = () => {
  const [dietPlan, setDietPlan] = useState(() => {
    const cachedData = localStorage.getItem('dietPlan');
    return cachedData ? JSON.parse(cachedData) : null;
  });
  
  useEffect(() => {
    const fetchDietPlan = async () => {
      const data = dietPlan

      try {
        const parsedData = JSON.parse(data);

        localStorage.setItem('dietPlan', JSON.stringify(parsedData['7_day_diet_plan']));

        setDietPlan(parsedData['7_day_diet_plan']);
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    };

    fetchDietPlan();
  }, []);

  const generatePDF = () => {
    const doc = new jsPDF();
  
    // Add title
    doc.setFontSize(18);
    doc.text('7-Day Diet Plan', 14, 22);
  
    // Starting y-position for the first day
    let currentY = 30;
  
    Object.keys(dietPlan).forEach((dayKey, index) => {
      const dayPlan = dietPlan[dayKey];
  
      // Add the Day Header
      doc.setFontSize(16);
      doc.text(`Day ${index + 1}`, 14, currentY);
  
      const tableData = Object.keys(dayPlan).map((mealTime) => {
        const meal = dayPlan[mealTime];
        return [
          mealTime.replace(/_/g, ' ').toUpperCase(),  
          meal.meal,                               
          meal.benefits                            
        ];
      });
  
      doc.autoTable({
        head: [['Meal Time', 'Meal', 'Benefits']],
        body: tableData,
        startY: currentY + 8, // Move table slightly below the header
        margin: { left: 14, right: 14 },
        theme: 'striped',
        headStyles: { fillColor: [22, 160, 133] }, // Customize header color
        styles: { fontSize: 10, cellPadding: 3, overflow: 'linebreak' }, // Customize font and cell padding
        willDrawCell: (data) => {
          // Calculate if we need a page break before drawing the next cell
          if (data.row.index === tableData.length - 1 && doc.lastAutoTable.finalY > 270) {
            doc.addPage();
            currentY = 20;  // Reset y-position for new page
          }
        }
      });
  
      currentY = doc.lastAutoTable.finalY + 20; // Update y-position for next day's header
  
      // Add a new page if there is no space for the next section
      if (currentY > 270) {
        doc.addPage();
        currentY = 30; // Reset y-position on new page
      }
    });
  
    // Adding a Summary Page at the end
    doc.addPage();
    doc.setFontSize(18);
    doc.text('Diet Plan Summary', 14, 22);
  
    // Create a summary table for all days
    const summaryTableData = Object.keys(dietPlan).map((dayKey, index) => {
      const dayPlan = dietPlan[dayKey];
      return [
        `Day ${index + 1}`,
        dayPlan.pre_breakfast_snack.meal,
        dayPlan.morning_breakfast.meal,
        dayPlan.mid_morning_snack.meal,
        dayPlan.lunch.meal,
        dayPlan.evening_snack.meal,
        dayPlan.dinner.meal
      ];
    });
  
    // Render the summary table (similar to the format in the PDF you uploaded)
    doc.autoTable({
      head: [['Day', 'Pre Breakfast Snack', 'Morning Breakfast', 'Mid Morning Snack', 'Lunch', 'Evening Snack', 'Dinner']],
      body: summaryTableData,
      startY: 30,
      margin: { left: 14, right: 14 },
      theme: 'grid',
      headStyles: { fillColor: [39, 174, 96] }, // Customize header color
      styles: { fontSize: 10, cellPadding: 3 }
    });
  
    // Save the PDF
    doc.save('diet-plan.pdf');
  };
  

  if (!dietPlan) {
    return <div className="text-center text-white">Loading diet plan...</div>;
  }

  return (
    <div className="min-h-screen text-gray-300 font-sans p-6">
      <div className="mb-12 bg-gray-800 p-8 rounded-xl shadow-2xl transition-all hover:shadow-emerald-400 hover:shadow-lg">
        <h1 className="text-4xl text-emerald-400 font-extrabold mb-6">
          Your Personalized 7-Day Diet Plan
        </h1>

        <p className="text-gray-300 leading-relaxed mb-6">
          Discover the benefits of tailored nutrition with our AI-powered 7-Day Diet Plan! We analyze your unique medical profile, health conditions, and even geographical location to craft a plan just for you.
        </p>

        <p className="text-gray-300 leading-relaxed mb-6">
          No more generic diets! Our personalized approach ensures your meals align with your health goals while providing the nutrients you need to thrive. Delicious and nutritious, it's the perfect balance.
        </p>

        <p className="text-gray-300 leading-relaxed mb-6">
          Want your plan on-the-go? Easily download it as a PDF and keep it handy wherever you are. Empower your health journey today!
        </p>

        <div className="flex justify-between items-center mt-8">
          <button
            onClick={generatePDF}
            className="bg-emerald-500 text-white py-3 px-6 rounded-lg hover:bg-emerald-600 transition-transform transform hover:scale-105 focus:ring-4 focus:ring-emerald-500 focus:ring-opacity-50"
          >
            Download as PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
  {Object.keys(dietPlan).map((dayKey, index) => {
    const dayPlan = dietPlan[dayKey];
    return (
      <div
        className="bg-gray-800 rounded-lg shadow-md p-5 hover:bg-gray-700 transition-all transform hover:scale-105"
        key={index}
      >
        <h2 className="text-2xl text-emerald-500 font-bold mb-4">{`Day ${index + 1}`}</h2>
        <ul className="space-y-4">
          {Object.keys(dayPlan).map((mealTime, idx) => {
            const meal = dayPlan[mealTime];
            return (
              <li
                key={idx}
                className="bg-gray-700 p-4 rounded-md shadow hover:bg-gray-600 transition-all"
              >
                <div className="flex items-start">
                  <div className="mr-4">
                    {/* Checklist-style icon */}
                    <svg
                      className="w-6 h-6 text-emerald-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {mealTime.replace(/_/g, " ").toUpperCase()}
                    </h3>
                    <ul className="list-disc ml-5 text-sm space-y-1">
                      <li className="text-gray-300">
                        <strong>Meal:</strong> {meal.meal}
                      </li>
                      {meal.recipe_link && (
                        <li className="text-gray-300">
                          <strong>Recipe: </strong>
                          <a
                            href={meal.recipe_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-emerald-400 hover:underline"
                          >
                            View Recipe
                          </a>
                        </li>
                      )}
                      <li className="text-green-400">
                        <strong>Benefits:</strong> {meal.benefits}
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  })}
</div>

    </div>
  );
};

export default DietPlan;