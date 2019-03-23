import React from 'react'
import styled from 'styled-components'

const Input = styled.input`
  display: block;
  width: 100%;
  padding-bottom: 10px;
  font-size: 1rem;
  color: ${({ color }) => color || 'rgb(255, 255, 255)'};

  border: 0;

  background: transparent no-repeat;
  background-image: linear-gradient(to bottom, rgba(255, 255, 255, 1), rgba(255, 255, 255, 1)),
    linear-gradient(to bottom, silver, rgba(255, 255, 255, 0.2));
  background-size: 0 1px, 100% 1px;
  background-position: 50% 100%, 50% 100%;

  transition: background-size 0.3s cubic-bezier(0.64, 0.09, 0.08, 1);

  &::placeholder {
    color: ${({ color }) => color || 'rgb(255, 255, 255)'};
    font-size: 0.8rem;
  }

  &:focus {
    background-size: 100% 2px, 100% 1px;
    outline: none;
  }
`

export default props => <Input {...props} />
