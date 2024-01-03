import { Heading, VStack, Image, View, useToast } from "native-base";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import { AppError } from "../utils/AppError";
import { Controller, useForm } from "react-hook-form";

type FormData = {
  email: string;
  senha: string;
}


export function SignIn() {
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast();
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>()

  const { signIn, user } = useAuth();

  async function handleSignIn({ email, senha }: FormData) {
    try {
      setIsLoading(true);
      await signIn(email, senha);
    } catch (error) {

      const isAppError = error instanceof AppError;
 
      const title =  isAppError ? error.message : 'Não foi possível entrar. Tente novamente mais tarde.'
    
      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })
      setIsLoading(false);
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
              onSubmitEditing={handleSubmit(handleSignIn)}
              returnKeyType="send"
              errorMessage={errors.senha?.message}
            />
          )}
        />
        <Button
          title="Login"
          onPress={handleSubmit(handleSignIn)}
          isLoading={isLoading}
        />
      </VStack>
    </View>
  )
}