import styled from "styled-components";
import { Box } from "@mui/material";

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 5rem;
  padding: 2rem;
  color: #fff;
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }
`;

export const CTABox = styled(Box)`
  display: flex;
  flex-direction: column;
  flex: 1 0 20%;
  align-items: center;
  gap: 2rem;
  padding: 1rem;
  color: #808080;
  border-radius: 10px;
  background: linear-gradient(
    180deg,
    rgba(237, 235, 233, 0.35) 0%,
    rgba(255, 255, 255, 0.1) 100%
  );
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(2px);
  /* Note: backdrop-filter has minimal browser support */

  border-radius: 5px;
`;

export const PostButton = styled.button`
  background-color: #fff;
  color: #ed5b2d;
  border: 1px solid #ed5b2d;
  font-size: 1rem;
  font-variant: uppercase;
  padding-inline: 2rem;
  padding-block: 0.75rem;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: #ed5b2d;
    color: #fff;
    border: none;
  }
`;
export const BookButton = styled.button`
  background-color: #fff;
  color: #2881b8;
  border: 1px solid #2881b8;
  font-size: 1rem;
  font-variant: uppercase;
  padding-inline: 2rem;
  padding-block: 0.75rem;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: #2881b8;
    color: #fff;
    border: none;
  }
`;
