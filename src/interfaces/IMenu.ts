import { ImageSourcePropType, ColorValue } from "react-native";
import { AppStackParams } from "./IStackParams";

export interface IMenu {
    icon: ImageSourcePropType;
    color: ColorValue;
    name: String;
    url: keyof AppStackParams
}

export interface ICourtMenu {
    icon: string,
    name: string,
    color: ColorValue,
    url: keyof AppStackParams,
}