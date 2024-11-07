import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  InteractionMode,
  ScaleOptionsByType,
  Scale
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ParticipationTrendProps {
  data: { [key: string]: number };
}

const ParticipationTrend: React.FC<ParticipationTrendProps> = ({ data }) => {
  const sortedDates = Object.keys(data).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
  
  const chartData = {
    labels: sortedDates.map(date => {
      const d = new Date(date);
      return `${d.getMonth() + 1}/${d.getDate()}`;
    }),
    datasets: [
      {
        label: '일일 참여자 수',
        data: sortedDates.map(date => data[date]),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        tension: 0.3,
        pointRadius: 4,
        pointHoverRadius: 6,
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: '최근 한달 모임 참여 현황',
        font: {
          size: 16,
          weight: 'bold' as const,
        },
        padding: {
          top: 10,
          bottom: 20
        }
      },
      tooltip: {
        callbacks: {
          title: (items: any[]) => {
            if (items.length > 0) {
              const index = items[0].dataIndex;
              return sortedDates[index];
            }
            return '';
          },
          label: (context: any) => {
            return `참여자 수: ${context.raw}명`;
          }
        }
      }
    },
    scales: {
      y: {
        type: 'linear' as const,
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          callback: function(tickValue: number | string) {
            return tickValue + '명';
          }
        },
        title: {
          display: true,
          text: '참여자 수'
        }
      },
      x: {
        type: 'category' as const,
        title: {
          display: true,
          text: '날짜'
        },
        grid: {
          display: false
        }
      }
    },
    interaction: {
      intersect: false,
      mode: 'index' as InteractionMode
    }
  };

  return (
    <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-6">
      <Line data={chartData} options={options} />
      <div className="mt-4 text-center text-sm text-gray-600">
        * 가로축은 월/일 형식으로 표시됩니다.
      </div>
    </div>
  );
};

export default ParticipationTrend;