import styled from 'styled-components';

export default styled.tr`
  td:last-child {
    opacity: 0;
  }

  &:hover td:last-child {
    opacity: 1;
  }

  @media (max-width: 999px) {
    td:last-child {
      opacity: 1;
    }
  }
`;
