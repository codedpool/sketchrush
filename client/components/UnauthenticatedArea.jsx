"use client";

import { useState, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import LoginButton from "./LoginButton";
import GuestButton from "./GuestButton";
import Profile from "./Profile";
import LogoutButton from "./LogoutButton";

export default function UnauthenticatedArea() {
  const { user, isLoading } = useUser();
  const [guest, setGuest] = useState(null);

  useEffect(() => {
    try {
      const g = localStorage.getItem("guestUser");
      if (g) setGuest(JSON.parse(g));
    } catch (e) {
      setGuest(null);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="loading-state">
        <div className="loading-text">Loading...</div>
      </div>
    );
  }

  if (user || guest) {
    return (
      <div className="logged-in-section">
        <p className="logged-in-message">
          {user ? "✅ Successfully logged in!" : "✅ Continuing as guest"}
        </p>
        <Profile />
        <LogoutButton />
      </div>
    );
  }

  return (
    <>
      <p className="action-text">
        Welcome! Please log in to access your protected content.
      </p>
      <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
        <LoginButton />
        <GuestButton />
      </div>
    </>
  );
}
