import Link from "next/link";
import "@/styles/notfound.css";

export default function NotFound() {
  return (
    <div className="notfound-container">
      <div className="notfound-card">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>
          Oops! The page you are looking for doesn&apos;t exist or has been moved.
        </p>

        <Link href="/" className="home-btn">
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
