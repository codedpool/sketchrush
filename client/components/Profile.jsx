"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import { useState, useEffect } from "react";

export default function Profile() {
  const { user, isLoading } = useUser();
  const [guest, setGuest] = useState(null);

  useEffect(() => {
    if (!user) {
      try {
        const g = localStorage.getItem("guestUser");
        if (g) setGuest(JSON.parse(g));
      } catch (e) {
        setGuest(null);
      }
    } else {
      setGuest(null);
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="loading-state">
        <div className="loading-text">Loading user profile...</div>
      </div>
    );
  }

  if (!user && !guest) {
    return null;
  }

  const displayUser = user ?? guest;

  return (
    <div className="profile-card action-card">
      <img
        src={
          displayUser.picture ||
          `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%2363b3ed'/%3E%3Cpath d='M50 45c7.5 0 13.64-6.14 13.64-13.64S57.5 17.72 50 17.72s-13.64 6.14-13.64 13.64S42.5 45 50 45zm0 6.82c-9.09 0-27.28 4.56-27.28 13.64v3.41c0 1.88 1.53 3.41 3.41 3.41h47.74c1.88 0 3.41-1.53 3.41-3.41v-3.41c0-9.08-18.19-13.64-27.28-13.64z' fill='%23fff'/%3E%3C/svg%3E`
        }
        alt={displayUser.name || "User profile"}
        className="profile-picture"
        onError={(e) => {
          e.target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%2363b3ed'/%3E%3Cpath d='M50 45c7.5 0 13.64-6.14 13.64-13.64S57.5 17.72 50 17.72s-13.64 6.14-13.64 13.64S42.5 45 50 45zm0 6.82c-9.09 0-27.28 4.56-27.28 13.64v3.41c0 1.88 1.53 3.41 3.41 3.41h47.74c1.88 0 3.41-1.53 3.41-3.41v-3.41c0-9.08-18.19-13.64-27.28-13.64z' fill='%23fff'/%3E%3C/svg%3E`;
        }}
      />
      <h2 className="profile-name">{displayUser.name}</h2>
      {displayUser.email ? (
        <p className="profile-email">{displayUser.email}</p>
      ) : null}
    </div>
  );
}
