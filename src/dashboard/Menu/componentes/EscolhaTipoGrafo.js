import React from 'react';
import { Box, useRadio, useRadioGroup, VStack } from '@chakra-ui/react';

import { Cores } from '../../../assets/Cores';
import { Fontes } from '../../../assets/Fontes';

function RadioCard(propsradio) {
  const { getInputProps, getCheckboxProps } = useRadio(propsradio);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label" flex={[1, 0, 'auto']} w="100%">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        color={Cores.russian_violet}
        borderColor={Cores.russian_violet}
        borderWidth="2px"
        borderRadius="md"
        boxShadow="sm"
        fontSize={14}
        fontFamily={Fontes.principal}
        fontWeight={600}
        justifyContent={'center'}
        _checked={{
          variant: 'outline',
          color: 'white',
          borderColor: Cores.lavender_floral,
        }}
        _focus={{
          boxShadow: 'outline',
        }}
        px={2}
        py={2}
      >
        {propsradio.children}
      </Box>
    </Box>
  );
}

export default function EscolhaTipoGrafo(props) {
  let {orientacao, setOrientacao, isOrientado, setIsOrientado} = props

  const options = ['Não Orientado', 'Orientado'];

  const { value, getRootProps, getRadioProps } = useRadioGroup({
    name: 'framework',
    defaultValue: isOrientado ? 'Orientado' : 'Não Orientado',
    onChange: () => setIsOrientado(!isOrientado),
  });
  const group = getRootProps();
  return (
    <VStack {...group} fontSize="14">
      {options.map(value => {
        const radio = getRadioProps({ value });
        return (
          <RadioCard key={value} {...radio}>
            {value}
          </RadioCard>
        );
      })}
    </VStack>
  );
}
