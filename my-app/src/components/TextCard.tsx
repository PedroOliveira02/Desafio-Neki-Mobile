import { Text as TextCardNativeBase, ITextProps } from "native-base";

type Props = ITextProps & {
  title: string;
}
export function TextCard({ title, ...rest}: Props) {
  return (
    <TextCardNativeBase
      fontSize="15" 
      mt={-1.6} 
      mb={3} 
      pb={1} 
      borderBottomWidth={1} 
      borderBottomColor="emerald.900"
      {...rest}
    >
      {title}
    </TextCardNativeBase>
  )
}