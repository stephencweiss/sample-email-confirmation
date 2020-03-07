import React from 'react';
import styled, { keyframes } from "styled-components";
import {Box, Flex} from '.'

const spin = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

export const Loader = styled(Box)`
  border: 0.2em solid rgba(0, 0, 0, 0.1);
  border-top: 0.2em solid rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  animation: ${spin} 0.6s linear infinite;
`;

Loader.defaultProps = {
  size: "2.28571429rem"
};

export function FullWidthLoader() {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      width="100%"
      height="100%"
    >
      <Loader />
    </Flex>
  );
}


