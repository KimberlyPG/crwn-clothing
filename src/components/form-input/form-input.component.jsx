import { FormInputLabel, Input, Group } from './form-input.styles';

const FormInput = ( { label, ...otherProps } ) => {
    return (
        <Group>
            <Input {...otherProps} />
            {label && ( //if label exists then render the label
                <FormInputLabel shrink={ otherProps.value.length}>
                    {label}
                </FormInputLabel>
            )}
        </Group>
    );
};

export default FormInput;