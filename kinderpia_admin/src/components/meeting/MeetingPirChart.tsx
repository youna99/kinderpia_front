import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Chart.js 컴포넌트 등록
ChartJS.register(ArcElement, Tooltip, Legend);

interface CategoryData {
  categoryId: number;
  categoryName: string;
  meetingCount: number;
}

interface CategoryChartProps {
  data: CategoryData[];
}

const CategoryChart: React.FC<CategoryChartProps> = ({ data }) => {
  // 차트 색상
  const colors = [
    'rgb(255, 99, 132)',
    'rgb(54, 162, 235)',
    'rgb(255, 206, 86)',
    'rgb(75, 192, 192)',
    'rgb(153, 102, 255)',
    'rgb(255, 159, 64)'
  ];

  // Chart.js 데이터 포맷
  const chartData = {
    labels: data.map(item => item.categoryName),
    datasets: [
      {
        data: data.map(item => item.meetingCount),
        backgroundColor: colors,
        borderColor: colors.map(color => color.replace('rgb', 'rgba').replace(')', ', 1)')),
        borderWidth: 1,
      },
    ],
  };

  // Chart.js 옵션
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          font: {
            size: 14
          },
          padding: 20,
          generateLabels: (chart: any) => {
            const datasets = chart.data.datasets;
            return chart.data.labels.map((label: string, index: number) => ({
              text: `${label} (${datasets[0].data[index]}개)`,
              fillStyle: datasets[0].backgroundColor[index],
              hidden: false,
              index: index,
            }));
          },
        }
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const value = context.raw;
            const percentage = ((value / total) * 100).toFixed(1);
            return `${context.label}: ${value}개 (${percentage}%)`;
          }
        }
      }
    }
  };

  return (
    <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-bold mb-6 text-center text-gray-800">
        모임 카테고리 분포
      </h2>
      <div className="aspect-square">
        <Pie data={chartData} options={options} />
      </div>
    </div>
  );
};

export default CategoryChart;