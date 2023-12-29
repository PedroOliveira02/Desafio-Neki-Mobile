import { Box, HStack, Icon, Image, ScrollView, VStack, theme } from "native-base";
import { HeadingCard } from "./HeadingCard";
import { TextCard } from "./TextCard";
import { Linking, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { ModalEditarPerfil } from "./ModalEditarPerfil";

const handleLinkedIn = () => {
  Linking.openURL('https://www.linkedin.com/in/pedro-oliveira02/')
}

const handleGithub = () => {
  Linking.openURL('https://github.com/PedroOliveira02')
}

const handleInstagram = () => {
  Linking.openURL('https://www.linkedin.com/in/pedro-oliveira02/')
}

const handleFacebook = () => {
  Linking.openURL('https://www.linkedin.com/in/pedro-oliveira02/')
}


export function BoxCard() {

  const [ editarPerfilModalVisible, setEditarPerfilModalVisible ] = useState(false)

  const handleEditarPerfil = () => {
    setEditarPerfilModalVisible(true);
  }

  return (
    <ScrollView>
    <VStack ml="8" mr="8" pb="5" px="7" pt="6" bg="emerald.100" space={2} rounded="xl" alignItems="center" style={theme.shadows[9]}>
        <HStack justifyContent="space-around" w="72">
        <TouchableOpacity onPress={handleEditarPerfil}>
          <Icon 
            ml={-5}
            as={Feather}
            name="edit"
            color="black"
            size="8"
          />
        </TouchableOpacity>
      <Image
          source={require('../assets/perfil.png')}
          size={120}
          alt="Foto perfil"
          rounded="full"
          borderWidth={2}
          borderColor="emerald.900"
        />
        <TouchableOpacity>
          <Icon 
            mr={-5}
            as={Feather}
            name="trash-2"
            color="black"
            size="8"
          />
        </TouchableOpacity>
        </HStack>
        <HeadingCard 
          title="Id: 1"
        />
        <Box>
          <HeadingCard
            title="Nome:"
          />
          <TextCard
            title="Pedro de Paula Oliveira"
          />
          <HeadingCard
            title="Nome social:"
          />
          <TextCard
            title="Pidjoca"
          />
          <HeadingCard
            title="Email:"
          />
          <TextCard
            title="pedro.oliveira@neki-it.com"
          />
          <HeadingCard
            title="Data de nascimento:"
          />
          <TextCard
            title="02/02/1990"
          />
          <HeadingCard
            title="Telefone:"
          />
          <TextCard
            title="(21) 974848043"
          />
          <HeadingCard 
            title="LinkedIn:"
          />
          <TouchableOpacity onPress={handleLinkedIn}>
            <TextCard 
              color="blue.400"
              title="www.linkedin.com/in/pedro-oliveira02"
            />
          </TouchableOpacity>
          <HeadingCard 
            title="Github:"
          />
          <TouchableOpacity onPress={handleGithub}> 
            <TextCard 
              color="blue.400"
              title="https://github.com/PedroOliveira02"
            />
          </TouchableOpacity>
          <HeadingCard 
            title="Instagram:"
          />
          <TouchableOpacity onPress={handleInstagram}>
            <TextCard 
              color="blue.400"
              title="www.linkedin.com/in/pedro-oliveira02"
            />
          </TouchableOpacity>
          <HeadingCard 
            title="Facebook:"
          />
          <TouchableOpacity onPress={handleFacebook}>
            <TextCard 
              color="blue.400"
              title="www.linkedin.com/in/pedro-oliveira02"
            />
          </TouchableOpacity>
        </Box>    
    </VStack> 
    {editarPerfilModalVisible && (
      <ModalEditarPerfil modal={editarPerfilModalVisible} setModal={setEditarPerfilModalVisible} />
      )}
    </ScrollView>
  )
}