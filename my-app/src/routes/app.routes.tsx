import { StackNavigationProp, createStackNavigator } from "@react-navigation/stack";
import { Home } from "../screens/Home";

type AppRoutes = {
  home: undefined;
}

export type AppNavigateRoutesProps = StackNavigationProp<AppRoutes>;

const Stack = createStackNavigator<AppRoutes>();

export function AppRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false}}>
      <Stack.Screen name="home" component={Home} />
    </Stack.Navigator>
  )
}