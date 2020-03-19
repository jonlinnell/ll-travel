import React from 'react';
import styled from 'styled-components';

const VerticalSpacer = styled.div`
  height: ${({ size }) => size}px;
`;

export default ({ size }) => <VerticalSpacer size={size} />;
