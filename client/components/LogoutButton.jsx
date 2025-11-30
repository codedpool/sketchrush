"use client";

export default function LogoutButton() {
  return (
    <a
      href="/auth/logout"
      className="button logout"
      onClick={() => {
        try {
          localStorage.removeItem("guestUser");
        } catch (e) {}
      }}
    >
      Log Out
    </a>
  );
}
