import React from "react";
import { Col, Row } from "react-bootstrap";
import { LoginLayout } from "@/components/layouts";
import { Logo } from "@/components/atoms";

interface LoginTemplateProps {
  leftPanel: React.ReactNode;
  rightForm: React.ReactNode;
}

const LoginTemplate: React.FC<LoginTemplateProps> = ({ leftPanel, rightForm }) => (
  <div className="container-login">
    <Row>
      <Logo />
    </Row>
    <Row className="d-flex justify-content-center">
      <Col md={8} xs={12}>
        <LoginLayout left={leftPanel} right={rightForm} />
      </Col>
    </Row>
  </div>
);

export default LoginTemplate;