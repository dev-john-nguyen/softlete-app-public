import React from 'react';
import { SvgXml } from 'react-native-svg';

const svg = `<svg viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="15" cy="2" r="2" />
<path d="M9.05341 8.79128L8.38477 7.23113C8.09006 6.54348 7.94271 6.19966 7.75714 5.97631C7.19057 5.29437 6.24265 5.06683 5.42826 5.41728C5.16152 5.53206 4.87416 5.77154 4.29943 6.25048L4.29943 6.25048C3.5352 6.88734 3.15308 7.20577 2.83206 7.55715C1.87336 8.6065 1.25682 9.92284 1.06442 11.3311C1 11.8027 1 12.311 1 13.3276C1 13.9476 1 14.2575 1.06524 14.5067C1.24831 15.2057 1.79426 15.7517 2.49334 15.9348C2.74247 16 3.04572 16 3.65221 16H15.2654C15.9488 16 16.2905 16 16.569 15.9174C17.2176 15.7249 17.7249 15.2176 17.9174 14.569C18 14.2905 18 13.9488 18 13.2654C18 12.6671 18 12.3679 17.9585 12.0819C17.8627 11.4228 17.604 10.7981 17.2056 10.2643C17.0328 10.0328 16.8212 9.82121 16.3981 9.39812L16.1877 9.18767C15.4664 8.46637 15.1057 8.10572 14.6968 7.95373C14.2473 7.78666 13.7527 7.78666 13.3032 7.95373C12.8943 8.10572 12.5336 8.46637 11.8123 9.18767L11.6992 9.30081C11.1138 9.88616 10.8212 10.1788 10.5102 10.2334C10.2685 10.2758 10.0197 10.2279 9.81101 10.0988C9.54254 9.9326 9.3795 9.55216 9.05341 8.79129L9.05341 8.79128Z" stroke-width="2"/>
</svg>
`;

interface Props {
  color: string;
  size?: number | string;
}

class PyramidSvg extends React.Component<Props> {
  render() {
    return (
      <SvgXml
        xml={svg}
        width={this.props.size || '100%'}
        height={this.props.size || '100%'}
        stroke={this.props.color}
      />
    );
  }
}

export default PyramidSvg;
