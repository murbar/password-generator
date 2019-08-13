import styled from 'styled-components';

export default styled.button`
  margin-right: 0.5em;
  background: ${p => p.theme.colors.lightGrey};
  font-family: ${p => p.theme.fontFamily};
  border: 0;
  font-size: 0.9em;
  padding: 0.35em 0.85em;
  border-radius: ${p => p.theme.borderRadius};
  display: flex;
  align-items: center;
  svg {
    height: 1.25em;
    margin-right: 0.5em;
  }
  &:focus {
    outline: none;
  }
  body.using-keyboard &:focus {
    outline: none;
    box-shadow: 0 0 0 0.2rem ${p => p.theme.textColor};
  }
  &:hover {
    background: white;
    cursor: pointer;
  }
  &:last-child {
    margin-right: 0;
  }
`;
