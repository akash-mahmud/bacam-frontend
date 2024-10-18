import Image from 'next/image';

export const LogoIcon: React.FC<React.SVGAttributes<{}>> = (props) => {
  return <Image src={'/images/logo.png'} height={80} width={80} alt="logo" />;
};
