import React, { useState } from 'react';
import { MdPeople, MdSchedule } from 'react-icons/md';
import UserManagement from './UserManagement';
import ScheduleManagement from './ScheduleManagement';
import { Container, Nav, NavItem, Content } from './styles';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('users');

  return (
    <Container>
      <Nav>
        <NavItem
          active={activeTab === 'users'}
          onClick={() => setActiveTab('users')}
        >
          <MdPeople size={20} />
          Usuários
        </NavItem>
        <NavItem
          active={activeTab === 'schedule'}
          onClick={() => setActiveTab('schedule')}
        >
          <MdSchedule size={20} />
          Horários
        </NavItem>
      </Nav>

      <Content>
        {activeTab === 'users' && <UserManagement />}
        {activeTab === 'schedule' && <ScheduleManagement />}
      </Content>
    </Container>
  );
}
