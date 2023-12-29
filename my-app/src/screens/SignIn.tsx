import { Heading, VStack, Image, View, Text, theme } from "native-base";
import { TouchableOpacity } from "react-native";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { useNavigation } from "@react-navigation/native";
import { AppNavigateRoutesProps } from "../routes/app.routes";


export function SignIn() {

  const navigation = useNavigation<AppNavigateRoutesProps>();

  function handleLogin() {
    navigation.navigate('home');
  }

  function handleCadastro() {
    navigation.navigate('signUp');
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
        <Input placeholder="Email" />
        <Input placeholder="Senha"  />
        <Button
          onPress={handleLogin}
          title="Login"
        />
        <TouchableOpacity onPress={handleCadastro}>
          <Text>Cadastre-se</Text>
        </TouchableOpacity>
      </VStack>
    </View>
  )
}