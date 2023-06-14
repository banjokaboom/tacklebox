import Nav from "./nav";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-cyan-600 mx-auto">
      <div className="max-w-5xl w-full">
        <h1 className="text-3xl">TackleBox</h1>

        <Nav></Nav>
      </div>
    </main>
  );
}
