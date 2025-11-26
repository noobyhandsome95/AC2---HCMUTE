import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BoxInputLogin } from "../components/sub/BoxInputLogin";
import { ButtonBase } from "../components/sub/ButtonBase";
import { ButtonBrand } from "../components/sub/ButtonBrand";
import { useDispatch, useSelector } from "react-redux";
import  type { AppDispatch, RootState } from "../redux/store";
import { checkAuth, clearError, loginUser } from "../redux/authSlice";

export const LoginForm = () => {

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const location = useLocation();
    const { isLoading, error, isAuthenticated } = useSelector((state: RootState) => state.auth)

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const accessToken = params.get("accessToken");
        if (accessToken) {
            localStorage.setItem("accessToken", accessToken);
            window.history.replaceState({}, document.title, "/");
            dispatch(checkAuth());
        }
    }, [location, dispatch]);

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        } return () => {dispatch(clearError())}
    }, [isAuthenticated, navigate, dispatch]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(loginUser({ email: formData.email, password: formData.password }));
    }

    const handleGoogleLogin = () => {
        window.open(`${import.meta.env.VITE_SERVER_URL}/auth/google`, "_self");
    };

    const handleLinkedInLogin = () => {
        window.open(`${import.meta.env.VITE_SERVER_URL}/auth/linkedin`, "_self");
    };

    return (
        <div className="w-full h-[calc(100vh-60px)] relative">
            <form
                onSubmit={handleSubmit}
                className="absolute-center-x top-1/3 -translate-y-1/2 w-[90%] lg:w-[35%] sm:w-[90%] md:w-[70%] py-12 flex-col-center space-y-4 bg-primary/40 rounded-xl"
            >
                {error && <div className="text-red-500 text-sm font-semibold">{error}</div>}

                <BoxInputLogin 
                    type="email" 
                    name="email" 
                    placeholder="Username or email" 
                    width="w-4/5" 
                    value={formData.email}
                    onChange={handleChange}
                />
                <BoxInputLogin 
                    type="password" 
                    name="password" 
                    placeholder="Password" 
                    width="w-4/5" 
                    value={formData.password}
                    onChange={handleChange}
                />
                <div className="w-4/5 flex-between flex-row">
                    <div className="flex-center">
                        <input
                            type="radio"
                            id="rememberMe"
                            name="rememberMe"
                            className="w-4 h-4 accent-black" 
                        />
                        <label 
                            htmlFor="rememberMe"
                            className="ml-2 text-white"
                        >
                            Remember me
                        </label>
                    </div>
                    <Link 
                        to="/forgot-password"
                        className="text-italic"
                    >
                        Forgot password?
                    </Link>
                </div>
                <ButtonBase 
                    type="submit"
                    name={isLoading ? "Signing In..." : "Sign In"} 
                    width="w-4/5"
                    textColor="text-black"
                    bgColor="bg-white"
                    hoverBgColor="hover:bg-white/70"
                />
                <div className="w-4/5 pt-5 flex-center flex-row gap-2">
                    <div className="text-white">Don't have an account?</div>
                    <Link to="/register" className="text-italic">
                        Sign Up
                    </Link>
                </div>

                <div className="w-4/5 flex-center flex-row space-x-2">
                    <ButtonBrand
                        name="Google"
                        width="w-full"
                        textColor="text-black"
                        bgColor="bg-white"
                        hoverBgColor="hover:bg-gray-300"
                        onClick={handleGoogleLogin}
                    />
                    <ButtonBrand
                        name="Linked In"
                        width="w-full"
                        textColor="text-white"
                        bgColor="bg-blue-800"
                        hoverBgColor="hover:bg-blue-900"
                        onClick={handleLinkedInLogin}
                    />
                </div>
            </form>
        </div>
    );
};
