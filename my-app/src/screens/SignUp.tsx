import { Heading, VStack, Image, View, Text, useToast } from "native-base";
import { TouchableOpacity } from "react-native";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { useNavigation } from "@react-navigation/native";
import { AppNavigateRoutesProps } from "../routes/app.routes";
import { AuthNavigateRoutesProps } from "../routes/auth.routes";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../services/api";
import { AppError } from "../utils/AppError";


type FormData = {
  nome: string;
  email: string;
  senha: string;
  confirmarSenha: string;
}

export function SignUp() {
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast();
  const token = AsyncStorage.getItem("user.token")
  const navigation = useNavigation<AuthNavigateRoutesProps>()
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>()

  function handleVoltarLogin() {
    navigation.goBack()
  }

  // const config = {
  //   headers: {
  //     Authorization: token ? `${token}` : "",
  //   },
  // };

  async function handleSignUp({ nome, email, senha}: FormData) {
    try {
      setIsLoading(true)

      await api.post('/administradores', { nome, email, senha});
      navigation.goBack()
    } catch (error) {
      setIsLoading(false);

      const isAppError = error instanceof AppError;

      const title = isAppError ? error.message : 'Não foi possível criar a conta. Tente novamente mais tarde';

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })
    }
  }

  

  return (
    <View flex={1} bg="emerald.900" justifyContent="center">

      <VStack m="12" px={8}  py={60} bg="emerald.100" space={6} rounded="xl" alignItems="center">
        <Image
          source={require('../assets/logo.png')}
          h={50}
          w={50}
          alt="Logo Neki"
        />
        <Heading>
          Nekicard
        </Heading>
        <Controller 
          control={control}
          name="nome"
          rules={{ required: 'Informe o nome' }}
          render={({ field: { onChange, value } }) => (
            <Input 
              placeholder="Nome" 
              value={value}
              onChangeText={onChange}
              errorMessage={errors.nome?.message}
            />
          )}
        />
        <Controller 
          control={control}
          name="email"
          rules={{ required: 'Informe o email' }}
          render={({ field: { onChange, value } }) => (
            <Input 
              placeholder="Email" 
              keyboardType="email-address"
              autoCapitalize="none"
              value={value}
              onChangeText={onChange}
              errorMessage={errors.email?.message}
            />
          )}
        />
        <Controller 
          control={control}
          name="senha"
          rules={{ required: 'Informe a senha' }}
          render={({ field: { onChange, value } }) => (
            <Input 
              placeholder="Senha" 
              secureTextEntry
              value={value}
              onChangeText={onChange}
              errorMessage={errors.senha?.message}
            />
          )}
        />
        <Controller 
          control={control}
          name="confirmarSenha"
          rules={{ required: 'Confirme a senha' }}
          render={({ field: { onChange, value } }) => (
            <Input 
              placeholder="Confirme a senha" 
              secureTextEntry
              value={value}
              onChangeText={onChange}
              onSubmitEditing={handleSubmit(handleSignUp)}
              returnKeyType="send"
              errorMessage={errors.confirmarSenha?.message}
            />
          )}
        />
        
        
        
        <Button
          onPress={handleSubmit(handleSignUp)}
          title="Cadastrar"
          isLoading={isLoading}
        />
        <TouchableOpacity onPress={handleVoltarLogin}>
          <Text>Voltar para o login</Text>
        </TouchableOpacity>
      </VStack>
    </View>
  )
}