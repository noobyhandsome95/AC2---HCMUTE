import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkAuth, updateUser } from "../redux/authSlice";
import { ProfileForm } from "../forms/ProfileForm";

export const ProfilePage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    
    const { user, isLoading, isAuthenticated } = useSelector((state: RootState) => state.auth);
    const [ message, setMessage ] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        currentPosition: "",
        education: "",
        country: "",
        province: "",
    });

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            navigate("/login");
        }
    }, [isLoading, isAuthenticated, navigate]);

    useEffect(() => {
        if (isAuthenticated && !user && !isLoading) {
            dispatch(checkAuth());
        }
    }, [isAuthenticated, user, isLoading, dispatch]);

    useEffect(() => {
        if (user) {
            const nameParts = user.displayName ? user.displayName.split(" ") : ["", ""];
            setFormData({
                firstName: user.firstName || nameParts[0] || "",
                lastName: user.lastName || nameParts.slice(1).join(" ") || "",
                currentPosition: user.currentPosition || "",
                education: user.education || "",
                country: user.country || "",
                province: user.province || "",
            });
        }
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSave = async () => {
        setMessage(null);
        const resultAction = await dispatch(updateUser(formData));
        if (updateUser.fulfilled.match(resultAction)) {
            setMessage({ text: "Profile updated successfully!", type: "success" });
        } else {
            setMessage({ text: "Failed to update profile. Please try again.", type: "error" });
        }
    };

    if (isLoading || (!user && isAuthenticated)) {
        return <div className="text-white text-center mt-10">Loading profile...</div>;
    }
    if (!user) return null;

  return (
    <ProfileForm 
        user={user}
        formData={formData}
        loading={isLoading}
        message={message}
        onChange={handleChange}
        onSave={handleSave}
    />
  )
}

