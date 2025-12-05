import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  height: 100vh;
`;

export const Nav = styled.nav`
  width: 250px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
`;

export const NavItem = styled.button`
  background: none;
  border: none;
  color: white;
  padding: 15px 20px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: background-color 0.3s;
  text-align: left;

  ${props =>
    props.active
      ? `
    background-color: rgba(0, 0, 0, 0.2);
    border-left: 4px solid white;
    padding-left: 16px;
  `
      : `
    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
  `}
`;

export const Content = styled.div`
  flex: 1;
  overflow-y: auto;
  background-color: #f5f5f5;
`;
