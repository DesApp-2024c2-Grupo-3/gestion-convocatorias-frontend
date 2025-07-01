import React from "react";
import { Input, Label, ErrorMessage, Link, Button } from "@/components/atoms";
import './recoverForm.scss';
import { Panel } from "@/components/atoms";
import useIsMobile from "@/hooks/useMobile";

interface RecoverFormProps {
    email: string;
    errors?: {
        email?: string;
    };
    onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.FormEvent) => void;
}

const RecoverForm: React.FC<RecoverFormProps> = ({
    email,
    errors = {},
    onEmailChange,
    onSubmit
}) => {
    const isMobile = useIsMobile();

    return (
        <Panel borderRadius={isMobile ? "0 0 10px 10px" : "0 10px 10px 0"}>
            <form className="login-form" onSubmit={onSubmit}>
                <div className="login-form-inputs margin-b-40">
                    <Label htmlFor="email" className="form-label">
                        Email
                    </Label>
                    <Input
                        type="text"
                        id="email"
                        value={email}
                        onChange={onEmailChange}
                    />
                    {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
                </div>
                <Button type="submit" className="btn-login">
                    Recuperar contraseña
                </Button>
            </form>
        </Panel>
    );
};

export default RecoverForm;