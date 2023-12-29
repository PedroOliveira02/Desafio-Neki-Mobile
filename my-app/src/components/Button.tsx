import { Button as ButtonNativeBase, IButtonProps, Text, theme } from "native-base";

type Props = IButtonProps & {
  title: string;
}

export function Button({ title, ...rest}: Props) {
  return (
    <ButtonNativeBase
      w="full"
      bg="emerald.500"
      style={theme.shadows[9]}
      _pressed={{
        bg: "emerald.600"
      }}
      {...rest}
    >
      <Text
        fontSize="md"
      >
        {title}
      </Text>
    </ButtonNativeBase>
  )
}