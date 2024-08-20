import React, { useEffect, useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/router';
import DashboardLayout from '../../components/Layout/DashboardLayout';
import { useFlashcards } from '../../hooks/useFlashcards';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Analytics() {
  const { isLoaded, userId } = useAuth();
  const router = useRouter();
  const { flashcards, loading, error } = useFlashcards();
  const [analyticsData, setAnalyticsData] = useState(null);

  useEffect(() => {
    if (isLoaded && !userId) {
      router.push('/signin');
    }
  }, [isLoaded, userId, router]);

  useEffect(() => {
    if (flashcards.length > 0) {
      // In a real application, you would fetch this data from your backend
      // Here, we're generating mock data based on the flashcards
      const mockData = {
        totalCards: flashcards.length,
        studiedCards: Math.floor(Math.random() * flashcards.length),
        averageAccuracy: Math.floor(Math.random() * 100),
        studyTimePerDay: Array(7).fill().map(() => Math.floor(Math.random() * 60)),
      };
      setAnalyticsData(mockData);
    }
  }, [flashcards]);

  if (!isLoaded || !userId) {
    return <div>Loading...</div>;
  }

  if (loading) {
    return <div>Loading analytics...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Study Time (minutes)',
        data: analyticsData?.studyTimePerDay || [],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Study Time per Day',
      },
    },
  };

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-semibold mb-4">Your Study Analytics</h1>
      {analyticsData && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-2">Total Flashcards</h2>
            <p className="text-3xl font-bold">{analyticsData.totalCards}</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-2">Studied Flashcards</h2>
            <p className="text-3xl font-bold">{analyticsData.studiedCards}</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-2">Average Accuracy</h2>
            <p className="text-3xl font-bold">{analyticsData.averageAccuracy}%</p>
          </div>
        </div>
      )}
      <div className="bg-white p-4 rounded shadow">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </DashboardLayout>
  );
}
