import { Outlet } from "react-router-dom";

import FloatingMusicPlayer from "../components/FloatingMusicPlayer";

export default function Layout() {
  const musicMap = {
    "/": "/main.mp3",
    "/trade": "/trading.mp3",
    "/close": "/close.mp3",
    "/prifle": "/profile.mp3",
    "/terms": "/main.mp3",
    "/privacy": "/main.mp3",
    "*": "/main.mp3",
  };

  return (
    <>
      <FloatingMusicPlayer musicMap={musicMap} />
      <Outlet />
    </>
  );
}
