import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import Header from './Header';
import Row from './Row';
import Input from './Input';

const StyledForm = styled.div`
  background-color: ${({ theme }) => theme.colours.bus.colour};
  padding: 12px;
  width: 100%;

  position: fixed;
  z-index: 1;
  bottom: ${({
    theme: {
      navbar: { height, units },
    },
  }) => `${height}${units}`};
`;

const validateStopCode = stopCode => stopCode && (stopCode.length === 5 || stopCode.match(/[0-9]{5},[0-9]{5}/));

const BusControlForm = ({ onSetStopCode }) => {
  const [stopCode, setStopCode] = useState();

  useEffect(() => {
    if (validateStopCode(stopCode) || stopCode === null) {
      onSetStopCode(stopCode);
    }
  }, [stopCode]);

  const handleChange = (e) => {
    e.persist();

    const updatedStopCode = e.target.value === '' ? null : e.target.value;

    setStopCode(updatedStopCode);
  };

  return (
    <StyledForm>
      <Header title="Enter a stop code" icon={faSearch} useFA small />
      <Row>
        <Input
          placeholder="5-digit stop code"
          type="number"
          name="stopCode"
          id="stopCode"
          onChange={handleChange}
        />
      </Row>
    </StyledForm>
  );
};

export default BusControlForm;
