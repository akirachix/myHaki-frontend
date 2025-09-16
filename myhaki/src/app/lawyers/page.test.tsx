// // src/app/lawyers/page.test.tsx

// import { render, screen, fireEvent, waitFor } from '@testing-library/react'
// import { describe, it, expect, vi, beforeEach } from 'vitest'
// import LawyersPage from './page'
// import { useFetchLawyers } from '@/app/hooks/useFetchLawyers'

// // Mock the hook
// vi.mock('@/app/hooks/useFetchLawyers', () => ({
//   useFetchLawyers: vi.fn(),
// }))

// // Mock Sidebar (if it's simple)
// vi.mock('@/app/shared-components/page', () => ({
//   default: () => <div data-testid="sidebar">Sidebar</div>,
// }))

// // Mock sample lawyers
// const mockLawyers = [
//   {
//     id: 1,
//     first_name: "John",
//     last_name: "Doe",
//     verified: true,
//     work_place: "Doe & Co.",
//     cpd_points_2025: 10,
//     criminal_law: true,
//     corporate_law: false,
//     family_law: true,
//     pro_bono_legal_services: false,
//     alternative_dispute_resolution: true,
//     regional_and_international_law: false,
//     mining_law: false,
//   },
//   {
//     id: 2,
//     first_name: "Jane",
//     last_name: "Smith",
//     verified: false,
//     work_place: "Smith Law",
//     cpd_points_2025: 5,
//     criminal_law: false,
//     corporate_law: true,
//     family_law: false,
//     pro_bono_legal_services: true,
//     alternative_dispute_resolution: false,
//     regional_and_international_law: true,
//     mining_law: false,
//   },
//   {
//     id: 3,
//     first_name: "Albert",
//     last_name: "Bruce",
//     verified: true,
//     work_place: "Consolidated Bank",
//     cpd_points_2025: 6,
//     criminal_law: false,
//     corporate_law: true,
//     family_law: false,
//     pro_bono_legal_services: false,
//     alternative_dispute_resolution: false,
//     regional_and_international_law: false,
//     mining_law: false,
//   },
// ]

// describe('LawyersPage', () => {
//   beforeEach(() => {
//     vi.clearAllMocks()
//   })

//   it('shows loading state initially', () => {
//     ;(useFetchLawyers as any).mockReturnValue({ lawyers: [], loading: true })

//     render(<LawyersPage />)

//     expect(screen.getByText(/Loading lawyers.../i)).toBeInTheDocument()
//   })

//   it('renders lawyers table when data loads', async () => {
//     ;(useFetchLawyers as any).mockReturnValue({ lawyers: mockLawyers, loading: false })

//     render(<LawyersPage />)

//     await waitFor(() => {
//       expect(screen.getByText(/John Doe/i)).toBeInTheDocument()
//       expect(screen.getByText(/Jane Smith/i)).toBeInTheDocument()
//       expect(screen.getByText(/Albert Bruce/i)).toBeInTheDocument()
//     })

//     expect(screen.getByText(/10 pts/i)).toBeInTheDocument()
//     expect(screen.getByText(/5 pts/i)).toBeInTheDocument()
//     expect(screen.getByText(/Corporate law, Pro bono services, Regional & International law/i)).toBeInTheDocument()
//   })

//   it('filters lawyers by search query', async () => {
//     ;(useFetchLawyers as any).mockReturnValue({ lawyers: mockLawyers, loading: false })

//     render(<LawyersPage />)

//     const searchInput = screen.getByPlaceholderText(/Search by name.../i)

//     fireEvent.change(searchInput, { target: { value: 'John' } })

//     await waitFor(() => {
//       expect(screen.getByText(/John Doe/i)).toBeInTheDocument()
//       expect(screen.queryByText(/Jane Smith/i)).not.toBeInTheDocument()
//       expect(screen.queryByText(/Albert Bruce/i)).not.toBeInTheDocument()
//     })
//   })

//   it('filters by verified status', async () => {
//     ;(useFetchLawyers as any).mockReturnValue({ lawyers: mockLawyers, loading: false })

//     render(<LawyersPage />)

//     const filterSelect = screen.getByRole('combobox')

