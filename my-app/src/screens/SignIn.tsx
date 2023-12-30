import { Heading, VStack, Image, View, Text, theme, useToast } from "native-base";
import { TouchableOpacity } from "react-native";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { useNavigation } from "@react-navigation/native";
import { AppNavigateRoutesProps } from "../routes/app.routes";
import { AuthNavigateRoutesProps } from "../routes/auth.routes";
import { useAuth } from "../hooks/useAuth";
import { useEffect, useState } from "react";
import { AppError } from "../utils/AppError";
import { Controller, useForm } from "react-hook-form";
import AsyncStorage from "@react-native-async-storage/async-storage";

type FormData = {
  email: string;
  senha: string;
}


export function SignIn() {
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast();
  const navigation = useNavigation<AuthNavigateRoutesProps>();
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>()

  const { signIn, user } = useAuth();

  async function handleSignIn({ email, senha }: FormData) {
    try {
      setIsLoading(true);
      await signIn(email, senha);
    } catch (error) {
      console.log('Erro no login:', error);
      const isAppError = error instanceof AppError;
 
      const title =  isAppError ? error.message : 'Não foi possível entrar. Tente novamente mais tarde.'
    
      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })
      setIsLoading(false);
    } 
    // finally {
    //   setIsLoading(false);
    // }
  }


  function handleCadastro() {
    navigation.navigate('signUp');
    console.log("==========>", AsyncStorage.getItem('user'))
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
        
        
        <Button
          title="Login"
          onPress={handleSubmit(handleSignIn)}
          isLoading={isLoading}
        />
        <TouchableOpacity onPress={handleCadastro}>
          <Text>Cadastre-se</Text>
        </TouchableOpacity>
      </VStack>
    </View>
  )
}