import { RedirectLinkButton } from "./button";

export default function ErrorRedirect() {
  return (
    <div>
      <h2 className="text-red-500 text-2xl font-bold">
        {"Oops, Something went wrong!"}
      </h2>
      <RedirectLinkButton to="/">Go back to home</RedirectLinkButton>
    </div>
  );
}
