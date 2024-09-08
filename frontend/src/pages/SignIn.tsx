import { AuthCard } from "../components/AuthCard"
import { Qoute } from "../components/Quote"

export const SignIn = () => {
    return <div className="grid sm:grid-cols-2">
        <AuthCard type="Sign In" />
        <Qoute />
    </div>
}