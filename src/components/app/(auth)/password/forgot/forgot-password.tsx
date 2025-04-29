import ForgotPasswordForm from "./forgot-password-form";

export default function ForgotPassword() {
  return (
    <div className="max-w-[400px] w-full bg-background shadow-md rounded-[16px] px-10 py-6 space-y-8">
      <header className="text-center space-y-4">
        <h2 className="text-center text-lg font-bold">
          {"Forgot your password?"}
        </h2>
        <p className="text-black-3 text-sm">
          No problem. Enter your account email address and we’ll send you
          instructions so you can reset your password.
        </p>
      </header>
      <ForgotPasswordForm />
    </div>
  );
}
