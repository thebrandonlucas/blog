// The ?raw is needed to get the raw svg string, otherwise it will be the file path
import moon from './svg/moon.svg?raw';
import sun from './svg/sun.svg?raw';
import twitter from './svg/twitter.svg?raw';
import github from './svg/github.svg?raw';

const icons = {
	moon,
	sun,
	twitter,
	github
};

export type IconName = keyof typeof icons;
export default icons;
