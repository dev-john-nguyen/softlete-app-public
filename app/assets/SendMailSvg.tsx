import React from 'react';
import { SvgXml } from 'react-native-svg';

const svg = `<svg  viewBox="0 0 201 177"  xmlns="http://www.w3.org/2000/svg">
<path d="M146.905 30.6224L7.87176 0.630752L6.06491 0.241897C5.14478 0.0420527 4.18693 0.105964 3.30151 0.426284C2.41609 0.746603 1.63905 1.3103 1.05975 2.0526C0.480454 2.79489 0.122411 3.68561 0.0268213 4.62233C-0.068768 5.55905 0.101986 6.50373 0.519406 7.34773L55.7211 119.449C56.0783 120.169 56.6034 120.793 57.2521 121.268C57.9007 121.743 58.654 122.055 59.4485 122.178C60.2455 122.302 61.0607 122.231 61.8237 121.969C62.5866 121.707 63.2744 121.264 63.8277 120.677L102.169 80.2488C102.442 79.9539 102.773 79.7188 103.141 79.558C103.509 79.3972 103.907 79.3144 104.308 79.3147C104.854 79.307 105.392 79.4479 105.864 79.7224C106.336 79.9968 106.724 80.3945 106.988 80.8727L114.841 95.399C115.343 96.3676 116.154 97.1405 117.145 97.5949C118.137 98.0492 119.252 98.1588 120.312 97.9062L120.352 97.8976C121.425 97.6701 122.392 97.0881 123.095 96.2453C123.798 95.4024 124.197 94.3475 124.229 93.2503L125.802 59.7185C125.821 59.3001 125.925 58.89 126.109 58.5137C126.306 58.1413 126.574 57.8107 126.897 57.5404L149.017 39.3829C149.744 38.7861 150.288 37.9965 150.587 37.1047C150.886 36.2128 150.928 35.2548 150.707 34.3403C150.487 33.4259 150.013 32.5921 149.34 31.9346C148.668 31.277 147.824 30.8222 146.904 30.6224H146.905ZM147.754 37.8393L125.634 55.9969C125.346 56.2291 125.085 56.493 124.855 56.7836L7.62048 3.61537C7.51708 3.56726 7.40922 3.52944 7.29843 3.50239C6.84624 3.38584 6.36753 3.43099 5.9451 3.63002C5.52267 3.82905 5.18306 4.16946 4.98504 4.59236C4.78702 5.01527 4.74302 5.49406 4.86065 5.94597C4.97828 6.39788 5.25016 6.7945 5.62924 7.06718L102.023 77.8746C101.533 78.1289 101.092 78.4657 100.717 78.8701L62.3758 119.298C62.0431 119.648 61.6308 119.913 61.1739 120.069C60.7171 120.226 60.2292 120.27 59.7517 120.198C59.2742 120.125 58.8211 119.939 58.4311 119.654C58.0411 119.369 57.7256 118.994 57.5115 118.561L2.30984 6.46001C2.06306 5.9535 1.9635 5.38786 2.02252 4.82753C2.08154 4.2672 2.29675 3.7347 2.64364 3.29072C2.99054 2.84675 3.45517 2.50915 3.98459 2.31636C4.514 2.12357 5.08693 2.08335 5.63809 2.2003L7.48785 2.60002L146.477 32.5809C147.029 32.7004 147.536 32.9728 147.94 33.3671C148.345 33.7613 148.63 34.2615 148.763 34.8102C148.896 35.3589 148.872 35.934 148.694 36.4697C148.515 37.0055 148.189 37.4801 147.754 37.8393V37.8393Z" />
<path d="M146.905 30.6224L7.87176 0.630752L6.06491 0.241897C5.14478 0.0420527 4.18693 0.105964 3.30151 0.426284C2.41609 0.746603 1.63905 1.3103 1.05975 2.0526C0.480454 2.79489 0.122411 3.68561 0.0268213 4.62233C-0.068768 5.55905 0.101986 6.50373 0.519406 7.34773L55.7211 119.449C56.0783 120.169 56.6034 120.793 57.2521 121.268C57.9007 121.743 58.654 122.055 59.4485 122.178C60.2455 122.302 61.0607 122.231 61.8237 121.969C62.5866 121.707 63.2744 121.264 63.8277 120.677L102.169 80.2488C102.442 79.9539 102.773 79.7188 103.141 79.558C103.509 79.3972 103.907 79.3144 104.308 79.3147C104.854 79.307 105.392 79.4479 105.864 79.7224C106.336 79.9968 106.724 80.3945 106.988 80.8727L114.841 95.399C115.343 96.3676 116.154 97.1405 117.145 97.5949C118.137 98.0492 119.252 98.1588 120.312 97.9062L120.352 97.8976C121.425 97.6701 122.392 97.0881 123.095 96.2453C123.798 95.4024 124.197 94.3475 124.229 93.2503L125.802 59.7185C125.821 59.3001 125.925 58.89 126.109 58.5137C126.306 58.1413 126.574 57.8107 126.897 57.5404L149.017 39.3829C149.744 38.7861 150.288 37.9965 150.587 37.1047C150.886 36.2128 150.928 35.2548 150.707 34.3403C150.487 33.4259 150.013 32.5921 149.34 31.9346C148.668 31.277 147.824 30.8222 146.904 30.6224H146.905ZM147.754 37.8393L125.634 55.9969C125.346 56.2291 125.085 56.493 124.855 56.7836C124.649 57.0421 124.47 57.3219 124.323 57.6184C124.169 57.9215 124.047 58.2402 123.96 58.5691L123.962 58.5789C123.871 58.9215 123.818 59.2733 123.805 59.6277L122.232 93.1594C122.219 93.8187 121.982 94.4539 121.56 94.9605C121.138 95.4671 120.556 95.815 119.909 95.947L119.89 95.9513C119.253 96.1095 118.582 96.0479 117.985 95.7767C117.387 95.5054 116.899 95.0404 116.599 94.4569L108.744 79.9209C108.339 79.1732 107.75 78.5414 107.032 78.0853C106.315 77.6292 105.493 77.3641 104.644 77.315L104.634 77.3171C104.52 77.3117 104.406 77.3062 104.295 77.3103C103.503 77.3107 102.723 77.5044 102.023 77.8746C101.534 78.1289 101.092 78.4657 100.717 78.8701L62.3758 119.298C62.0431 119.648 61.6308 119.913 61.174 120.069C60.7171 120.226 60.2292 120.27 59.7517 120.198C59.2742 120.125 58.8212 119.939 58.4311 119.654C58.0411 119.369 57.7257 118.994 57.5115 118.561L2.30984 6.46001C2.06306 5.9535 1.9635 5.38786 2.02252 4.82753C2.08154 4.2672 2.29675 3.7347 2.64364 3.29072C2.99054 2.84675 3.45517 2.50915 3.98459 2.31636C4.514 2.12357 5.08693 2.08335 5.63809 2.2003L7.48785 2.60002L146.477 32.5809C147.029 32.7004 147.536 32.9728 147.94 33.3671C148.345 33.7613 148.63 34.2615 148.763 34.8102C148.896 35.3589 148.872 35.934 148.694 36.4697C148.515 37.0055 148.189 37.4801 147.754 37.8393V37.8393Z" />
<path d="M125.3 56.9829L124.474 58.8045L123.963 58.5794L123.961 58.5696L6.819 5.45272L104.635 77.3176L104.645 77.3155L104.904 77.5142L103.724 79.127L102.023 77.8751L5.63004 7.06762C5.25096 6.79493 4.97908 6.39835 4.86145 5.94643C4.74382 5.49452 4.78782 5.0157 4.98584 4.5928C5.18386 4.16989 5.52347 3.82949 5.9459 3.63046C6.36833 3.43142 6.84704 3.38628 7.29923 3.50283C7.41002 3.52988 7.51788 3.56773 7.62128 3.61584L124.856 56.784L125.3 56.9829Z" />
<path d="M118 135L159 176" />
<path d="M159 126L200 167" />
<path d="M159 79L200 120" />
</svg>
`;

interface Props {
  size?: number;
  color?: string;
}

class SendMailSvg extends React.Component<Props> {
  render() {
    return (
      <SvgXml
        xml={svg}
        width={this.props.size || '100%'}
        height={this.props.size || '100%'}
        fill={this.props.color}
        stroke={this.props.color}
      />
    );
  }
}

export default SendMailSvg;