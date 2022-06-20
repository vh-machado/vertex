import React from 'react';
import { Cores } from '../assets/Cores';
import { Button, ButtonGroup } from '@chakra-ui/react'
import { Stack, HStack, VStack } from '@chakra-ui/react'
import { Radio, RadioGroup } from '@chakra-ui/react'
import Graph from 'react-graph-vis';
import { CloseIcon , AddIcon , WarningIcon, ArrowForwardIcon } from '@chakra-ui/icons'   

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

function Menu(props) {
    const  {isOpen, onOpen, onClose} = useDisclosure ( )
    return(
 
        
        <VStack
            
            spacing={4}
            align='stretch'
            justify='center'
            w='100%' 
            h='100%'
            padding={2}
        >
          
          <RadioGroup defaultValue='1'>
            <Stack spacing={1} textColor= "white"  >
                <Radio size = 'sm' value='1'  > Dígrafo </Radio>
                <Radio size = 'sm' value='2'> Não Orientado </Radio>
            </Stack>
          </RadioGroup>
          <Button onClick = {onOpen} bgColor={Cores.russian_violet} textColor = "white" size = 'xs' fontSize = '15' >
             Criar  
          </Button>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
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
                <Button leftIcon = { < AddIcon />} colorScheme='purple' variant='outline' fontSize = '14'>
                    Adicionar conexão
                </Button>
               
                <Button leftIcon = {< CloseIcon />} colorScheme='purple' variant='outline' fontSize = '14'>
                    Remover
                </Button>
            </Stack> 
                 <Box  align="space-around" >
                    <Input placeholder='De' fontSize = '14'  w = '20%' />
                    <ArrowForwardIcon colorScheme = 'purple'>
                    </ArrowForwardIcon>

                    <Input placeholder='Para' fontSize = '14' w = '20%'/>

                    <Input placeholder='Peso' fontSize = '14' w = '20%'  />
                    
                   </Box> 
                <ModalCloseButton />
                <ModalBody >

                
                </ModalBody>
    
                <ModalFooter>

                <Button bgColor={Cores.russian_violet} textColor = 'white' variant= 'outline' mr={3} onClick={onClose} fontSize = '14'>
                    Salvar
                </Button>
                <Button bgColor={Cores.russian_violet} textColor = 'white' variant='outline' fontSize = '14'>Cancelar</Button>
                </ModalFooter>
            </ModalContent>
          </Modal>  
        </VStack>
    );
}

export default Menu;