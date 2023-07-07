import { Outlet } from "react-router-dom";

export const Root = () => {
  return (
    <div>
      <h1>Root</h1>
      <main>
        <Outlet />
      </main>
    </div>
  );
};
