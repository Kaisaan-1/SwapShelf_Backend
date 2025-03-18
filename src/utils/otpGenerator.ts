export const generateOtp = async () => {
    try {
        let otp = `${Math.floor(10000 + Math.random() * 90000)}`;
        return otp;
    } catch (error) {
        throw error
    }
};