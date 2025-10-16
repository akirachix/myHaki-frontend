import React from "react";
import { render, screen } from "@testing-library/react";
import Rank from "."; 
import { ImageProps } from "next/image";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: ImageProps) => {
    const { src, alt, ...rest } = props;
    return <img src={src as string} alt={alt || ""} {...rest} />;
  },
}));

const mockLawyers = [
  {
    id: 1,
    first_name: "Loice",
    last_name: "Nekesa",
    email: "loice@example.com",
    role: "associate",
    phone_number: "0700000001",
    image: null,
    is_deleted: false,
    created_at: "2025-01-01T00:00:00Z",
    updated_at: "2025-01-01T00:00:00Z",
    profile_id: "profile1",
    verified: true,
    practising_status: "active",
    work_place: "Firm A",
    physical_address: "Address 1",
    cpd_points_2025: 7,
    criminal_law: true,
    constitutional_law: false,
    corporate_law: true,
    family_law: false,
    pro_bono_legal_services: false,
    alternative_dispute_resolution: false,
    regional_and_international_law: false,
    mining_law: false,
  },
  {
    id: 2,
    first_name: "Ernest",
    last_name: "John",
    email: "ernest@example.com",
    role: "senior",
    phone_number: "0700000002",
    image: null,
    is_deleted: false,
    created_at: "2025-01-01T00:00:00Z",
    updated_at: "2025-01-01T00:00:00Z",
    profile_id: "profile2",
    verified: false,
    practising_status: "active",
    work_place: "Firm B",
    physical_address: "Address 2",
    cpd_points_2025: 5,
    criminal_law: false,
    constitutional_law: true,
    corporate_law: false,
    family_law: true,
    pro_bono_legal_services: true,
    alternative_dispute_resolution: false,
    regional_and_international_law: false,
    mining_law: true,
  },
  {
    id: 3,
    first_name: "Shem",
    last_name: "Wotwobi",
    email: "shem@example.com",
    role: "junior",
    phone_number: "0700000003",
    image: null,
    is_deleted: false,
    created_at: "2025-01-01T00:00:00Z",
    updated_at: "2025-01-01T00:00:00Z",
    profile_id: "profile3",
    verified: false,
    practising_status: "inactive",
    work_place: "Firm C",
    physical_address: "Address 3",
    cpd_points_2025: 2,
    criminal_law: false,
    constitutional_law: false,
    corporate_law: false,
    family_law: false,
    pro_bono_legal_services: false,
    alternative_dispute_resolution: true,
    regional_and_international_law: true,
    mining_law: false,
  }
];


describe("Rank Component", () => {
  it("renders top three lawyers in correct order", () => {
    render(<Rank lawyers={mockLawyers} />);
    expect(screen.getByText("Loice Nekesa")).toBeInTheDocument();
    expect(screen.getByText((content) => content.includes("7 pts"))).toBeInTheDocument();
    expect(screen.getByText("Ernest John")).toBeInTheDocument();
    expect(screen.getByText((content) => content.includes("5 pts"))).toBeInTheDocument();
    expect(screen.getByText("Shem Wotwobi")).toBeInTheDocument();
    expect(screen.getByText((content) => content.includes("2 pts"))).toBeInTheDocument();
  });

  it("shows N/A if not enough lawyers", () => {
    render(<Rank lawyers={[]} />);
    expect(screen.getAllByText("N/A")).toHaveLength(3);
    expect(screen.getAllByText(/0 pts/i)).toHaveLength(3);
  });

  it("shows loading message if props are missing", () => {
    render(<Rank lawyers={[]} />);
    expect(screen.getAllByText(/N\/A/i)).toHaveLength(3);
    expect(screen.getAllByText(/0 pts/i)).toHaveLength(3);
  });

  it("handles null lawyer ids in cpdPoints", () => {
    const lawyersWithNullCpd = [
      {
        id: 1,
        first_name: "Loice",
        last_name: "Nekesa",
        email: "loice@example.com",
        role: "associate",
        phone_number: "0700000001",
        image: null,
        is_deleted: false,
        created_at: "2025-01-01T00:00:00Z",
        updated_at: "2025-01-01T00:00:00Z",
        profile_id: "profile1",
        verified: true,
        practising_status: "active",
        work_place: "Firm A",
        physical_address: "Address 1",
        cpd_points_2025: 7,
        criminal_law: true,
        constitutional_law: false,
        corporate_law: true,
        family_law: false,
        pro_bono_legal_services: false,
        alternative_dispute_resolution: false,
        regional_and_international_law: false,
        mining_law: false,
      },
      {
        id: 2,
        first_name: "Ernest",
        last_name: "John",
        email: "ernest@example.com",
        role: "senior",
        phone_number: "0700000002",
        image: null,
        is_deleted: false,
        created_at: "2025-01-01T00:00:00Z",
        updated_at: "2025-01-01T00:00:00Z",
        profile_id: "profile2",
        verified: false,
        practising_status: "active",
        work_place: "Firm B",
        physical_address: "Address 2",
        cpd_points_2025: 5,
        criminal_law: false,
        constitutional_law: true,
        corporate_law: false,
        family_law: true,
        pro_bono_legal_services: true,
        alternative_dispute_resolution: false,
        regional_and_international_law: false,
        mining_law: true,
      },
      {
        id: 3,
        first_name: "Shem",
        last_name: "Wotwobi",
        email: "shem@example.com",
        role: "junior",
        phone_number: "0700000003",
        image: null,
        is_deleted: false,
        created_at: "2025-01-01T00:00:00Z",
        updated_at: "2025-01-01T00:00:00Z",
        profile_id: "profile3",
        verified: false,
        practising_status: "inactive",
        work_place: "Firm C",
        physical_address: "Address 3",
        cpd_points_2025: 0, 
        criminal_law: false,
        constitutional_law: false,
        corporate_law: false,
        family_law: false,
        pro_bono_legal_services: false,
        alternative_dispute_resolution: true,
        regional_and_international_law: true,
        mining_law: false,
      }
    ];
    
    render(<Rank lawyers={lawyersWithNullCpd} />);
    expect(screen.getByText("Loice Nekesa")).toBeInTheDocument();
    expect(screen.getByText((content) => content.includes("7 pts"))).toBeInTheDocument();
    expect(screen.getByText("Ernest John")).toBeInTheDocument();
    expect(screen.getByText((content) => content.includes("5 pts"))).toBeInTheDocument();
    expect(screen.getByText("Shem Wotwobi")).toBeInTheDocument();
    expect(screen.getByText((content) => content.includes("0 pts"))).toBeInTheDocument();
  });
});
