import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { colors } from '../../constants';

interface SvgHomeProps {
  active?: boolean;
  color?: string | null;
  size?: number;
}

const SvgHome: React.FC<SvgHomeProps> = ({
  active = true,
  color = null,
  size = 32
}) => (
  <Svg height={size} width={size} viewBox="0 0 36 36">
    <Path
      d="M26.882 19.414v10.454h-5.974v-5.227h-5.974v5.227H8.961V19.414H5.227L17.921 6.72l12.694 12.694h-3.733z"
      fill={color || (active ? colors.white : colors.inactiveGrey)}
    />
  </Svg>
);

export default React.memo(SvgHome);
