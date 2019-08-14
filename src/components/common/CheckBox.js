import React from 'react';
import styled from 'styled-components';
import theme from 'styles/theme';

const { inputHighlightColor } = theme;
const { offBlack, blue } = theme.colors;

const Styles = styled.div`
  display: inline-block;
  margin: 0 2rem 0 0;
  &:last-child {
    margin: 0;
  }
  label {
    position: relative;
    display: inline-block;
    cursor: pointer;
    user-select: none;
    padding: 0.5em 0 0.5em calc(1.5em + 1rem);
  }
  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }
  /* checkbox */
  span {
    box-sizing: content-box;
    position: absolute;
    top: 0.5em;
    left: 0;
    height: 1.5em;
    width: 1.5em;
    background-color: white;
    border-radius: ${p => p.theme.borderRadius};
    border-radius: 50%;
    border: 0.1rem solid ${offBlack};
    transition: all 300ms;
  }
  label:hover input ~ span {
    border: 0.1rem solid ${blue};
  }
  label input:checked ~ span {
    background-color: ${inputHighlightColor};
    border: 0.1rem solid transparent;
  }
  /* indicator */
  span:after {
    content: '';
    position: absolute;
    display: none;
  }
  label input:checked ~ span:after {
    display: block;
  }
  label span:after {
    left: 30%;
    top: 10%;
    width: 25%;
    height: 55%;
    border: solid white;
    border-width: 0 0.2em 0.2em 0;
    transform: rotate(45deg);
    border-radius: 0.1em;
  }
`;

export default function CheckBox({ label, name, value, checked, onChange, ...props }) {
  return (
    <Styles>
      <label>
        {label}
        <input
          type="checkbox"
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
          {...props}
        />
        <span />
      </label>
    </Styles>
  );
}
