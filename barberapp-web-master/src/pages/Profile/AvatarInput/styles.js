import styled from 'styled-components';

export const Container = styled.div`
  align-self: center;
  margin-bottom: 30px;

  label {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;

    &:hover {
      opacity: 0.9;
    }

    img {
      height: 120px;
      width: 120px;
      border-radius: 50%;
      border: 3px solid rgba(255, 255, 255, 0.3);
      background: #eee;
    }

    .caption {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      margin-top: 8px;
      font-size: 14px;
      color: #699aee;
      font-weight: 600;
      text-align: center;
      background: transparent;
      padding: 2px 6px;
      border-radius: 4px;
    }

    input {
      display: none;
    }
  }
`;
