import { IModalProps, Modal, Text, Image, theme, View, KeyboardAvoidingView, ScrollView } from "native-base"
import { BoxCard } from "./BoxCard"
import { HeadingCard } from "./HeadingCard"
import { Input } from "./Input"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { Button } from "./Button"

interface ModalCadastro extends IModalProps {
  modal: boolean
  setModal: React.Dispatch<React.SetStateAction<boolean>>
}

const INPUT_HEIGHT = 9;
const INPUT_MARGIN_BOTTOM = 2;

export function ModalNovoPerfil({ modal, setModal, ...rest}: ModalCadastro ) {
  return (
    
      
    <Modal
      isOpen={modal}
      onClose={() => setModal(false)}
      mt={7}
      {...rest}
    >
      
      <Modal.Body w={350} bg="emerald.100" rounded="xl" alignItems="center" style={theme.shadows[9]}>
        <Image
          source={require('../assets/perfil.png')}
          size={120}
          alt="Foto perfil"
          rounded="full"
          borderWidth={2}
          borderColor="emerald.900"
          mb={INPUT_MARGIN_BOTTOM}
        />
        <HeadingCard 
          title="Nome*"
        />
        <Input
          borderWidth={0}
          borderBottomWidth={1}
          borderColor="emerald.900"
          h={INPUT_HEIGHT}
          mb={INPUT_MARGIN_BOTTOM}
          placeholder="Nome"
        />
        <HeadingCard 
          title="Nome social"
        />
        <Input
          borderWidth={0}
          borderBottomWidth={1}
          borderColor="emerald.900"
          h={INPUT_HEIGHT}
          mb={INPUT_MARGIN_BOTTOM}
        />
        <HeadingCard 
          title="Email*"
        />
        <Input
          borderWidth={0}
          borderBottomWidth={1}
          borderColor="emerald.900"
          h={INPUT_HEIGHT}
          mb={INPUT_MARGIN_BOTTOM}
        />
        <HeadingCard 
          title="Data de Nascimento*"
        />
        <Input
          borderWidth={0}
          borderBottomWidth={1}
          borderColor="emerald.900"
          h={INPUT_HEIGHT}
          mb={INPUT_MARGIN_BOTTOM}
        />
        <HeadingCard 
          title="Telefone"
        />
        <Input
          borderWidth={0}
          borderBottomWidth={1}
          borderColor="emerald.900"
          h={INPUT_HEIGHT}
          mb={INPUT_MARGIN_BOTTOM}
        />
        <HeadingCard 
          title="LinkedIn"
        />
        <Input
          borderWidth={0}
          borderBottomWidth={1}
          borderColor="emerald.900"
          h={INPUT_HEIGHT}
          mb={INPUT_MARGIN_BOTTOM}
        />
        <HeadingCard 
          title="Github"
        />
        <Input
          borderWidth={0}
          borderBottomWidth={1}
          borderColor="emerald.900"
          h={INPUT_HEIGHT}
          mb={INPUT_MARGIN_BOTTOM}
        />
        <HeadingCard 
          title="Instagram"
        />
        <Input
          borderWidth={0}
          borderBottomWidth={1}
          borderColor="emerald.900"
          h={INPUT_HEIGHT}
          mb={INPUT_MARGIN_BOTTOM}
        />
        <HeadingCard 
          title="Facebook"
        />
        <Input
          borderWidth={0}
          borderBottomWidth={1}
          borderColor="emerald.900"
          h={INPUT_HEIGHT}
          mb={INPUT_MARGIN_BOTTOM}
        />
        <Button 
          title="Cadastrar"
          my={2}
        />
        <Button 
          onPress={() => setModal(false)}
          title="Voltar"
          mt={2}
        />
      </Modal.Body>
      
      
      
    </Modal>
    
    
  )
}