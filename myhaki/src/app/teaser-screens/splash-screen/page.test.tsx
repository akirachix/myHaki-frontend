import { render, screen, act } from "@testing-library/react";
import SplashScreen from "./page";


jest.useFakeTimers();

const mockPush = jest.fn();

jest.mock("next/navigation", () => ({
  __esModule: true,
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe("SplashScreen", () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  it("renders logo, tagline and redirects after 5 seconds", () => {
    render(<SplashScreen />);

    const logo = screen.getByAltText("MyHaki Logo");
    expect(logo).toBeInTheDocument();

 
    expect(screen.getByText("Your choice. Your Justice. Your Haki.")).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(5000);
    });


    expect(mockPush).toHaveBeenCalledWith("/teaser-screens/teaser-screen");
  });
});