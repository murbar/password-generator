import React from 'react';
import styled from 'styled-components';
import FormField from 'components/common/FormField';
import Label from 'components/common/Label';
import Input from 'components/common/Input';
import config from 'config';

const Styles = styled.div``;

export default function PassphraseParams({ params, onChange }) {
  const { modes } = config;
  const values = params[modes.PP];

  return (
    <Styles>
      <FormField>
        <Label>
          Length
          <Input
            type="range"
            name="length"
            value={values.length}
            min="3"
            max="10"
            onChange={onChange}
          />
        </Label>
        {values.length}
      </FormField>
    </Styles>
  );
}
