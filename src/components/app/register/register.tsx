import RegisterForm from "./register-form";

export default function Register() {
  return (
    <div className="max-w-[400px] w-full bg-background shadow-md rounded-[16px] px-10 py-6 space-y-8">
      <header className="text-center space-y-4">
        <h2 className="text-center text-lg font-bold">
          Momo E-Commerce Registration
        </h2>
        <p className="text-black-3">
          One account, across all apps, just to make things a little easier.
        </p>
      </header>
      <RegisterForm />
    </div>
  );
}
