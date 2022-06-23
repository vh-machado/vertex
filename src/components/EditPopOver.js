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

const EditPopOver = props => {
  const [value, setValue] = React.useState('');
  const handleChange = event => setValue(event.target.value);

  return (
    <Popover>
      {({ onClose }) => (
        <>
          <PopoverTrigger>
            <Button>{props.buttonText}</Button>
          </PopoverTrigger>
          <PopoverContent
            bgColor={Cores.dark_purple_2}
            borderColor={Cores.russian_violet}
          >
            <PopoverArrow bgColor={Cores.dark_purple_2} />
            <PopoverCloseButton />
            <PopoverHeader fontSize={14} borderColor={Cores.russian_violet}>
              {props.headerText}
            </PopoverHeader>
            <PopoverBody>
              {props.operation === 'add' ? (
                <Input
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
                onClick={() => {
                  if(props.operation === 'del'){
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
