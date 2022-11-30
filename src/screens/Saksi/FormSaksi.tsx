import React, { useState, useCallback } from "react";
import { ImageBackground, Image, TextInput, View, ScrollView, Text, Alert, InteractionManager, ActivityIndicator } from "react-native";
import { Button } from "@rneui/base";
import { TokenState } from "../../state/token";
import { AxiosResponse } from "axios";

import { GlobalState } from "../../state";
import * as qs from "qs";
import DefaultHeader from "../../components/DefaultHeader";
import Style from '../screen.style';
import DatePicker from 'react-native-date-picker'
import FaIcon from "react-native-vector-icons/FontAwesome5";
import HttpClient from "../../service/http";
import Modal from "react-native-modal";
import { SaksiStackProps } from '../../interfaces/IStackParams';
import useHttpRequest from "../../hooks/useHttpRequest";
import { useFocusEffect } from "@react-navigation/native";

export default function FormSaksi({ navigation }: SaksiStackProps) {
    const tokenState = TokenState.useState();
    const { data, loading, error, errorMessage } = useHttpRequest<{ message: string }>('/user/cek_saksi', tokenState.access);

    const [cek, setCek] = useState<boolean>(false);
    const [interact, setInteract] = useState<boolean>(false)

    useFocusEffect(
        useCallback(() => {

            if (error && errorMessage) {
                Alert.alert("Terjadi Kesalahan", "Mohon maaf saat ini layanan saksi tidak bisa di akses. Error : " + errorMessage.message, [
                    {
                        "text": "Kembali",
                        "onPress": () => navigation.goBack()
                    }
                ])
            }

            InteractionManager.runAfterInteractions(() => {
                if (data) {
                    Alert.alert("Pemberitahuan", data.message)
                    setCek(true)
                }
                setInteract(true)
            })

        }, [loading])
    )

    type FormSaksi = {
        name: string,
        umur: string,
        tempatLahir: string,
        tanggalLahir: string,
        pekerjaan: string,
        alamat: string
    }

    type FormSaksiError = {
        nama: string[],
        umur: string[],
        tempat_lahir: string[],
        tanggal_lahir: string[],
        pekerjaan: string[],
        alamat: string[]
    }

    const globalState = GlobalState.useState();

    const [modal, setModal] = useState<boolean>(false)
    const [date, setDate] = useState<Date>(new Date())
    const [open, setOpen] = useState<boolean>(false)
    const [urutan, setUrutan] = useState<number>(1)
    const [saksiSatu, setSaksiSatu] = useState<FormSaksi>({
        name: "", umur: '', tempatLahir: "", tanggalLahir: "", pekerjaan: "", alamat: ""
    })
    const [saksiDua, setSaksiDua] = useState<FormSaksi>({
        name: "", umur: '', tempatLahir: "", tanggalLahir: "", pekerjaan: "", alamat: ""
    })

    const [formError, setFormError] = useState<FormSaksiError>()

    const handleTanggalSaksiSatu = () => {
        setUrutan(1)
        setOpen(true)
    }

    const handleTanggalSaksiDua = () => {
        setUrutan(2)
        setOpen(true)
    }

    const handlingSubmit = async () => {
        HttpClient.request.defaults.headers.common['Authorization'] = `Bearer ${tokenState.access}`;
        HttpClient.request.defaults.headers.common['Accept'] = 'application/json';
        HttpClient.request.defaults.headers.common['Content-Type'] = 'application/json';

        GlobalState.update(index => { index.isLoading = true })

        await HttpClient.request.post('/user/saksi', qs.stringify([
            {
                nama: saksiSatu.name,
                umur: saksiSatu.umur,
                tempat_lahir: saksiSatu.tempatLahir,
                tanggal_lahir: saksiSatu.tanggalLahir,
                pekerjaan: saksiSatu.pekerjaan,
                alamat: saksiSatu.alamat,

            },
            {
                nama: saksiDua.name,
                umur: saksiDua.umur,
                tempat_lahir: saksiDua.tempatLahir,
                tanggal_lahir: saksiDua.tanggalLahir,
                pekerjaan: saksiDua.pekerjaan,
                alamat: saksiDua.alamat,
            }
        ]))
            .then((response: AxiosResponse) => {
                if (response.status == 201) {
                    Alert.alert("Berhasil", "Data saksi berhasil disimpan", [
                        {
                            "text": "Kembali",
                            "onPress": () => navigation.goBack()
                        }
                    ])
                }
            })
            .catch((error) => {
                if (error.response.status == 400) {
                    setFormError(error.response.data);
                    setModal(true)
                } else {
                    Alert.alert("Terjadi Kesalahan", "Mohon maaf saat ini tidak bisa menmabah data saksi. Error : " + error.reasponse.data.message, [
                        {
                            "text": "Kembali",
                            "onPress": () => navigation.goBack()
                        }
                    ])
                }
            })
        GlobalState.update(index => { index.isLoading = false })
    }

    const SaksiProses = () => {
        return (<View style={{ justifyContent: 'center', flex: 1 }}>
            <View style={{ marginBottom: 10, alignSelf: 'center' }}>
                <Image resizeMode={'center'} style={{ height: 150 }} source={require('../../assets/images/mail_sent.png')}></Image>
            </View>
            <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20, color: '#fff', elevation: 20 }}>Data saksi anda sudah dalam proses. Pastikan saksi datang saat persidangan</Text>
            <View style={{ alignContent: 'center', alignItems: 'center' }}>
                <Button
                    onPress={() => navigation.goBack()}
                    title="Kembali"
                    buttonStyle={{
                        backgroundColor: '#6a48bd',
                        borderColor: 'white',
                        borderRadius: 20,
                    }}
                    containerStyle={{
                        borderRadius: 20,
                        width: 200,
                        marginVertical: 10,
                    }}
                    icon={<FaIcon name={'arrow-left'} color={'#fff'} style={{ marginHorizontal: 5 }} />}
                    titleStyle={{ fontWeight: '600' }}
                />
            </View>
        </View>);
    }

    const FormAllSaksi = () => {
        return (<View style={{ flex: 1, padding: 10, }}>

            {!cek ? <SaksiProses />
                : <>
                    <View style={{ backgroundColor: '#fff', padding: 5, marginTop: 15, borderRadius: 10 }}>
                        <Text style={{ fontWeight: 'bold', color: '#ff1d58', margin: 10 }}>Form Saksi Satu</Text>
                        <View style={{ marginHorizontal: 10 }}>
                            <Text style={{ color: '#6a48bd', marginBottom: 5 }}>Nama Lengkap</Text>

                            <TextInput value={saksiSatu.name} onChangeText={(text) => setSaksiSatu(ress => ({ ...ress, name: text }))} selectionColor={'#6a48bd'} style={{ borderWidth: 1, borderColor: '#0049B7', padding: 10, borderRadius: 10, color: '#6a48bd' }} placeholder={'Nama Sesuai KTP'} />

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View >
                                    <Text style={{ color: '#6a48bd', marginBottom: 5 }}>Tempat Lahir</Text>

                                    <TextInput value={saksiSatu.tempatLahir} onChangeText={text => setSaksiSatu(ress => ({ ...ress, tempatLahir: text }))} selectionColor={'#6a48bd'} style={{ borderWidth: 1, borderColor: '#0049B7', padding: 10, borderRadius: 10, color: '#6a48bd', maxWidth: 170 }} placeholder={'Tempat Lahir Sesuai KTP'} />
                                </View>
                                <View>
                                    <Text style={{ color: '#6a48bd', marginBottom: 5 }}>Tanggal Lahir</Text>

                                    <TextInput value={saksiSatu.tanggalLahir} onFocus={handleTanggalSaksiSatu} selectionColor={'#6a48bd'} style={{ borderWidth: 1, borderColor: '#0049B7', padding: 10, borderRadius: 10, color: '#6a48bd', maxWidth: 180 }} placeholder={'Tanggal Lahir Sesuai KTP'} />
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <View>
                                    <Text style={{ color: '#6a48bd', marginBottom: 5 }}>Umur</Text>

                                    <TextInput value={saksiSatu.umur} onChangeText={text => setSaksiSatu(ress => ({ ...ress, umur: text.replace(/[^0-9]/g, '') }))} selectionColor={'#6a48bd'} style={{ borderWidth: 1, borderColor: '#0049B7', padding: 10, borderRadius: 10, color: '#6a48bd', maxWidth: 100 }} placeholder={'Umur'} />
                                </View>
                                <View style={{ paddingLeft: 10, flex: 1 }} >
                                    <Text style={{ color: '#6a48bd', marginBottom: 5 }}>Pekerjaan</Text>

                                    <TextInput value={saksiSatu.pekerjaan} onChangeText={text => setSaksiSatu(ress => ({ ...ress, pekerjaan: text }))} selectionColor={'#6a48bd'} style={{ borderWidth: 1, borderColor: '#0049B7', padding: 10, borderRadius: 10, color: '#6a48bd', maxWidth: 300 }} placeholder={'Pekerjaan'} />
                                </View>
                            </View>
                            <Text style={{ color: '#6a48bd', marginBottom: 5 }}>Alamat</Text>
                            <TextInput value={saksiSatu.alamat} onChangeText={text => setSaksiSatu(ress => ({ ...ress, alamat: text }))} selectionColor={'#6a48bd'} style={{ borderWidth: 1, borderColor: '#0049B7', padding: 10, borderRadius: 10, color: '#6a48bd', marginBottom: 10 }} placeholder={'Alamat Lengkap'} />
                        </View>
                    </View>
                    <View style={{ backgroundColor: '#fff', padding: 5, marginTop: 15, borderRadius: 10 }}>
                        <Text style={{ fontWeight: 'bold', color: '#ff1d58', margin: 10 }}>Form Saksi Dua</Text>
                        <View style={{ marginHorizontal: 10 }}>
                            <Text style={{ color: '#6a48bd', marginBottom: 5 }}>Nama Lengkap</Text>

                            <TextInput value={saksiDua.name} onChangeText={(text) => setSaksiDua(ress => ({ ...ress, name: text }))} selectionColor={'#6a48bd'} style={{ borderWidth: 1, borderColor: '#0049B7', padding: 10, borderRadius: 10, color: '#6a48bd' }} placeholder={'Nama Sesuai KTP'} />

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View >
                                    <Text style={{ color: '#6a48bd', marginBottom: 5 }}>Tempat Lahir</Text>

                                    <TextInput value={saksiDua.tempatLahir} onChangeText={text => setSaksiDua(ress => ({ ...ress, tempatLahir: text }))} selectionColor={'#6a48bd'} style={{ borderWidth: 1, borderColor: '#0049B7', padding: 10, borderRadius: 10, color: '#6a48bd', maxWidth: 170 }} placeholder={'Tempat Lahir Sesuai KTP'} />
                                </View>
                                <View>
                                    <Text style={{ color: '#6a48bd', marginBottom: 5 }}>Tanggal Lahir</Text>

                                    <TextInput value={saksiDua.tanggalLahir} onFocus={handleTanggalSaksiDua} selectionColor={'#6a48bd'} style={{ borderWidth: 1, borderColor: '#0049B7', padding: 10, borderRadius: 10, color: '#6a48bd', maxWidth: 180 }} placeholder={'Tanggal Lahir Sesuai KTP'} />
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <View>
                                    <Text style={{ color: '#6a48bd', marginBottom: 5 }}>Umur</Text>

                                    <TextInput value={saksiDua.umur} onChangeText={text => setSaksiDua(ress => ({ ...ress, umur: text.replace(/[^0-9]/g, '') }))} selectionColor={'#6a48bd'} style={{ borderWidth: 1, borderColor: '#0049B7', padding: 10, borderRadius: 10, color: '#6a48bd', maxWidth: 100 }} placeholder={'Umur'} />
                                </View>
                                <View style={{ paddingLeft: 10, flex: 1 }} >
                                    <Text style={{ color: '#6a48bd', marginBottom: 5 }}>Pekerjaan</Text>

                                    <TextInput value={saksiDua.pekerjaan} onChangeText={text => setSaksiDua(ress => ({ ...ress, pekerjaan: text }))} selectionColor={'#6a48bd'} style={{ borderWidth: 1, borderColor: '#0049B7', padding: 10, borderRadius: 10, color: '#6a48bd', maxWidth: 300 }} placeholder={'Pekerjaan'} />
                                </View>
                            </View>
                            <Text style={{ color: '#6a48bd', marginBottom: 5 }}>Alamat</Text>
                            <TextInput value={saksiDua.alamat} onChangeText={text => setSaksiDua(ress => ({ ...ress, alamat: text }))} selectionColor={'#6a48bd'} style={{ borderWidth: 1, borderColor: '#0049B7', padding: 10, borderRadius: 10, color: '#6a48bd', marginBottom: 10 }} placeholder={'Alamat Lengkap'} />
                        </View>
                    </View>
                    <View style={{ alignContent: 'center', alignItems: 'center' }}>
                        <Button
                            onPress={handlingSubmit}
                            title="Simpan Saksi"
                            buttonStyle={{
                                backgroundColor: '#6a48bd',
                                borderColor: 'white',
                                borderRadius: 30,
                            }}
                            containerStyle={{
                                borderRadius: 30,
                                width: 200,
                                marginHorizontal: 50,
                                marginVertical: 10,
                            }}
                            icon={<FaIcon name={'user-plus'} color={'#fff'} style={{ marginHorizontal: 5 }} />}
                            titleStyle={{ fontWeight: '600' }} />
                    </View>
                </>}
        </View>)
    }

    const Loading = () => {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <ActivityIndicator size={'large'} color={'#fff'}></ActivityIndicator>
            </View>
        );
    }

    return (<ImageBackground style={Style.imageBackground} resizeMode={'stretch'} source={require('../../assets/images/backgrounds/bg_gradient_blue_2.png')}>
        <DefaultHeader name={'Form Saksi'} />
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            {!interact
                ? <Loading />
                : <FormAllSaksi />}
        </ScrollView>
        <DatePicker
            modal
            mode="date"
            locale="id"
            open={open}
            date={date}
            onConfirm={(date) => {
                setOpen(false)
                setDate(date)
                if (urutan == 1) {
                    setSaksiSatu(ress => {
                        return {
                            ...ress,
                            tanggalLahir: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
                        }
                    })
                } else {
                    setSaksiDua(ress => {
                        return {
                            ...ress,
                            tanggalLahir: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
                        }
                    })

                }
            }}
            onCancel={() => {
                setOpen(false)
            }}
        />
        <Modal animationOut={'slideOutDown'} onBackdropPress={() => setModal(false)} animationIn={'slideInUp'} isVisible={modal}>
            <View style={{ backgroundColor: '#fff', padding: 10, marginTop: 'auto', borderRadius: 10 }}>
                <Text>Pastikan Semua Form Terisi</Text>
                {formError?.nama ? formError.nama.map((row, i) => {
                    return (<Text key={i} style={{ fontWeight: 'bold', color: '#ff1d58', margin: 10 }}>{row}</Text>)
                }) : <Text></Text>}
                {formError?.umur ? formError.umur.map(row => {
                    return (<Text style={{ fontWeight: 'bold', color: '#ff1d58', margin: 10 }}>{row}</Text>)
                }) : <Text></Text>}
                {formError?.tempat_lahir ? formError.tempat_lahir.map(row => {
                    return (<Text style={{ fontWeight: 'bold', color: '#ff1d58', margin: 10 }}>{row}</Text>)
                }) : <Text></Text>}
                {formError?.tanggal_lahir ? formError.tanggal_lahir.map(row => {
                    return (<Text style={{ fontWeight: 'bold', color: '#ff1d58', margin: 10 }}>{row}</Text>)
                }) : <Text></Text>}
                {formError?.pekerjaan ? formError.pekerjaan.map(row => {
                    return (<Text style={{ fontWeight: 'bold', color: '#ff1d58', margin: 10 }}>{row}</Text>)
                }) : <Text></Text>}
                {formError?.alamat ? formError.alamat.map(row => {
                    return (<Text style={{ fontWeight: 'bold', color: '#ff1d58', margin: 10 }}>{row}</Text>)
                }) : <Text></Text>}
            </View>
        </Modal>
    </ImageBackground>)

}