import styled from 'styled-components';

export const Container = styled.div`
  max-width: 600px;
  margin: 50px auto;
  display: flex;
  flex-direction: column;
  header {
    display: flex;
    align-items: center;
    align-self: center;
    button {
      border: 0;
      background: none;
    }
    strong {
      color: #fff;
      font-size: 24px;
      margin: 0 15px;
    }
  }
  ul {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 15px;
    margin-top: 30px;
  }
`;

export const Time = styled.li`
  padding: 20px;
  border-radius: 4px;
  background: #fff;
  opacity: ${props => (props.past ? 0.6 : 1)};
  cursor: ${props => (props.isLunchTime || props.past ? 'not-allowed' : 'pointer')};
  transition: transform 0.2s, box-shadow 0.2s;
  
  ${props => props.isLunchTime && `
    background: #f5f5f5;
    border-left: 3px solid #ffcc00;
  `}
  
  ${props => !props.isLunchTime && !props.past && !props.appointment && `
    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
  `}

  strong {
    display: block;
    color: ${props => {
      if (props.isLunchTime) return '#666';
      return props.available ? '#999' : '#ff6347';
    }};
    font-size: 20px;
    font-weight: normal;
  }
  
  span {
    display: block;
    margin-top: 3px;
    color: ${props => {
      if (props.isLunchTime) return '#999';
      return props.available ? '#999' : '#666';
    }};
    font-style: ${props => props.isLunchTime ? 'italic' : 'normal'};
  }
`;

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: ${props => (props.show ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: #fff;
  padding: 30px;
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
  position: relative;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  
  h2 {
    color: #333;
    margin-bottom: 20px;
    text-align: center;
  }
  
  p {
    color: #666;
    margin-bottom: 20px;
    text-align: center;
    font-size: 16px;
  }
  
  form {
    display: flex;
    flex-direction: column;
    gap: 15px;
    
    button {
      background: #ff6347;
      color: #fff;
      border: 0;
      border-radius: 4px;
      padding: 12px 20px;
      font-weight: bold;
      font-size: 16px;
      cursor: pointer;
      transition: background 0.2s;
      margin-top: 10px;
      
      &:hover {
        background: #ff4d2e;
      }
      
      &:disabled {
        background: #ccc;
        cursor: not-allowed;
      }
    }
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: 0;
  cursor: pointer;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background 0.2s;
  
  &:hover {
    background: #f5f5f5;
  }
`;
