import React from "react";
import { Container, IconContainer, InputText } from "./styles";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "styled-components";
import { TextInputProps } from "react-native";

interface Props extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>["name"];
}

export function Input({ iconName, ...rest }: Props) {
  const theme = useTheme();
  return (
    <Container>
      <IconContainer>
        <Feather name={iconName} size={24} color={theme.colors.text_details} />
      </IconContainer>
      <InputText {...rest} />
    </Container>
  );
}