import styled from 'styled-components';
import theme from 'styles/theme';

const { offWhite, offBlack, blue } = theme.colors;

export default styled.button`
  margin-right: 0.5em;
  background: ${offWhite};
  font-family: ${p => p.theme.fontFamily};
  font-size: 0.9em;
  padding: 0.55em 0.85em;
  border-radius: ${p => p.theme.borderRadius};
  border: 0.1rem solid ${offBlack};
  display: flex;
  align-items: center;
  transition: all 300ms;
  svg {
    height: 1.25em;
    margin-right: 0.5em;
  }
  &:focus {
    outline: none;
  }
  body.using-keyboard &:focus {
    outline: none;
    box-shadow: 0 0 0 0.2rem ${offBlack};
  }
  &:hover {
    border: 0.1rem solid ${blue};
    cursor: pointer;
  }
  &:last-child {
    margin-right: 0;
  }
`;
