import { Icon, Input, Pressable } from "native-base";
import { useState } from "react";
import { Control, FieldValues, UseControllerProps, useController } from "react-hook-form";
import IonIcon from "react-native-vector-icons/Ionicons";

export default function InputDefault<T extends FieldValues>(props: {
	controllerProp: UseControllerProps<T>,
	isPass: boolean,
	placeholder: string
}) {
	const { field } = useController(props.controllerProp);

	const [invis, setInvis] = useState<boolean>(true);

	return <Input
		borderColor={"amber.500"}
		colorScheme={"amber"}
		color={"amber.500"}
		type={!props.isPass ? "text" : (invis ? "password" : "text")}
		defaultValue={field.value}
		onChangeText={field.onChange}
		variant="underlined"
		InputRightElement={props.isPass
			? <Pressable mr={2} onPress={() => setInvis(prev => !prev)}>
				<IonIcon size={20} color={"amber.500"} name={invis ? "eye-off" : "eye"} />
			</Pressable>
			: <></>}
		placeholder={props.placeholder} />;
}
