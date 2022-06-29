import React, { useEffect } from 'react';
import { Cores } from '../assets/Cores';
import { Button } from '@chakra-ui/react';
import { VStack } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import { useDisclosure } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';
import { useState } from 'react';
import { useRadio } from '@chakra-ui/react';
import { useRadioGroup } from '@chakra-ui/react';
import { render } from '@testing-library/react';

function Menu(props) {
  const { isOpenGerar, onOpenGerar, onCloseGerar } = useDisclosure();

  // 1. Create a component that consumes the `useRadio` hook
  function RadioCard(propsradio) {
    const { getInputProps, getCheckboxProps } = useRadio(propsradio);

    const input = getInputProps();
    const checkbox = getCheckboxProps();

    return (
      <Box as="label">
        <input {...input} />
        <Box
          {...checkbox}
          cursor="pointer"
          borderWidth="sm"
          borderRadius="md"
          boxShadow="sm"
          _checked={{
            variant: 'outline',
            color: 'white',
          }}
          px={2}
          py={2}
        >
          {propsradio.children}
        </Box>
      </Box>
    );
  }

  // Step 2: Use the `useRadioGroup` hook to control a group of custom radios.
  function TipoGrafo() {
    const options = ['Com Orientação', 'Sem Orientação'];

    const { value, getRootProps, getRadioProps } = useRadioGroup({
      name: 'framework',
      defaultValue:
        props.orientacao == true ? 'Com Orientação' : 'Sem Orientação',
      onChange: () => props.setOrientacao(!props.orientacao),
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

  return (
    <VStack
      spacing={4}
      align="stretch"
      justify="center"
      w="100%"
      h="100%"
      padding={2}
    >
      <TipoGrafo />

      <Button
        onClick={onOpenGerar}
        bgColor={Cores.russian_violet}
        textColor="white"
        size="xs"
        fontSize="15"
      >
        Gerar
      </Button>
    </VStack>
  );
}

export default Menu;
