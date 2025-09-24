import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import LawyersPage from './page'
import useFetchLawyers from '../hooks/useFetchLawyers'

jest.mock('@/app/hooks/useFetchLawyers', () => jest.fn())

jest.mock('@/app/shared-components/SideBar', () => ({
  __esModule: true,
  default: () => <div data-testid="sidebar">Sidebar</div>,
}))

type Lawyer = {
  id: number,
  first_name: string,
  last_name: string,
  verified: boolean,
  work_place: string,
  cpd_points_2025: number,
  criminal_law: boolean,
  corporate_law: boolean,
  family_law: boolean,
  pro_bono_legal_services: boolean,
  alternative_dispute_resolution: boolean,
  regional_and_international_law: boolean,
  mining_law: boolean,
}

const mockLawyers: Lawyer[] = [
  {
    id: 1,
    first_name: "John",
    last_name: "Doe",
    verified: true,
    work_place: "Doe & Co.",
    cpd_points_2025: 10,
    criminal_law: true,
    corporate_law: false,
    family_law: true,
    pro_bono_legal_services: false,
    alternative_dispute_resolution: true,
    regional_and_international_law: false,
    mining_law: false,
  },
  {
    id: 2,
    first_name: "Jane",
    last_name: "Smith",
    verified: false,
    work_place: "Smith Law",
    cpd_points_2025: 5,
    criminal_law: false,
    corporate_law: true,
    family_law: false,
    pro_bono_legal_services: true,
    alternative_dispute_resolution: false,
    regional_and_international_law: true,
    mining_law: false,
  },
  {
    id: 3,
    first_name: "Albert",
    last_name: "Bruce",
    verified: true,
    work_place: "Consolidated Bank",
    cpd_points_2025: 6,
    criminal_law: false,
    corporate_law: true,
    family_law: false,
    pro_bono_legal_services: false,
    alternative_dispute_resolution: false,
    regional_and_international_law: false,
    mining_law: false,
  },
]

describe('LawyersPage', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('shows loading state initially', () => {
    (useFetchLawyers as jest.Mock).mockReturnValue({ lawyers: [], loading: true })
    render(<LawyersPage />)
    expect(screen.getByText(/Loading lawyers.../i)).toBeInTheDocument()
  })

  it('renders lawyers table when data loads', async () => {
    (useFetchLawyers as jest.Mock).mockReturnValue({ lawyers: mockLawyers, loading: false })
    render(<LawyersPage />)
    await waitFor(() => {
      expect(screen.getByText(/John Doe/i)).toBeInTheDocument()
      expect(screen.getByText(/Jane Smith/i)).toBeInTheDocument()
      expect(screen.getByText(/Albert Bruce/i)).toBeInTheDocument()
    })
    expect(screen.getByText(/10 pts/i)).toBeInTheDocument()
    expect(screen.getByText(/5 pts/i)).toBeInTheDocument()
    expect(screen.getByText(/Corporate law, Pro bono services, Regional & International law/i)).toBeInTheDocument()
  })

  it('filters lawyers by search query', async () => {
    (useFetchLawyers as jest.Mock).mockReturnValue({ lawyers: mockLawyers, loading: false })
    render(<LawyersPage />)
    const searchInput = screen.getByPlaceholderText(/Search by name.../i)
    fireEvent.change(searchInput, { target: { value: 'John' } })
    await waitFor(() => {
      expect(screen.getByText(/John Doe/i)).toBeInTheDocument()
      expect(screen.queryByText(/Jane Smith/i)).not.toBeInTheDocument()
      expect(screen.queryByText(/Albert Bruce/i)).not.toBeInTheDocument()
    })
  })

  it('filters by verified status', async () => {
    (useFetchLawyers as jest.Mock).mockReturnValue({ lawyers: mockLawyers, loading: false })
    render(<LawyersPage />)
    const filterSelect = screen.getByRole('combobox')
    fireEvent.change(filterSelect, { target: { value: 'true' } })
    await waitFor(() => {
      expect(screen.getByText(/John Doe/i)).toBeInTheDocument()
      expect(screen.getByText(/Albert Bruce/i)).toBeInTheDocument()
    })
    fireEvent.change(filterSelect, { target: { value: 'false' } })
    await waitFor(() => {
      expect(screen.getByText(/Jane Smith/i)).toBeInTheDocument()
    })
  })

  const manyLawyers: Lawyer[] = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    first_name: `Lawyer${i + 1}`,
    last_name: "Test",
    verified: true,
    work_place: "Test Firm",
    cpd_points_2025: 0,
    criminal_law: false,
    corporate_law: false,
    family_law: false,
    pro_bono_legal_services: false,
    alternative_dispute_resolution: false,
    regional_and_international_law: false,
    mining_law: false,
  }))

  it('paginates lawyers list', async () => {
    (useFetchLawyers as jest.Mock).mockReturnValue({ lawyers: manyLawyers, loading: false })
    render(<LawyersPage />)
    await waitFor(() => {
      expect(screen.getByText(/Lawyer1 Test/i)).toBeInTheDocument()
      expect(screen.getByText(/Lawyer7 Test/i)).toBeInTheDocument()
      expect(screen.queryByText(/Lawyer8 Test/i)).not.toBeInTheDocument()
    })
    const nextPageButton = screen.getByText(/Next →/i)
    fireEvent.click(nextPageButton)
    await waitFor(() => {
      expect(screen.getByText(/Lawyer8 Test/i)).toBeInTheDocument()
      expect(screen.getByText(/Lawyer10 Test/i)).toBeInTheDocument()
      expect(screen.queryByText(/Lawyer1 Test/i)).not.toBeInTheDocument()
    })
    const prevPageButton = screen.getByText(/← Previous/i)
    fireEvent.click(prevPageButton)
    await waitFor(() => {
      expect(screen.getByText(/Lawyer1 Test/i)).toBeInTheDocument()
      expect(screen.queryByText(/Lawyer8 Test/i)).not.toBeInTheDocument()
    })
  })

  it('disables pagination buttons on first/last page', async () => {
    (useFetchLawyers as jest.Mock).mockReturnValue({ lawyers: manyLawyers, loading: false })
    render(<LawyersPage />)
    await waitFor(() => {
      const prevButton = screen.getByText(/← Previous/i)
      const nextButton = screen.getByText(/Next →/i)
      expect(prevButton).toBeDisabled()
      expect(nextButton).not.toBeDisabled()
      fireEvent.click(nextButton)
    })
    await waitFor(() => {
      const prevButton = screen.getByText(/← Previous/i)
      const nextButton = screen.getByText(/Next →/i)
      expect(prevButton).not.toBeDisabled()
      expect(nextButton).toBeDisabled()
    })
  })

  it('renders sidebar', () => {
    (useFetchLawyers as jest.Mock).mockReturnValue({ lawyers: [], loading: false })
    render(<LawyersPage />)
    expect(screen.getByTestId('sidebar')).toBeInTheDocument()
  })
})