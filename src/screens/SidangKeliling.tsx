import * as React from "react";
import { View, Text, Box, Center, StatusBar, Hidden, HStack, Image, Stack, VStack, Badge, Flex, Pressable, Spacer } from "native-base";
import { useFocusEffect } from "@react-navigation/native";
import useHttp from "../hooks/useHttp";
import { IAktaCeraiResponse } from "../interfaces/ResponseInterface";
import { Alert, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function SidangKeliling({ props }: any) {


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
                <Stack
                    flexDirection={{ base: "column", md: "row" }}
                    w="100%"
                    maxW={{ md: "1016px" }}
                    flex={{ base: "1", md: "none" }}
                >
                    <Hidden from="md">
                        <VStack px="4" mt="4" mb="5" space="9">
                            <VStack space="2">
                                <Text
                                    fontSize="md"
                                    fontWeight="normal"
                                    _dark={{
                                        color: "coolGray.400",
                                    }}
                                    _light={{
                                        color: "primary.300",
                                    }}
                                >
                                    Berikut Adalah Jadwal Sidang Keliling
                                </Text>
                            </VStack>
                        </VStack>
                    </Hidden>
                    <Box alignItems="center">
                        <Pressable onPress={() => console.log("I'm Pressed")} rounded="8" overflow="hidden" borderWidth="1" borderColor="coolGray.300" maxW="96" shadow="3" bg="#fff" p="5">
                            <Box>
                                <Image height={300} resizeMode={'cover'} alt={'Ilustrasi Akta Cerai'} source={require('../assets/images/undraw_Best_place_re_lne9.png')}></Image>
                                <Text color="coolGray.800" mt="3" fontWeight="medium" fontSize="xl">
                                    Sidang Keliling Bulan Ini
                                </Text>
                                <Text fontSize="sm" color="coolGray.700">
                                    1. Kamis 02 Maret - Jumat 03 Maret 2023
                                </Text>
                                <Text fontSize="sm" color="coolGray.700">
                                    Agenda : Penyerahan Produk, Menerima Pendaftaran dan Kegiatan Sidang
                                </Text>
                            </Box>
                        </Pressable>
                    </Box>

                </Stack>
            </ImageBackground>
        </>
    )
}