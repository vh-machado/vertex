import React from 'react';
import { Cores } from '../assets/Cores';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Button,
  Input,
  useDisclosure,
  theme,
  ColorModeScript,
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import { Fontes } from '../assets/Fontes';

const EditPopOver = props => {
  const [value, setValue] = React.useState('');
  const handleChange = event => setValue(event.target.value);

  return (
    <Popover theme={theme}>
      {({ onClose }) => (
        <>
          <PopoverTrigger>
            <Button
              marginEnd={4}
              size="sm"
              color="white"
              leftIcon={
                props.operation === 'add' ? <AddIcon /> : <DeleteIcon />
              }
              fontFamily={Fontes.principal}
              fontWeight={400}
              bgColor='rgba(255,255,255,0.05)'
              _hover={{ bg: Cores.dark_purple_2}}
              _active={{
                bg: Cores.purple_mountain_majesty,
                transform: 'scale(0.98)',
              }}
              _focus={{
                boxShadow:
                  '0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)',
              }}
            >
              {props.buttonText}
            </Button>
          </PopoverTrigger>
          <PopoverContent
            bgColor={Cores.dark_purple_2}
            borderColor={Cores.russian_violet}
          >
            <PopoverArrow bgColor={Cores.dark_purple_2} />
            <PopoverCloseButton />
            <PopoverHeader
              fontFamily={Fontes.principal}
              fontWeight={400}
              fontSize={14}
              color={Cores.mauve}
              borderColor={Cores.russian_violet}
            >
              {props.headerText}
            </PopoverHeader>
            <PopoverBody>
              {props.operation === 'add' ? (
                <Input
                  fontFamily={Fontes.principal}
                  fontWeight={200}
                  value={value}
                  onChange={handleChange}
                  variant="filled"
                  placeholder={props.inputText}
                  bgColor='rgba(255,255,255,0.05)'
                  size="sm"
                  borderRadius="8"
                  marginBottom="3"
                ></Input>
              ) : (
                <></>
              )}
              <Button
                fontFamily={Fontes.principal}
                fontWeight={600}
                color='white'
                bgColor={Cores.lavender_floral}
                _hover={{ bg: Cores.amethyst}}
                _active={{
                  bg: Cores.dark_purple,
                  transform: 'scale(0.98)',
                }}
                _focus={{
                  boxShadow:
                    '0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)',
                }}
                onClick={() => {
                  if (props.operation === 'del') {
                    props.eventClick(true);
                  } else {
                    props.eventClick(value);
                  }
                  onClose();
                }}
              >
                Confirmar
              </Button>
            </PopoverBody>
          </PopoverContent>
        </>
      )}
    </Popover>
  );
};

export default EditPopOver;
