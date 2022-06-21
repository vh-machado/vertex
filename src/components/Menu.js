import React from 'react';
import { Cores } from '../assets/Cores';
import { Button, ButtonGroup } from '@chakra-ui/react'
import { Stack, HStack, VStack } from '@chakra-ui/react'
import { Radio, RadioGroup } from '@chakra-ui/react'
import Graph from 'react-graph-vis';
import { CloseIcon , AddIcon , WarningIcon, ArrowForwardIcon } from '@chakra-ui/icons'   
import { Select } from '@chakra-ui/react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import {useDisclosure} from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'
import { useState } from 'react';
import { useRadio } from '@chakra-ui/react';
import { useRadioGroup } from '@chakra-ui/react';
import { render } from '@testing-library/react';
import { Text } from '@chakra-ui/react';
// 1. Create a component that consumes the `useRadio` hook
function RadioCard(props) {
    const { getInputProps, getCheckboxProps } = useRadio(props)
  
    const input = getInputProps()
    const checkbox = getCheckboxProps()
  
    return (
      <Box as='label'>
        <input {...input} />
        <Box
          {...checkbox}
          cursor='pointer'
          borderWidth='sm'
          borderRadius='md'
          boxShadow='sm'
          _checked={{
            variante: 'outline',
            color: 'white',
            colorScheme: 'Cores.russian_violet',
            borderColor: 'Cores.russian_violet',
            
          }}
          _focus={{
            boxShadow: 'outline',
          }}
          px={2}
          py={2}
        >
          {props.children}
        </Box>
      </Box>
    )
  }
  
  // Step 2: Use the `useRadioGroup` hook to control a group of custom radios.
  function Example() {
    const options = ['Com Orientação', 'Sem Orientação']
  
    const { getRootProps, getRadioProps } = useRadioGroup({
      name: 'framework',
      defaultValue: 'Com Orientação',
      onChange: console.log,
    })
  
    const group = getRootProps()
  
    return (
      <VStack {...group} fontSize = '14'>
        {options.map((value) => {
          const radio = getRadioProps({ value })
          return (
            <RadioCard  key={value} {...radio}>
              {value}
            </RadioCard>
          )
        })}
      </VStack>
    )
  }
  
  render(<Example />)

function Menu(props) {
    const  {isOpen, onOpen, onClose} = useDisclosure ( )
    const [campoVisible, setCampoVisible] = useState(false);
    const clickAddConexao = () => { 
        setCampoVisible(!campoVisible);
     };
    return(
 
        
        <VStack
            
            spacing={4}
            align='stretch'
            justify='center'
            w='100%' 
            h='100%'
            padding={2}
        >
          <Box bgColor={Cores.russian_violet} textColor = 'white' w='100%' >
            <Text colorScheme = 'white' justify = 'center' fontSize = '16'>
                Grafos
            </Text>  

          </Box>  
          <Example />

          <Button onClick = {onOpen} bgColor={Cores.russian_violet} textColor = "white" size = 'xs' fontSize = '15' >
             Criar  
          </Button>
          <Modal isOpen={isOpen} onClose={onClose}>
            
            <ModalContent>
                <Stack direction='row' spacing={4}
                
                    align='stretch'
                    justify='center'
                    w='87%' 
                    h='100%'
                    padding={3}
                >
                    <Button leftIcon = { < AddIcon />} colorScheme='purple' variant='outline' fontSize = '14' >
                        Adicionar vértice
                    </Button>
                    <Button onClick={() => clickAddConexao()} leftIcon = { < AddIcon />} colorScheme='purple' variant='outline' fontSize = '14'>
                        Adicionar conexão
                    </Button>
                    <Button leftIcon = {< CloseIcon />} colorScheme='purple' variant='outline' fontSize = '14'>
                        Remover
                    </Button>
                </Stack> 

                <ModalCloseButton />
                <ModalBody >
                    <VStack >
                        {campoVisible?(
                            <Box >
                                <Input placeholder='De' fontSize = '14'  w = '30%' />
                                <ArrowForwardIcon colorScheme = 'purple' />        
                                <Input placeholder='Para' fontSize = '14' w = '30%' />
                                <Input placeholder='Peso' fontSize = '14' w = '30%'  />        
                            </Box>
                        ) : (
                            <></>
                         )}
                    </VStack>    
                    
                </ModalBody>
        
                <ModalFooter>

                    <Button bgColor={Cores.russian_violet} textColor = 'white' variant= 'outline' mr={3} onClick={onClose} fontSize = '14'>
                        Gerar
                    </Button>
                    <Button bgColor={Cores.russian_violet} textColor = 'white' variant='outline' fontSize = '14'>
                        Cancelar
                    </Button>
                </ModalFooter>
            </ModalContent>
          </Modal>  
        </VStack>
    );
}

export default Menu;