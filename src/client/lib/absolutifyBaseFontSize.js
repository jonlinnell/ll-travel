import { baseFontSize } from '../styles/theme.json';

const NumberRegexp = new RegExp(/[0-9]+/);

export default () => NumberRegexp.exec(baseFontSize)[0];
