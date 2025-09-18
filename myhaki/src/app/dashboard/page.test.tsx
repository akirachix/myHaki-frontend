import React from "react";
import Image from "next/image";
import { render, fireEvent, screen } from "@testing-library/react";
import CalendarPopup from "./components/Calendar";
import Cards from "./components/Cards";
import CaseDistribution from "./components/CaseDistribution";
import CaseTrends from "./components/CaseTrends";
import Rank from "./components/Rank";

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

describe("Cards component", () => {
  const mockCases = [
    { status: "accepted", stage: "in_progress" },
    { status: "accepted", stage: "trial" },
    { status: "accepted", stage: "completed" },
    { status: "pending", stage: "arraignment" },
    { status: "accepted", stage: "arraignment" },
    { status: "accepted", stage: "bail" },
    { status: "accepted", stage: "completed" },
  ];

  const mockLawyers = [
    { id: 1, verified: true },
    { id: 2, verified: true },
    { id: 3, verified: false }, 
  ];

  it("renders all cards with correct labels", () => {
    render(<Cards cases={mockCases} lawyers={mockLawyers} />);
    expect(screen.getByText("Total Applications")).toBeInTheDocument();
    expect(screen.getByText("Active Lawyers")).toBeInTheDocument();
    expect(screen.getByText("Cases in progress")).toBeInTheDocument();
    expect(screen.getByText("Completed")).toBeInTheDocument();
  });

  it("shows correct total applications count", () => {
    render(<Cards cases={mockCases} lawyers={mockLawyers} />);
    expect(screen.getByText(mockCases.length.toString())).toBeInTheDocument();
  });

  it("shows correct active lawyers count", () => {
    render(<Cards cases={mockCases} lawyers={mockLawyers} />);
    expect(screen.getByText(mockLawyers.length.toString())).toBeInTheDocument();
  });

  it("shows correct cases in progress count", () => {
    const inProgressCount = mockCases.filter(
      c => c.status === "accepted" && ["in_progress", "trial", "arraignment", "bail"].includes(c.stage)
    ).length;
    render(<Cards cases={mockCases} lawyers={mockLawyers} />);
    expect(screen.getByText(inProgressCount.toString())).toBeInTheDocument();
  });

  it("shows correct completed cases count", () => {
    const completedCount = mockCases.filter(
      c => c.status === "accepted" && c.stage === "completed"
    ).length;
    render(<Cards cases={mockCases} lawyers={mockLawyers} />);
    expect(screen.getByText(completedCount.toString())).toBeInTheDocument();
  });

  it("renders with zero counts if arrays are empty", () => {
    render(<Cards cases={[]} lawyers={[]} />);
    const zeroElements = screen.getAllByText("0");
    expect(zeroElements.length).toBe(4);
    zeroElements.forEach(el => expect(el).toBeInTheDocument());
  });
});

function getExpectedPieData(cases: any[]) {
  const stages = [
    { key: "in_progress", label: "In Progress", color: "#621616" },
    { key: "trial", label: "Trial", color: "#7F3A3A" },
    { key: "arraignment", label: "Arraignment", color: "#B88683" },
    { key: "bail", label: "Bail", color: "#D9A5A5" },
    { key: "completed", label: "Completed", color: "#F1CCCC" },
  ];
  return stages.map(stage => ({
    name: stage.label,
    value: cases.filter(caseItem => caseItem.stage === stage.key).length,
    color: stage.color,
  }));
}

