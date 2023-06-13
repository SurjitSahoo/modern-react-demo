interface Props {
  role: string;
  adGroup: string;
  allowedADGroups: string[];
}

export default function CompA({ role, adGroup, allowedADGroups }: Props) {
  return <div>{role === 'admin' && allowedADGroups.includes(adGroup) && <button>Admin Button</button>}</div>;
}
