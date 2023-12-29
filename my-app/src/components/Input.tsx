import { Input as NativeBaseInput, IInputProps, FormControl } from "native-base";

type Props = IInputProps & {
  errorMessage?: string | null;
}

export function Input({ errorMessage = null, isInvalid, ...rest }: Props) {
  const invalid = !!errorMessage || isInvalid;

  return (
    <FormControl isInvalid={invalid}>
      <NativeBaseInput 
        // placeholderTextColor=""
        isInvalid={invalid}
        _invalid={{
          borderWidth: 1,
          borderColor: "red.500"
        }}
        _focus={{
          bgColor: 'emerald.200',
          borderWidth: 1,
          borderColor: 'emerald.500'
        }}
        {...rest}
      />
      <FormControl.ErrorMessage _text={{ color: 'red.500'}}>
        {errorMessage}
      </FormControl.ErrorMessage>
    </FormControl>
  )
}