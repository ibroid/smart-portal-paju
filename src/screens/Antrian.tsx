import { Box, Center, HStack, Text, VStack, ScrollView, Divider, View } from "native-base";
import { ImageBackground, StatusBar } from "react-native";
import { FlatGrid } from "react-native-super-grid";
import { localDate } from "../utility/Dates";

export default function Antrian() {

	const data = [
		{
			"id": 44488,
			"perkara_id": null,
			"petugas_id": 1,
			"urutan": 1,
			"tujuan": "INFORMASI",
			"kode": "A",
			"status": 1,
			"umur": null,
			"nama_pengambil": null,
			"jenis_kelamin": null,
			"created_at": "2023-03-28T08:03:36.000000Z",
			"updated_at": "2023-03-28T08:03:36.000000Z"
		},
		{
			"id": 44489,
			"perkara_id": null,
			"petugas_id": 2,
			"urutan": 2,
			"tujuan": "PENDAFTARAN",
			"kode": "A",
			"status": 1,
			"umur": null,
			"nama_pengambil": null,
			"jenis_kelamin": null,
			"created_at": "2023-03-28T08:03:45.000000Z",
			"updated_at": "2023-03-28T08:03:45.000000Z"
		},
		{
			"id": 44490,
			"perkara_id": null,
			"petugas_id": 1,
			"urutan": 3,
			"tujuan": "INFORMASI",
			"kode": "A",
			"status": 1,
			"umur": null,
			"nama_pengambil": null,
			"jenis_kelamin": null,
			"created_at": "2023-03-28T08:07:31.000000Z",
			"updated_at": "2023-03-28T08:07:31.000000Z"
		},
		{
			"id": 44491,
			"perkara_id": 24015,
			"petugas_id": 2,
			"urutan": 4,
			"tujuan": "AKTA CERAI",
			"kode": "A",
			"status": 1,
			"umur": null,
			"nama_pengambil": "Suharjo bin Warjan",
			"jenis_kelamin": null,
			"created_at": "2023-03-28T08:20:24.000000Z",
			"updated_at": "2023-03-28T08:20:24.000000Z"
		},
		{
			"id": 44492,
			"perkara_id": null,
			"petugas_id": 3,
			"urutan": 5,
			"tujuan": "E-COURT",
			"kode": "A",
			"status": 1,
			"umur": null,
			"nama_pengambil": null,
			"jenis_kelamin": null,
			"created_at": "2023-03-28T08:22:29.000000Z",
			"updated_at": "2023-03-28T08:22:29.000000Z"
		},
		{
			"id": 44493,
			"perkara_id": null,
			"petugas_id": 1,
			"urutan": 6,
			"tujuan": "INFORMASI",
			"kode": "A",
			"status": 1,
			"umur": null,
			"nama_pengambil": null,
			"jenis_kelamin": null,
			"created_at": "2023-03-28T08:35:05.000000Z",
			"updated_at": "2023-03-28T08:35:05.000000Z"
		},
		{
			"id": 44494,
			"perkara_id": null,
			"petugas_id": 2,
			"urutan": 7,
			"tujuan": "INFORMASI",
			"kode": "A",
			"status": 1,
			"umur": null,
			"nama_pengambil": null,
			"jenis_kelamin": null,
			"created_at": "2023-03-28T08:40:45.000000Z",
			"updated_at": "2023-03-28T08:40:45.000000Z"
		},
		{
			"id": 44495,
			"perkara_id": null,
			"petugas_id": 2,
			"urutan": 8,
			"tujuan": "INFORMASI",
			"kode": "A",
			"status": 1,
			"umur": null,
			"nama_pengambil": null,
			"jenis_kelamin": null,
			"created_at": "2023-03-28T08:47:37.000000Z",
			"updated_at": "2023-03-28T08:47:37.000000Z"
		},
		{
			"id": 44496,
			"perkara_id": null,
			"petugas_id": 6,
			"urutan": 1,
			"tujuan": "POSBAKUM",
			"kode": "C",
			"status": 1,
			"umur": null,
			"nama_pengambil": null,
			"jenis_kelamin": null,
			"created_at": "2023-03-28T08:45:23.000000Z",
			"updated_at": "2023-03-28T08:45:23.000000Z"
		},
		{
			"id": 44497,
			"perkara_id": null,
			"petugas_id": 2,
			"urutan": 9,
			"tujuan": "INFORMASI",
			"kode": "A",
			"status": 1,
			"umur": null,
			"nama_pengambil": null,
			"jenis_kelamin": null,
			"created_at": "2023-03-28T08:51:52.000000Z",
			"updated_at": "2023-03-28T08:51:52.000000Z"
		},
		{
			"id": 44498,
			"perkara_id": null,
			"petugas_id": 6,
			"urutan": 2,
			"tujuan": "POSBAKUM",
			"kode": "C",
			"status": 1,
			"umur": null,
			"nama_pengambil": null,
			"jenis_kelamin": null,
			"created_at": "2023-03-28T08:54:49.000000Z",
			"updated_at": "2023-03-28T08:54:49.000000Z"
		},
		{
			"id": 44499,
			"perkara_id": 23553,
			"petugas_id": 2,
			"urutan": 10,
			"tujuan": "AKTA CERAI",
			"kode": "A",
			"status": 1,
			"umur": null,
			"nama_pengambil": "Titin Suprihatin binti Chotib",
			"jenis_kelamin": null,
			"created_at": "2023-03-28T09:02:41.000000Z",
			"updated_at": "2023-03-28T09:02:41.000000Z"
		},
		{
			"id": 44500,
			"perkara_id": 23902,
			"petugas_id": 3,
			"urutan": 11,
			"tujuan": "AKTA CERAI",
			"kode": "A",
			"status": 1,
			"umur": null,
			"nama_pengambil": "Widia binti Sariba",
			"jenis_kelamin": null,
			"created_at": "2023-03-28T09:05:18.000000Z",
			"updated_at": "2023-03-28T09:05:18.000000Z"
		},
		{
			"id": 44501,
			"perkara_id": null,
			"petugas_id": 1,
			"urutan": 12,
			"tujuan": "INFORMASI",
			"kode": "A",
			"status": 1,
			"umur": null,
			"nama_pengambil": null,
			"jenis_kelamin": null,
			"created_at": "2023-03-28T09:08:42.000000Z",
			"updated_at": "2023-03-28T09:08:42.000000Z"
		},
		{
			"id": 44502,
			"perkara_id": null,
			"petugas_id": 3,
			"urutan": 13,
			"tujuan": "INFORMASI",
			"kode": "A",
			"status": 1,
			"umur": null,
			"nama_pengambil": null,
			"jenis_kelamin": null,
			"created_at": "2023-03-28T09:11:49.000000Z",
			"updated_at": "2023-03-28T09:11:49.000000Z"
		},
		{
			"id": 44503,
			"perkara_id": null,
			"petugas_id": 6,
			"urutan": 3,
			"tujuan": "POSBAKUM",
			"kode": "C",
			"status": 1,
			"umur": null,
			"nama_pengambil": null,
			"jenis_kelamin": null,
			"created_at": "2023-03-28T09:11:49.000000Z",
			"updated_at": "2023-03-28T09:11:49.000000Z"
		},
		{
			"id": 44504,
			"perkara_id": null,
			"petugas_id": 2,
			"urutan": 14,
			"tujuan": "INFORMASI",
			"kode": "A",
			"status": 1,
			"umur": null,
			"nama_pengambil": null,
			"jenis_kelamin": null,
			"created_at": "2023-03-28T09:12:12.000000Z",
			"updated_at": "2023-03-28T09:12:12.000000Z"
		},
		{
			"id": 44505,
			"perkara_id": null,
			"petugas_id": 2,
			"urutan": 15,
			"tujuan": "PENDAFTARAN",
			"kode": "A",
			"status": 1,
			"umur": null,
			"nama_pengambil": null,
			"jenis_kelamin": null,
			"created_at": "2023-03-28T09:12:46.000000Z",
			"updated_at": "2023-03-28T09:12:46.000000Z"
		},
		{
			"id": 44506,
			"perkara_id": 22609,
			"petugas_id": 1,
			"urutan": 16,
			"tujuan": "AKTA CERAI",
			"kode": "A",
			"status": 1,
			"umur": null,
			"nama_pengambil": "Hanifa Alviani Putri Binti Matani",
			"jenis_kelamin": null,
			"created_at": "2023-03-28T09:21:40.000000Z",
			"updated_at": "2023-03-28T09:21:40.000000Z"
		},
		{
			"id": 44507,
			"perkara_id": null,
			"petugas_id": 6,
			"urutan": 4,
			"tujuan": "POSBAKUM",
			"kode": "C",
			"status": 1,
			"umur": null,
			"nama_pengambil": null,
			"jenis_kelamin": null,
			"created_at": "2023-03-28T09:19:30.000000Z",
			"updated_at": "2023-03-28T09:19:30.000000Z"
		},
		{
			"id": 44508,
			"perkara_id": null,
			"petugas_id": 3,
			"urutan": 17,
			"tujuan": "PENDAFTARAN",
			"kode": "A",
			"status": 1,
			"umur": null,
			"nama_pengambil": null,
			"jenis_kelamin": null,
			"created_at": "2023-03-28T09:25:58.000000Z",
			"updated_at": "2023-03-28T09:25:58.000000Z"
		},
		{
			"id": 44509,
			"perkara_id": null,
			"petugas_id": 5,
			"urutan": 18,
			"tujuan": "INFORMASI",
			"kode": "A",
			"status": 1,
			"umur": null,
			"nama_pengambil": null,
			"jenis_kelamin": null,
			"created_at": "2023-03-28T09:28:23.000000Z",
			"updated_at": "2023-03-28T09:28:23.000000Z"
		},
		{
			"id": 44510,
			"perkara_id": null,
			"petugas_id": 1,
			"urutan": 19,
			"tujuan": "INFORMASI",
			"kode": "A",
			"status": 1,
			"umur": null,
			"nama_pengambil": null,
			"jenis_kelamin": null,
			"created_at": "2023-03-28T09:36:38.000000Z",
			"updated_at": "2023-03-28T09:36:38.000000Z"
		},
		{
			"id": 44511,
			"perkara_id": null,
			"petugas_id": 1,
			"urutan": 20,
			"tujuan": "PENDAFTARAN",
			"kode": "A",
			"status": 1,
			"umur": null,
			"nama_pengambil": null,
			"jenis_kelamin": null,
			"created_at": "2023-03-28T09:40:15.000000Z",
			"updated_at": "2023-03-28T09:40:15.000000Z"
		},
		{
			"id": 44512,
			"perkara_id": null,
			"petugas_id": 5,
			"urutan": 21,
			"tujuan": "INFORMASI",
			"kode": "A",
			"status": 1,
			"umur": null,
			"nama_pengambil": null,
			"jenis_kelamin": null,
			"created_at": "2023-03-28T09:43:57.000000Z",
			"updated_at": "2023-03-28T09:43:57.000000Z"
		},
		{
			"id": 44513,
			"perkara_id": null,
			"petugas_id": 1,
			"urutan": 22,
			"tujuan": "PENDAFTARAN",
			"kode": "A",
			"status": 1,
			"umur": null,
			"nama_pengambil": null,
			"jenis_kelamin": null,
			"created_at": "2023-03-28T09:48:46.000000Z",
			"updated_at": "2023-03-28T09:48:46.000000Z"
		},
		{
			"id": 44514,
			"perkara_id": null,
			"petugas_id": null,
			"urutan": 23,
			"tujuan": "INFORMASI",
			"kode": "A",
			"status": 0,
			"umur": null,
			"nama_pengambil": null,
			"jenis_kelamin": null,
			"created_at": "2023-03-28T09:43:43.000000Z",
			"updated_at": "-000001-11-30T00:00:00.000000Z"
		},
		{
			"id": 44515,
			"perkara_id": null,
			"petugas_id": 6,
			"urutan": 5,
			"tujuan": "POSBAKUM",
			"kode": "C",
			"status": 1,
			"umur": null,
			"nama_pengambil": null,
			"jenis_kelamin": null,
			"created_at": "2023-03-28T09:50:52.000000Z",
			"updated_at": "2023-03-28T09:50:52.000000Z"
		},
		{
			"id": 44516,
			"perkara_id": null,
			"petugas_id": null,
			"urutan": 24,
			"tujuan": "INFORMASI",
			"kode": "A",
			"status": 0,
			"umur": null,
			"nama_pengambil": null,
			"jenis_kelamin": null,
			"created_at": "2023-03-28T09:46:16.000000Z",
			"updated_at": "-000001-11-30T00:00:00.000000Z"
		}
	];

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
						<Text bold color={"#fff"}>Antrian</Text>
					</Center>
					<FlatGrid
						data={[
							{
								"id": 878,
								"nama_ruang": "CUSTOMER 1",
								"no_antrian": "A-22",
								"created_at": "2023-03-28T09:48:46.000000Z",
								"updated_at": "-000001-11-30T00:00:00.000000Z",
								"cs_id": "1"
							},
							{
								"id": 881,
								"nama_ruang": "CUSTOMER 1",
								"no_antrian": "A-15",
								"created_at": "2023-03-28T09:12:46.000000Z",
								"updated_at": "-000001-11-30T00:00:00.000000Z",
								"cs_id": "3"
							},
							{
								"id": 882,
								"nama_ruang": "CUSTOMER 1",
								"no_antrian": "A-17",
								"created_at": "2023-03-28T09:25:58.000000Z",
								"updated_at": "-000001-11-30T00:00:00.000000Z",
								"cs_id": "2"
							},
							{
								"id": 883,
								"nama_ruang": "CUSTOMER 1",
								"no_antrian": "A-21",
								"created_at": "2023-03-28T09:43:57.000000Z",
								"updated_at": "-000001-11-30T00:00:00.000000Z",
								"cs_id": "4"
							},
							{
								"id": 884,
								"nama_ruang": "CUSTOMER 1",
								"no_antrian": "B-1",
								"created_at": "2022-11-25T15:21:07.000000Z",
								"updated_at": "-000001-11-30T00:00:00.000000Z",
								"cs_id": "KASIR"
							},
							{
								"id": 885,
								"nama_ruang": "CUSTOMER 1",
								"no_antrian": "C-5",
								"created_at": "2023-03-28T09:50:52.000000Z",
								"updated_at": "-000001-11-30T00:00:00.000000Z",
								"cs_id": "POSBAKUM"
							}
						]}
						renderItem={
							({ item }) => (<Box bg={"white"} p="3" rounded="xl">
								<Center>
									<Text color={"#694CBD"}>CS {item.cs_id}</Text>
									<Text fontSize={"xl"} bold color={"amber.600"}>{item.no_antrian}</Text>
								</Center>
							</Box>)
						}
						ListEmptyComponent={<Center><Text color={"white"}>Antrian Kosong</Text></Center>}
					/>
					<View paddingX={3} h={"sm"}>
						<ScrollView>
							{data.map((row) => (
								<VStack key={row.id} p={1} >
									<HStack justifyContent={"space-between"} >
										<Text bold fontSize={20} color={"red.400"}>{row.kode}-{row.urutan}</Text>
										<Text color={"#fff"} >{localDate(row.created_at)}</Text>
									</HStack>
									<HStack justifyContent={"space-between"}>
										<Text color={"amber.400"}>{row.tujuan}</Text>
										<Text color={"#fff"}>{row.status == 1 ? "Sudah dipanggil" : "Belum dipanggil"}</Text>
									</HStack>
									<Divider />
								</VStack>
							))}

						</ScrollView>
					</View>
				</VStack>

			</ImageBackground>
		</>
	)
}