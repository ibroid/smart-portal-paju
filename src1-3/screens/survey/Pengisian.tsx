import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	ImageBackground,
	Button,
	TextInput,
	InteractionManager,
	Alert,
	ScrollView,
	FlatList
} from "react-native";

import DefaultHeader from "../../components/DefaultHeader";
import Styles from "../screen.style";
import CheckBox from '@react-native-community/checkbox';
import useHttpRequest from "../../hooks/useHttpRequest";
import Loading from "../../components/LoadingIndicator";
import HttpClient from "../../service/http";

import { useFocusEffect } from "@react-navigation/native";
import { TokenState } from "../../state/token";
import { IKirimSurveyResponse, IKuesionerResponse } from "../../interfaces/IResponse";
import { SurveyStackProps } from "../../interfaces/IStackParams";
import QueryString from "qs";
import { AxiosResponse } from "axios";
import { GlobalState } from "../../state";

export default function Pengisian({ route, navigation }: SurveyStackProps<"Pengisian">) {

	type Jawaban = {
		kuesioner_id: number;
		nilai: number
	}

	type SelectedValue = {
		id: number,
		selected: boolean
		nilai: number
	}

	type SelectedKuesioner = {
		id: number,
		jawaban: SelectedValue[]
	}

	const tokenState = TokenState.useState()
	const [interact, setInteract] = useState<boolean>(false);
	const [saran, setSaran] = useState<string>('')
	const { error, errorMessage, data, loading } = useHttpRequest<IKuesionerResponse[]>('survey/' + route.params.kode, tokenState.access);

	const [selectedValue, setSelectedValue] = useState<SelectedKuesioner[]>();


	useFocusEffect(
		React.useCallback(() => {

			if (error && errorMessage) {
				Alert.alert("Terjadi Kesalahan", "Mohon maaf saat ini layanan survey tidak bisa diakses. Error : " + errorMessage.message, [
					{
						"text": "Kembali",
						"onPress": () => navigation.goBack()
					}
				])
			}

			if (!loading) {
				InteractionManager.runAfterInteractions(() => {

					setInteract(true)

				})
			}

			return () => {
				setInteract(false)
			};

		}, [loading])
	);

	const setJawabanSurvey = (jwId: number, kuesioner: IKuesionerResponse, value: boolean, nilai: number) => {

		setSelectedValue(current => {
			if (current) {
				const index = current.findIndex(x => x.id === kuesioner.id);
				return [{
					id: current[index].id,
					jawaban: current[index].jawaban.map((v, i) => {
						if (current[index].id == kuesioner.id && v.id == jwId) {
							return {
								id: v.id,
								selected: value,
								nilai: nilai
							}
						} else {
							return {
								id: v.id,
								selected: !value,
								nilai: nilai
							}
						}
					})
				}, ...current]
			} else {
				return data?.map((_v, _i) => {
					return {
						id: _v.id,
						jawaban: _v.jawaban.map((v, i) => {
							return {
								id: v.id,
								selected: (v.id == jwId) ? value : !value,
								nilai: nilai
							}
						})
					};
				})
			}
		})
	}

	const setSelectedJawaban = (kuesId: number, jwId: number): boolean => {
		if (selectedValue) {
			const index = selectedValue.findIndex(x => x.id === kuesId);
			if (index === -1) {
				return false;
			}
			const indexJw = selectedValue[index].jawaban.findIndex(y => y.id === jwId)
			if (indexJw === -1) {
				return false
			}
			return selectedValue[index].jawaban[indexJw].selected;
		}
		return false;
	}

	const sendSurveyResult = () => {
		if (!saran) {
			return Alert.alert('Silahkan Lengkapi Form Saran Anda')
		}

		const Jawaban: Jawaban[] = [];

		if (selectedValue) {
			selectedValue.forEach(row => {
				row.jawaban.forEach(_row => {
					if (_row.selected === true) {
						Jawaban.push({
							kuesioner_id: row.id,
							nilai: _row.nilai
						})
					}
				})
			})
		}

		if (Jawaban.length < 9) {
			return Alert.alert('Silahkan Lengkapi Survey Anda')
		}
		GlobalState.update(i => { i.isLoading = true })
		HttpClient.request.defaults.headers.common['Authorization'] = `Bearer ${tokenState.access}`;
		HttpClient.request.defaults.headers.common['Accept'] = 'application/json';
		HttpClient.request.defaults.headers.common['Content-Type'] = 'application/json';

		HttpClient.request.post('/survey/save', QueryString.stringify({
			survey: route.params.kode,
			jawaban: Jawaban,
			saran: saran

		}))
			.then((response: AxiosResponse<IKirimSurveyResponse>) => {
				console.log(response.data)
				Alert.alert(response.data.status, response.data.message, [
					{
						"text": "Ok",
						"onPress": () => navigation.goBack()
					}
				])
			})
			.catch(error => {
				console.log(error)
				Alert.alert(error.message || error.response.data.status, error.response.data.message)
			})
			.finally(() => {
				GlobalState.update(i => { i.isLoading = false })
			})
	}

	return (
		<ImageBackground style={Styles.imageBackground} source={require('../../assets/images/backgrounds/bg_gradient_blue_2.png')}>
			<DefaultHeader name={'Survey IKM'} />
			{!interact
				? <Loading />
				: <View style={{ padding: 10, marginTop: 10, flex: 1 }}>
					<FlatList data={!data ? [] : data} renderItem={({ item }) => (
						<><Text style={{ color: '#fff' }}>{item.no}. {item.pertanyaan}</Text>
							<View style={{ backgroundColor: '#fff', borderRadius: 10, marginVertical: 5 }}>
								<View style={{ flexDirection: 'column' }}>
									{item.jawaban.map((val, n) => {
										return (
											<View key={val.id} style={{ flexDirection: 'row', alignItems: 'center' }}>
												<CheckBox
													tintColors={{ false: '#6a48bd', true: '#6a48bd' }}
													style={{ borderColor: '#fff' }}
													value={setSelectedJawaban(item.id, val.id)}
													onValueChange={(newValue) => setJawabanSurvey(val.id, item, newValue, val.bobot)} />
												<Text style={{ color: '#6a48bd' }} >{val.jawaban}</Text>
											</View>
										)
									})}
								</View>
							</View></>
					)}
						ListEmptyComponent={<Loading />}
					/>
					<Text style={{ color: '#fff' }}>Tuliskan komentar anda tentang pelayanan kami</Text><View style={{ backgroundColor: '#fff', borderRadius: 10, marginVertical: 5 }}>
						<TextInput
							style={{ borderColor: '#6a48bd', borderWidth: 1, padding: 10 }}
							multiline={true}
							value={saran}
							onChangeText={text => setSaran(text)}
							placeholder='Tulis Disini' />
					</View>
					<Button title={'Kirim Jawaban'} color={'#1bd4d4'} onPress={sendSurveyResult} />

				</View>
			}
		</ImageBackground>
	)
}
