import LoginForm from "./login-form";

export default function Login() {
  return (
    <div className="max-w-[400px] w-full bg-background shadow-md rounded-[16px] px-10 py-6 space-y-8">
      <header className="text-center space-y-4">
        <h2 className="text-center text-lg font-bold">Momo E-Commerce Login</h2>
        <p className="text-black-3">
          Discover your style, keep favorites at your fingertips.
        </p>
      </header>
      <LoginForm />
    </div>
  );
}
