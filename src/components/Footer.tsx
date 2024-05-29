import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { MailIcon } from "lucide-react";


export default function Footer() {
  // get the current time in UTC+1 time zone
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      date.setHours(date.getHours());
      setTime(
        date.toLocaleTimeString("en-US", {
          hour12: true,
          hour: "numeric",
          minute: "numeric",
        })
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="w-full bg-gradient-to-t from-primary/[1%] to-transparent">
      <div className="container mx-auto flex flex-row items-center justify-between py-6">
        <span className="flex flex-row items-center space-x-4">
          <p className="text-xs clash-grotesk">
            Made with by{" "}
            <Link
              href="https://www.linkedin.com/in/john-leonard-cedric-bides-5a06362a1/"
              target="_blank"
              passHref
              className="text-sm font-semibold clash-grotesk"
            >
              Cedric Bides
            </Link>
          </p>
          <hr className="hidden h-6 border-l border-muted md:flex" />
          <span className="flex hidden flex-row items-center space-x-2 md:flex">
            <p className="text-xs clash-grotesk">Local time:</p>
            <p className="text-sm font-semibold clash-grotesk">{time} UTC+1</p>
          </span>
        </span>
        <Link href="/assets/blue-professional-modern-CV-resume-2.pdf" download>
    <Button variant={"outline"} className="text-xs text-muted-foreground hover:text-foreground">
      <MailIcon className="h-4 w-4 md:mr-2 clash-grotesk" />
      <span className="hidden md:flex clash-grotesk">Download Resume</span>
    </Button>
  </Link>
      </div>
      <div className="h-1 bg-[radial-gradient(closest-side,#8486ff,#42357d,#5d83ff,transparent)] opacity-50" />
    </footer>
  );
}
