import { Box, Center, HStack, Text, VStack, Button, FlatList } from "native-base";
import { ImageBackground, StatusBar } from "react-native";
import { FlatGrid } from "react-native-super-grid";
import React from "react";
import useCurrentAntrianSidang from "../hooks/useCurrentAntrianSidang";
import { useFocusEffect } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import ScreenLoading from "../components/ScreenLoading";
import useRiwayatAntrianSidang from "../hooks/useRiwayatAntrianSidang";

export default function AntrianSidang(
	{ route, navigation }: NativeStackScreenProps<any, "AntrianSidang">
) {

	const { cancelFetch, startFetch, loading, data, error, errorMessage } = useCurrentAntrianSidang()

	const { cancelFetch: cancelFetchRiwayat, startFetch: startFetchRiwayat, loading: loadingRiwayat, data: dataRiwayat, error: errorRiwayat, errorMessage: errorMessageRiwayat } = useRiwayatAntrianSidang()

	useFocusEffect(
		React.useCallback(() => {
			startFetch();
			startFetchRiwayat();

			return () => { cancelFetch(); cancelFetchRiwayat(); }
		}, [])
	);

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
				<VStack space={3}>
					<Center>
						<Text bold color={"#fff"}>Antrian Sidang</Text>
					</Center>
					{error && <Text bold color={"#fff"}>Terjadi Kesalahan : {errorMessage}</Text>}
					{loading && <ScreenLoading />}
					{data && <FlatGrid
						data={data ?? []}
						maxItemsPerRow={1}
						renderItem={
							({ item }) => (
								<Box bg={"white"} p="2" rounded="xl">
									<VStack>

										<HStack justifyContent={"space-between"} alignItems={"center"}>
											<VStack>
												<Text>Ruang Sidang {item.antrian_persidangan?.nama_ruang} ({item.nomor_ruang})</Text>
												<Text bold color={"amber.600"}>{item.antrian_persidangan?.nomor_perkara}</Text>
											</VStack>
											<VStack p={0} alignItems={"center"}>
												<Text m={0} p={0} fontSize={40} bold color={"red.500"}>{item.antrian_persidangan?.nomor_urutan}</Text>
											</VStack>
										</HStack>
										{
											item.kehadiran_pihak?.map((p) => {
												return <Text key={p.id} fontWeight={"light"}>{p?.pihak}</Text>
											})
										}
										{/* <Button
										onPress={() => navigation.push("RiwayatAntrianSidang", {
											nomor_ruang: item.nomor_ruang
										})}
										marginTop={6}
										padding={2}
										colorScheme={"amber"}
										p={1}
										_text={{ fontSize: 11 }}>Riwayat Antrian</Button> */}
									</VStack>
								</Box>)
						}
						ListEmptyComponent={<Center><Text color={"white"}>Ruang Sidang Kosong</Text></Center>}
					/>}

					{errorRiwayat && <Text bold color={"#fff"}>Terjadi Kesalahan : {errorMessageRiwayat}</Text>}
					{loadingRiwayat && <ScreenLoading />}
					{dataRiwayat && <FlatList
						data={dataRiwayat}
						ListHeaderComponent={
							<Text textAlign={"center"} marginX={2} bold color="white">Daftar Antrian Persidangan</Text>
						}
						renderItem={({ item }: any) => {
							return <Box bg={"white"} p="1" margin={2}>
								<VStack>
									<HStack justifyContent={"space-between"} alignItems={"center"}>
										<VStack>
											<Text>{item?.nomor_perkara} </Text>
											<Text bold color={"amber.600"}>{item.nama_ruang}</Text>
										</VStack>
										<HStack p={0} alignItems={"center"}>
											<VStack marginX={2}>
												<Text m={0} p={0} fontSize={12} bold color={"red.500"}>Status : </Text>
												<Text m={0} p={0} fontSize={12} bold color={"red.500"}>{item.status > 3 ? "Sudah Dipanggil" : "Belum dipanggil"}</Text>
											</VStack>
											<Text marginX={3} p={0} fontSize={24} bold color={"red.500"}>{item.nomor_urutan}</Text>
										</HStack>
									</HStack>
								</VStack>
							</Box>
						}}
						ListEmptyComponent={<Text textAlign={"center"} bold color="white">Antrian Sidang Kosong {route.params?.nomor_ruang}</Text>}
					/>}
				</VStack>
			</ImageBackground>
		</>
	)
}

