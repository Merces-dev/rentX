import React, { useState } from "react";

import * as St from "./styles";
import { useNavigation, useRoute } from "@react-navigation/native";
import BackButton from "../../../components/BackButton";
import { Bullet } from "../../../components/Bullet";
import Button from "../../../components/Button";
import { Alert, Keyboard, KeyboardAvoidingView } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import InputPassword from "../../../components/InputPassword";
import { useTheme } from "styled-components";

interface Params {
  user: {
    name: string;
    email: string;
    driverLicense: string;
  };
}

export const SignUpSecondStep = () => {
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");

  const navigation = useNavigation();
  const route = useRoute();
  const theme = useTheme();

  const { user } = route.params as Params;

  function handleBack() {
    navigation.goBack();
  }
  function handleRegister() {
    if (!password || !passwordConfirm)
      return Alert.alert("Informe a senha e a confirmação da senha.");
    if (password != passwordConfirm)
      return Alert.alert("As senhas não conferem.");

    //Send to API
    navigation.navigate("Confirmation", {
      title: "Conta criada!",
      message: `Agora é só fazer login\ne aproveitar`,
      nextScreenRoute: "SignIn",
    });
  }
  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <St.Container>
          <St.Header>
            <BackButton onPress={handleBack} />
            <St.Steps>
              <Bullet active />
              <Bullet />
              <Bullet />
            </St.Steps>
          </St.Header>
          <St.Title>Crie sua{"\n"}conta</St.Title>
          <St.SubTitle>
            Faça seu cadastro de{"\n"}forma rápida e fácil
          </St.SubTitle>

          <St.Form>
            <St.FormTitle>2. Senha</St.FormTitle>
            <InputPassword
              iconName={"lock"}
              placeholder="Senha"
              value={password}
              onChangeText={setPassword}
            />
            <InputPassword
              iconName={"lock"}
              placeholder="Repetir Senha"
              value={passwordConfirm}
              onChangeText={setPasswordConfirm}
            />
          </St.Form>

          <Button
            title="Cadastrar"
            color={theme.colors.success}
            onPress={handleRegister}
          />
        </St.Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
