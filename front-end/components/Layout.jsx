import Navbar from "./navbar";

export default function Layout({ children }) {
  return (
    <div
      style={{
        minWidth: "100vw",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Navbar />
      <main>{children}</main>
      <div></div>
    </div>
  );
}
