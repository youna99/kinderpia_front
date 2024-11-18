import React, { useEffect, useState } from 'react'
import { fetchDailyMeetingUser, fetchMeetingByCategory } from '../api/meetings';
import CategoryChart from '../components/meeting/MeetingPirChart';
import ParticipationTrend from '../components/meeting/MeetingLineChart';
import StatCard from '../components/common/StatCard';
import { fetchTotalMeetings } from '../api/statistics';
import { BarChart } from 'lucide-react';

interface DailyParticipationData {
  [key: string]: number;
}

const Meetings = () => {
  const [meetingListsByCategory, setMeetingListsByCategory] = useState<[]>([]);
  const [totalMeetings, setTotalMeetings] = useState<number>(0);
  const [dailyParticipation, setDailyParticipation] = useState<DailyParticipationData>({});

  const getPlaceList = async () => {
    try {
      const response = await fetchMeetingByCategory();
      setMeetingListsByCategory(response);
      
      if (response && response.content) {
        return response.content;
      }
      return [];
      
    } catch (error) {
      console.error('장소목록 가져오는 중 에러 발생:', error);
      return [];
    }
  };

  useEffect(() => {
    const loadTotalMeetings = async () => {
      const count = await fetchTotalMeetings();
      setTotalMeetings(count);
    }

    const loadDailyMeetingUsers = async () => {
      try {
        const data = await fetchDailyMeetingUser();
        setDailyParticipation(data);
      } catch (error) {
        console.error('일일 참여자 데이터 로딩 중 에러:', error);
        setDailyParticipation({});
      }
    }

    loadDailyMeetingUsers();
    loadTotalMeetings();
    getPlaceList();
  }, []);
  
  return (
    <div className="space-y-6">
      <StatCard
        title="활성 모임" 
        value={totalMeetings} 
        icon={<BarChart className="text-purple-500" size={24} />}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 카테고리별 파이 차트 */}
        <div className="w-full">
          <CategoryChart data={meetingListsByCategory} />
        </div>

        {/* 일일 참여자 추이 라인 차트 */}
        <div className="w-full">
          {Object.keys(dailyParticipation).length > 0 && (
            <ParticipationTrend data={dailyParticipation} />
          )}
        </div>
      </div>
    </div>
  )
}

export default Meetings;