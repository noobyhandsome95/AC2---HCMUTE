import User from "../models/User.ts";

export const authMe = async(req, res) => {
    try {
        const userId = req.user?._id || req.userId;
        const user = await User.findById(userId).select('-hashedPassword');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json(user);
    } catch (error) {
        console.error('Error during authMe:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateUserProfile = async (req, res) => {
    try {
        const userId = req.user._id;
        const { 
            firstName, 
            lastName, 
            currentPosition, 
            education, 
            country, 
            province 
        } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.firstName = firstName || user.firstName;
        user.lastName = lastName || user.lastName;
        user.currentPosition = currentPosition || user.currentPosition;
        user.education = education || user.education;
        user.country = country || user.country;
        user.province = province || user.province;

        if (firstName && lastName) {
            user.displayName = `${firstName} ${lastName}`;
        }
        await user.save();

        const updatedUser = user.toObject();
        delete updatedUser.hashedPassword;

        return res.status(200).json(updatedUser);
    } catch (error) {
        console.error("Error updating profile:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};