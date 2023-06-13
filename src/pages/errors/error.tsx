interface Props {
  msg?: string;
}
export default function PageNotFound({ msg = 'Something went wrong' }: Props) {
  return <div>{msg}</div>;
}
