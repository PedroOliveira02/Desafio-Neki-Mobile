import { StackNavigationProp, createStackNavigator } from "@react-navigation/stack"
import { SignIn } from "../screens/SignIn";
import { SignUp } from "../screens/SignUp";
import { Home } from "../screens/Home";

type AppRoutes = {
  home: undefined;
  signIn: undefined;
  signUp: undefined;
}

export type AppNavigateRoutesProps = StackNavigationProp<AppRoutes>;

const Stack = createStackNavigator<AppRoutes>();

export function AppRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false}}>
      <Stack.Screen name="signIn" component={SignIn} />
      <Stack.Screen name="signUp" component={SignUp} />
      <Stack.Screen name="home" component={Home} />
    </Stack.Navigator>
  )
}