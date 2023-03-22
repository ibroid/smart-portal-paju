import { Icon, Input, Pressable } from "native-base";
import { useState } from "react";
import { Control, useController } from "react-hook-form";
import IonIcon from "react-native-vector-icons/Ionicons";

export default function InputDefault<T>({ name, control, placeholder, isPass }: {
	name: string;
	placeholder: string;
	control: Control;
	isPass?: boolean;
}) {
	const { field } = useController({ control, defaultValue: '', name, rules: { required: true } });

	const [invis, setInvis] = useState<boolean>(true);

	return <Input
		borderColor={"amber.500"}
		colorScheme={"amber"}
		color={"amber.500"}
		type={!isPass ? "text" : (invis ? "password" : "text")}
		defaultValue={field.value}
		onChangeText={field.onChange}
		variant="underlined"
		InputRightElement={isPass
			? <Pressable mr={2} onPress={() => setInvis(prev => !prev)}>
				<IonIcon size={20} color={"amber.500"} name={invis ? "eye-off" : "eye"} />
			</Pressable>
			: <></>}
		placeholder={placeholder} />;
}
