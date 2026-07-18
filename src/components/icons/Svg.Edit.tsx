import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { colors } from '../../constants';

interface SvgEditProps {
  active?: boolean;
  color?: string | null;
  size?: number;
}

const SvgEdit: React.FC<SvgEditProps> = ({
  active = true,
  color = null,
  size = 24
}) => (
  <Svg height={size} width={size} viewBox="0 0 24 24">
    <Path
      d="M21.7 7.3l-5-5c-.4-.4-1-.4-1.4 0l-13 13c-.2.2-.3.4-.3.7v5c0 .6.4 1 1 1h5c.3 0 .5-.1.7-.3l13-13c.4-.4.4-1 0-1.4zM7.6 20H4v-3.6l12-12L19.6 8l-12 12z"
      fill={color || (active ? colors.white : colors.inactiveGrey)}
    />
  </Svg>
);

export default React.memo(SvgEdit);
