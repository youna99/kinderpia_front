import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { fetchTotalUsers, fetchMonthlyStats, fetchDailyStats } from '../api/statistics';
import { StatisticsResponse } from '../types/types';

// Chart.js 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// 공통 차트 옵션
const commonChartOptions: ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
    },
  },
  scales: {
    y: {
      type: 'linear',
      beginAtZero: true,
      ticks: {
        callback: function(value: number | string) {
          if (typeof value === 'number') {
            return value.toLocaleString() + '명';
          }
          return value;
        }
      }
    }
  }
};

const UserStatistics: React.FC = () => {
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [monthlyStats, setMonthlyStats] = useState<StatisticsResponse | null>(null);
  const [dailyStats, setDailyStats] = useState<StatisticsResponse | null>(null);
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<string>(
    `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}`
  );

  // 연도 옵션 생성 (현재 연도부터 5년 전까지)
  const yearOptions = Array.from(
    { length: 3 }, 
    (_, i) => new Date().getFullYear() - i
  );

  // 월별 차트 데이터
  const monthlyChartData = {
    labels: monthlyStats?.labels || [],
    datasets: [
      {
        label: '월별 가입자 수',
        data: monthlyStats?.data || [],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.3
      }
    ]
  };

  // 일별 차트 데이터
  const dailyChartData = {
    labels: dailyStats?.labels || [],
    datasets: [
      {
        label: '일별 가입자 수',
        data: dailyStats?.data || [],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.3
      }
    ]
  };

  // 월별 차트 옵션
  const monthlyChartOptions = {
    ...commonChartOptions,
    plugins: {
      ...commonChartOptions.plugins,
      title: {
        display: true,
        text: `${selectedYear}년 월별 가입자 통계`
      }
    }
  };

  // 일별 차트 옵션
  const dailyChartOptions = {
    ...commonChartOptions,
    plugins: {
      ...commonChartOptions.plugins,
      title: {
        display: true,
        text: `${selectedMonth} 일별 가입자 통계`
      }
    }
  };

  useEffect(() => {
    const loadTotalUsers = async () => {
      const count = await fetchTotalUsers();
      setTotalUsers(count);
    };
    loadTotalUsers();
  }, []);

  useEffect(() => {
    const loadMonthlyStats = async () => {
      const stats = await fetchMonthlyStats(selectedYear);
      if (stats) {
        setMonthlyStats(stats);
      }
    };
    loadMonthlyStats();
  }, [selectedYear]);

  useEffect(() => {
    const loadDailyStats = async () => {
      const stats = await fetchDailyStats(selectedMonth);
      if (stats) {
        setDailyStats(stats);
      }
    };
    loadDailyStats();
  }, [selectedMonth]);

  return (
    <div className="space-y-8 p-6">
      {/* 총 사용자 수 카드 */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2">총 사용자 수</h2>
        <p className="text-3xl font-bold text-blue-600">
          {totalUsers.toLocaleString()}명
        </p>
      </div>

      {/* 월별 통계 */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">월별 통계</h2>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {yearOptions.map(year => (
              <option key={year} value={year}>{year}년</option>
            ))}
          </select>
        </div>
        <div className="h-[400px]">
          <Line options={monthlyChartOptions} data={monthlyChartData} />
        </div>
      </div>

      {/* 일별 통계 */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">일별 통계</h2>
          <input
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="h-[400px]">
          <Line options={dailyChartOptions} data={dailyChartData} />
        </div>
      </div>
    </div>
  );
};

export default UserStatistics;