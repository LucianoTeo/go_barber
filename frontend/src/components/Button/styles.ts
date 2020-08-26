import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  margin-top: 16px;
  width: 100%;
  background: #ff9000;
  height: 56px;
  border-radius: 10px;
  border: 0;
  padding: 0 16px;
  color: #312e38;
  font-weight: 500;

  &:hover {
    background: ${shade(0.2, '#ff9000')}
  }
`;