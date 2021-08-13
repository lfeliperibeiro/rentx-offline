import React, { useRef, useState } from "react";
import {
  Container,
  ImagesIndexes,
  ImageIndex,
  CarImageWrapper,
  CarImage,
} from "./styles";
import { FlatList, ViewToken } from "react-native";

interface Props {
  imageUrl: string[];
}

interface ChangeImageProps {
  viewableItems: ViewToken[];
  changed: ViewToken[];
}
export function ImageSlider({ imageUrl }: Props) {
  const [imageIndex, setImageIndex] = useState(0);
  const indexChanged = useRef((info: ChangeImageProps) => {
    const index = info.viewableItems[0].index;
    setImageIndex(index);
  });
  return (
    <Container>
      <ImagesIndexes>
        {imageUrl.map((_, index) => (
          <ImageIndex active={index === imageIndex} key={String(index)} />
        ))}
      </ImagesIndexes>
      <FlatList
        data={imageUrl}
        keyExtractor={(key) => key}
        renderItem={({ item }) => (
          <CarImageWrapper>
            <CarImage source={{ uri: item }} resizeMode={"contain"} />
          </CarImageWrapper>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={indexChanged.current}
      />
    </Container>
  );
}
