import {
  FaXTwitter,
  FaFacebookF,
  FaInstagram,
  FaGithub,
  FaTwitch,
  FaTelegram,
} from 'react-icons/fa6';

export const options = ['facebook', 'instagram', 'twitter', 'github', 'twitch', 'telegram'];

export const socialMediaLogos: any = {
  facebook: <FaFacebookF size={30} />,
  instagram: <FaInstagram size={30} />,
  twitter: <FaXTwitter size={30} />,
  github: <FaGithub size={30} />,
  twitch: <FaTwitch size={30} />,
  telegram: <FaTelegram size={30} />,
};

export const socialMediaColors:any = {
  facebook: {
    text: '#fff',
    bg: '#395498',
  },
  instagram: {
    text: '#fff',
    bg: 'radial-gradient(circle farthest-corner at 35% 90%, #fec564, transparent 50%), radial-gradient(circle farthest-corner at 0 140%, #fec564, transparent 50%), radial-gradient(ellipse farthest-corner at 0 -25%, #5258cf, transparent 50%), radial-gradient(ellipse farthest-corner at 20% -50%, #5258cf, transparent 50%), radial-gradient(ellipse farthest-corner at 100% 0, #893dc2, transparent 50%), radial-gradient(ellipse farthest-corner at 60% -20%, #893dc2, transparent 50%), radial-gradient(ellipse farthest-corner at 100% 100%, #d9317a, transparent), linear-gradient(#6559ca, #bc318f 30%, #e33f5f 50%, #f77638 70%, #fec66d 100%)',
  },
  twitter: {
    text: '#fff',
    bg: '#1DA1F2',
  },
  github: {
    text: '#fff',
    bg: '#171717',
  },
  twitch: {
    text: '#fff',
    bg: '#6441A4',
  },
  telegram: {
    text: '#fff',
    bg: '#0084c6',
  },
};
