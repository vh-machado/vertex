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
} from '@chakra-ui/react';
import { Fontes } from '../assets/Fontes';

const EditPopOver = props => {
  const [value, setValue] = React.useState('');
  const handleChange = event => setValue(event.target.value);

  return (
    <Popover>
      {({ onClose }) => (
        <>
          <PopoverTrigger>
            <Button fontFamily={Fontes.principal} fontWeight={600}>
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