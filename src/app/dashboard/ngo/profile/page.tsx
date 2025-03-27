"use client"; // ✅ Mark this as a client component

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation"; // ✅ Use next/navigation for Next.js
import axios from "axios";

const NGOProfile = () => {
    const params = useParams(); // ✅ Get params safely
    const id = params?.id as string | undefined; // ✅ Explicitly type and handle null
    const [profile, setProfile] = useState<FormData | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    
    interface FormData {
        isVerified: boolean;
        name: string;
        email: string;
        address: string;
        phone: string;
    }

    const [formData, setFormData] = useState<FormData>({
        isVerified: false,
        name: "",
        email: "",
        address: "",
        phone: "",
    });
    const [showVerificationAlert, setShowVerificationAlert] = useState(false);

    useEffect(() => {
        if (!id) return; // ✅ Avoid running the effect if ID is not available

        axios
            .get<FormData>(`/api/ngos/${id}`)
            .then((response) => {
                setProfile(response.data as FormData);
                setFormData(response.data);
            })
            .catch((error) => console.error("Error fetching profile:", error));
    }, [id]);

    const handleEdit = () => setIsEditing(true);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        axios
            .put(`/api/ngos/${id}`, formData)
            .then((response) => {
                setProfile(response.data as FormData);
                setIsEditing(false);
            })
            .catch((error) => console.error("Error updating profile:", error));
    };

    const handleVerify = () => {
        axios
            .post(`/api/ngos/${id}/verify`)
            .then(() => setShowVerificationAlert(true))
            .catch((error) => console.error("Verification failed:", error));
    };

    if (!profile) return <p>Loading...</p>;

    return (
        <div className="flex h-screen">
            <div className="flex-grow p-6">
                <h1 className="text-2xl font-bold">NGO Profile</h1>
                <div className="mt-4">
                    {!isEditing ? (
                        <div>
                            <p>
                                <strong>Name:</strong> {profile.name}
                            </p>
                            <p>
                                <strong>Email:</strong> {profile.email}
                            </p>
                            <p>
                                <strong>Address:</strong> {profile.address}
                            </p>
                            <p>
                                <strong>Phone:</strong> {profile.phone}
                            </p>
                            <p>
                                <strong>Verification Status:</strong>{" "}
                                {profile.isVerified ? "Verified" : "Not Verified"}
                            </p>
                            <button
                                onClick={handleEdit}
                                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
                            >
                                Edit
                            </button>
                            {!profile.isVerified && (
                                <button
                                    onClick={handleVerify}
                                    className="mt-2 ml-2 bg-green-500 text-white px-4 py-2 rounded"
                                >
                                    Verify
                                </button>
                            )}
                            {showVerificationAlert && (
                                <p className="mt-2 text-green-600">
                                    Verification request sent!
                                </p>
                            )}
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="block border p-2 w-full"
                            />
                            <input
                                type="text"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="block border p-2 w-full mt-2"
                            />
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                className="block border p-2 w-full mt-2"
                            />
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="block border p-2 w-full mt-2"
                            />
                            <button
                                type="submit"
                                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
                            >
                                Save
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NGOProfile;
