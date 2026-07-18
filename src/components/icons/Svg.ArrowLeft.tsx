import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { colors } from '../../constants';

interface SvgArrowLeftProps {
  active?: boolean;
  color?: string | null;
  size?: number;
}

const SvgArrowLeft: React.FC<SvgArrowLeftProps> = ({
  active = true,
  color = null,
  size = 24
}) => (
  <Svg height={size} width={size} viewBox="0 0 24 24">
    <Path
      d="M10.4 12l5.3-5.3c.4-.4.4-1 0-1.4s-1-.4-1.4 0l-6 6c-.4.4-.4 1 0 1.4l6 6c.2.2.5.3.7.3s.5-.1.7-.3c.4-.4.4-1 0-1.4L10.4 12z"
      fill={color || (active ? colors.white : colors.inactiveGrey)}
    />
  </Svg>
);

export default React.memo(SvgArrowLeft);
