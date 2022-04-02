import './styles/styles.css';
import './styles/styles.scss';
import WebpackLogo from './assets/webpack-logo.png';

const root = document.getElementById('root');

root.innerHTML = `
  <h1>Hello world!</h1>
  <img src="${WebpackLogo}">
  <h2>Tip: Check your console</h2>
`;

console.log("Hello World!");
