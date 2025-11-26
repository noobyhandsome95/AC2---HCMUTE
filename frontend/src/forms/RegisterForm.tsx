import { useState } from "react";
import { BoxInputLogin } from "../components/sub/BoxInputLogin";
import { Link, useNavigate } from "react-router-dom";
import { ButtonBase } from "../components/sub/ButtonBase";
import { ButtonBrand } from "../components/sub/ButtonBrand";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";
import { registerUser } from "../redux/authSlice";

export const RegisterForm = () => {
    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        password: "",
    });
    const [successMsg, setSuccessMsg] = useState("");

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { isLoading, error } = useSelector((state: RootState) => state.auth);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("submitting form...");

        const nameParts = formData.fullname.trim().split(" ");
        const firstName = nameParts[0] || "User";
        const lastName = nameParts.slice(1).join(" ") || ".";

        const registerData = {
            email: formData.email,
            password: formData.password,
            firstName,
            lastName,
        };

        console.log("Data sent to backend:", registerData);

        const resultAction = await dispatch(registerUser(registerData));
        if (registerUser.fulfilled.match(resultAction)) {
            setSuccessMsg("Registration successful! Redirecting to login...");
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } else {
            console.error("Register failed:", resultAction.payload);
        }
    };

    return (
        <div className="w-full h-[calc(100vh-60px)] relative">
            <form
                onSubmit={handleSubmit}
                className="absolute-center-x top-1/3 -translate-y-1/2 w-[90%] lg:w-[35%] sm:w-[90%] md:w-[70%] py-6 md:py-12 lg:py-12 flex-col-center space-y-4 bg-primary/40 rounded-xl"
            >
                {error && <div className="text-red-500 text-sm font-semibold px-4 text-center">{error}</div>}
                {successMsg && <div className="text-green-400 text-sm font-semibold">{successMsg}</div>}

                <BoxInputLogin
                    type="text"
                    name="fullname"
                    placeholder="Full Name"
                    width="w-4/5"
                    value={formData.fullname}
                    onChange={handleChange}
                />
                <BoxInputLogin
                    type="email"
                    name="email"
                    placeholder="Email"
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

                <div className="w-4/5 mt-2">
                    <ButtonBase
                        type="submit"
                        name={isLoading ? "Loading..." : "Sign Up"}
                        width="w-full"
                        textColor="text-black"
                        bgColor="bg-white"
                        hoverBgColor="hover:bg-white/70"
                        disabled={isLoading}
                    />
                </div>

                <div className="w-4/5 pt-5 flex-center flex-row gap-2">
                    <div className="text-white">Already have an account?</div>
                    <Link to="/login" className="text-italic">
                        Sign In
                    </Link>
                </div>

                <div className="w-4/5 flex-center flex-row space-x-2">
                    <ButtonBrand
                        name="Google"
                        width="w-full"
                        textColor="text-black"
                        bgColor="bg-white"
                        hoverBgColor="hover:bg-gray-300"
                    />
                    <ButtonBrand
                        name="Linked In"
                        width="w-full"
                        textColor="text-white"
                        bgColor="bg-blue-800"
                        hoverBgColor="hover:bg-blue-900"
                    />
                </div>
            </form>
        </div>
    );
};
