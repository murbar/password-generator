import React from 'react';
import styled from 'styled-components';
import theme from 'styles/theme';

const { inputHighlightColor } = theme;
const { offBlack, blue } = theme.colors;

const Styles = styled.div`
  margin: 0;
  display: flex;
  align-items: center;
  width: 100%;
  label {
    display: inline-block;
    user-select: none;
  }
  span {
    font-size: 1.25em;
    font-weight: bold;
    width: 2.5em;
    text-align: center;
  }
  input {
    flex: 1;
    appearance: none;
    height: 0.5em;
    padding: 0.5rem;
    background: white;
    outline: none;
    transition: all 300ms;
    border-radius: ${p => p.theme.borderRadius};
    border: 0.1rem solid ${offBlack};
    font-size: 1em;
  }
  input:hover {
    border: 0.1rem solid ${blue};
  }
  /* Chrome, Opera, Safari, Edge */
  input::-webkit-slider-thumb {
    appearance: none;
    width: 1.5em;
    height: 1.5em;
    border-radius: ${p => p.theme.borderRadius};
    border-radius: 50%;
    background: ${inputHighlightColor};
    cursor: pointer;
    border: none;
  }
  /* Firefox */
  input::-moz-range-thumb {
    width: 1.5em;
    height: 1.5em;
    border-radius: 50%;
    background: ${inputHighlightColor};
    cursor: pointer;
    border: none;
  }
`;

export default function RangeSlider({
  label,
  name,
  min = 1,
  max = 100,
  value,
  onChange,
  className,
  ...props
}) {
  // update when user touches input outside of slider handle
  const handleTouchStart = e => {
    const { clientX } = e.targetTouches[0];
    const touchX = clientX;
    const rect = e.target.getBoundingClientRect();
    const sliderWidth = rect.width;
    const x = touchX - rect.x;
    const selection = x / sliderWidth;
    const range = max - min;
    const newValue = Math.floor(range * selection + min);
    if (newValue !== value) {
      e.target.value = newValue;
      onChange(e);
    }
  };

  return (
    <Styles className={className}>
      <label>{label}</label>
      <span>{value}</span>
      <input
        type="range"
        name={name}
        value={value}
        min={min}
        max={max}
        onChange={onChange}
        onTouchStart={handleTouchStart}
        {...props}
      />
    </Styles>
  );
}
