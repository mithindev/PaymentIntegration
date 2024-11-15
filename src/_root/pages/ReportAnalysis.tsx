import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { report_analysis } from './ex';

const ReportAnalysis = () => {
  const { id } = useParams();

  const [reports, setReports] = useState(() => {
    const savedReports = localStorage.getItem(`reports-${id}`);
    return savedReports ? JSON.parse(savedReports) : [];
  });

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [analysisOutput, setAnalysisOutput] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/report-storage/fetch-user-reports-url?usedId=${id}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch reports');
      }

      const data = await response.json();
      // const data = [
      //   {
      //     "report type": "Blood Test Reports",
      //     "url": "https://firebasestorage.googleapis.com/v0/b/birthbuddy-7d02c.appspot.com/o/66eae22e3167905e6a4b%2FBlood%20Test%20Reports%2Fc216a2e1-86fb-4586-855c-7869cd95d46b.pdf?alt=media"
      //   }
      // ]
      setReports(data);
      localStorage.setItem(`reports-${id}`, JSON.stringify(data)); 
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('fileInput', selectedFile);

    setUploading(true);

    try {
      const response = await fetch(`http://localhost:8000/report-storage/analyse-and-upload?userId=${id}`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload file');
      }

      const data = await response.json();
      console.log('Upload successful:', data);
      fetchReports();
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleAnalyzeReport = async () => {
    try {
      const response = await fetch(`http://localhost:8000/report-storage/analyze-user-report?userId=${id}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify({ /* Include the necessary body if needed */ }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to analyze report');
      }
  
      const data = await response.json();
      
      // const data = report_analysis;
  
      setAnalysisOutput(data); 
    } catch (error) {
      console.error('Error analyzing report:', error);
    }
  };
  


  useEffect(() => {
    const savedReports = localStorage.getItem(`reports-${id}`);
    if (!savedReports) {
      fetchReports(); 
    }
  }, [id]);

  return (

    <div className="w-full  text-gray-300 p-8">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-green-400 mb-4">Organize and Analyze Your Medical Reports Effortlessly</h1>
        <p className="text-lg text-gray-400 mb-6">
          With Thottil, you can store, organize, and access your medical reports anytime. 
          Our AI-powered tool, Thottil AI, provides quick analysis of your reports, giving you instant insights with a single click.
        </p>
      </div>
      <div className="flex justify-center mb-6">
        <button
          onClick={fetchReports}
          className="bg-green-600 text-white py-2 px-4 rounded shadow hover:bg-green-700 transition duration-200"
        >
          {loading ? "Loading..." : "Fetch My Reports"}
        </button>
      </div>
  
      <div className="mb-6">
        <input
          type="file"
          onChange={(e) => setSelectedFile(e.target.files[0])}
          className="text-white"
        />
        <button
          onClick={handleFileUpload}
          className="bg-blue-600 text-white py-2 px-4 rounded shadow hover:bg-blue-700 transition duration-200 mt-4 flex items-center justify-center"
          disabled={uploading}
        >
          {uploading ? (
            <svg
              className="animate-spin h-5 w-5 text-white mr-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              ></path>
            </svg>
          ) : (
            "Upload Report"
          )}
        </button>
      </div>
  
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.length > 0 &&
          reports.map((report, index) => (
            <div
              key={index}
              className="bg-gray-800 shadow-lg rounded-lg p-6 transition duration-300 hover:shadow-xl"
            >
              <h3 className="text-xl font-semibold mb-4">
                {report["report type"]}
              </h3>
  
              <iframe
                src={report.url}
                className="w-full h-64 border border-gray-700 rounded mb-4"
                title={`Preview of ${report["report type"]}`}
              ></iframe>
  
              <a
                href={report.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-200"
              >
                Open Report
              </a>
  
              <button
                onClick={() => {
                  handleAnalyzeReport();
                  setIsModalOpen(true);
                }}
                className="mt-2 inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-neutral-200/60 focus:ring-offset-2"
              >
                Analyze using thottilAI
              </button>
            </div>
          ))}
      </div>
  
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center w-screen h-screen">
          <div
            className="absolute inset-0 w-full h-full bg-black bg-opacity-75"
            onClick={() => setIsModalOpen(false)}
          ></div>
  
          <div className="relative w-full max-w-2xl p-8 bg-gray-800 text-white border border-gray-700 rounded-lg shadow-lg">
            <div className="flex items-center justify-between pb-4 border-b border-gray-600">
              <h3 className="text-2xl font-semibold">Report Analysis</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex items-center justify-center w-8 h-8 text-gray-400 hover:text-white"
              >
                <svg
                  className="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
  
            <div className="mt-4 overflow-y-auto max-h-96 custom-scrollbar-hide">
  {analysisOutput ? (
    <ul className="space-y-6 list-disc list-inside pl-6 animate-slideIn">
      {/* Display summary first */}
      {analysisOutput.summary && (
        <li
          className="bg-gray-800 p-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
        >
          <h4 className="text-lg font-bold text-green-400 capitalize mb-4">
            Summary:
          </h4>
          <p className="text-sm text-gray-300 leading-relaxed">
            {analysisOutput.summary}
          </p>
        </li>
      )}

      {/* Display test_analysis next */}
      {analysisOutput.test_analysis && (
        <li
          className="bg-gray-800 p-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
        >
          <h4 className="text-lg font-bold text-green-400 capitalize mb-4">
            Test Analysis:
          </h4>
          <ul className="list-disc list-inside space-y-2 pl-4">
            {analysisOutput.test_analysis.map((item, itemIndex) => (
              <li key={itemIndex} className="text-sm text-gray-300 leading-relaxed">
                <span className="w-2.5 h-2.5 bg-green-500 rounded-full inline-block mr-2 animate-ping"></span>
                {item}
              </li>
            ))}
          </ul>
        </li>
      )}

      {/* Display health_concerns last with hover effect */}
      {analysisOutput.health_concerns && (
        <li
          className="bg-gray-800 p-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
        >
          <h4 className="text-lg font-bold text-green-400 capitalize mb-4">
            Health Concerns:
          </h4>
          <ul className="list-disc list-inside space-y-2 pl-4">
            {analysisOutput.health_concerns.map((item, itemIndex) => (
              <li
                key={itemIndex}
                className="text-sm text-gray-300 leading-relaxed transition duration-300 hover:text-red-500"
              >
                <span className="w-2.5 h-2.5 bg-red-500 rounded-full inline-block mr-2 animate-ping"></span>
                {item}
              </li>
            ))}
          </ul>
        </li>
      )}
    </ul>
  ) : (
    <p className="text-gray-400">thottilAI is analyzing your report...</p>
  )}
</div>


  
            <div className="flex justify-end mt-6 space-x-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 font-medium text-white bg-green-600 rounded hover:bg-green-700"
              >
                Close
              </button>
            </div>
  
            {loading && (
              <div className="flex justify-center mt-4">
                <svg
                  className="animate-spin h-5 w-5 text-green-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  ></path>
                </svg>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
  
};

export default ReportAnalysis;