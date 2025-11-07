import { Center, Text, Pressable, View, Box, VStack, HStack, ScrollView } from "native-base";
import * as React from "react";
import { FlatList, Image, ImageBackground, StatusBar } from "react-native";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { IMainStack } from "../interfaces/StackInterface";
import { NativeStackScreenProps } from "@react-navigation/native-stack";


export default function Beranda({ navigation }: NativeStackScreenProps<IMainStack, 'Home'>) {

	return (
		<>
			<StatusBar
				translucent
				backgroundColor="transparent"
				barStyle="light-content"
			/>
			<Box
				safeAreaTop
				backgroundColor="#694CBD"
			/>
			<ImageBackground source={require('../assets/images/backgrounds/bg_gradient_blue.png')} style={{ flex: 1 }} >
				<ScrollView>
					<VStack>

						<Center>
							<Text bold color={"#fff"}>Beranda</Text>
						</Center>
						<View style={{ margin: 10, borderRadius: 10, padding: 10, flexDirection: 'row' }}>
							<View style={{ flexDirection: 'column', width: 120, flex: 1 }}>
								<Text style={{ fontSize: 20, color: '#fff' }}>Smart Portal</Text>
								<Text color={"amber.400"} style={{ fontFamily: 'NexaHeavy', fontSize: 20 }}>Pengadilan Agama Jakarta Utara</Text>
							</View>
							<Image resizeMode="contain" style={{ height: 70, width: 150 }} source={require('../assets/images/cs_man.png')} />
						</View>
					</VStack>
					<KeyboardAwareScrollView
						contentContainerStyle={{
							flexGrow: 1,
						}}
						style={{ flex: 1 }}
					>
						<VStack
							flex="1"
							px="4"
							py="5"
							mx="2"
							maxHeight={600}
							_light={{ bg: "white" }}
							_dark={{ bg: "coolGray.800" }}
							space="3"
							justifyContent="space-between"
							borderTopRightRadius={{ base: "2xl", md: "xl" }}
							borderBottomRightRadius={{ base: "2xl", md: "xl" }}
							borderBottomLeftRadius={{ base: "2xl", md: "xl" }}
							borderTopLeftRadius={{ base: "2xl", md: "0" }}
						>
							<VStack
								mb="4"
								space="3"
								safeAreaBottom
								alignItems="center"
								justifyContent="center"
								mt={{ base: "auto", md: "8" }}
							>
								<FlatList
									style={{ maxHeight: 240 }}
									data={[
										require('../assets/images/banner/banner_1.jpg'),
										require('../assets/images/banner/banner_3.jpg'),
										require('../assets/images/banner/banner_5.jpg'),
										require('../assets/images/banner/banner_4.jpg'),
									]}
									horizontal
									renderItem={({ item }) => {
										return <View shadow={"9"}>
											<ImageBackground style={{ width: 345, height: 200 }} resizeMode={"stretch"} source={item} >
												<View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
													<MaterialIcon
														name="arrow-forward-ios"
														size={30}
														color={"#fff"}
													/>
												</View>
											</ImageBackground>
										</View>;
									}}
								/>
								<Text
									_light={{ color: "coolGray.800" }}
									_dark={{ color: "coolGray.400" }}
								>
									Selamat Datang
								</Text>
								<HStack space={9}>
									<VStack alignItems={"center"}>
										<Pressable onPress={() => navigation.push("Perkara")}>
											<Center h={50} w={50} p={0}>
												<Image source={require('../assets/icons/financial.png')} />
											</Center>
										</Pressable>
										<Text fontSize={12} color={"violet.500"}>Perkara</Text>
									</VStack>
									<VStack alignItems={"center"}>
										<Pressable onPress={() => navigation.push("JadwalSidang")}>
											<Center h={50} w={50} p={0}>
												<Image source={require('../assets/icons/event.png')} />
											</Center>
										</Pressable>
										<Text fontSize={12} color={"violet.500"}>Sidang</Text>
									</VStack>
									<VStack alignItems={"center"}>
										<Pressable onPress={() => navigation.push("Keuangan")}>
											<Center h={50} w={50} p={0}>
												<Image source={require('../assets/icons/company.png')} />
											</Center>
										</Pressable>
										<Text fontSize={12} color={"violet.500"}>Keungan</Text>
									</VStack>
									<VStack alignItems={"center"}>
										<Pressable onPress={() => navigation.push("AktaCerai")}>
											<Center h={50} w={50} p={0}>
												<Image source={require('../assets/icons/authorization.png')} />
											</Center>
										</Pressable>
										<Text fontSize={12} color={"violet.500"}>Produk</Text>
									</VStack>
								</HStack>
								<HStack space={9}>
									<VStack alignItems={"center"}>
										<Pressable onPress={() => navigation.push("Pendaftaran")}>
											<Center h={50} w={50} p={0}>
												<Image source={require('../assets/icons/require.png')} />
											</Center>
										</Pressable>
										<Text fontSize={12} color={"violet.500"}>Pendaftaran</Text>
									</VStack>
									<VStack alignItems={"center"}>
										<Pressable onPress={() => navigation.navigate("Saksi")}>
											<Center h={50} w={50} p={0}>
												<Image source={require('../assets/icons/project.png')} />
											</Center>
										</Pressable>
										<Text fontSize={12} color={"violet.500"}>Saksi</Text>
									</VStack>
									{/* <VStack alignItems={"center"}>
										<Pressable onPress={() => navigation.navigate("HitungBiaya")}>
											<Center h={50} w={50} p={0}>
												<Image source={require('../assets/icons/money.png')} />
											</Center>
										</Pressable>
										<Text fontSize={12} color={"violet.500"}>Biaya</Text>
									</VStack> */}
									{/* <VStack alignItems={"center"}>
										<Center h={50} w={50} p={0}>
											<Image source={require('../assets/icons/survey.png')} />
										</Center>
										<Text fontSize={12} color={"violet.500"}>Survey</Text>
									</VStack> */}
								</HStack>
							</VStack>
						</VStack>
					</KeyboardAwareScrollView>
				</ScrollView>
			</ImageBackground>

		</>
	);
}
