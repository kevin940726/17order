import pkg from '../../package.json';

export const isDev = process.env.NODE_ENV === 'development';

export default pkg;
