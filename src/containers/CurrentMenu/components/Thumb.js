import styled from 'styled-components';

export default styled.a`
  display: inline-block;
  cursor: zoom-in;
  border: 1px solid #EEE;
  transition: box-shadow 0.3s cubic-bezier(.25,.8,.25,1);

  :hover {
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  }
`;
