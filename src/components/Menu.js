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
import { Fontes } from '../assets/Fontes';

function Menu(props) {
  //const { isOpenGerar, onOpenGerar, onCloseGerar } = useDisclosure();

  // 1. Create a component that consumes the `useRadio` hook
  function RadioCard(propsradio) {
    const { getInputProps, getCheckboxProps } = useRadio(propsradio);

    const input = getInputProps();
    const checkbox = getCheckboxProps();

    return (
      <Box as="label" flex={[1, 0, "auto"]} w="100%">
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
          justifyContent={"center"}
          _checked={{
            variant: 'outline',
            color: 'white',
            borderColor: Cores.lavender_floral
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

  // Step 2: Use the `useRadioGroup` hook to control a group of custom radios.
  function TipoGrafo() {
    const options = ['Orientado', 'Não Orientado'];

    const { value, getRootProps, getRadioProps } = useRadioGroup({
      name: 'framework',
      defaultValue:
        props.orientacao == true ? 'Orientado' : 'Não Orientado',
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
      spacing={20}
      align="stretch"
      justify="flex-end"
      w="100%"
      h="100%"
      padding={2}
      pb={10}
      bgColor={Cores.amethyst_2}
      borderRadius={35}
    >
      <TipoGrafo />

      <Button
        onClick={() => props.setCardsVisiveis(true)}
        textColor="white"
        size="xs"
        h='12%'
        borderRadius={20}
        fontSize="15"
        fontFamily={Fontes.principal}
        fontWeight={600}
        bgColor={Cores.russian_violet}
        _hover={{ bg: Cores.dark_purple_2 }}
        _active={{
          bg: Cores.purple_dark_purple,
          transform: 'scale(0.98)',
        }}
        _focus={{
          boxShadow:
            '0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)',
        }}
      >
        Gerar
      </Button>
    </VStack>
  );
}

export default Menu;
