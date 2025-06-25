import React from "react";
import { Icon, Link, Panel } from "@/components/atoms";
import './loginPanel.scss';
import PersonIcon from '@mui/icons-material/Person2Rounded';
import { gray100 } from '@/styles/colors';
import useIsMobile from "@/hooks/useMobile";

interface LoginPanelProps {
  onRegister: () => void;
  icon?: React.ReactNode;
}

const LoginPanel: React.FC<LoginPanelProps> = ({ onRegister, icon }) => {
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
      <h3>Iniciar sesión</h3>
      <p>¿No tienes cuenta?</p>
      <Link onClick={onRegister} color={gray100}>
        Regístrate
      </Link>
    </Panel>
  );
};

export default LoginPanel;