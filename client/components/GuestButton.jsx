"use client";

export default function GuestButton() {
  const handleGuest = () => {
    try {
      localStorage.setItem(
        "guestUser",
        JSON.stringify({ name: "Guest", email: "" })
      );
      // reload so client components pick up guest state
      window.location.reload();
    } catch (e) {
      // noop
    }
  };

  return (
    <button className="button guest" onClick={handleGuest}>
      Continue as guest
    </button>
  );
}
