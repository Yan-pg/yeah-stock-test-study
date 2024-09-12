import { parseCookies } from "nookies";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export function PublicLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = parseCookies(null).token;

    if (token) {
      navigate("/");
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-96">
        <Outlet />
      </div>
    </div>
  );
}
