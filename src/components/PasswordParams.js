import React from 'react';
import styled from 'styled-components';
import config from 'config';
import { media } from 'styles/helpers';
import InputRow from 'components/common/InputRow';
import CheckBox from 'components/common/CheckBox';
import RangeSlider from 'components/common/RangeSlider';

const Styles = styled.div`
  .checkboxes {
    > div {
      flex-basis: 50%;
      margin-right: 0;
    }
  }
  ${media.tablet`    
  .checkboxes {
    > div {
      flex-basis: auto;
      margin-right: 3rem;
    }
  }
  `}
`;

const Slider = styled(RangeSlider)`
  ${media.tablet`
    width: 70%;
  `}
`;

export default function PasswordParams({ values, onChange }) {
  const { modes } = config;
  const pwValues = values[modes.PW];
  return (
    <Styles>
      <p>
        Good passwords are at least 12 characters long and contain letters, numbers, and symbols,
        preferably in random order. Make it as long as your account provider will allow, you won’t
        be typing it anyway once you get a <a href="#about">password manager</a>.
      </p>
      <InputRow>
        <Slider
          label="Length"
          name="length"
          value={pwValues.length}
          min={8}
          max={48}
          onChange={onChange}
        />
      </InputRow>
      Characters
      <InputRow className="checkboxes">
        <CheckBox label="abc" name="lower" checked={pwValues.lower} onChange={onChange} />
        <CheckBox label="ABC" name="upper" checked={pwValues.upper} onChange={onChange} />
        <CheckBox label="123" name="numbers" checked={pwValues.numbers} onChange={onChange} />
        <CheckBox label="$@!" name="symbols" checked={pwValues.symbols} onChange={onChange} />
      </InputRow>
    </Styles>
  );
}
