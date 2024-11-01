import React, { useEffect, useState } from 'react';
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
import '../../styles/meeting/MeetingDailyParticipants.scss';

// Chart.js에서 사용할 모듈 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const MeetingDailyParticipants: React.FC = () => {
  // 월 선택 상태관리
  const [selectedMonth, setSelectedMonth] = useState<number>(0);
  // 월 별로 선택한 데이터 저장 상태관리(응답값)
  const [dataByMonth, setDataByMonth] = useState<number[][]>([[]]);

  // 선택된 월에 대한 날짜 레이블 생성
  const daysInMonth = new Date(2024, selectedMonth + 1, 0).getDate();
  const labels = Array.from({ length: daysInMonth }, (_, i) => `${i + 1}일`);

  // 더미 데이터 정의 (1월)
  const januaryData = [
    12,
    15,
    18,
    20,
    25,
    30,
    22, // 1일 ~ 7일
    19,
    24,
    17,
    21,
    26,
    28,
    30, // 8일 ~ 14일
    15,
    18,
    22,
    25,
    30,
    20,
    17, // 15일 ~ 21일
    10,
    12,
    15,
    18,
    20,
    25,
    30, // 22일 ~ 28일
    22,
    19,
    15, // 29일 ~ 31일
  ];

  useEffect(() => {
    // API 호출 대신 더미 데이터 설정
    setDataByMonth([januaryData]);
  }, []);

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(Number(event.target.value));
  };

  // 차트 데이터
  const data = {
    labels,
    datasets: [
      {
        label: '모임 참여자 수',
        data: dataByMonth[selectedMonth] || [],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // 차트 옵션
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: '일별 모임 참여자 수',
      },
    },
    scales: {
      x: {
        ticks: {
          autoSkip: false,
          maxTicksLimit: 31,
        },
        grid: {
          display: true,
        },
      },
      y: {
        min: 0,
        max: 50,
        ticks: {
          stepSize: 10,
          color: '#333',
        },
        grid: {
          color: '#e0e0e0',
        },
      },
    },
  };
  return (
    <section className="chart-container">
      <h2>일별 모임 참여자 수 차트</h2>
      <select
        className="monthSelect"
        onChange={handleMonthChange}
        value={selectedMonth}
      >
        <option value={0}>1월</option>
        <option value={1}>2월</option>
        <option value={2}>3월</option>
        <option value={3}>4월</option>
        <option value={4}>5월</option>
        <option value={5}>6월</option>
        <option value={6}>7월</option>
        <option value={7}>8월</option>
        <option value={8}>9월</option>
        <option value={9}>10월</option>
        <option value={10}>11월</option>
        <option value={11}>12월</option>
      </select>
      <Bar data={data} options={options} />
    </section>
  );
};

export default MeetingDailyParticipants;