//     // Filter: Verified
//     fireEvent.change(filterSelect, { target: { value: 'true' } })

//     await waitFor(() => {
//       expect(screen.getByText(/John Doe/i)).toBeInTheDocument()
//       expect(screen.getByText(/Albert Bruce/i)).toBeInTheDocument()
//       expect(screen.queryByText(/Jane Smith/i)).not.toBeInTheDocument()
//     })

//     // Filter: Unverified
//     fireEvent.change(filterSelect, { target: { value: 'false' } })

//     await waitFor(() => {
//       expect(screen.getByText(/Jane Smith/i)).toBeInTheDocument()
//       expect(screen.queryByText(/John Doe/i)).not.toBeInTheDocument()
//       expect(screen.queryByText(/Albert Bruce/i)).not.toBeInTheDocument()
//     })
//   })

//   it('pagination works correctly', async () => {
//     // Create 10 lawyers to force pagination (7 per page)
//     const manyLawyers = Array.from({ length: 10 }, (_, i) => ({
//       id: i + 1,
//       first_name: `Lawyer${i + 1}`,
//       last_name: "Test",
//       verified: true,
//       work_place: "Test Firm",
//       cpd_points_2025: 0,
//       criminal_law: false,
//       corporate_law: false,
//       family_law: false,
//       pro_bono_legal_services: false,
//       alternative_dispute_resolution: false,
//       regional_and_international_law: false,
//       mining_law: false,
//     }))

//     ;(useFetchLawyers as any).mockReturnValue({ lawyers: manyLawyers, loading: false })

//     render(<LawyersPage />)

//     // Page 1 should show Lawyer1 to Lawyer7
//     await waitFor(() => {
//       expect(screen.getByText(/Lawyer1 Test/i)).toBeInTheDocument()
//       expect(screen.getByText(/Lawyer7 Test/i)).toBeInTheDocument()
//       expect(screen.queryByText(/Lawyer8 Test/i)).not.toBeInTheDocument()
//     })

//     const nextPageButton = screen.getByText(/Next →/i)
//     fireEvent.click(nextPageButton)

//     // Page 2 should show Lawyer8 to Lawyer10
//     await waitFor(() => {
//       expect(screen.getByText(/Lawyer8 Test/i)).toBeInTheDocument()
//       expect(screen.getByText(/Lawyer10 Test/i)).toBeInTheDocument()
//       expect(screen.queryByText(/Lawyer1 Test/i)).not.toBeInTheDocument()
//     })

//     const prevPageButton = screen.getByText(/← Previous/i)
//     fireEvent.click(prevPageButton)

//     await waitFor(() => {
//       expect(screen.getByText(/Lawyer1 Test/i)).toBeInTheDocument()
//       expect(screen.queryByText(/Lawyer8 Test/i)).not.toBeInTheDocument()
//     })
//   })

//   it('disables pagination buttons on first/last page', async () => {
//     const manyLawyers = Array.from({ length: 10 }, (_, i) => ({
//       ...mockLawyers[0],
//       id: i + 1,
//       first_name: `Lawyer${i + 1}`,
//     }))

//     ;(useFetchLawyers as any).mockReturnValue({ lawyers: manyLawyers, loading: false })

//     render(<LawyersPage />)

//     await waitFor(() => {
//       const prevButton = screen.getByText(/← Previous/i)
//       const nextButton = screen.getByText(/Next →/i)

//       expect(prevButton).toBeDisabled() // Page 1 → Prev disabled
//       expect(nextButton).not.toBeDisabled()

//       fireEvent.click(nextButton)
//     })

//     await waitFor(() => {
//       const prevButton = screen.getByText(/← Previous/i)
//       const nextButton = screen.getByText(/Next →/i)

//       expect(prevButton).not.toBeDisabled()
//       expect(nextButton).toBeDisabled() // Last page → Next disabled
//     })
//   })

//   it('renders sidebar', () => {
//     ;(useFetchLawyers as any).mockReturnValue({ lawyers: [], loading: false })

//     render(<LawyersPage />)

//     expect(screen.getByTestId('sidebar')).toBeInTheDocument()
//   })
// })