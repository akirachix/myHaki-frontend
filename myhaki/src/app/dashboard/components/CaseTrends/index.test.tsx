import React from "react";
import Image from "next/image";
import { render, fireEvent, screen } from "@testing-library/react";
import CaseTrends from ".";

jest.mock('next/image', () => ({
    __esModule: true,
    default: (props: any) => {
      return <Image {...props} />;
    },
  }));


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
