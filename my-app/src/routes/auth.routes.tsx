import { StackNavigationProp, createStackNavigator } from "@react-navigation/stack"
import { SignIn } from "../screens/SignIn";

type AuthRoutes = {
  signIn: undefined;
}

export type AuthNavigateRoutesProps = StackNavigationProp<AuthRoutes>;

const Stack = createStackNavigator<AuthRoutes>();

export function AuthRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false}}>
      <Stack.Screen name="signIn" component={SignIn} />
    </Stack.Navigator>
  )
}