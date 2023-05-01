import { View, Text, Box, HStack, Stack, VStack, Actionsheet, useDisclose, ScrollView, StatusBar, Divider } from "native-base";
import * as React from "react";
import { ImageBackground, TouchableOpacity } from "react-native";
import FaIcon from "react-native-vector-icons/FontAwesome5";
import Timeline from "react-native-timeline-flatlist";
import { namaSatker } from "../backend.json";

export default function Pendaftaran() {
	const {
		isOpen,
		onOpen,
		onClose
	} = useDisclose();

	const [timelineData, setTImelineData] = React.useState([
		{
			time: <FaIcon name="file-alt" color={'#FFBF11'} size={15} />,
			title: 'Memenuhi Persyaratan',
			description: <View style={{ marginEnd: 20 }}><Text style={{ textAlign: 'justify' }}>Sebelum memulai pendaftaran perkara, Pihak Wajib memenuhi semua persyaratan sesuai jenis perkara yang akan di ajukan. Untuk melihat persyaratan pendaftaran silahkan </Text><TouchableOpacity onPress={onOpen}><Text style={{ color: '#FFBF11', fontWeight: '500' }}>Klik Disini</Text></TouchableOpacity></View>
		},
		{
			time: <FaIcon name="pencil-alt" color={'#FFBF11'} size={15} />,
			title: 'Membuat Gugatan atau Permohonan',
			description: <View style={{ marginEnd: 20 }}><Text style={{ textAlign: 'justify' }}>Setelah Persyaratan terkumpul, Selanjutnya membuat surat gugatan atau surat permohonan. Surat ini termasuk kedalam persyaratan pendaftaran. Untuk membuat nya, anda bisa ke loket posbakum di kantor {namaSatker} (gratis)</Text></View>
		},
		{
			time: <FaIcon name="file-signature" color={'#FFBF11'} size={15} />,
			title: 'Melakukan Pendaftaran',
			description: <View style={{ marginEnd: 20 }}><Text style={{ textAlign: 'justify' }}> Setelah Persyaratan dan surat gugatan atau permohonan sudah terkumpul. Silahkan mengambil antrian pendaftaran dan memberikan semua dokumen persyaratan kepada petugas pendaftaran</Text></View>
		},
		{
			time: <FaIcon name="money-bill-wave-alt" color={'#FFBF11'} size={15} />,
			title: 'Melakukan Pembayaran',
			description: <View style={{ marginEnd: 20 }}><Text style={{ textAlign: 'justify' }}>Petugas pendaftaran akan memandu ke loket bank dan silahkan melakukan pembayaran sesuai nominal yang telah di berikan oleh petugas pendaftaran. Setelah itu berikan struk pembayaran dari loket bank kepada petugas pendaftaran.'</Text></View>
		},
		{
			time: <FaIcon name="user-tie" color={'#FFBF11'} size={15} />,
			title: 'Pendaftaran Berhasil',
			description: <View style={{ marginEnd: 20 }}><Text style={{ textAlign: 'justify' }}>Setelah pendaftaran berhasil silahkan ikuti intruksi dari petugas pendaftaran tentang cara berperkara, Silahkan tanyakan sesuatu yang belum dimengerti kepada petugas.</Text></View>
		},
	])
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
					<HStack space="2" mt={"12"} alignItems="center" m={2}>
						<Text color="coolGray.50" fontSize="lg">
							Berikut Adalah Alur Pendaftaran Perkara di {namaSatker}
						</Text>
					</HStack>
					<VStack
						flex="1"
						px="4"
						py="6"
						_light={{ bg: "white" }}
						_dark={{ bg: "coolGray.800" }}
						space="3"
						justifyContent="space-between"
						borderTopRightRadius={{ base: "2xl", md: "xl" }}
						borderBottomRightRadius={{ base: "0", md: "xl" }}
						borderTopLeftRadius={{ base: "2xl", md: "0" }}
					>
						<View style={{ flex: 1 }}>
							<Timeline
								circleColor={'#FFBF11'}
								data={timelineData}
								descriptionStyle={{ textAlign: 'justify', paddingRight: 20 }}
								titleStyle={{ color: 'black' }} />
						</View>
					</VStack>
				</Stack>
				<Actionsheet isOpen={isOpen} onClose={onClose}>
					<Actionsheet.Content>
						<ScrollView>
							<View style={{ paddingVertical: 10 }}>
								<Text style={{ color: 'black' }}> SYARAT PENGAJUAN CERAI GUGAT/CERAI TALAK</Text>
								<Text style={{ textAlign: 'justify' }}>1. Buku nikah asli atau Duplikat buku nikah jika yang asli hilang (Duplikat buku nikah bisa di buat di KUA setempat) beserta satu Lembar Fotokopi yang dimateraikan Rp. 10.000,- dan dicap leges di kantor pos</Text>
								<Text style={{ textAlign: 'justify' }}>2. Fotokopi KTP atau Resi KTP Lembar Fotokopi yang dimateraikan Rp. 10.000,- dan dicap leges di kantor pos</Text>
								<Text style={{ textAlign: 'justify' }}>3. Surat Keterangan Lurah setempat (Apabila Suami atau Istri tidak diketahui alamat keberadaan yang pasti)</Text>
								<Text style={{ textAlign: 'justify' }}>4. Surat Ijin Atasan (khusus bagi PNS/TNI/POLRI/BUMN)</Text>
							</View>
							<View style={{ paddingVertical: 10 }}>
								<Text style={{ color: 'black' }}> SYARAT PENGAJUAN DISPENSASI NIKAH</Text>
								<Text style={{ textAlign: 'justify' }}>1. Fotocopi KTP Pemohon / para Pemohon sebanyak 1 lembar A4 (tidak boleh dipotong) yang dimateraikan Rp 10.000,- dan dicap leges di kantor pos</Text>
								<Text style={{ textAlign: 'justify' }}>2. Fotocopi Kartu Keluarga Pemohon sebanyak 1 lembar yang dimateraikan Rp 10.000,- dan dicap leges di kantor pos</Text>
								<Text style={{ textAlign: 'justify' }}>3. Fotocopi akta nikah orang tua calon yang dimateraikan Rp 10.000,- dan dicap leges di kantor pos</Text>
								<Text style={{ textAlign: 'justify' }}>4. Fotocopi akta kelahiran calon suami dan calon istri yang dimateraikan Rp 10.000,- dan dicap leges di kantor pos</Text>
								<Text style={{ textAlign: 'justify' }}>5. Surat keterangan pemberitahuan adanya halangan / kekurangan persyaratan nikah dari KUA</Text>
								<Text style={{ textAlign: 'justify' }}>6. Surat keterangan status dari Kelurahan</Text>
							</View>
							<View style={{ paddingVertical: 10 }}>
								<Text style={{ color: 'black' }}> SYARAT PENGAJUAN ISBAT NIKAH</Text>
								<Text style={{ textAlign: 'justify' }}>1. Fotocopi KTP Pemohon yang dimateraikan Rp 10.000,- dan dicap leges di kantor pos</Text>
								<Text style={{ textAlign: 'justify' }}>2. Surat Keterangan KUA setempat (menerangkan bahwa NIKAH nya tidak terdapat di Register Nikah KUA setempat)</Text>
							</View>
						</ScrollView>

					</Actionsheet.Content>
				</Actionsheet>
			</ImageBackground>
		</>
	)
}