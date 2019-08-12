import React from 'react';
import styled from 'styled-components';
import FormField from 'components/common/FormField';
import Label from 'components/common/Label';
import Input from 'components/common/Input';
import config from 'config';

const Styles = styled.div``;

export default function PasswordParams({ params, onChange }) {
  const { modes } = config;
  const values = params[modes.PW];
  return (
    <Styles>
      <FormField>
        <Label>
          Length
          <Input
            type="range"
            name="length"
            value={values.length}
            min="8"
            max="48"
            onChange={onChange}
          />
        </Label>
        {values.length}
      </FormField>
      <FormField>
        <Label>
          abc
          <Input type="checkbox" name="lower" checked={values.lower} onChange={onChange} />
        </Label>
      </FormField>
      <FormField>
        <Label>
          ABC
          <Input type="checkbox" name="upper" checked={values.upper} onChange={onChange} />
        </Label>
      </FormField>
      <FormField>
        <Label>
          123
          <Input type="checkbox" name="numbers" checked={values.numbers} onChange={onChange} />
        </Label>
      </FormField>
      <FormField>
        <Label>
          @$!
          <Input type="checkbox" name="symbols" checked={values.symbols} onChange={onChange} />
        </Label>
      </FormField>
    </Styles>
  );
}
