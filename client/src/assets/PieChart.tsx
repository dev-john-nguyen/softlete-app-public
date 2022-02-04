import React from 'react';
import { SvgXml } from 'react-native-svg';

const svg = () => `<svg width="78" height="78" viewBox="0 0 78 78" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M39 6.99997L39 -2.67029e-05C28.2606 -2.67029e-05 18.5379 4.44236 11.5 11.5L16.3726 16.3726C22.1634 10.5817 30.1634 6.99997 39 6.99997Z" fill="#C4C4C4"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.99999 39C6.99999 39 6.99999 39 6.99999 39C6.99999 30.1634 10.5817 22.1634 16.3726 16.3726L11.5 11.5C4.44236 18.5379 -2.47955e-05 28.2606 -2.47955e-05 39H6.99999Z" fill="#C4C4C4"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7 39C7 39 7 39 7 39C7 47.8366 10.5817 55.8366 16.3726 61.6274L11.5 66.5C4.44236 59.4621 -3.05176e-05 49.7394 -3.05176e-05 39H7Z" fill="#C4C4C4"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M39 71L39 78C28.2606 78 18.5379 73.5576 11.5 66.5L16.3726 61.6274C22.1635 67.4183 30.1635 71 39 71Z" fill="#C4C4C4"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M39 71L39 78C49.7394 78 59.4621 73.5576 66.5 66.5L61.6274 61.6274C55.8366 67.4183 47.8366 71 39 71Z" fill="#C4C4C4"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M71 39C71 39 71 39 71 39C71 47.8366 67.4183 55.8366 61.6274 61.6274L66.5 66.5C73.5576 59.4621 78 49.7394 78 39H71Z" fill="#C4C4C4"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M71 39C71 39 71 39 71 39C71 30.1634 67.4183 22.1634 61.6274 16.3726L66.5 11.5C73.5576 18.5379 78 28.2606 78 39H71Z" fill="#C4C4C4"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M39 6.99997L39 -2.5292e-05C49.7394 -2.5292e-05 59.4621 4.44236 66.5 11.5L61.6274 16.3726C55.8366 10.5817 47.8366 6.99997 39 6.99997Z" fill="#8C0000"/>
</svg>`

interface Props {

}

class PieChart extends React.Component<Props, {}> {
    render() {
        return (
            <SvgXml xml={svg()} width='100%' height='100%' />
        )
    }
}

export default PieChart