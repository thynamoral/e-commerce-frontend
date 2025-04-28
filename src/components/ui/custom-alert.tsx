import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./alert";
import { Button } from "./button";
import Link from "next/link";

type CustomAlertProps = {
  title: string;
  description?: string;
  type: "success" | "error" | "warning" | "info";
};

export default function CustomAlert({
  title,
  description,
  type,
}: CustomAlertProps) {
  return (
    <Alert
      variant={type === "error" ? "destructive" : "default"}
      className="w-fit"
    >
      <AlertCircle />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>
        {description}
        {type === "error" && (
          <Button variant="link" className="text-left">
            <Link href="/">{"Back to home"}</Link>
          </Button>
        )}
      </AlertDescription>
    </Alert>
  );
}
