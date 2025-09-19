import React from "react";
import Image from "next/image";
import { render, fireEvent, screen } from "@testing-library/react";
import CalendarPopup from ".";


jest.mock('next/image', () => ({
    __esModule: true,
    default: (props: any) => {
      return <Image {...props} />;
    },
  }));

  describe("CalendarPopup", () => {
  const defaultDate = new Date(2025, 2, 1);
  let onChangeMock: jest.Mock;

  beforeEach(() => {
    onChangeMock = jest.fn();
    jest.clearAllMocks();
  });

  it("renders calendar button", () => {
    render(<CalendarPopup value={defaultDate} onChange={onChangeMock} />);
    expect(screen.getByLabelText("Open month/year picker")).toBeInTheDocument();
    expect(screen.queryByText("Select Period")).not.toBeInTheDocument();
  });

  it("opens popup on button click", () => {
    render(<CalendarPopup value={defaultDate} onChange={onChangeMock} />);
    fireEvent.click(screen.getByLabelText("Open month/year picker"));
    expect(screen.getByText("Select Period")).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: /^Select / })).toHaveLength(12);
  });

  it("closes popup on close button click", () => {
    render(<CalendarPopup value={defaultDate} onChange={onChangeMock} />);
    fireEvent.click(screen.getByLabelText("Open month/year picker"));
    const closeButton = screen.getByLabelText("Close");
    fireEvent.click(closeButton);
    expect(screen.queryByText("Select Period")).not.toBeInTheDocument();
  });

  it("calls onChange with correct date when a month is selected", () => {
    render(<CalendarPopup value={defaultDate} onChange={onChangeMock} />);
    fireEvent.click(screen.getByLabelText("Open month/year picker"));
    const augustBtn = screen.getByRole("button", { name: "Select August" });
    fireEvent.click(augustBtn);
    expect(onChangeMock).toHaveBeenCalledTimes(1);
    const expectedDate = new Date(defaultDate.getFullYear(), 7, 1);
    expect(onChangeMock).toHaveBeenCalledWith(expectedDate);
    expect(screen.queryByText("Select Period")).not.toBeInTheDocument();
  });

  it("calls onChange with correct date when year is changed", () => {
    render(<CalendarPopup value={defaultDate} onChange={onChangeMock} />);
    fireEvent.click(screen.getByLabelText("Open month/year picker"));
    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "2030" } });
    expect(onChangeMock).toHaveBeenCalledTimes(1);
    const expectedDate = new Date(2030, defaultDate.getMonth(), 1);
    expect(onChangeMock).toHaveBeenCalledWith(expectedDate);
  });

  it("shows selected month and year correctly", () => {
    render(<CalendarPopup value={defaultDate} onChange={onChangeMock} />);
    fireEvent.click(screen.getByLabelText("Open month/year picker"));
    expect(screen.getByText("Selected: March 2025")).toBeInTheDocument();
  });

  it("highlights the selected month", () => {
    render(<CalendarPopup value={defaultDate} onChange={onChangeMock} />);
    fireEvent.click(screen.getByLabelText("Open month/year picker"));
    const marchBtn = screen.getByRole("button", { name: "Select March" });
    expect(marchBtn).toHaveClass("bg-[#621616]");
    expect(marchBtn).toHaveClass("text-white");
  });

  it("renders year options correctly", () => {
    render(<CalendarPopup value={defaultDate} onChange={onChangeMock} />);
    fireEvent.click(screen.getByLabelText("Open month/year picker"));
    const currentYear = new Date().getFullYear();
    for (let i = 0; i < 10; i++) {
      expect(screen.getByRole("option", { name: `${currentYear + i}` })).toBeInTheDocument();
    }
  });
});
