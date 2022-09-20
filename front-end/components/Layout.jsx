import { Container } from "@mui/system";

export default function Layout({ children }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container>
        <main>{children}</main>
      </Container>
      <div></div>
    </div>
  );
}
