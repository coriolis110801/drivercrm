import {useDisclosure} from "@chakra-ui/hooks";
import {Button} from "@chakra-ui/button";
import {Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay} from "@chakra-ui/modal";
import {ModalFooter} from "@chakra-ui/react";
import {useEffect, useState} from "react";
function ManualClose({text , onOk}) {
    const {isOpen, onOpen, onClose} = useDisclosure()
    useEffect(() => {
            onOpen()
    }, []);

    function Save(v) {
        onOk(v)
        onClose()
    }

    return (
        <>
            <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={() => Save(2)} isCentered size={'xs'}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>确认框Confirm box</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody pb={6}>
                        <p>
                            {text}
                        </p>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={() => Save(1)}>
                            确认Confirm
                        </Button>
                        <Button onClick={() => Save(2)}>取消Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default function useManual() {
    const [Jsx, setJsx] = useState('')
    function a({text}) {
        return new Promise((resolve, reject) => {
            function onOk(v) {
                if(+v === 1){
                    resolve(v)
                }else {
                    reject(v)
                }
                setJsx('')
            }
          setJsx((
              <ManualClose  onOk={onOk} text={text}></ManualClose>
          ))
        })
    }



    return [a, Jsx]
}