// import test
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";

// import component
import Home from "@/app/page";

const messages = { home: { title: "TS Blog", subtitle: "", linkSample: "" } };

describe("Home", () => {
  it("renders heading", () => {
    render(
      <NextIntlClientProvider locale="vi" messages={messages}>
        <Home />
      </NextIntlClientProvider>
    );
    expect(screen.getByRole("heading", { name: /TS Blog/i })).toBeInTheDocument();
  });
});
