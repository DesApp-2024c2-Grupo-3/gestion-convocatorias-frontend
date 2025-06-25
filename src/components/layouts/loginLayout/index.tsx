
import React from "react";
import { Row, Col } from 'react-bootstrap';
import "./loginLayout.scss";

interface LoginLayoutProps {
  left: React.ReactNode;
  right: React.ReactNode;
}

const LoginLayout: React.FC<LoginLayoutProps> = ({ left, right }) => (
<Row className="g-0 login-row">
  <Col xs={12} md={6} className="panel-left">{left}</Col>
  <Col xs={12} md={6} className="panel-right">{right}</Col>
</Row>
);

export default LoginLayout;