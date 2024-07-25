import {NavigationContainer} from "@react-navigation/native";

import {MainRoutes} from "./routes/MainRoutes";
import { StatusBar } from "react-native";

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle={"dark-content"} />
      <MainRoutes />
    </NavigationContainer>
  );
}
