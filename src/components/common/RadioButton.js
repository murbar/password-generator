import React from 'react';
import styled from 'styled-components';
import theme from 'styles/theme';

const { inputHighlightColor } = theme;
const { blue, offBlack } = theme.colors;

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
  /* circle */
  span {
    box-sizing: content-box;
    position: absolute;
    top: 0.5em;
    left: 0;
    height: 1.5em;
    width: 1.5em;
    background-color: white;
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
    left: 18%;
    top: 18%;
    width: 64%;
    height: 64%;
    background: white;
    border-radius: 50%;
  }
`;

export default function RadioButton({ label, name, value, checked, onChange, ...props }) {
  return (
    <Styles>
      <label>
        {label}
        <input
          type="radio"
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
