import { Box, Center, Checkbox, HStack, Hidden, Icon, IconButton, Link, Stack, Text, VStack, View, Button } from "native-base";
import { ImageBackground, StatusBar } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { namaSatker } from "../backend.json";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import InputDefault from "../components/InputDefault";
import SelectDefault from "../components/SelectDefault";
import { useForm } from "react-hook-form";
import { useCallback, useState } from "react";
import { IPerkaraForm } from "../interfaces/FormInterface";
import { useFocusEffect } from "@react-navigation/native";


export default function Settings({ props }: any) {

	const { control, handleSubmit } = useForm<IPerkaraForm>({
		defaultValues: {
			nomorPerkara: "233",
			jenisPerkara: 'Pdt.G',
			tahunPerkara: '2022'
		}
	});
	const [years] = useState<any[]>(() => {
		const date = new Date();
		const arr: any[] = [{
			name: '2023',
			value: '2023'
		}];
		for (let i = 1; i < 7; i++) {
			arr.push({
				value: `${date.getFullYear() - i}`,
				name: `${date.getFullYear() - i}`
			});
		}
		return arr;
	});
	return (
		<>
			<StatusBar
				translucent
				backgroundColor="transparent"
				barStyle="dark-content"
			/>
			<Box
				safeAreaTop
			/>
			<ImageBackground source={require('../assets/images/backgrounds/bg_gradient_blue.png')} style={{ flex: 1 }} >
				<Stack
					flexDirection={{ base: "column", md: "row" }}
					w="100%"
					maxW={{ md: "1016px" }}
					flex={{ base: "1", md: "none" }}
				>
					<Box bgColor={"light.100"} height={50} borderBottomRadius={"2xl"}>
						<Center m={3}>
							<Text color={"violet.700"} bold>Settings</Text>
						</Center>
					</Box>
					<Center m={3}>
						<Text color={"#fff"} textAlign={"center"}>Silahkan tentukan nomor perkara Anda di bawah ini. Pastikan nomor perkara Anda sudah ter Register di {namaSatker}.</Text>
					</Center>
					<KeyboardAwareScrollView
						contentContainerStyle={{
							flexGrow: 1,
						}}
						style={{ flex: 1 }}
					>
						<VStack
							m={5}
							maxW={350}
							flex="1"
							px="6"
							py="3"
							_light={{ bg: "white" }}
							_dark={{ bg: "coolGray.800" }}
							space="3"
							borderRadius={"2xl"}

						>
							<InputDefault controllerProp={{ name: "nomorPerkara", control: control }} isPass={false} placeholder={"Nomor Perkara"} />
							<SelectDefault data={[
								{
									name: 'Pdt.G',
									value: 'Pdt.G'
								},
								{
									name: 'Pdt.P',
									value: 'Pdt.P'
								},
							]} placeholder="Jenis Perkara" controllerProp={{ control: control, name: "jenisPerkara" }} />
							<SelectDefault data={years} placeholder="Tahun Perkara" controllerProp={{ control: control, name: "tahunPerkara" }} />
							<Button bgColor={"amber.500"} endIcon={<AntDesign name={"save"} color={"#fff"} size={20} />}>Simpan</Button>

						</VStack>
					</KeyboardAwareScrollView>

				</Stack>
			</ImageBackground>
		</>
	)
}