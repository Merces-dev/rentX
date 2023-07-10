import React from "react";
import * as St from "./styles";
import { useTheme } from "styled-components/native";
import { FlatList, ViewToken } from "react-native";

interface SliderProps {
  imagesUrl: string[];
}
interface ChangeImageProps {
  viewableItems: ViewToken[];
  changed: ViewToken[];
}
export default function ImageSlider({ imagesUrl }: SliderProps) {
  const theme = useTheme();
  function indexChanged(info: ChangeImageProps) {
    console.log(info);
  }
  return (
    <St.Container>
      <St.ImageIndexes>
        {imagesUrl.map((_, index) => (
          <St.ImageIndex key={String(index)} active={true} />
        ))}
      </St.ImageIndexes>
      <FlatList
        data={imagesUrl}
        keyExtractor={(key) => key}
        renderItem={({ item }) => (
          <St.CarImageWrapper>
            <St.CarImage source={{ uri: item }} resizeMode="contain" />
          </St.CarImageWrapper>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={indexChanged}
      />
    </St.Container>
  );
}
