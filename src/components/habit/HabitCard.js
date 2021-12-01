import styled from 'styled-components';

const Card = styled.li`
  display: flex;
  flex-direction: column;
  padding: 24px;
  font-family: var(--font-name-apple);
  background-color: var(--bg-primary);
  color: var(--color-primary);
  border-radius: var(--border-radius-semi);
  cursor: pointer;
  margin-bottom: 16px;

  &:last-of-type {
    margin-bottom: 89px;
  }
`;

export default Card;
