import { Box, HStack, Heading, Icon, Image, ScrollView, Spinner, Text, VStack, theme, useToast } from "native-base";
import { HeadingCard } from "./HeadingCard";
import { TextCard } from "./TextCard";
import { Linking, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { UserDto } from "../dtos/UserDto";
import { api } from "../services/api";
import { Controller, useForm } from "react-hook-form";
import * as ImagePicker from 'expo-image-picker';
import { AppError } from "../utils/AppError";
import { Input } from "./Input";
import { AxiosError } from "axios";
import { useAuth } from "../hooks/useAuth";

type Props = {
  data: UserDto,
  onDelete: () => void
  onUpdate: () => void
}

const INPUT_HEIGHT = 8;
const INPUT_MARGIN_BOTTOM = 2;

export function BoxCard({ data, onDelete, onUpdate }: Props) {
  const { user } = useAuth()
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [editarPerfil, setEditarPerfil] = useState(false)
  const { control, handleSubmit, reset, getValues, formState: { errors } } = useForm<Props>({
    defaultValues: {
      data: {
        nomeCompleto: data.nomeCompleto,
        nomeSocial: data.nomeSocial,
        email: data.email,
        dataNascimento: data.dataNascimento,
        telefone: data.telefone,
        linkedIn: data.linkedIn,
        github: data.github,
        instagram: data.instagram,
        facebook: data.facebook
      }
    }
  })

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  async function handlePickerImage() {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted) {
      alert('Permissão necessária');
    } else {
      const { assets, canceled } = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 4],
        quality: 1,
      });

      if (!canceled) {

        const fileExtension = assets[0].uri.split('.').pop();

        const photoFile = {
          name: `${fileExtension}`.toLowerCase(),
          uri: assets[0].uri,
          type: `${assets[0].type}/${fileExtension}`
        } as any;
        setSelectedImage(photoFile);
      }
    }
  }

  const handleLinkedIn = () => {
    Linking.openURL(data.linkedIn)
  }

  const handleGithub = () => {
    Linking.openURL(data.github)
  }

  const handleInstagram = () => {
    Linking.openURL(data.instagram)
  }

  const handleFacebook = () => {
    Linking.openURL(data.facebook)
  }

  const handleModoEditarPerfil = () => {
    setEditarPerfil(true)
  }

  async function handleAtualizar() {

    try {
      setIsLoading(true)

      const newData = getValues("data");

      await api.put(`/usuarios/${data.id}`, newData, {
        headers: {
          Authorization: user?.token ? `${user.token}` : "",
        },
      })

      if (selectedImage) {

        const formData = new FormData();

        formData.append('foto', selectedImage)

        const response = await api.post(`usuarios/${data.id}/foto`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: user?.token ? `${user.token}` : "",
          },
        });

        setIsLoading(false)

        if (response.data.error) {
          alert('Não foi possível enviar a imagem. Tente novamente mais tarde');
        }

      }

      onUpdate()
      setEditarPerfil(false)
      toast.show({
        title: 'Perfil atualizado com sucesso!',
        placement: 'bottom',
        bgColor: 'green.500'
      })

    } catch (error: any) {
      setIsLoading(false)
      if (error.response instanceof AppError) {
        const errorMessage = error.response.data.message;
        toast.show({
          title: errorMessage,
          placement: 'top',
          bgColor: 'red.500',
        });
      } else if (error instanceof AxiosError) {
        if (error.response) {
          const errorMessage = error.response.data.message;
          toast.show({
            title: errorMessage,
            placement: 'top',
            bgColor: 'red.500',
          });
        } else {
          toast.show({
            title: 'Erro desconhecido ao processar a resposta do servidor',
            placement: 'top',
            bgColor: 'red.500',
          });
        }
      } else {
        toast.show({
          title: 'Não foi possível atualizar o perfil. Tente novamente mais tarde',
          placement: 'top',
          bgColor: 'red.500',
        });
      }
    }
  }

  const handleDelete = () => {
    onDelete();
  }

  const handleSairModoEditar = () => {
    setEditarPerfil(false)
    reset()
  }

  return (
    <ScrollView>
      <VStack ml="8" mr="8" pb="5" px="7" pt="6" bg="emerald.100" space={2} rounded="xl" alignItems="center" style={theme.shadows[9]}>
        {!editarPerfil ?
          <HStack justifyContent="space-around" w="72">
            <TouchableOpacity onPress={handleModoEditarPerfil}>
              <Icon
                ml={-5}
                as={Feather}
                name="edit"
                color="black"
                size="8"
              />
            </TouchableOpacity>
            <Image
              source={typeof selectedImage === 'string' ? { uri: selectedImage } : selectedImage ? selectedImage : { uri: `data:image/jpeg;base64,${data.foto}` }}
              size={120}
              alt="Foto perfil"
              rounded="full"
              borderWidth={2}
              borderColor="emerald.900"
            />
            <TouchableOpacity onPress={handleDelete} disabled={isLoading}>
              <Icon
                mr={-5}
                as={Feather}
                name="trash-2"
                color="black"
                size="8"
              />
            </TouchableOpacity>
          </HStack>
          :
          <HStack justifyContent="space-around" w="72">
            {isLoading ? <Spinner color="black" size={20} /> :
              <TouchableOpacity onPress={handleSubmit(handleAtualizar)}>
                <Icon
                  ml={-5}
                  as={Feather}
                  name="check"
                  color="black"
                  size="8"
                />
              </TouchableOpacity>
            }
            <TouchableOpacity onPress={handlePickerImage}>
              <Image
                source={typeof selectedImage === 'string' ? { uri: selectedImage } : selectedImage ? selectedImage : { uri: `data:image/jpeg;base64,${data.foto}` }}


                size={120}
                alt="Foto perfil"
                rounded="full"
                borderWidth={2}
                borderColor="emerald.900"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSairModoEditar}>
              <Icon
                mr={-5}
                as={Feather}
                name="arrow-left"
                color="black"
                size="8"
              />
            </TouchableOpacity>
          </HStack>
        }

        <Heading fontSize={16}>
          Id: {data.id}
        </Heading>
        <Box>

          {!editarPerfil ?
            <>
              <HeadingCard
                title="Nome:"
              />
              <TextCard
                title={data.nomeCompleto}
              />
            </>
            :
            <>
              <HeadingCard
                title="Nome:*"
              />
              <Controller
                control={control}
                name="data.nomeCompleto"
                rules={{ required: 'Informe o nome' }}
                render={({ field: { onChange, value } }) => (
                  <Input
                    w="full"
                    borderWidth={0}
                    borderBottomWidth={1}
                    borderColor="emerald.900"
                    h={INPUT_HEIGHT}
                    mb={INPUT_MARGIN_BOTTOM}
                    placeholder="Nome"
                    value={value ? value : data.nomeCompleto}
                    onChangeText={onChange}
                    errorMessage={errors.data?.nomeCompleto?.message}
                  />
                )}
              />
            </>
          }


          {!editarPerfil ?
            <>
              {(data.nomeSocial !== null && data.nomeSocial !== "") && (
                <>
                  <HeadingCard
                    title="Nome social:"
                  />
                  <TextCard
                    title={data.nomeSocial}
                  />
                </>
              )}
            </>
            :

            <>
              <HeadingCard
                title="Nome social:"
              />
              <Controller
                control={control}
                name="data.nomeSocial"
                render={({ field: { onChange, value } }) => (
                  <Input
                    w="full"
                    borderWidth={0}
                    borderBottomWidth={1}
                    borderColor="emerald.900"
                    h={INPUT_HEIGHT}
                    mb={INPUT_MARGIN_BOTTOM}
                    placeholder="Nome social"
                    value={value}
                    onChangeText={onChange}
                    errorMessage={errors.data?.nomeSocial?.message}
                  />
                )}
              />
            </>
          }

          {!editarPerfil ?
            <>
              <HeadingCard
                title="Email:"
              />
              <TextCard
                title={data.email}
              />
            </>
            :
            <>
              <HeadingCard
                title="Email:*"
              />
              <Controller
                control={control}
                name="data.email"
                rules={{ required: 'Informe o email' }}
                render={({ field: { onChange, value } }) => (
                  <Input
                    w="full"
                    borderWidth={0}
                    borderBottomWidth={1}
                    borderColor="emerald.900"
                    h={INPUT_HEIGHT}
                    mb={INPUT_MARGIN_BOTTOM}
                    placeholder="Email"
                    value={value}
                    onChangeText={onChange}
                    keyboardType="email-address"
                    errorMessage={errors.data?.email?.message}
                  />
                )}
              />
            </>
          }
          {!editarPerfil ?
            <>
              <HeadingCard
                title="Data de nascimento:"
              />
              <Text
                fontSize="15"
                mt={-1.6}
                mb={3}
                pb={1}
                borderBottomWidth={1}
                borderBottomColor="emerald.900"
              >
                {data.dataNascimento.toString()}
              </Text>
            </>
            :
            <>
              <HeadingCard
                title="Data de nascimento:* (DD/MM/AAAA)"
              />
              <Controller
                control={control}
                name="data.dataNascimento"
                rules={{ required: 'Informe a data de nascimento' }}
                render={({ field: { onChange, value } }) => (
                  <Input
                    w="full"
                    borderWidth={0}
                    borderBottomWidth={1}
                    borderColor="emerald.900"
                    h={INPUT_HEIGHT}
                    mb={INPUT_MARGIN_BOTTOM}
                    placeholder="DD/MM/AAAA"
                    value={value !== null ? value.toString() : ''}
                    onChangeText={onChange}
                    errorMessage={errors.data?.dataNascimento?.message}
                  />
                )}
              />
            </>
          }
          {!editarPerfil ?
            <>
              {(data.telefone !== null && data.telefone !== "") && (
                <>
                  <HeadingCard
                    title="Telefone:"
                  />
                  <TextCard
                    title={data.telefone}
                  />
                </>
              )}
            </>
            :
            <>
              <HeadingCard
                title="Telefone:"
              />
              <Controller
                control={control}
                name="data.telefone"
                render={({ field: { onChange, value } }) => (
                  <Input
                    w="full"
                    borderWidth={0}
                    borderBottomWidth={1}
                    borderColor="emerald.900"
                    h={INPUT_HEIGHT}
                    mb={INPUT_MARGIN_BOTTOM}
                    placeholder="Telefone"
                    value={value}
                    onChangeText={onChange}
                    keyboardType="numeric"
                    errorMessage={errors.data?.telefone?.message}
                  />
                )}
              />
            </>

          }
          {!editarPerfil ?
            <>
              {(data.linkedIn !== null && data.linkedIn !== "") && (
                <>
                  <HeadingCard
                    title="LinkedIn:"
                  />
                  <TouchableOpacity onPress={handleLinkedIn}>
                    <TextCard
                      color="blue.400"
                      title={data.linkedIn}
                    />
                  </TouchableOpacity>
                </>
              )}
            </>

            :

            <>
              <HeadingCard
                title="LinkedIn:"
              />
              <Controller
                control={control}
                name="data.linkedIn"
                render={({ field: { onChange, value } }) => (
                  <Input
                    w="full"
                    borderWidth={0}
                    borderBottomWidth={1}
                    borderColor="emerald.900"
                    h={INPUT_HEIGHT}
                    mb={INPUT_MARGIN_BOTTOM}
                    placeholder="LinkedIn"
                    value={value}
                    onChangeText={onChange}
                    errorMessage={errors.data?.linkedIn?.message}
                  />
                )}
              />
            </>
          }

          {!editarPerfil ?
            <>
              {(data.github !== null && data.github !== "") && (
                <>
                  <HeadingCard
                    title="Github:"
                  />
                  <TouchableOpacity onPress={handleGithub}>
                    <TextCard
                      color="blue.400"
                      title={data.github}
                    />
                  </TouchableOpacity>
                </>
              )}
            </>
            :

            <>
              <HeadingCard
                title="Github:"
              />
              <Controller
                control={control}
                name="data.github"
                render={({ field: { onChange, value } }) => (
                  <Input
                    w="full"
                    borderWidth={0}
                    borderBottomWidth={1}
                    borderColor="emerald.900"
                    h={INPUT_HEIGHT}
                    mb={INPUT_MARGIN_BOTTOM}
                    placeholder="Github"
                    value={value}
                    onChangeText={onChange}
                    errorMessage={errors.data?.github?.message}
                  />
                )}
              />
            </>
          }
          {!editarPerfil ?
            <>
              {(data.instagram !== null && data.instagram !== "") && (
                <>
                  <HeadingCard
                    title="Instagram:"
                  />
                  <TouchableOpacity onPress={handleInstagram}>
                    <TextCard
                      color="blue.400"
                      title={data.instagram}
                    />
                  </TouchableOpacity>
                </>
              )}
            </>
            :
            <>
              <HeadingCard
                title="Instagram:"
              />
              <Controller
                control={control}
                name="data.instagram"
                render={({ field: { onChange, value } }) => (
                  <Input
                    w="full"
                    borderWidth={0}
                    borderBottomWidth={1}
                    borderColor="emerald.900"
                    h={INPUT_HEIGHT}
                    mb={INPUT_MARGIN_BOTTOM}
                    placeholder="Instagram"
                    value={value}
                    onChangeText={onChange}
                    errorMessage={errors.data?.instagram?.message}
                  />
                )}
              />
            </>
          }
          {!editarPerfil ?
            <>
              {(data.facebook !== null && data.facebook !== "") && (
                <>
                  <HeadingCard
                    title="Facebook:"
                  />
                  <TouchableOpacity onPress={handleFacebook}>
                    <TextCard
                      color="blue.400"
                      title={data.facebook}
                    />
                  </TouchableOpacity>
                </>
              )}
            </>
            :
            <>
              <HeadingCard
                title="Facebook:"
              />
              <Controller
                control={control}
                name="data.facebook"
                render={({ field: { onChange, value } }) => (
                  <Input
                    w="full"
                    borderWidth={0}
                    borderBottomWidth={1}
                    borderColor="emerald.900"
                    h={INPUT_HEIGHT}
                    mb={INPUT_MARGIN_BOTTOM}
                    placeholder="Facebook"
                    value={value}
                    onChangeText={onChange}
                    errorMessage={errors.data?.facebook?.message}
                  />
                )}
              />
            </>
          }
        </Box>
      </VStack>
    </ScrollView>

  )
}