import React, { useState } from 'react';
import styled from 'styled-components';
import { media } from 'styles/helpers';

const Styles = styled.div`
  display: flex;
  overflow: hidden;
  ${media.tablet`
    padding: 0 0.5em;
  `}
  button {
    font-size: 1em;
    font-family: ${p => p.theme.fontFamily};
    font-weight: bold;
    border: none;
    background: none;
    margin: 0;
    padding: 1rem 1.5rem;
    cursor: pointer;
    border-radius: ${p => p.theme.borderRadius} ${p => p.theme.borderRadius} 0 0;
  }
  button:hover {
    background: hsla(0, 0%, 94%, 0.5);
  }
  button:focus {
    outline: none;
  }
  button.selected {
    background: white;
  }
  button.selected:hover {
    background: white;
    cursor: default;
  }
  ${media.phone`
    /* button {
      padding: 0.75rem 1.5rem;
    }
    button:first-child {
      padding-left: 1.75rem;
    }
    button:last-child {
      padding-right: 1.75rem;
    } */
  `}
`;

export default function ChoiceToggle({ choices, onToggle, initial }) {
  const labels = Object.keys(choices);
  const [selected, setSelected] = useState(initial ?? labels[0]);

  const handleClick = label => {
    setSelected(label);
    onToggle(choices[label]);
  };

  return (
    <Styles>
      {labels.map(l => (
        <button
          key={l}
          className={selected === l ? 'selected' : undefined}
          onClick={() => handleClick(l)}
        >
          {l}
        </button>
      ))}
    </Styles>
  );
}
