"use client"
import { useState } from "react";
import { Card } from "../ui/Card";
import { FormField, Input } from "../ui/FormField";
import { useAuth } from "@/services/userProvider";
import { useRouter } from "next/navigation";
import { Button } from "../ui/Button";

export default function LoginPage(){
    const router = useRouter();
    const [login, setLogin] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string|undefined>();
    const {logIn} = useAuth();

    function handleLogin(){
        logIn(login, password).then(()=>{
            router.push("admin")
        }).catch((e)=>{
            setError(e);
        })
    }

    return(
        <div className="flex w-full justify-center">
            <Card className="w-full max-w-[500px]">
                <FormField label="Login" id="login">
                    <Input 
                        id="login"
                        type="text"
                        placeholder="Wpisz login..."
                        value={login}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setLogin(e.target.value)
                        }
                    />
                </FormField>
                <FormField label="Hasło" id="password">
                    <Input 
                        id="password"
                        type="password"
                        placeholder="Wpisz hasło..."
                        value={password}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setPassword(e.target.value)
                        }
                    />
                </FormField>
                {error && <p className="text-red-500">{error}</p>}
                <Button onClick={handleLogin}>Login</Button>
            </Card>
        </div>

    );
}