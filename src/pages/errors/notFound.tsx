interface Props {
  msg?: string;
}
export default function PageNotFound({ msg = "The page you're looking for does not exist" }: Props) {
  return <div>{msg}</div>;
}
