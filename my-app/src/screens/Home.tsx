import { HStack, Image, View, VStack, Heading, Icon, Box, theme, Text, ScrollView, Modal } from "native-base";
import { SafeAreaView, TouchableOpacity } from "react-native";
import { Feather } from '@expo/vector-icons';
import { Button } from "../components/Button";
import { HeadingCard } from "../components/HeadingCard";
import { TextCard } from "../components/TextCard";
import { BoxCard } from "../components/BoxCard";
import { useEffect, useState } from "react";
import { ModalNovoPerfil } from "../components/ModalNovoPerfil";
import { useNavigation } from "@react-navigation/native";
import { AppNavigateRoutesProps } from "../routes/app.routes";
import { ModalEditarPerfil } from "../components/ModalEditarPerfil";
import { AuthNavigateRoutesProps } from "../routes/auth.routes";
import { useAuth } from "../hooks/useAuth";


export function Home() {
  const [ novoPerfilModalVisible, setNovoPerfilModalVisible ] = useState(false)
  const { signOut, user } = useAuth()

  function handleLogout() {
    signOut()
    console.log("==========>", user)
  }

  const handleNovoPerfil = () => {
    setNovoPerfilModalVisible(true);
    console.log("==========>", user)
  }

  return ( 
  
    
    <View flex={1} pb="5" bg="emerald.900" justifyContent="center">
      <VStack mt="10" mb="4" mx="8" px="4" py="5"  space={6} rounded="xl">
        <HStack w="full" justifyContent="space-between" alignItems="center">
          <Image
            source={require('../assets/logo.png')}
            size={50}
            alt="Logo Neki"
          />
          <Button
            onPress={handleNovoPerfil}
            title="Novo perfil"
            w="40"
            bg="emerald.100"
          />
          <TouchableOpacity onPress={handleLogout}>
            <Icon
              as={Feather}
              name="log-out"
              color="emerald.100"
              size="8"
            />
          </TouchableOpacity>
        </HStack>
      </VStack>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <HStack>
        <BoxCard />
        <BoxCard />
        <BoxCard />
      </HStack>
      </ScrollView>
      {novoPerfilModalVisible && (
      <ModalNovoPerfil modal={novoPerfilModalVisible} setModal={setNovoPerfilModalVisible} />
    )}
    </View>
    
    
  )
}