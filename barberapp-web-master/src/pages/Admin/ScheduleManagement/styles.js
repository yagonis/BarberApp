import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

export const Title = styled.h1`
  font-size: 28px;
  color: #333;
  margin-bottom: 30px;
`;

export const ProviderSelect = styled.select`
  width: 100%;
  max-width: 400px;
  padding: 10px 12px;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  font-size: 14px;
  background-color: white;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
  }
`;

export const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
`;

export const ScheduleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

export const DaySchedule = styled.div`
  background: white;
  border: 2px solid ${props => (props.closed ? '#e9ecef' : '#dee2e6')};
  border-radius: 8px;
  padding: 20px;
  opacity: ${props => (props.closed ? 0.6 : 1)};

  ${props =>
    props.closed &&
    `
    background-color: #f8f9fa;
  `}
`;

export const DayTitle = styled.h3`
  margin: 0 0 15px 0;
  font-size: 16px;
  color: #333;
  font-weight: 600;
`;

export const TimeInput = styled.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
  }
`;

export const Toggle = styled.input`
  cursor: pointer;
  width: 18px;
  height: 18px;
`;

export const Button = styled.button`
  padding: 12px 30px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover:not(:disabled) {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
`;
