import { IModalProps, Modal, Image, theme, useToast } from "native-base"
import { HeadingCard } from "./HeadingCard"
import { Input } from "./Input"
import { Button } from "./Button"
import { UserDto } from "../dtos/UserDto"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { api } from "../services/api"
import { AppError } from "../utils/AppError"
import * as ImagePicker from 'expo-image-picker';
import { TouchableOpacity } from "react-native"
import { AxiosError, formToJSON } from "axios"
import { useAuth } from "../hooks/useAuth"

interface ModalCadastro extends IModalProps {
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  onSave: () => void;
}

type FormData = {
  data: UserDto;
}

const INPUT_HEIGHT = 9;
const INPUT_MARGIN_BOTTOM = 2;

export function ModalNovoPerfil({ modal, setModal, onSave, ...rest }: ModalCadastro) {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast();
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      data: {},
    },
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

  async function handleCadastrar({ data }: FormData) {

    try {
      setIsLoading(true)

      if (selectedImage) {
        const formData = new FormData();

        formData.append('foto', selectedImage)

        const responseCreateUser = await api.post('/usuarios', data, {
          headers: {
            Authorization: user?.token ? `${user.token}` : "",
          },
        })

        const userId = responseCreateUser.data.id;

        const response = await api.post(`usuarios/${userId}/foto`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: user?.token ? `${user.token}` : "",
          },
        });

        toast.show({
          title: 'Perfil cadastrado com sucesso!',
          placement: 'bottom',
          bgColor: 'green.500'
        })

        setIsLoading(false)
        setModal(false)
        onSave()

        if (response.data.error) {
          alert('Não foi possível enviar a imagem. Tente novamente mais tarde');
        }

      } else {
        alert("Selecione uma foto antes de cadastrar perfil")
        setIsLoading(false)
      }


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
          title: 'Não foi possível criar o perfil. Tente novamente mais tarde',
          placement: 'top',
          bgColor: 'red.500',
        })
      }
    }
  }

  return (
    <Modal
      isOpen={modal}
      onClose={() => setModal(false)}
      mt={7}
      {...rest}
    >
      <Modal.Body w={350} bg="emerald.100" rounded="xl" alignItems="center" style={theme.shadows[9]}>
        <TouchableOpacity onPress={() => handlePickerImage()}>
          <Image
            source={
              selectedImage ? selectedImage : require('../assets/userPhotoDefault.png')
            }
            size={120}
            alt="Foto perfil"
            rounded="full"
            borderWidth={2}
            borderColor="emerald.900"
            mb={INPUT_MARGIN_BOTTOM}
          />
        </TouchableOpacity>
        <HeadingCard
          title="Nome*"
        />
        <Controller
          control={control}
          name="data.nomeCompleto"
          rules={{ required: 'Informe o nome' }}
          render={({ field: { onChange, value } }) => (
            <Input
              borderWidth={0}
              borderBottomWidth={1}
              borderColor="emerald.900"
              h={INPUT_HEIGHT}
              mb={INPUT_MARGIN_BOTTOM}
              placeholder="Nome"
              value={value}
              onChangeText={onChange}
              errorMessage={errors.data?.nomeCompleto?.message}
            />
          )}
        />
        <HeadingCard
          title="Nome social"
        />
        <Controller
          control={control}
          name="data.nomeSocial"
          render={({ field: { onChange, value } }) => (
            <Input
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
        <HeadingCard
          title="Email*"
        />
        <Controller
          control={control}
          name="data.email"
          rules={{ required: 'Informe o email' }}
          render={({ field: { onChange, value } }) => (
            <Input
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
        <HeadingCard
          title="Data de Nascimento*(DD/MM/AAAA)"
        />
        <Controller
          control={control}
          name="data.dataNascimento"
          rules={{ required: 'Informe a data de nascimento' }}
          render={({ field: { onChange, value } }) => (
            <Input
              borderWidth={0}
              borderBottomWidth={1}
              borderColor="emerald.900"
              h={INPUT_HEIGHT}
              mb={INPUT_MARGIN_BOTTOM}
              placeholder="DD/MM/AAA"
              value={value ? value.toString() : ''}
              onChangeText={onChange}
              errorMessage={errors.data?.dataNascimento?.message}
            />
          )}
        />
        <HeadingCard
          title="Telefone"
        />
        <Controller
          control={control}
          name="data.telefone"
          render={({ field: { onChange, value } }) => (
            <Input
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
        <HeadingCard
          title="LinkedIn"
        />
        <Controller
          control={control}
          name="data.linkedIn"
          render={({ field: { onChange, value } }) => (
            <Input
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
        <HeadingCard
          title="Github"
        />
        <Controller
          control={control}
          name="data.github"
          render={({ field: { onChange, value } }) => (
            <Input
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
        <HeadingCard
          title="Instagram"
        />
        <Controller
          control={control}
          name="data.instagram"
          render={({ field: { onChange, value } }) => (
            <Input
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
        <HeadingCard
          title="Facebook"
        />
        <Controller
          control={control}
          name="data.facebook"
          render={({ field: { onChange, value } }) => (
            <Input
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
        <Button
          onPress={handleSubmit(handleCadastrar)}
          title="Cadastrar"
          isLoading={isLoading}
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
