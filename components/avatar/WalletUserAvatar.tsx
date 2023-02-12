import Image from 'next/image';
import VertekAlpha from '@/assets/png/vertek-mark-alpha.png';

export function WalletUserAvatar() {
  return <Image src={VertekAlpha} alt="your-profile" />;
}
