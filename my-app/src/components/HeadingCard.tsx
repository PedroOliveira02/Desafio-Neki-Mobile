import { Heading as HeadingCardNativeBase, IHeadingProps } from "native-base";

type Props = IHeadingProps & {
  title: string;
}
export function HeadingCard({ title, ...rest}: Props) {
  return (
    <HeadingCardNativeBase
      fontSize={16}
      {...rest}
    >
      {title}
    </HeadingCardNativeBase>
  )
}