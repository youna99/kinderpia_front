import React, { useState } from 'react';
import { Tabs, Tab, TabPanel } from 'react-tabs';
import '../styles/SideTabs.scss';
import { UserTotal } from './user/UserTotal';
import MeetingDailyParticipants from './Meeting/MeetingDailyParticipants';
import ReportTable from './report/ReportTable';
import BlacklistTable from './blacklist/BlacklistTable';

const SideTabs: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState(0); // 선택된 탭 인덱스 상태

  return (
    <section className="sidetab">
      <Tabs className="tab-container">
        <div className="tab-list">
          <Tab
            className={`tab-user ${selectedIndex === 0 ? 'tab-selected' : ''}`}
            onClick={() => setSelectedIndex(0)}
          >
            회원
          </Tab>
          <Tab
            className={`tab-meeting ${
              selectedIndex === 1 ? 'tab-selected' : ''
            }`}
            onClick={() => setSelectedIndex(1)}
          >
            모임
          </Tab>
          <Tab
            className={`tab-report ${
              selectedIndex === 2 ? 'tab-selected' : ''
            }`}
            onClick={() => setSelectedIndex(2)}
          >
            신고
          </Tab>
          <Tab
            className={`tab-blacklist ${
              selectedIndex === 3 ? 'tab-selected' : ''
            }`}
            onClick={() => setSelectedIndex(3)}
          >
            블랙리스트
          </Tab>
        </div>

        <div className="tab-content">
          <TabPanel>
            <UserTotal />
          </TabPanel>
          <TabPanel>
            <MeetingDailyParticipants />
          </TabPanel>
          <TabPanel>
            <ReportTable />
          </TabPanel>
          <TabPanel>
            <BlacklistTable />
          </TabPanel>
        </div>
      </Tabs>
    </section>
  );
};

export default SideTabs;
