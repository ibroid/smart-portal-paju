import { Center, Text, Pressable, View, Box, StatusBar, useToast, Divider } from "native-base";
import * as React from "react";
import { FlatList, Image, ImageBackground, StyleSheet } from "react-native";
import { FlatGrid, SectionGrid } from "react-native-super-grid";
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Dimensions } from "react-native";
import { AuthContext } from "../context/AuthContext";

export default function Beranda({ props }: any) {

	const navigation = useNavigation();
	const toast = useToast()

	const styles = StyleSheet.create({
		gridView: {
			marginTop: 20,
			flex: 1,
		},
		itemContainer: {
			justifyContent: 'flex-end',
			borderRadius: 5,
			padding: 5,
			height: 150,
		},
		itemName: {
			fontSize: 16,
			color: '#fff',
			fontWeight: '600',
		},
		itemCode: {
			// botttom: -10,
			fontWeight: '600',
			fontSize: 12,
			color: '#fff',
		},
		sectionHeader: {
			flex: 1,
			fontSize: 15,
			fontWeight: '600',
			alignItems: 'center',
			backgroundColor: '#B6C1E3',
			borderRadius: 10,
			color: '#fff',
			padding: 10,
		},
	});

	const [items, setItems] = React.useState([
		{
			name: 'Berita',
			code: '#ADB146',
			icon: require('../assets/icons/microphone-96x96-2126909.png'),
			move: "Berita"
		},
		{
			name: 'Perkara',
			code: '#F6B862',
			icon: require('../assets/icons/wallet-96x96-2126929.png'),
			move: "Perkara"
		},
		{
			name: 'Persidangan',
			code: '#CB5E62',
			icon: require('../assets/icons/office-96x96-2126944.png'),
			move: "Jadwal Sidang"
		},
		{
			name: 'Keuangan',
			code: '#38B1DB',
			icon: require('../assets/icons/money-96x96-2126908.png'),
			move: "Keuangan"
		},
		{
			name: 'Akta Cerai',
			code: '#ADB146',
			icon: require('../assets/icons/newsletter-96x96-2126946.png'),
			move: "Akta Cerai"
		},
		{
			name: 'Survey',
			code: '#7689DF',
			icon: require('../assets/icons/note-96x96-2126945.png'),
			move: "Survey"
		},
		{
			name: 'Drive Thru',
			code: '#FC6A50',
			icon: require('../assets/icons/start-up-96x96-2126939.png'),
			move: "Drive Thru"
		},
		{
			name: 'Pendaftaran',
			code: '#2F4C5C',
			icon: require('../assets/icons/folder-96x96-2126914.png'),
			move: "Pendaftaran"
		},
		{
			name: 'Hitung Biaya',
			code: '#2F4C5C',
			icon: require('../assets/icons/calculator-96x96-2126922.png'),
			move: "Hitung Biaya"
		},
		{
			name: 'Antrian',
			code: '#2F4C5C',
			icon: require('../assets/icons/id-card-96x96-2126913.png'),
			move: "Antrian"
		},
		{
			name: 'Sidang Keliling',
			code: '#2F4C5C',
			icon: require('../assets/icons/bell-96x96-2126927.png'),
			move: "Sidang Keliling"
		},
	]);

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
			<ImageBackground source={require('../assets/images/backgrounds/bg_gradient_blue.png')}
				style={{ flex: 1 }} >
				{/* <View bgColor={"#008080"}>
				<Text m={3} alignSelf={"center"} color={"#fff"} fontSize={"xl"} bold>Beranda</Text>
			</View> */}
				<SectionGrid
					// contentContainerStyle={{ marginBottom: 50 }}

					ListHeaderComponent={
						<View style={{ backgroundColor: '#fff', borderRadius: 10, margin: 10, padding: 10, flexDirection: 'row' }}>
							<View style={{ flexDirection: 'column', width: 120, flex: 1 }}>
								<Text style={{ fontFamily: 'Roboto-Bold', fontSize: 20, color: '#704776' }}>Smart Portal Pengadilan Agama Jakarta Utara</Text>
							</View>
							<Image resizeMode="center" style={{ height: 70, width: 150 }} source={require('../assets/images/cs_man.png')}></Image>
						</View>
					}
					sections={[
						{
							title: 'Menu Perkara',
							data: items.slice(0, 7),
						},
						{
							title: 'Menu Layanan Publik',
							data: items.slice(7, 12),
						}
					]}
					itemDimension={90}
					data={items}
					style={styles.gridView}

					maxItemsPerRow={3}
					spacing={10}
					renderSectionHeader={({ section }) => (
						<Text marginX={3} marginTop={2} style={styles.sectionHeader}>{section.title}</Text>
					)}
					renderItem={({ item }: any) => (
						<Pressable onPress={() => {
							if (
								// item.move == 'Sidang Keliling' ||
								item.move == 'Antrian' ||
								item.move == 'Berita' ||
								item.move == 'Drive Thru'
							) {
								return toast.show({
									title: 'Peringatan',
									description: 'Menu ini akan tersedia pada update yang akan datang',
									variant: 'solid',
									backgroundColor: 'red.500',
									placement: 'top',
								})
							}
							navigation.push(item.move);

						}}>
							{({
								isPressed
							}) => {
								return <Box
									maxW="96"
									borderWidth="1"
									borderColor="coolGray.300"
									shadow="3"
									pt="5"
									rounded="8"
									style={[styles.itemContainer, {
										backgroundColor: item.code,
										transform: [{
											scale: isPressed ? 0.96 : 1
										}]
									}]}>
									<View style={{ flex: 1 }}>
										<Center>
											<Image resizeMode={'cover'} source={item.icon}></Image>
										</Center>
									</View>
									<Text style={styles.itemCode}>{item.name}</Text>
								</Box>
							}}
						</Pressable>
						// <View style={[styles.itemContainer, { backgroundColor: item.code }]}>
						// <Text style={styles.itemCode}>{item.name}</Text>
						// </View>
					)}

					ListFooterComponent={<Divider mt={20} />}
				/>
			</ImageBackground>

		</>
	);
}