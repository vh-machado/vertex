import React from 'react';
import { Textarea } from '@chakra-ui/react';

import { Cores } from '../../../assets/Cores';
import { Fontes } from '../../../assets/Fontes';

export default function EntradaGrafo({
  textValue,
  setTextValue,
  isInvalid,
  setIsInvalid,
}) {
  let handleTextChange = e => {
    let inputValue = e.target.value;
    setTextValue(inputValue);
  };

  return (
    <Textarea
      isInvalid={isInvalid}
      _invalid={{ borderColor: 'red', borderWidth: 2 }}
      bgColor={'white'}
      color={Cores.russian_violet}
      fontFamily={Fontes.principal}
      fontWeight={400}
      fontSize={18}
      size="sm"
      value={textValue}
      onChange={handleTextChange}
      resize="none"
      flex={[1, 0, 'auto']}
    ></Textarea>
  );
}
