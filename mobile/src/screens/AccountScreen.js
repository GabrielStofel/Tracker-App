import React, { useContext } from "react";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-navigation";
import { Button } from "react-native-elements";
import Spacer from "../components/Spacer";
import { Context as AuthContext } from "../context/AuthContext";
import { FontAwesome } from "@expo/vector-icons";

const AccountScreen = () => {
  const { signout } = useContext(AuthContext);

  return (
    <SafeAreaView style={styles.container} forceInset={{ top: "always" }}>
      <Text style={styles.title}>Account Settings</Text>
      <Spacer>
        <Button title="Sign out" onPress={signout} />
      </Spacer>
    </SafeAreaView>
  );
};

AccountScreen.navigationOptions = {
  title: "Account",
  tabBarIcon: <FontAwesome name="gear" size={20} />,
};

const styles = StyleSheet.create({
  title: {
    fontSize: 34,
    textAlign: "center",
    marginTop: 40,
    marginVertical: 20,
  },

  container: {
    flex: 1,
  },
});

export default AccountScreen;
