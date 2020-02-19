/**
 * A link to a certain page, an anchor tag
 */

import styled from 'styled-components';

const A = styled.a`
  color: #41addd;

  &:hover {
    color: #fff;
    text-decoration: none
    border: 2px solid #41addd;
    background-color: #41addd;
  }
`;

export default A;
