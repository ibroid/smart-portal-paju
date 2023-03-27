import { Select } from "native-base";
import { Control, FieldValues, UseControllerProps, useController } from "react-hook-form";

export default function SelectDefault<T extends FieldValues>(props: {
    controllerProp: UseControllerProps<T>,
    data: { name: string, value: string }[],
    placeholder: string
}) {
    const { field } = useController(props.controllerProp);
    return <Select
        selectedValue={field.value}
        placeholder={props.placeholder}
        onValueChange={field.onChange}>
        {props.data.map((row, i) => (<Select.Item key={++i} label={row.name} value={row.value} />))}
    </Select>;
}
