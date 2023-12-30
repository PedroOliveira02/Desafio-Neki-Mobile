import { StackNavigationProp, createStackNavigator } from "@react-navigation/stack"
import { SignIn } from "../screens/SignIn";
import { SignUp } from "../screens/SignUp";

type AuthRoutes = {
  signIn: undefined;
  signUp: undefined;
}

export type AuthNavigateRoutesProps = StackNavigationProp<AuthRoutes>;

const Stack = createStackNavigator<AuthRoutes>();

export function AuthRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false}}>
      <Stack.Screen name="signIn" component={SignIn} />
      <Stack.Screen name="signUp" component={SignUp} />
    </Stack.Navigator>
  )
}