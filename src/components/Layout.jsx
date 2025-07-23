import Navbar from './Navbar';

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main className="pt-16 p-4 max-w-4xl mx-auto">{children}</main>
    </>
  );
}
