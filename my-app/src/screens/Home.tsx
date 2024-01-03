import { HStack, Image, View, VStack, Heading, Icon, Box, theme, Text, ScrollView, Modal, useToast, FlatList } from "native-base";
import { TouchableOpacity } from "react-native";
import { Feather } from '@expo/vector-icons';
import { Button } from "../components/Button";
import { BoxCard } from "../components/BoxCard";
import { useEffect, useState } from "react";
import { ModalNovoPerfil } from "../components/ModalNovoPerfil";
import { useAuth } from "../hooks/useAuth";
import { api } from "../services/api";
import { AppError } from "../utils/AppError";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Loading } from "../components/Loading";
import { UserDto } from "../dtos/UserDto";
import { Alert } from 'react-native';

export function Home() {
  const [users, setUsers] = useState<UserDto[]>([])
  const toast = useToast()
  const [isLoading, setIsLoading] = useState(true);
  const [novoPerfilModalVisible, setNovoPerfilModalVisible] = useState(false)
  const { signOut } = useAuth()
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const obterToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("token");

        setToken(storedToken);

        if (storedToken) {
          await fetchUsers();
        }
      } catch (error) {
        console.error("Erro ao obter o token:", error);
      }
    };

    obterToken();
  }, []);

  function handleLogout() {
    signOut()
  }

  function handleNovoPerfil() {
    setNovoPerfilModalVisible(true);
  }

  async function handleDeletePerfil(userId: number) {
    Alert.alert(
      'Confirmação',
      'Tem certeza que deseja excluir este perfil?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Confirmar',
          onPress: async () => {
            try {
              setIsLoading(true);
              await api.delete(`/usuarios/${userId}`, {
                headers: {
                  Authorization: token ? `${token}` : "",
                },
              });
              await fetchUsers();
              toast.show({
                title: 'Perfil excluído com sucesso!',
                placement: 'bottom',
                bgColor: 'green.500',
              });
            } catch (error) {
              console.error('Erro ao excluir o perfil:', error);
              const isAppError = error instanceof AppError;
              const title = isAppError
                ? error.message
                : 'Não foi possível excluir o perfil. Tente novamente mais tarde';

              toast.show({
                title,
                placement: 'top',
                bgColor: 'red.500',
              });
            } finally {
              setIsLoading(false);
            }
          },
        },
      ],
      { cancelable: true }
    );
  }

  async function fetchUsers() {
    try {
      setIsLoading(true);
      const response = await api.get('/usuarios', {
        headers: {
          Authorization: token ? `${token}` : "",
        },
      });
      setUsers(response.data);

    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi possível carregar os usuários cadastrados';

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, [])

  const handleProfileSaved = () => {
    fetchUsers();
  }

  const handleProfileUpdated = () => {
    fetchUsers();
  }

  return (
    <View flex={1} pb="5" bg="emerald.900" justifyContent="center">
      <VStack mt="10" mb="3" mx="8" px="4" py="5" space={6} rounded="xl">
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
      {
        isLoading ? <Loading /> :
          <HStack>
            <FlatList
              data={users}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <BoxCard
                  data={item}
                  onDelete={() => handleDeletePerfil(item.id)}
                  onUpdate={() => handleProfileUpdated()}
                />
              )}
              ListEmptyComponent={() => (
                <Heading color="emerald.100" ml={70}>
                  Nenhum Perfil cadastrado
                </Heading>
              )}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </HStack>
      }
      {novoPerfilModalVisible && (
        <ModalNovoPerfil modal={novoPerfilModalVisible} setModal={setNovoPerfilModalVisible} onSave={handleProfileSaved} />
      )}
    </View>
  )
}