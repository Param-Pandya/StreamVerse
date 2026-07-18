import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { colors } from '../../constants';

interface SvgDownloadsProps {
  active?: boolean;
  color?: string | null;
  fill?: number | string | null;
  size?: number;
}

const SvgDownloads: React.FC<SvgDownloadsProps> = ({
  active = true,
  color = null,
  fill = null,
  size = 24
}) => {
  const fillColor =
    color || (typeof fill === 'string' ? fill : null) || (active ? colors.white : colors.inactiveGrey);

  return (
    <Svg height={size} width={size} viewBox="0 0 20 20">
      <Path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" fill={fillColor} />
    </Svg>
  );
};

export default React.memo(SvgDownloads);
