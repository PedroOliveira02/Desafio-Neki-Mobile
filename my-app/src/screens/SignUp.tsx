import { Heading, VStack, Image, View, Text } from "native-base";
import { TouchableOpacity } from "react-native";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { useNavigation } from "@react-navigation/native";
import { AppNavigateRoutesProps } from "../routes/app.routes";


export function SignUp() {
  const navigation = useNavigation<AppNavigateRoutesProps>()

  function handleVoltarLogin() {
    navigation.goBack()
  }

  function handleCadastrar() {
    alert('Cadastrado com sucesso!')
    navigation.goBack
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
        <Input placeholder="Nome" />
        <Input placeholder="Email" />
        <Input placeholder="Senha" />
        <Input placeholder="Confirme a senha" />
        <Button
        onPress={handleCadastrar}
          title="Cadastrar"
        />
        <TouchableOpacity onPress={handleVoltarLogin}>
          <Text>Voltar para o login</Text>
        </TouchableOpacity>
      </VStack>
    </View>
  )
}