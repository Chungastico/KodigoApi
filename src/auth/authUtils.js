export const isAuthenticated = () => {
    return !!localStorage.getItem("token");
};

export const getUserData = () => {
    try {
        const userStr = localStorage.getItem("user");
        return userStr ? JSON.parse(userStr) : null;
    } catch (err) {
        console.error("Error al obtener el usuario:", err);
        return null;
    }
};

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
};