describe("CaseTrends component", () => {
  it("renders empty state when there are no cases", () => {
    render(
      <div style={{ width: 500, height: 400 }}>
        <CaseTrends cases={[]} />
      </div>
    );
    expect(
      screen.getByText("No case trends available in this period.")
    ).toBeInTheDocument();
    const svg = document.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("renders empty state when all cases have unrelated stages", () => {
    const cases = [
      { stage: "draft" },
      { stage: "pending" }
    ];
    render(
      <div style={{ width: 500, height: 400 }}>
        <CaseTrends cases={cases} />
      </div>
    );
    expect(
      screen.getByText("No case trends available in this period.")
    ).toBeInTheDocument();
  });

  it("renders pie chart and legend for non-empty cases", () => {
    const cases = [
      { stage: "in_progress" },
      { stage: "trial" },
      { stage: "trial" },
      { stage: "completed" },
      { stage: "completed" },
      { stage: "completed" },
      { stage: "bail" },
    ];
    render(
      <div style={{ width: 500, height: 400 }}>
        <CaseTrends cases={cases} />
      </div>
    );
    expect(screen.queryByText("No case trends available in this period.")).not.toBeInTheDocument();
    expect(screen.getByText((content) => content.includes("In Progress"))).toBeInTheDocument();
    expect(screen.getByText((content) => content.includes("Trial"))).toBeInTheDocument();
    expect(screen.getByText((content) => content.includes("Bail"))).toBeInTheDocument();
    expect(screen.getByText((content) => content.includes("Completed"))).toBeInTheDocument();
    expect(screen.queryByText((content) => content.includes("Arraignment"))).not.toBeInTheDocument();
  });

  it("legend shows only stages with nonzero cases", () => {
    const cases = [
      { stage: "trial" },
      { stage: "trial" },
      { stage: "completed" },
    ];
    render(
      <div style={{ width: 500, height: 400 }}>
        <CaseTrends cases={cases} />
      </div>
    );
    expect(screen.getByText((content) => content.includes("Trial"))).toBeInTheDocument();
    expect(screen.getByText((content) => content.includes("Completed"))).toBeInTheDocument();
    expect(screen.queryByText((content) => content.includes("In Progress"))).not.toBeInTheDocument();
    expect(screen.queryByText((content) => content.includes("Arraignment"))).not.toBeInTheDocument();
    expect(screen.queryByText((content) => content.includes("Bail"))).not.toBeInTheDocument();
  });

  it("pie data calculation matches expected", () => {
    const cases = [
      { stage: "in_progress" },
      { stage: "trial" },
      { stage: "completed" },
      { stage: "completed" },
    ];
    const expected = getExpectedPieData(cases);
    expect(expected).toEqual([
      { name: "In Progress", value: 1, color: "#621616" },
      { name: "Trial", value: 1, color: "#7F3A3A" },
      { name: "Arraignment", value: 0, color: "#B88683" },
      { name: "Bail", value: 0, color: "#D9A5A5" },
      { name: "Completed", value: 2, color: "#F1CCCC" },
    ]);
  });
});


  describe("CaseTrends component", () => {
    it("renders empty state when there are no cases", () => {
      render(
        <div style={{ width: 500, height: 400 }}>
          <CaseTrends cases={[]} />
        </div>
      );
      expect(
        screen.getByText("No case trends available in this period.")
      ).toBeInTheDocument();
      const svg = document.querySelector("svg");
      expect(svg).toBeInTheDocument();
    });
  
    it("renders empty state when all cases have unrelated stages", () => {
      const cases = [
        { stage: "draft" },
        { stage: "pending" }
      ];
      render(
        <div style={{ width: 500, height: 400 }}>
          <CaseTrends cases={cases} />
        </div>
      );
      expect(
        screen.getByText("No case trends available in this period.")
      ).toBeInTheDocument();
    });
  
    it("renders pie chart and legend for non-empty cases", () => {
      const cases = [
        { stage: "in_progress" },
        { stage: "trial" },
        { stage: "trial" },
        { stage: "completed" },
        { stage: "completed" },
        { stage: "completed" },
        { stage: "bail" },
      ];
      render(
        <div style={{ width: 500, height: 400 }}>
          <CaseTrends cases={cases} />
        </div>
      );
      expect(screen.queryByText("No case trends available in this period.")).not.toBeInTheDocument();
      expect(screen.getByText((content) => content.includes("In Progress"))).toBeInTheDocument();
      expect(screen.getByText((content) => content.includes("Trial"))).toBeInTheDocument();
      expect(screen.getByText((content) => content.includes("Bail"))).toBeInTheDocument();
      expect(screen.getByText((content) => content.includes("Completed"))).toBeInTheDocument();
      expect(screen.queryByText((content) => content.includes("Arraignment"))).not.toBeInTheDocument();
    });
  
    it("legend shows only stages with nonzero cases", () => {
      const cases = [
        { stage: "trial" },
        { stage: "trial" },
        { stage: "completed" },
      ];
      render(
        <div style={{ width: 500, height: 400 }}>
          <CaseTrends cases={cases} />
        </div>
      );
      expect(screen.getByText((content) => content.includes("Trial"))).toBeInTheDocument();
      expect(screen.getByText((content) => content.includes("Completed"))).toBeInTheDocument();
      expect(screen.queryByText((content) => content.includes("In Progress"))).not.toBeInTheDocument();
      expect(screen.queryByText((content) => content.includes("Arraignment"))).not.toBeInTheDocument();
      expect(screen.queryByText((content) => content.includes("Bail"))).not.toBeInTheDocument();
    });
  
    it("pie data calculation matches expected", () => {
      const cases = [
        { stage: "in_progress" },
        { stage: "trial" },
        { stage: "completed" },
        { stage: "completed" },
      ];
      const expected = getExpectedPieData(cases);
      expect(expected).toEqual([
        { name: "In Progress", value: 1, color: "#621616" },
        { name: "Trial", value: 1, color: "#7F3A3A" },
        { name: "Arraignment", value: 0, color: "#B88683" },
        { name: "Bail", value: 0, color: "#D9A5A5" },
        { name: "Completed", value: 2, color: "#F1CCCC" },
      ]);
    });
  });
  
  
  const mockLawyers = [
    { id: 1, first_name: 'Loice', last_name: 'Nekesa' },
     { id: 2, first_name: 'Ernest', last_name: 'John' },
  { id: 3, first_name: 'Shem', last_name: 'Wotwobi' },
];

const mockCpdPoints = [
  { cpd_id: 10, lawyer: 2, case: 1, description: '', points_earned: 1, total_points: 5 },
  { cpd_id: 11, lawyer: 1, case: 2, description: '', points_earned: 1, total_points: 7 },
  { cpd_id: 12, lawyer: 3, case: 3, description: '', points_earned: 1, total_points: 2 },
];

describe('Rank Component', () => {
  it('renders top three lawyers in correct order', () => {
    render(<Rank lawyers={mockLawyers} cpdPoints={mockCpdPoints} />);
    expect(screen.getByText('Ernest John')).toBeInTheDocument();
    expect(screen.getByText('5 pts')).toBeInTheDocument();
    expect(screen.getByText('Loice Nekesa')).toBeInTheDocument();
    expect(screen.getByText('7 pts')).toBeInTheDocument();
    expect(screen.getByText('Shem Wotwobi')).toBeInTheDocument();
    expect(screen.getByText('2 pts')).toBeInTheDocument();
  });

  it('shows N/A if not enough lawyers', () => {
    render(<Rank lawyers={[]} cpdPoints={[]} />);
    expect(screen.getAllByText('N/A').length).toBe(3);
    expect(screen.getAllByText('0 pts').length).toBe(3);
  });

  it('shows loading message if props are missing', () => {
    render(<Rank lawyers={[]} cpdPoints={[]} />);
    expect(screen.getByText(/Loading CPD Points Rank/i)).toBeInTheDocument();
  });

  it('handles null lawyer ids in cpdPoints', () => {
    const mockCpdPointsWithNull = [
      { cpd_id: 13, lawyer: null, case: 4, description: '', points_earned: 1, total_points: 2 },
      ...mockCpdPoints,
    ];
    render(<Rank lawyers={mockLawyers} cpdPoints={mockCpdPointsWithNull} />);
    expect(screen.getByText('Loice Nekesa')).toBeInTheDocument();
    expect(screen.getByText('7 pts')).toBeInTheDocument();
    expect(screen.getByText('Ernest John')).toBeInTheDocument();
    expect(screen.getByText('5 pts')).toBeInTheDocument();
    expect(screen.getByText('Shem Wotwobi')).toBeInTheDocument();
    expect(screen.getByText('2 pts')).toBeInTheDocument();
  });
});

const mockCases = [
  { predicted_case_type: "criminal", status: "accepted", stage: "completed" },
  { predicted_case_type: "criminal", status: "accepted", stage: "in_progress" },
  { predicted_case_type: "criminal", status: "accepted", stage: "trial" },
  { predicted_case_type: "criminal", status: "accepted", stage: "arraignment" },
  { predicted_case_type: "criminal", status: "accepted", stage: "bail" },
  { predicted_case_type: "criminal", status: "pending", stage: "in_progress" },
  { predicted_case_type: "civil", status: "accepted", stage: "completed" },
  { predicted_case_type: "civil", status: "accepted", stage: "trial" },
  { predicted_case_type: "environment", status: "accepted", stage: "completed" },
];

describe('CaseDistribution', () => {
  it('renders the chart title', () => {
    render(<CaseDistribution cases={mockCases} />);
    expect(screen.getByText(/Case Distribution/i)).toBeInTheDocument();
  });

  it('renders the chart container', () => {
    const { container } = render(<CaseDistribution cases={mockCases} />);
    expect(container.querySelector('div')).toBeInTheDocument();
  });

  it('renders with no cases', () => {
    render(<CaseDistribution cases={[]} />);
    expect(screen.getByText('Case Distribution')).toBeInTheDocument();
  });
});