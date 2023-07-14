import React from "react";

import * as St from "./styles";
import { useNavigation } from "@react-navigation/native";
import BackButton from "../../../components/BackButton";
import { Bullet } from "../../../components/Bullet";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { Keyboard, KeyboardAvoidingView } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

export const SignUpFirstStep = () => {
  const navigation = useNavigation();
  function handleBack() {
    navigation.goBack();
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
            <St.FormTitle>1. Dados</St.FormTitle>
            <Input iconName="user" placeholder="Nome" />
            <Input iconName="mail" placeholder="E-mail" />
            <Input iconName="credit-card" placeholder="CNH" />
          </St.Form>

          <Button title="Próximo" />
        </St.Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
