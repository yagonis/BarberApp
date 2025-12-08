import React, { useState, useMemo, useEffect } from 'react';
import {
  format,
  subDays,
  addDays,
  setHours,
  setMinutes,
  setSeconds,
  isBefore,
  // isEqual,
  parseISO,
} from 'date-fns';
import pt from 'date-fns/locale/pt';
import { utcToZonedTime } from 'date-fns-tz';
import { MdChevronLeft, MdChevronRight, MdClose } from 'react-icons/md';
import api from '~/services/api';
import { Container, Time, Modal, ModalContent, CloseButton } from './styles';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const range = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

const schema = Yup.object().shape({
  clientName: Yup.string().required('O nome do cliente é obrigatório'),
});

export default function Dashboard() {
  const [schedule, setSchedule] = useState([]);
  const [date, setDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reservedNames, setReservedNames] = useState({});
  const profile = useSelector(state => state.user.profile);

  const dateFormatted = useMemo(
    () => format(date, "d 'de' MMMM", { locale: pt }),
    [date]
  );

  useEffect(() => {
    async function loadSchedule() {
      const response = await api.get('schedule', {
        params: { date },
      });

      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      const data = range.map(hour => {
        const checkDate = setSeconds(setMinutes(setHours(date, hour), 0), 0);
        const compareDate = utcToZonedTime(checkDate, timezone);

        return {
          time: `${hour}:00h`,
          slotKey: `${format(date, 'yyyy-MM-dd')}-${hour}`,
          past: isBefore(compareDate, new Date()),
          appointment: response.data.find(
            a => parseISO(a.date).toString() === compareDate.toString()
          ),
        };
      });

      setSchedule(data);
    }

    loadSchedule();
  }, [date]);

  function handlePrevDay() {
    setDate(subDays(date, 1));
  }

  function handleNextDay() {
    setDate(addDays(date, 1));
  }

  function handleTimeClick(time) {
    // Não permite agendar horários passados ou o horário de almoço
    if (time.past || time.time === '12:00h' || time.appointment) {
      return;
    }
    
    setSelectedTime(time);
    setShowModal(true);
  }

  async function handleSubmit({ clientName }) {
    if (!selectedTime) return;
    
    try {
      setLoading(true);
      
      const [hour] = selectedTime.time.split(':');
      const appointmentDate = setSeconds(
        setMinutes(setHours(date, hour), 0),
        0
      );
      
      await api.post('appointments', {
        provider_id: profile.id,
        date: appointmentDate.toISOString(),
      });

      // Guarda o nome digitado localmente para exibição
      const key = `${format(date, 'yyyy-MM-dd')}-${hour}`;
      setReservedNames(prev => ({ ...prev, [key]: clientName }));
      
      // Atualiza a lista de agendamentos
      await loadSchedule();
      
      toast.success('Agendamento realizado com sucesso!');
      setShowModal(false);
    } catch (err) {
      toast.error(
        err.error || 'Erro ao realizar agendamento. Tente novamente.'
      );
    } finally {
      setLoading(false);
    }
  }
  
  async function loadSchedule() {
    const response = await api.get('schedule', {
      params: { date },
    });

    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const data = range.map(hour => {
      const checkDate = setSeconds(setMinutes(setHours(date, hour), 0), 0);
      const compareDate = utcToZonedTime(checkDate, timezone);

      return {
        time: `${hour}:00h`,
        hour,
        slotKey: `${format(date, 'yyyy-MM-dd')}-${hour}`,
        past: isBefore(compareDate, new Date()),
        appointment: response.data.find(
          a => parseISO(a.date).toString() === compareDate.toString()
        ),
      };
    });

    setSchedule(data);
  }

  async function handleCancelAppointment(appointmentId) {
    try {
      const ok = window.confirm('Deseja realmente desmarcar este horário?');
      if (!ok) return;
      await api.delete(`appointments/${appointmentId}`);
      await loadSchedule();
      toast.success('Agendamento cancelado com sucesso!');
    } catch (err) {
      toast.error(err.error || 'Não foi possível cancelar o agendamento.');
    }
  }

  return (
    <Container>
      <header>
        <button type="button">
          <MdChevronLeft size={36} color="FFF" onClick={handlePrevDay} />
        </button>
        <strong>{dateFormatted}</strong>
        <button type="button">
          <MdChevronRight size={36} color="FFF" onClick={handleNextDay} />
        </button>
      </header>

      <ul>
        {schedule.map(time => (
          <Time 
            key={time.time} 
            past={time.past} 
            available={!time.appointment && time.time !== '12:00h'}
            isLunchTime={time.time === '12:00h'}
            onClick={() => handleTimeClick(time)}
          >
            <strong>{time.time}</strong>
            <span>
              {time.time === '12:00h' 
                ? 'Reservado para almoço' 
                : time.appointment 
                  ? (reservedNames[time.slotKey] || time.appointment.user.name)
                  : 'Em aberto'}
            </span>
            {time.appointment && !time.past && time.time !== '12:00h' && (
              <button
                type="button"
                onClick={e => {
                  e.stopPropagation();
                  handleCancelAppointment(time.appointment.id);
                }}
              >
                Desmarcar
              </button>
            )}
          </Time>
        ))}
      </ul>

      <Modal show={showModal}>
        <ModalContent>
          <CloseButton onClick={() => setShowModal(false)}>
            <MdClose size={24} color="#666" />
          </CloseButton>
          <h2>Novo Agendamento</h2>
          <p>Horário: {selectedTime && selectedTime.time}</p>
          <Form schema={schema} onSubmit={handleSubmit}>
            <Input name="clientName" placeholder="Nome do cliente" autoFocus />
            <button type="submit" disabled={loading}>
              {loading ? 'Salvando...' : 'Confirmar'}
            </button>
          </Form>
        </ModalContent>
      </Modal>
    </Container>
  );
}
