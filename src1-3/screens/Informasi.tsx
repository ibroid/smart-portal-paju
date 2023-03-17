import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  ImageBackground,
  FlatList,
  InteractionManager,
  Alert,
  TextInput,
  Image,
  Keyboard
} from "react-native";

import { Button } from "@rneui/base";
import { useFocusEffect } from "@react-navigation/native";
import { AppStackProps, PendaftaranStackProps } from "../interfaces/IStackParams";
import { TokenState } from "../state/token";
import { IMessagesResponse } from "../interfaces/IResponse";
import { AxiosResponse } from "axios";

import Style from './screen.style';
import DefaultHeader from "../components/DefaultHeader";
import Loading from "../components/LoadingIndicator";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import HttpClient from "../service/http";
import QueryString from "qs";
import useHttpRequest from "../hooks/useHttpRequest";

export default function Informasi({ navigation }: PendaftaranStackProps<"Informasi">) {

  const tokenState = TokenState.useState();
  const [isFetch, setIsFetch] = useState<boolean>(false)
  const [messages, setMessages] = useState<IMessagesResponse[]>([])
  const [textInput, setTextInput] = useState<string>('')
  const [counter, setCounter] = useState<number>(0)
  const [interact, setInteract] = useState<boolean>(false);

  const { data, loading, error, errorMessage } = useHttpRequest<IMessagesResponse[]>('/pesan', tokenState.access);

  useFocusEffect(
    useCallback(() => {

      if (error && errorMessage) {
        Alert.alert("Terjadi Kesalahan", "Mohon maaf saat ini layanan Informasi tidak bisa diakses. Error : " + errorMessage, [
          {
            "text": "Kembali",
            "onPress": () => navigation.goBack()
          }
        ])
      }

      if (loading) {
        setIsFetch(true)
      } else {
        InteractionManager.runAfterInteractions(() => {
          setInteract(true)
        })
        setIsFetch(false)
      }


      if (data) {
        setMessages(data)
      }

      return () => {
        setInteract(false)
      }
    }, [loading])
  )

  const SelfMessage = (prop: { item: IMessagesResponse }) => {
    return (
      <View style={{ backgroundColor: '#fff', padding: 10, margin: 3, borderRadius: 10, alignSelf: 'flex-end', alignItems: 'baseline', maxWidth: 300 }} >
        <Text style={{ fontWeight: 'bold' }}>{prop.item.text} </Text>
      </View>
    )
  }

  const OtherMessage = (prop: { item: IMessagesResponse }) => {
    return (
      <View style={{ backgroundColor: '#529C5A', padding: 10, margin: 3, borderRadius: 10, alignSelf: 'flex-start', alignItems: 'baseline', maxWidth: 300 }} >
        <Text style={{ fontWeight: 'bold', color: '#fff' }}>{prop.item.text} </Text>
      </View>
    )
  }

  const Header = () => {
    return (
      <View style={{ backgroundColor: '#fff', padding: 10, flexDirection: 'row' }}>
        <View style={{ flexDirection: 'column', width: 120, flex: 1 }}>
          <Text style={{ fontSize: 20, color: '#704776', fontWeight: 'bold' }}> Silahkan Tanyakan Keperluan Anda Disini !</Text>
        </View>
        <Image resizeMode="center" style={{ height: 60, width: 150 }} source={require('../assets/images/cs_man.png')}></Image>
      </View>
    )
  }

  const handleSendMessage = () => {
    Keyboard.dismiss()
    setIsFetch(true)

    HttpClient.request.defaults.headers.common['Authorization'] = `Bearer ${tokenState.access}`;
    HttpClient.request.defaults.headers.common['Accept'] = 'application/json';
    HttpClient.request.defaults.headers.common['Content-Type'] = 'application/json';

    HttpClient.request.post('/pesan', QueryString.stringify({
      'text': textInput
    })).then((response: AxiosResponse<IMessagesResponse>) => {
      setMessages(current => {
        return [response.data, ...current]
      })
      // console.log(response.data)
    })

      .catch(error => {
        if (error.isAxiosError) {
          console.log('axios error')
        }
        console.log(error)
        Alert.alert(error || error.response.data.status, error.message || error.response.data.message)
      })

      .finally(() => {
        console.log('final')
        setIsFetch(false)
        setTextInput('')
      })


  }

  return (
    <ImageBackground style={Style.imageBackground} source={require('../assets/images/backgrounds/bg_gradient_blue.png')}>
      <DefaultHeader name={'Informasi'} color={'#fff'} />
      {!interact
        ? <Loading />
        : <View style={{ flex: 1, borderWidth: 1, borderColor: '#fff' }}>
          <Header />
          {!isFetch
            ? <FlatList
              data={messages}
              inverted
              ListEmptyComponent={<View style={{ justifyContent: 'center', alignItems: 'center' }}><Text>Belum ada Pesan</Text></View>}
              renderItem={({ item, index }) => {
                return !item.receiver ? <SelfMessage key={index} item={item} /> : <OtherMessage key={index} item={item} />
              }} />
            : <Loading />
          }

        </View>
      }

      <View style={{ margin: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
        <View style={{ flex: 1, marginEnd: 5 }}>
          <TextInput value={textInput} onChangeText={text => setTextInput(text)} placeholder="Silahkan Ajukan Pertanyaan Anda" style={{ backgroundColor: '#fff', borderRadius: 10 }} multiline={true} />
        </View>
        <View>
          <Button onPress={handleSendMessage} style={{ borderRadius: 20 }} icon={<FontAwesome5Icon name="paper-plane" color={'#fff'} size={30} />} />
        </View>
      </View>
    </ImageBackground >
  )
}