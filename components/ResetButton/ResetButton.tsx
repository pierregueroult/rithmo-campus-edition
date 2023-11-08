"use client";

export default function ResetButton(): JSX.Element {
  const reset = () => {
    localStorage.removeItem("session");
    localStorage.removeItem("tracks");
    window.location.reload();
  };

  return <button onClick={reset}>Quitter la session</button>;
}
