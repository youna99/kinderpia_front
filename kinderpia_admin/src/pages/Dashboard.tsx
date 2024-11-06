// src/pages/Dashboard.tsx
import React, { useEffect, useState } from 'react';
import { BarChart, Users, UserPlus, AlertTriangle } from 'lucide-react';
import { fetchTotalUsers } from '../api/statistics';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  trendValue?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, trend, trendValue }) => (
  <div className="bg-white rounded-lg p-6 shadow-md">
    <div className="flex items-center justify-between mb-4">
      <div>{icon}</div>
      {trend && (
        <span className={`text-sm ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
          {trend === 'up' ? '↑' : '↓'} {trendValue}
        </span>
      )}
    </div>
    <h3 className="text-gray-500 text-sm">{title}</h3>
    <p className="text-2xl font-bold mt-2">{value}</p>
  </div>
);

const RecentActivities = () => {
  const activities = [
    { id: 1, type: '신규가입', user: '김민수', time: '10분 전' },
    { id: 2, type: '신고접수', user: '이영희', time: '25분 전' },
    { id: 3, type: '모임생성', user: '박지훈', time: '1시간 전' },
    { id: 4, type: '블랙리스트 추가', user: '최서연', time: '2시간 전' },
  ];

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <h2 className="text-lg font-bold mb-4">최근 활동</h2>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center justify-between border-b pb-2">
            <div>
              <span className="font-medium">{activity.type}</span>
              <span className="text-gray-500 ml-2">{activity.user}</span>
            </div>
            <span className="text-sm text-gray-400">{activity.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const ActiveGroups = () => {
  const groups = [
    { id: 1, name: '서울 독서모임', members: 128, activity: 92 },
    { id: 2, name: '주말 등산러', members: 256, activity: 88 },
    { id: 3, name: '취미 베이킹', members: 164, activity: 85 },
    { id: 4, name: '프로그래밍 스터디', members: 94, activity: 82 },
  ];

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <h2 className="text-lg font-bold mb-4">활성 모임 TOP 4</h2>
      <div className="space-y-4">
        {groups.map((group) => (
          <div key={group.id} className="flex items-center justify-between">
            <div>
              <p className="font-medium">{group.name}</p>
              <p className="text-sm text-gray-500">{group.members}명 참여중</p>
            </div>
            <div className="flex items-center">
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 rounded-full h-2" 
                  style={{ width: `${group.activity}%` }}
                ></div>
              </div>
              <span className="ml-2 text-sm text-gray-500">{group.activity}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [totalUsers, setTotalUsers] = useState<number>(0);

  useEffect(() => {
    const loadTotalUsers = async () => {
      const count = await fetchTotalUsers();
      setTotalUsers(count);
    };
    loadTotalUsers();
  }, []);
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-6">대시보드</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            title="총 회원수" 
            value={totalUsers} 
            icon={<Users className="text-blue-500" size={24} />}
            // trend="up"
            // trendValue="5.3%"
          />
          <StatCard 
            title="신규 가입" 
            value="128" 
            icon={<UserPlus className="text-green-500" size={24} />}
            // trend="up"
            // trendValue="5.3%"
          />
          <StatCard 
            title="활성 모임" 
            value="842" 
            icon={<BarChart className="text-purple-500" size={24} />}
          />
          <StatCard 
            title="신고 접수" 
            value="23" 
            icon={<AlertTriangle className="text-red-500" size={24} />}
            // trend="down"
            // trendValue="12.5%"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

      </div>
    </div>
  );
};

export default Dashboard;