import React from "react";
import './icon.scss';
import PersonIcon from '@mui/icons-material/Person2Rounded';

interface IconProps {
  icon?: React.ReactElement;
  size?: number;
  color?: string;
  style?: React.CSSProperties;
}

const Icon: React.FC<IconProps> = ({
  icon = <PersonIcon />,
  size = 40,
  color = "black",
  style = {},
}) => {

  const iconWithProps = React.cloneElement(icon, {
    style: { fontSize: size, color, ...icon.props.style },
  });

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        ...style,
      }}
      aria-hidden="true"
    >
      {iconWithProps}
    </span>
  );
};

export default Icon;