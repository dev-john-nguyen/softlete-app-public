import React from 'react';
import { SvgXml } from 'react-native-svg';

const svg = `<svg viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.43489 14.9775L9.51452 13.9807L9.43489 14.9775ZM7.7155 14.4863L8.69158 14.2689L7.7155 14.4863ZM9.94043 1.21305L10.504 0.387011L9.94043 1.21305ZM16 8C16 4.68629 13.3137 2 10 2V0C14.4183 0 18 3.58172 18 8H16ZM10 14C13.3137 14 16 11.3137 16 8H18C18 12.4183 14.4183 16 10 16V14ZM9.51452 13.9807C9.67447 13.9935 9.83637 14 10 14V16C9.78316 16 9.56813 15.9913 9.35526 15.9743L9.51452 13.9807ZM8.96594 12.2165C10.7803 11.1824 12 9.23276 12 6.99946H14C14 9.98019 12.3694 12.5788 9.95626 13.9541L8.96594 12.2165ZM12 6.99946C12 4.9392 10.9625 3.12098 9.37682 2.0391L10.504 0.387011C12.6124 1.82557 14 4.25033 14 6.99946H12ZM9.35526 15.9743C8.84562 15.9336 8.34179 15.8963 7.96574 15.8075C7.61825 15.7255 6.91471 15.4907 6.73941 14.7037L8.69158 14.2689C8.65257 14.0937 8.54458 13.9588 8.44067 13.8855C8.36883 13.8349 8.33624 13.84 8.42527 13.861C8.5055 13.88 8.62965 13.8997 8.82262 13.9202C9.01278 13.9405 9.23726 13.9585 9.51452 13.9807L9.35526 15.9743ZM9.95626 13.9541C9.32184 14.3157 8.93134 14.5404 8.69783 14.7137C8.58077 14.8007 8.57822 14.8216 8.60666 14.7803C8.65323 14.7127 8.74772 14.5209 8.69158 14.2689L6.73941 14.7037C6.64314 14.2714 6.78362 13.9012 6.95978 13.6455C7.11779 13.4162 7.32843 13.2395 7.50564 13.1079C7.86069 12.8443 8.38312 12.5487 8.96594 12.2165L9.95626 13.9541ZM10 2C10.4502 2 10.7655 1.67892 10.8566 1.34712C10.9448 1.02566 10.847 0.620982 10.504 0.387011L9.37682 2.0391C8.93985 1.74095 8.81484 1.22975 8.9279 0.817797C9.0438 0.395521 9.43597 0 10 0V2Z" />
<path d="M3.4 6.2L3.4 6.2C3.50137 6.50412 3.55206 6.65618 3.60276 6.7225C3.80288 6.98431 4.19712 6.98431 4.39724 6.7225C4.44794 6.65618 4.49863 6.50412 4.6 6.2L4.6 6.2C4.68177 5.95468 4.72266 5.83201 4.77555 5.72099C4.97291 5.30672 5.30672 4.97291 5.72099 4.77555C5.83201 4.72266 5.95468 4.68177 6.2 4.6L6.2 4.6C6.50412 4.49863 6.65618 4.44794 6.7225 4.39724C6.98431 4.19712 6.98431 3.80288 6.7225 3.60276C6.65618 3.55206 6.50412 3.50137 6.2 3.4L6.2 3.4C5.95468 3.31822 5.83201 3.27734 5.72099 3.22445C5.30672 3.02709 4.97291 2.69329 4.77555 2.27901C4.72266 2.16799 4.68177 2.04532 4.6 1.8C4.49863 1.49588 4.44794 1.34382 4.39724 1.2775C4.19712 1.01569 3.80288 1.01569 3.60276 1.2775C3.55206 1.34382 3.50137 1.49588 3.4 1.8C3.31823 2.04532 3.27734 2.16799 3.22445 2.27901C3.02709 2.69329 2.69329 3.02709 2.27901 3.22445C2.16799 3.27734 2.04532 3.31823 1.8 3.4C1.49588 3.50137 1.34382 3.55206 1.2775 3.60276C1.01569 3.80288 1.01569 4.19712 1.2775 4.39724C1.34382 4.44794 1.49588 4.49863 1.8 4.6C2.04532 4.68177 2.16799 4.72266 2.27901 4.77555C2.69329 4.97291 3.02709 5.30672 3.22445 5.72099C3.27734 5.83201 3.31822 5.95468 3.4 6.2Z" stroke-width="2"/>
</svg>
`;

interface Props {
  color: string;
  size: number | string;
}

class MoonSvg extends React.Component<Props, {}> {
  render() {
    return (
      <SvgXml
        xml={svg}
        width={this.props.size || '100%'}
        height={this.props.size || '100%'}
        fill={this.props.color}
      />
    );
  }
}

export default MoonSvg;
