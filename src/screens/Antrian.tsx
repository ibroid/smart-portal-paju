import { Box, Center, HStack, Text, VStack, ScrollView, Divider, View, FlatList } from "native-base";
import { ImageBackground, StatusBar } from "react-native";
import { FlatGrid } from "react-native-super-grid";
import { localDate } from "../utility/Dates";
import useAntrianPelayanan from "../hooks/useCurrentAntrianPelayanan";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import React from "react";
import ScreenLoading from "../components/ScreenLoading";
import useLoketPelayanan from "../hooks/useLoketPelayanan";

export default function Antrian() {

	const { startFetch, cancelFetch, error, errorMessage, loading, data } = useAntrianPelayanan()

	const {
		startFetch: startFetchLoket,
		cancelFetch: cancelFetchLoket,
		data: dataLoket,
		error: errorLoket,
		errorMessage: errorMessageLoket,
		loading: loadingLoket
	} = useLoketPelayanan()

	useFocusEffect(
		useCallback(() => {
			startFetch()
			startFetchLoket()

			return () => { cancelFetch(); cancelFetchLoket() }
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
						<Text bold color={"#fff"}>Antrian Pelayanan (PTSP)</Text>
					</Center>
					{errorLoket && <Text>Terjadi kesalahan saat meminta data loket pelayanan. Catatan : {errorMessageLoket}</Text>}
					{loadingLoket && <ScreenLoading />}

					<FlatGrid
						style={{ height: 100 }}
						horizontal
						data={dataLoket ?? []}
						renderItem={
							({ item }) => (<Box bg={"white"} p="3" rounded="xl">
								<Center>
									<Text color={"#694CBD"}>{item.nama_loket}</Text>
									<Text fontSize={"xl"} bold color={"amber.600"}>{item.kode_loket}-{item.urutan}</Text>
								</Center>
							</Box>)
						}
						ListEmptyComponent={<Center><Text color={"white"}>Antrian Kosong</Text></Center>}
					/>

					{error && <Text>Terjadi kesalahan saat meminta data daftar antrian pelayanan (PTSP). Catatan : {errorMessage}</Text>}
					{loading && <ScreenLoading />}
					<FlatList
						padding={2}
						data={data ?? []}
						renderItem={({ item, index }) => {
							return <VStack key={item.id} p={1} >
								<HStack justifyContent={"space-between"} >
									<Text bold fontSize={20} color={"red.400"}>{item.kode}-{item.nomor_urutan}</Text>
									<Text color={"#fff"} >{localDate(item.created_at)}</Text>
								</HStack>
								<HStack justifyContent={"space-between"}>
									<Text color={"amber.400"}>{item.tujuan}</Text>
									<Text color={"#fff"}>{item.status == 1 ? "Sudah dipanggil" : "Belum dipanggil"}</Text>
								</HStack>
								<Divider />
							</VStack>
						}}
					/>
				</VStack>

			</ImageBackground>
		</>
	)
}