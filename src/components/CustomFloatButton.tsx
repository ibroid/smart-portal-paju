import { Pressable, View } from "native-base";
import * as React from "react";

const CustomTabBarButton = ({ children, onPress }: any) => {
    return <Pressable

        style={{
            top: -20,
            justifyContent: 'center',
            alignItems: 'center',
        }}
        onPress={() => {
            // return toast.show({
            //     title: 'Peringatan',
            //     description: 'Pengambilan antrian secara online belum dibuka',
            //     variant: 'solid',
            //     backgroundColor: 'red.500',
            //     placement: 'top',
            // })
        }}
    >
        {({ isPressed }) => (<View
            style={{
                backgroundColor: '#694CBD',
                width: 60,
                height: 60,
                borderRadius: 35,
                transform: [{
                    scale: isPressed ? 0.96 : 1
                }]
            }}
        >
            {children}
        </View>
        )}

    </Pressable>
}