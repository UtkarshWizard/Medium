import { AuthCard } from "../components/AuthCard"
import { Qoute } from "../components/Quote"

export const SignUp = () => {
    return <div className="grid sm:grid-cols-2">
        <AuthCard type="Sign Up" />
        <Qoute />
    </div>
}