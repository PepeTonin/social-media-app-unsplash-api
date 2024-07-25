import {createNativeStackNavigator} from "@react-navigation/native-stack";

import Home from "../screens/Home/Home";
import {Inbox} from "../screens/Inbox/Inbox";

export type RootStackParamList = {
  Home: undefined;
  Inbox: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function MainRoutes() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Inbox" component={Inbox} />
    </Stack.Navigator>
  );
}
