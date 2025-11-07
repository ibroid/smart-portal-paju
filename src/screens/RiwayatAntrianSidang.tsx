import { Text, StatusBar, Box, FlatList } from "native-base";
import * as React from "react";
import { ImageBackground } from "react-native";

export default function RiwayatAntrianSidang({ route }: any) {


  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <ImageBackground
        source={require('../assets/images/backgrounds/bg_gradient_blue.png')}
        style={{ flex: 1, marginHorizontal: "auto" }}
      >
        <Box safeArea marginTop={20}>
          <FlatList
            data={[]}
            renderItem={({ item }) => {
              return <Text>Ok</Text>
            }}
            ListEmptyComponent={<Text textAlign={"center"} bold color="white">Antrian Kosong {route.params?.nomor_ruang}</Text>}
          />
        </Box>
      </ImageBackground>
    </>
  );
}

