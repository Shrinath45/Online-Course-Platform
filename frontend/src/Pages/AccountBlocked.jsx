import React from "react";
import { useNavigate } from "react-router-dom";

const AccountBlocked = () => {
    const navigate = useNavigate();

    // ✅ Get the logged-in user from sessionStorage
    const user = JSON.parse(sessionStorage.getItem("loggedInUser"));
    const userEmail = user?.email || "your-email@example.com";

    // ✅ Gmail link with user email prefilled in the body
    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=skillforgeplatform@gmail.com&su=Account%20Blocked%20Support&body=Hello%20SkillForge%20Team,%0A%0AMy%20account%20(${encodeURIComponent(userEmail)})%20has%20been%20blocked.%20Please%20help%20me%20with%20this.%0A%0AThanks.`;

    const handleContactSupport = () => {
        window.open(gmailLink, "_blank"); // ✅ Open Gmail in a new tab
        navigate("/login"); // ✅ Redirect current tab to login page
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full text-center">
                <h1 className="text-2xl font-bold text-red-600 mb-4">
                    Account Blocked 🚫
                </h1>

                <p className="text-gray-600 mb-6">
                    Your account has been blocked by the administrator.
                    <br />
                    If you believe this is a mistake, please contact support.
                </p>

                <button
                    onClick={handleContactSupport}
                    className="w-full px-6 py-3 rounded-lg font-semibold text-white bg-red-600 hover:bg-red-700 transition"
                >
                    Contact Support
                </button>
            </div>
        </div>
    );
};

export default AccountBlocked;
