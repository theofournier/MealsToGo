import React from "react";
import { ActivityIndicator } from "react-native-paper";
import { FlatList, TouchableOpacity } from "react-native";
import { RestaurantInfoCard } from "../components/restaurant-info-card.component";
import styled from "styled-components";
import { Spacer } from "../../../components/spacer/spacer.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { useContext } from "react";
import { RestaurantsContext } from "../../../services/restaurants/restaurants.context";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { Search } from "../components/search.component";
import { useState } from "react";
import { FavoritesBar } from "../../../components/favorites/favorites-bar.component";
import { FavoritesContext } from "../../../services/favorites/favorites.context";
import { RestaurantList } from "../components/restaurant-list.styles";
import { FadeInView } from "../../../components/animations/fade.animation";

const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`;

const LoadingContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
`;

export const RestaurantsScreen = ({ navigation }) => {
  const { restaurants, isLoading, error } = useContext(RestaurantsContext);
  const { favorites } = useContext(FavoritesContext);
  const [isToggled, setIsToggled] = useState(false);
  return (
    <SafeArea>
      {isLoading && (
        <LoadingContainer>
          <Loading size={50} animating={true} color={Colors.blue300} />
        </LoadingContainer>
      )}
      <Search
        isFavoriteToggled={isToggled}
        onFavoriteToggle={() => setIsToggled(!isToggled)}
      />
      {isToggled ? (
        <FavoritesBar favorites={favorites} onNavigate={navigation.navigate} />
      ) : null}
      <RestaurantList
        data={restaurants}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("RestaurantDetail", { restaurant: item })
              }
            >
              <Spacer position="bottom" size="large">
                <FadeInView>
                  <RestaurantInfoCard restaurant={item} />
                </FadeInView>
              </Spacer>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.name}
      />
    </SafeArea>
  );
};
