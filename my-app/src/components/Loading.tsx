import { Center, Spinner } from 'native-base';

export function Loading() {
  return (
    <Center flex={1} bg="emerald.900">
      <Spinner color="emerald.100" size={50} />
    </Center>
  );
}