import React from 'react';
import styled from 'styled-components';
import { animated, useSprings } from 'react-spring';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { generatePassword } from 'generators';
import { convertToCharCodeArray, convertToStringAndFilterType, padArray } from 'helpers';

const Styles = styled.div``;

const Secrets = styled.div`
  background: teal;
  padding: 1em;
  border-radius: 0.5em;
  color: white;
`;

const Secret = styled.div`
  font-family: ${p => p.theme.fontFamilyFixed};
  margin-bottom: 1rem;
  font-size: 1.25em;
  line-height: 1;
  &:last-child {
    margin-bottom: 0;
  }
`;

const AnimatedSecret = animated(Secret);

/*
for unknown reason, the chars array shrinks to match new props but will not expand again
e.g. if we start with string length 10 and increase it to 15, only the first 10 chars will render
if we then set it to length 8, only 8 chars will ever render, etc
this solution pads the string's char code array with a sentinel value of empty string
then filters those values out again before the chars are interpolated into the view
so the chars array length will always be 100, longer than our input string will ever be
config reset -> true resolves artifact where additional chars don't animate after length is increased
*/

export default function Outputs({ secrets }) {
  const lastLength = React.useRef(0);
  const charArrays = secrets.map(s => convertToCharCodeArray(s)).map(a => padArray(a, '', 100));
  const [transitions, setTransitions] = useSprings(charArrays.length, i => ({
    from: { chars: convertToCharCodeArray(generatePassword(100)) }
  }));

  // reset animation only if secret length has changed
  charArrays.forEach(() => {
    const length = secrets[0].length;
    const lengthChanged = lastLength.current !== length;
    if (lengthChanged) lastLength.current = length;
    setTransitions(i => ({ chars: charArrays[i], reset: lengthChanged }));
  });

  return (
    <Styles>
      <h2>Result</h2>
      <Secrets>
        {transitions.map((s, i) => (
          <CopyToClipboard
            key={i}
            text={secrets[i]}
            onCopy={() => {
              // notify user
              console.log(`${secrets[i]} copied`);
            }}
          >
            <AnimatedSecret>
              {s.chars.interpolate((...chars) => convertToStringAndFilterType(chars, 'number'))}
            </AnimatedSecret>
          </CopyToClipboard>
        ))}
      </Secrets>
    </Styles>
  );
}
