import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '~/services/api';
import {
  Container,
  Title,
  ProviderSelect,
  Label,
  ScheduleGrid,
  DaySchedule,
  DayTitle,
  TimeInput,
  Toggle,
  Button,
  ButtonGroup,
} from './styles';

const DAYS_OF_WEEK = [
  { value: 0, label: 'Segunda-feira' },
  { value: 1, label: 'Terça-feira' },
  { value: 2, label: 'Quarta-feira' },
  { value: 3, label: 'Quinta-feira' },
  { value: 4, label: 'Sexta-feira' },
  { value: 5, label: 'Sábado' },
  { value: 6, label: 'Domingo' },
];

export default function ScheduleManagement() {
  const [providers, setProviders] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState('');
  const [schedules, setSchedules] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProviders();
  }, []);

  useEffect(() => {
    if (selectedProvider) {
      loadSchedules(selectedProvider);
    }
  }, [selectedProvider]);

  const loadProviders = async () => {
    try {
      const response = await api.get('/providers');
      setProviders(response.data);
      if (response.data.length > 0) {
        setSelectedProvider(response.data[0].id);
      }
    } catch (err) {
      toast.error('Erro ao carregar barbeiros');
    }
  };

  const loadSchedules = async (providerId) => {
    try {
      setLoading(true);
      const response = await api.get(`/admin/schedule-config/${providerId}`);
      
      // Organizar schedules por dia
      const schedulesByDay = {};
      response.data.forEach(schedule => {
        schedulesByDay[schedule.day_of_week] = schedule;
      });

      // Preencher dias que não têm schedule
      DAYS_OF_WEEK.forEach(day => {
        if (!schedulesByDay[day.value]) {
          schedulesByDay[day.value] = {
            day_of_week: day.value,
            start_time: '08:00',
            end_time: '18:00',
            is_open: true,
            provider_id: providerId,
          };
        }
      });

      setSchedules(schedulesByDay);
    } catch (err) {
      // Se não encontrar, criar schedules padrão
      const schedulesByDay = {};
      DAYS_OF_WEEK.forEach(day => {
        schedulesByDay[day.value] = {
          day_of_week: day.value,
          start_time: '08:00',
          end_time: '18:00',
          is_open: day.value !== 6, // Domingo fechado
          provider_id: selectedProvider,
        };
      });
      setSchedules(schedulesByDay);
    } finally {
      setLoading(false);
    }
  };

  const handleTimeChange = (dayOfWeek, field, value) => {
    setSchedules({
      ...schedules,
      [dayOfWeek]: {
        ...schedules[dayOfWeek],
        [field]: value,
      },
    });
  };

  const handleToggle = (dayOfWeek) => {
    setSchedules({
      ...schedules,
      [dayOfWeek]: {
        ...schedules[dayOfWeek],
        is_open: !schedules[dayOfWeek].is_open,
      },
    });
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const schedulesArray = Object.values(schedules);
      
      await api.post(`/admin/schedule-config/${selectedProvider}`, {
        schedules: schedulesArray,
      });

      toast.success('Horários salvos com sucesso');
      loadSchedules(selectedProvider);
    } catch (err) {
      toast.error('Erro ao salvar horários');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>Gerenciar Horários de Atendimento</Title>

      <div style={{ marginBottom: '30px' }}>
        <Label>Selecionar Barbeiro</Label>
        <ProviderSelect
          value={selectedProvider}
          onChange={e => setSelectedProvider(e.target.value)}
        >
          <option value="">Escolha um barbeiro...</option>
          {providers.map(provider => (
            <option key={provider.id} value={provider.id}>
              {provider.name}
            </option>
          ))}
        </ProviderSelect>
      </div>

      {loading && selectedProvider ? (
        <p>Carregando...</p>
      ) : selectedProvider ? (
        <>
          <ScheduleGrid>
            {DAYS_OF_WEEK.map(day => (
              <DaySchedule key={day.value} closed={!schedules[day.value] || !schedules[day.value].is_open}>
                <DayTitle>{day.label}</DayTitle>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <Toggle
                    type="checkbox"
                    checked={schedules[day.value] && schedules[day.value].is_open}
                    onChange={() => handleToggle(day.value)}
                    id={`toggle-${day.value}`}
                  />
                  <label htmlFor={`toggle-${day.value}`}>
                    {schedules[day.value] && schedules[day.value].is_open ? 'Aberto' : 'Fechado'}
                  </label>
                </div>

                {schedules[day.value] && schedules[day.value].is_open && (
                  <div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
                    <div>
                      <Label style={{ fontSize: '12px' }}>Abertura</Label>
                      <TimeInput
                        type="time"
                        value={(schedules[day.value] && schedules[day.value].start_time) || '08:00'}
                        onChange={e => handleTimeChange(day.value, 'start_time', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label style={{ fontSize: '12px' }}>Fechamento</Label>
                      <TimeInput
                        type="time"
                        value={(schedules[day.value] && schedules[day.value].end_time) || '18:00'}
                        onChange={e => handleTimeChange(day.value, 'end_time', e.target.value)}
                      />
                    </div>
                  </div>
                )}
              </DaySchedule>
            ))}
          </ScheduleGrid>

          <ButtonGroup>
            <Button onClick={handleSave} disabled={loading}>
              {loading ? 'Salvando...' : 'Salvar Horários'}
            </Button>
          </ButtonGroup>
        </>
      ) : (
        <p>Selecione um barbeiro para gerenciar horários</p>
      )}
    </Container>
  );
}
