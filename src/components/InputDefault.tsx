import { Input } from "native-base";
import { Control, useController } from "react-hook-form";

export default function InputDefault<T>({ name, control, placeholder, isPass }: {
    name: string;
    placeholder: string;
    control: Control;
    isPass?: boolean;
}) {
    const { field } = useController({ control, defaultValue: '', name, rules: { required: true } });
    return <Input type={isPass ? "password" : "text"} defaultValue={field.value} onChangeText={field.onChange} variant="underlined" placeholder={placeholder} />;
}
