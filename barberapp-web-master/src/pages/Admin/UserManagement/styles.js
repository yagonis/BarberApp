import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

export const Title = styled.h1`
  font-size: 28px;
  color: #333;
  margin-bottom: 20px;
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;

  &:hover {
    background-color: #218838;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const TableHeader = styled.thead`
  background-color: #f8f9fa;
  border-bottom: 2px solid #dee2e6;

  th {
    padding: 12px;
    text-align: left;
    font-weight: 600;
    color: #333;
  }
`;

export const TableBody = styled.tbody``;

export const TableRow = styled.tr`
  border-bottom: 1px solid #dee2e6;

  &:hover {
    background-color: #f8f9fa;
  }

  td {
    padding: 12px;
    color: #666;
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 10px;

  button {
    background: none;
    border: none;
    cursor: pointer;
    color: #666;
    transition: color 0.2s;

    &:hover {
      color: #333;
    }

    &:nth-child(2):hover {
      color: #dc3545;
    }
  }
`;

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

export const ModalContent = styled.div`
  background: white;
  border-radius: 8px;
  min-width: 400px;
  max-width: 500px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
`;

export const ModalHeader = styled.div`
  padding: 20px;
  border-bottom: 1px solid #e9ecef;

  h2 {
    margin: 0;
    font-size: 20px;
    color: #333;
  }
`;

export const ModalBody = styled.div`
  padding: 20px;
`;

export const ModalFooter = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  padding-top: 20px;

  button {
    padding: 8px 16px;
    border: 1px solid #dee2e6;
    background-color: #f8f9fa;
    color: #333;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;

    &:last-child {
      background-color: #007bff;
      color: white;
      border-color: #007bff;

      &:hover {
        background-color: #0056b3;
      }
    }

    &:hover {
      background-color: #e9ecef;
    }
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;

  > div {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
`;

export const Input = styled.input`
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

export const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #333;
`;

export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #666;
  cursor: pointer;

  input {
    cursor: pointer;
  }
`;
