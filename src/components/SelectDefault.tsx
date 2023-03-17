import { Select } from "native-base";
import { Control, useController } from "react-hook-form";

export default function SelectDefault<T extends { value: string; name: string }>({ name, control, placeholder, data }: {
    name: string;
    placeholder: string;
    control: Control;
    isPass?: boolean;
    data: T[]
}) {
    const { field } = useController({ control, defaultValue: '', name, rules: { required: true } });
    return <Select
        w={40}
        selectedValue={field.value}
        placeholder={placeholder}
        onValueChange={field.onChange}>
        {data.map((row, i) => (<Select.Item key={++i} label={row.name} value={row.value} />))}
    </Select>;
}
