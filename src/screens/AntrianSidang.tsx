import { Box, Center, HStack, Text, VStack, ScrollView, Divider, View, Button } from "native-base";
import { ImageBackground, StatusBar } from "react-native";
import { FlatGrid } from "react-native-super-grid";
import { localDate } from "../utility/Dates";
import Helper from "../utility/Helper";

export default function AntrianSidang() {

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
                    <FlatGrid
                        data={[
                            {
                                "id": 14033,
                                "nomor_ruang": 3,
                                "nomor_antrian_id": 14191,
                                "created_at": "2023-03-28T13:57:28.000000Z",
                                "updated_at": "2023-03-28T13:57:28.000000Z",
                                "nomor_antrian_sidang": {
                                    "id": 14191,
                                    "nomor_urutan": 19,
                                    "status": 2,
                                    "nomor_ruang": 3,
                                    "nama_ruang": "Ruang sidang Syuraih",
                                    "nomor_perkara": "723\/Pdt.G\/2023\/PA.JU",
                                    "pihak_satu": "Ratwinto bin Yoto Suharjo",
                                    "pihak_dua": "Inah binti Oman",
                                    "tanggal_sidang": "2023-03-28",
                                    "jadwal_sidang_id": null,
                                    "priority": null,
                                    "created_at": "2023-03-28T10:34:16.000000Z",
                                    "updated_at": "2023-03-28T13:57:28.000000Z"
                                }
                            },
                            {
                                "id": 14034,
                                "nomor_ruang": 1,
                                "nomor_antrian_id": 14159,
                                "created_at": "2023-03-28T13:57:29.000000Z",
                                "updated_at": null,
                                "nomor_antrian_sidang": {
                                    "id": 14159,
                                    "nomor_urutan": 18,
                                    "status": 2,
                                    "nomor_ruang": 1,
                                    "nama_ruang": "Ruang sidang Umar Bin Khatab",
                                    "nomor_perkara": "711\/Pdt.G\/2023\/PA.JU",
                                    "pihak_satu": "Arianto bin Arbain",
                                    "pihak_dua": "Anjar Apriano bin Arbain",
                                    "tanggal_sidang": "2023-03-27",
                                    "jadwal_sidang_id": null,
                                    "priority": null,
                                    "created_at": "2023-03-27T13:30:30.000000Z",
                                    "updated_at": "2023-03-27T14:18:17.000000Z"
                                }
                            },
                            {
                                "id": 14032,
                                "nomor_ruang": 2,
                                "nomor_antrian_id": 14192,
                                "created_at": "2023-03-28T13:56:58.000000Z",
                                "updated_at": null,
                                "nomor_antrian_sidang": {
                                    "id": 14192,
                                    "nomor_urutan": 14,
                                    "status": 2,
                                    "nomor_ruang": 2,
                                    "nama_ruang": "Ruang sidang Abu Musa Al Asyari",
                                    "nomor_perkara": "329\/Pdt.G\/2023\/PA.JU",
                                    "pihak_satu": "Agus Suwendi bin M. Sidik",
                                    "pihak_dua": "Lela Komalasari binti Uca Duhrahman",
                                    "tanggal_sidang": "2023-03-28",
                                    "jadwal_sidang_id": null,
                                    "priority": null,
                                    "created_at": "2023-03-28T10:37:57.000000Z",
                                    "updated_at": "2023-03-28T11:14:46.000000Z"
                                }
                            }
                        ]}
                        maxItemsPerRow={1}
                        renderItem={
                            ({ item }) => (<Box bg={"white"} p="2" rounded="xl">
                                <VStack>

                                    <HStack justifyContent={"space-between"} alignItems={"center"}>
                                        <VStack>
                                            <Text>Ruang Sidang {Helper.RuangSidang(item.nomor_ruang)} ({item.nomor_ruang})</Text>
                                            <Text bold color={"amber.600"}>{item.nomor_antrian_sidang.nomor_perkara}</Text>
                                            <Button colorScheme={"amber"} maxW={70} p={1} _text={{ fontSize: 11 }}>Detail</Button>
                                        </VStack>
                                        <VStack p={0} alignItems={"center"}>
                                            <Text m={0} p={0} fontSize={40} bold color={"red.500"}>{item.nomor_antrian_sidang.nomor_urutan}</Text>
                                        </VStack>
                                    </HStack>
                                    <Text fontWeight={"light"}>(P) {item.nomor_antrian_sidang.pihak_satu}</Text>
                                    <Text fontWeight={"light"}>(T) {item.nomor_antrian_sidang.pihak_dua}</Text>
                                </VStack>
                            </Box>)
                        }
                        ListEmptyComponent={<Center><Text color={"white"}>Antrian Kosong</Text></Center>}
                    />
                </VStack>
            </ImageBackground>
        </>
    )
}