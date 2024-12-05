import Image from 'next/image';

export const HomelogoIcon: React.FC<React.SVGAttributes<{}>> = (props) => {
  return <Image src={'/images/logo.png'} fill alt="logo" />;
};
