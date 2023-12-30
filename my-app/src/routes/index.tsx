import { NavigationContainer } from "@react-navigation/native";
import { AppRoutes } from "./app.routes";
import { useAuth } from "../hooks/useAuth";
import { Box } from "native-base";
import { AuthRoutes } from "./auth.routes";
import { Loading } from "../components/Loading";


export function Routes() {

  const { isLoadingUserStorageData, user } = useAuth();

  if(isLoadingUserStorageData) {
    return <Loading />
  }

  return (
    <Box flex={1} bg="emerald.900">
      <NavigationContainer>
        {user?.token ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </Box>
  )
}