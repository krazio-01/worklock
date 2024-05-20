import User from '../models/userModel.js';

const getUserInfo = async (userId) => {
    try {
        const user = await User.findById(userId);

        if (!user) return null;
    
        const { name, email } = user;

        return { name, email };
    } catch (error) {
        console.error('Error fetching user info:', error.message);
        throw error;
    }
}; 

export { getUserInfo };
