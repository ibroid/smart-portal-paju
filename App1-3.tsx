// import React, { createContext } from "react";
// import { Alert, BackHandler } from "react-native";
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import Home from "./src/screens/Home";
// import JadwalSidang from "./src/screens/JadwalSidang";
// import Transaksi from "./src/screens/Transaksi";
// import { AppStackParams } from "./src/interfaces/IStackParams";
// import Putusan from "./src/screens/Putusan";
// import AktaCerai from "./src/screens/AktaCerai";
// import PengumumanStack from "./src/stacks/PengumumanStack";
// import PendaftaranStack from "./src/stacks/PendaftaranStack";
// import CekBiaya from "./src/screens/CekBiaya";
// import SurveyStack from "./src/stacks/SurveyStack";
// import Antrian from "./src/screens/Antrian";
// import AuthStack from "./src/stacks/AuthStack";
// import LoadingScreen from "./src/components/LoadingScreen";
// import Splash from "./src/screens/Splash";
// import Profile from "./src/screens/Profile";

// import { GlobalState, UserState } from "./src/state";
// import HttpClient from "./src/service/http";
// import { AxiosError } from "axios";

// import { TokenState } from "./src/state/token";
// import DataUmum from "./src/screens/DataUmum";
// import SaksiStack from "./src/stacks/SaksiStack";
// import DriveThru from "./src/screens/DriveThru";

// import AsyncStorage from "@react-native-async-storage/async-storage";


// const AppStack = createNativeStackNavigator<AppStackParams>();

// const PageContext = createContext(false)


// export default function App() {

//   const isAuth = GlobalState.useState(i => i.isAuth);

//   AsyncStorage.getItem("access_key", (error, result) => {
//     if (error) {
//       throw new Error(error.message)
//     }

//     if (result == null || result == undefined) {
//       GlobalState.update(i => { i.isAuth = 2 })
//     } else {
//       HttpClient.request.defaults.headers.common['Authorization'] = `Bearer ${result}`;

//       HttpClient.checkConnection()

//         .then((response) => {
//           console.log(response.data)
//           UserState.update(i => {
//             i.created_at = response.data.created_at,
//               i.updated_at = response.data.updated_at,
//               i.user_nik = response.data.nik,
//               i.user_fullname = response.data.name,
//               i.user_phone = response.data.phone
//           });
//         })

//         .catch((err: AxiosError) => {
//           if (err.response?.status == 401) {
//             return AsyncStorage.removeItem("access_key", (err) => {
//               if (err) {
//                 throw new Error(err.message)
//               }
//               GlobalState.update(i => { i.isAuth = 2 })

//             })

//           }
//           Alert.alert('Gagal terhubung ke server', 'Silahkan Coba lagi lain waktu. Error ' + err.message || err.response?.data.message,
//             [
//               {
//                 text: 'Ok', onPress: () => BackHandler.exitApp()
//               }
//             ], {
//             cancelable: false
//           })

//         })
//       TokenState.update(i => { i.access = result })
//       GlobalState.update(i => { i.isAuth = 1 })
//     }

//   })


//   const RenderContent = () => {
//     if (isAuth == 1) {
//       return (
//         <>
//           <AppStack.Screen name="Home" component={Home} />
//           <AppStack.Screen name="JadwalSidang" component={JadwalSidang} />
//           <AppStack.Screen name="Transaksi" component={Transaksi} />
//           <AppStack.Screen name="Putusan" component={Putusan} />
//           <AppStack.Screen name="AktaCerai" component={AktaCerai} />
//           <AppStack.Screen name="Pengumuman" component={PengumumanStack} />
//           <AppStack.Screen name="Pendaftaran" component={PendaftaranStack} />
//           <AppStack.Screen name="CekBiaya" component={CekBiaya} />
//           <AppStack.Screen name="Survey" component={SurveyStack} />
//           <AppStack.Screen name="Antrian" component={Antrian} />
//           <AppStack.Screen name="Profil" component={Profile} />
//           <AppStack.Screen name="DataUmum" component={DataUmum} />
//           <AppStack.Screen name="Saksi" component={SaksiStack} />
//           <AppStack.Screen name="DriveThru" component={DriveThru} />
//         </>);
//     } else if (isAuth == 2) {
//       return <AppStack.Screen name="Auth" component={AuthStack} />;
//     } else {
//       return <AppStack.Screen name="Splash" component={Splash} />;
//     }
//   }

//   return (
//     <PageContext.Provider value={false}>
//       <NavigationContainer>
//         <AppStack.Navigator screenOptions={{ headerShown: false }}>
//           {RenderContent()}
//         </AppStack.Navigator>
//       </NavigationContainer>
//       <LoadingScreen />
//     </PageContext.Provider>
//   )
// }