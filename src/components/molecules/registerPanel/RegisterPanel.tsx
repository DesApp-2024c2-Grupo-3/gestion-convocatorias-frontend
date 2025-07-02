import React from "react";
import { Icon, Link, Panel } from "@/components/atoms";
import './RegisterPanel.scss';
import PersonIcon from '@mui/icons-material/Person2Rounded';
import { gray100 } from '@/styles/colors';
import useIsMobile from "@/hooks/useMobile";

interface RegisterPanelProps {
  onLogin: () => void;
  icon?: React.ReactNode;
}

const RegisterPanel: React.FC<RegisterPanelProps> = ({ onLogin, icon }) => {
  const isMobile = useIsMobile();

  return (
    <Panel
      className="login-panel"
      borderRadius={isMobile ? "10px 10px 0 0" : "10px 0 0 10px"} 
    >
      <p>
        <Icon
          icon={<PersonIcon />}
          size={100}
          color={gray100}
        />
      </p>
      <Link onClick={onLogin} color={gray100}>
        Iniciar sesión
      </Link>
    </Panel>
  );
};

export default RegisterPanel;