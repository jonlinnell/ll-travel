import React from 'react';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Icon = ({ icon }) => icon();

const HeaderWrapper = styled.div`
  background-color: ${({ backgroundColour, theme: { colours } }) => (colours[backgroundColour] ? colours[backgroundColour].colour : backgroundColour)};
  color: ${({ backgroundColour, theme: { colours } }) => (colours[backgroundColour] ? colours.text[colours[backgroundColour].text] : 'rgb(0, 0, 0)')};

  margin: ${({ topFill }) => (topFill ? '-12px' : 0)};
  margin-bottom: ${({ topFill }) => (topFill ? '12px' : 0)};

  padding: ${({ topFill }) => (topFill ? '12px' : 0)};

  width: ${({ topFill }) => (topFill ? null : '100%')};
`;

const HeaderTitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-items: content;

  & svg {
    width: ${({ small }) => (small ? '1rem' : '2rem')};
    font-size: ${({ small }) => (small ? '1rem' : '2rem')};

    margin-left: auto;

    color: rgb(255, 255, 255);
    fill: none;
    stroke: rgb(255, 255, 255);

    flex-shrink: 0;
  }
`;

const Title = styled.h2`
  font-size: ${({ small }) => (small ? '0.8rem' : '1.2rem')};
  color: white;
  margin: 0;
`;

const Subtitle = styled.p`
  margin: 0;
  margin-top: 12px;
  color: rgb(255, 255, 255);
`;

export default ({
  backgroundColour, icon, small, subtitle, title, topFill, useFA,
}) => {
  let iconElement;

  if (useFA && icon) {
    iconElement = <FontAwesomeIcon icon={icon} />;
  } else if (icon) {
    iconElement = <Icon icon={icon} />;
  } else {
    iconElement = null;
  }

  return (
    <HeaderWrapper topFill={topFill} backgroundColour={backgroundColour}>
      <HeaderTitleWrapper small={small}>
        <Title>{title}</Title>
        {iconElement}
      </HeaderTitleWrapper>
      <Subtitle>{subtitle}</Subtitle>
    </HeaderWrapper>
  );
};
