import React from 'react';
import { SvgXml } from 'react-native-svg';

const svg = `<svg  viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg">
<path d="M19.7274 20.4471C19.2716 19.1713 18.2672 18.0439 16.8701 17.2399C15.4729 16.4358 13.7611 16 12 16C10.2389 16 8.52706 16.4358 7.12991 17.2399C5.73276 18.0439 4.72839 19.1713 4.27259 20.4471" stroke-width="2" stroke-linecap="round"/>
<circle cx="12" cy="8" r="4" stroke-width="2" stroke-linecap="round"/>
</svg>`;

interface Props {
  strokeColor: string;
  size?: number;
}

class PersonSvg extends React.Component<Props, {}> {
  render() {
    return (
      <SvgXml
        xml={svg}
        width={this.props.size || '100%'}
        height={this.props.size || '100%'}
        stroke={this.props.strokeColor}
      />
    );
  }
}

export default PersonSvg;
