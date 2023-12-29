import { Heading, VStack, Image, View, Text } from "native-base";
import { TouchableOpacity } from "react-native";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
export function SignUp() {
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
          title="Cadastrar"
        />
        <TouchableOpacity>
          <Text>Voltar para o login</Text>
        </TouchableOpacity>
      </VStack>
    </View>
  )
}