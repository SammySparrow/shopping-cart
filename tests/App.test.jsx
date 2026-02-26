import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  createMemoryRouter,
  Link,
  RouterProvider,
  useParams,
} from "react-router";
import App from "../src/App";
import ErrorPage from "../src/pages/ErrorPage/ErrorPage";
import userEvent from "@testing-library/user-event";

describe("Route tests", () => {
  const Home = vi.fn(() => <p>mockhome</p>);
  const Checkout = vi.fn(() => <p>mockcheckout</p>);
  const Shop = vi.fn(() => {
    const { pageId } = useParams();
    const testArray = [1, 2, 3, 4, 5];
    if (pageId === "browse") return <p>browsing display</p>;
    if (/[0-9]/.test(pageId))
      return <p>item display {testArray[parseInt(pageId) - 1]}</p>;
  });

  vi.mock(import("../src/components/CartModal/CartModal"), () => ({
    default: vi.fn(),
  }));

  const mockRouter = createMemoryRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <Home /> },
        { path: "shop/:pageId", element: <Shop /> },
        { path: "checkout", element: <Checkout /> },
      ],
    },
  ]);

  it("Initialises home page by default", () => {
    render(<RouterProvider router={mockRouter} />);
    expect(screen.getByRole("paragraph").textContent).toMatch(/mockhome/i);
  });

  it("Checkout link displays checkout page", async () => {
    render(<RouterProvider router={mockRouter} />);
    const user = userEvent.setup();
    const link = screen.getByRole("link", { name: "Checkout" });

    await user.click(link);
    expect(screen.getByRole("paragraph").textContent).toMatch(/mockcheckout/i);
  });

  it("Shop link defaults to browse", async () => {
    render(<RouterProvider router={mockRouter} />);
    const user = userEvent.setup();
    const link = screen.getByRole("link", { name: "Shop" });

    await user.click(link);
    expect(screen.getByText("browsing display")).toBeInTheDocument();
  });

  it("Item links display expected item", async () => {
    const ShopLink = vi.fn(() => <Link to="/shop/3">Click Here</Link>);
    const newShopRoute = createMemoryRouter([
      { path: "/", element: <ShopLink /> },
      { path: "shop/:pageId", element: <Shop /> },
    ]);
    render(<RouterProvider router={newShopRoute} />);
    const user = userEvent.setup();
    const link = screen.getByRole("link", { name: "Click Here" });

    await user.click(link);
    expect(screen.getByText("item display 3")).toBeInTheDocument();
  });

  it("Displays error page if link is not found", async () => {
    const FaultyLink = vi.fn(() => <Link to="faulty">Click Here</Link>);
    const errorRoute = createMemoryRouter([
      { path: "/", element: <FaultyLink />, errorElement: <ErrorPage /> },
    ]);
    render(<RouterProvider router={errorRoute} />);
    const user = userEvent.setup();
    const link = screen.getByRole("link", { name: "Click Here" });

    await user.click(link);
    expect(screen.getByText(/an error/i)).toBeInTheDocument();
  });
});
