import React, { useState } from "react";
import { Alert } from "react-native";

import * as St from "./styles";
import { useNavigation } from "@react-navigation/native";
import BackButton from "../../../components/BackButton";
import { Bullet } from "../../../components/Bullet";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { Keyboard, KeyboardAvoidingView } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import * as Yup from "yup";
export const SignUpFirstStep = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [driverLicense, setDriverLicense] = useState<string>("");
  const navigation = useNavigation();
  function handleBack() {
    navigation.goBack();
  }
  async function handleSecondStep() {
    try {
      const schema = Yup.object().shape({
        driverLicense: Yup.string().required("Nome é obrigatório."),
        email: Yup.string()
          .email("E-mail inválido")
          .required("E-mail é obrigatório."),
        name: Yup.string().required("Nome é obrigatório."),
      });
      const data = { name, email, driverLicense };
      await schema.validate(data);
      navigation.navigate("SignUpSecondStep", { user: data });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        return Alert.alert("Opa", error.message);
      }
    }
  }
  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <St.Container>
          <St.Header>
            <BackButton onPress={handleBack} />
            <St.Steps>
              <Bullet />
              <Bullet active />
              <Bullet />
            </St.Steps>
          </St.Header>
          <St.Title>Crie sua{"\n"}conta</St.Title>
          <St.SubTitle>
            Faça seu cadastro de{"\n"}forma rápida e fácil
          </St.SubTitle>

          <St.Form>
            <St.FormTitle>1. Dados</St.FormTitle>
            <Input
              iconName="user"
              placeholder="Nome"
              value={name}
              onChangeText={setName}
            />
            <Input
              iconName="mail"
              placeholder="E-mail"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
            <Input
              iconName="credit-card"
              placeholder="CNH"
              keyboardType="numeric"
              value={driverLicense}
              onChangeText={setDriverLicense}
            />
          </St.Form>

          <Button title="Próximo" onPress={handleSecondStep} />
        </St.Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
