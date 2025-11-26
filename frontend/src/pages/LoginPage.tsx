import { LoginForm } from "../forms/LoginForm";

export const LoginPage = () => {
    return (
        <div className="w-full flex-col-center space-y-6">
            <div className="pt-6 w-full flex-col-center">
                <img src="logo-cloud-club-white.png" alt="Logo" className="w-[30%] sm:w-[40%] md:w-[25%] lg:w-[15%] h-auto" />
                <span className="text-white text-xl font-bold font-sans">HCMUTE</span>
            </div>
            <LoginForm />
        </div>
    );
};
