import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { InputUnderline } from "@/components/ui/input-underline";
import { Textarea } from "@/components/ui/textarea";

export default function UiPreviewPage() {
  if (process.env.NODE_ENV !== "development") {
    notFound();
  }

  return (
    <main className="flex flex-col items-start gap-8 p-6">
      <h1 className="font-sans text-heading-h2">UI preview</h1>

      <Button variant="primary">View Detail</Button>

      <div className="w-full max-w-sm rounded-md bg-primary-background p-6">
        <InputUnderline placeholder="Your email address" aria-label="Email" />
      </div>

      <div className="w-full max-w-sm">
        <Textarea variant="order-note" aria-label="Order note" />
      </div>

      <div className="flex w-full max-w-sm flex-col gap-6">
        <Input
          variant="text"
          type="email"
          name="email"
          placeholder="Email"
          aria-label="Email"
        />

        <Input
          variant="with-arrow"
          type="email"
          name="newsletterEmail"
          placeholder="Please enter your email"
          aria-label="Newsletter email"
        />

        <Input
          variant="search"
          name="q"
          placeholder="What are you looking for"
          aria-label="Search products"
        />
      </div>

      <div className="flex flex-col items-start gap-5">
        <Checkbox label="Silver" name="color" value="Silver" defaultChecked />
        <Checkbox label="Black" name="color" value="Black" defaultChecked />
        <Checkbox label="Sand" name="color" value="Sand" />
      </div>
    </main>
  );
}
