import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import CaseTable from './components/Cases-Table';
import CaseStatusBar from './components/Case-Status-Bar';
import CaseDetailModal from './components/Case-Detail-Modal';
import useFetchCases, { CaseItem } from '../hooks/useFetchCases';
import { Lawyer, useFetchLawyers } from '../hooks/useFetchLawyers';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} alt={props.alt ?? 'Mock Image'} />;
  },
}));

jest.mock('@/app/hooks/useFetchCases');
jest.mock('@/app/hooks/useFetchLawyers');

const mockCases: CaseItem[] = [
  {
    case_id: 1,
    lawyer_id: 101,
    detainee: 1001,
    detainee_details: {
      detainee_id: 1001,
      first_name: 'John',
      last_name: 'Doe',
      id_number: 'ID123',
      gender: 'male',
      date_of_birth: '1990-01-01',
      relation_to_applicant: 'brother',
      created_at: '2025-01-01T00:00:00Z',
      updated_at: '2025-01-02T00:00:00Z',
      user: null,
    },
    predicted_case_type: 'criminal',
    case_type: 'felony',
    status: 'pending',
    created_at: '2025-01-01T00:00:00Z',
    updated_at: '2025-01-02T00:00:00Z',
    predicted_urgency_level: 'medium',
    case_description: 'Description of case 1',
    date_of_offense: '2024-12-31',
    trial_date: '2025-06-01',
    police_station: 'Main Station',
    latitude: '0.0',
    longitude: '0.0',
    income_source: 'employment',
    monthly_income: 'low_income',
    dependents: { count: 0, description: '' },
    stage: 'investigation',
  },
  {
    case_id: 2,
    lawyer_id: null,
    detainee: 1002,
    detainee_details: {
      detainee_id: 1002,
      first_name: 'Jane',
      last_name: 'Smith',
      id_number: 'ID456',
      gender: 'female',
      date_of_birth: '1985-05-15',
      relation_to_applicant: 'self',
      created_at: '2025-01-02T00:00:00Z',
      updated_at: '2025-01-03T00:00:00Z',
      user: null,
    },
    predicted_case_type: 'civil',
    case_type: null,
    status: 'accepted',
    created_at: '2025-01-02T00:00:00Z',
    updated_at: '2025-01-03T00:00:00Z',
    predicted_urgency_level: 'low',
    case_description: 'Description of case 2',
    date_of_offense: '2024-11-15',
    trial_date: '2025-08-01',
    police_station: 'North Precinct',
    latitude: '0.0',
    longitude: '0.0',
    income_source: 'self_employed',
    monthly_income: 'medium_income',
    dependents: { count: 1, description: 'spouse' },
    stage: 'trial',
  },
];


const mockCaseItem = {
  case_id: 1,
  detainee: 1001,
  detainee_details: {
    detainee_id: 1001,
    first_name: 'John',
    last_name: 'Doe',
    id_number: 'ID123',
    gender: 'male',
    date_of_birth: '1990-01-01',
    relation_to_applicant: 'brother',
    created_at: '2025-01-01',
    updated_at: '2025-01-01',
    user: null,
  },
  predicted_case_type: 'criminal',
  predicted_urgency_level: 'high',
  case_description: 'Stolen bicycle.',
  date_of_offense: '2025-01-01',
  trial_date: '2025-06-01',
  police_station: 'Downtown Precinct',
  latitude: '0.0',
  longitude: '0.0',
  income_source: 'employment',
  monthly_income: 'low_income',
  dependents: { count: 2, description: 'children' },
  stage: 'trial',
  status: 'pending',
  created_at: '2025-01-01',
  updated_at: '2025-01-01',
};

describe('CaseTable Component', () => {
  beforeEach(() => {
    (jest.mocked(useFetchCases)).mockReturnValue({
      cases: mockCases,
      loading: false,
      error: null,
    });

  });

  it('renders loading state', () => {
    (jest.mocked(useFetchCases)).mockReturnValue({ cases: [], loading: true, error: null });
    render(<CaseTable />);
    expect(screen.getByText("/Loading cases.../i")).toBeInTheDocument();
  });

  it('renders error state', () => {
    (jest.mocked(useFetchCases)).mockReturnValue({
      cases: [],
      loading: false,
      error: 'Network error',
    });
    render(<CaseTable />);
    expect(screen.getByText("/Error: Network error/i")).toBeInTheDocument();
  });

  it('renders cases table with data', async () => {
    render(<CaseTable />);
    await waitFor(() => {
      expect(screen.getByText('Alice')).toBeInTheDocument();
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('felony')).toBeInTheDocument();
      expect(screen.getByText('pending')).toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
      expect(screen.getByText('civil')).toBeInTheDocument();
      expect(screen.getByText('accepted')).toBeInTheDocument();
    });
  });

  it('displays "Unassigned" for null lawyer_id', async () => {
    render(<CaseTable />);
    await waitFor(() => {
      expect(screen.getByText('Unassigned')).toBeInTheDocument();
    });
  });

  it('searches by case type', async () => {
    render(<CaseTable />);
    const user = userEvent.setup();
    await waitFor(() => {
      expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });
  });



  it('paginates correctly', async () => {
    const manyCases = Array.from({ length: 10 }, (_, i) => ({
      case_id: i + 1,
      lawyer_id: null,
      detainee: 1000 + i + 1,
      detainee_details: { first_name: `User${i + 1}`, last_name: 'Test', detainee_id: 1000 + i + 1, id_number: '', gender: '', date_of_birth: '', relation_to_applicant: '', created_at: '', updated_at: '', user: null },
      predicted_case_type: 'test',
      case_type: 'test',
      status: 'pending',
      created_at: '2025-01-01',
      updated_at: '2025-01-01',
      predicted_urgency_level: 'low',
      case_description: '',
      date_of_offense: '',
      trial_date: '',
      police_station: '',
      latitude: '',
      longitude: '',
      income_source: '',
      monthly_income: '',
      dependents: { count: 0, description: '' },
      stage: '',
    }));
    (jest.mocked(useFetchCases)).mockReturnValue({
      cases: manyCases,
      loading: false,
      error: null,
    });
    render(<CaseTable />);
    await waitFor(() => {
      expect(screen.getByText('User1 Test')).toBeInTheDocument();
      expect(screen.getByText('User5 Test')).toBeInTheDocument();
      expect(screen.queryByText('User6 Test')).not.toBeInTheDocument();
    });
    const nextButton = screen.getByText('Next →');
    await userEvent.click(nextButton);
    await waitFor(() => {
      expect(screen.queryByText('User1 Test')).not.toBeInTheDocument();
      expect(screen.getByText('User6 Test')).toBeInTheDocument();
    });
  });
});

describe('CaseStatusBar Component', () => {
  it('renders loading state', () => {
    render(<CaseStatusBar />);
    expect(screen.getByText('...')).toBeInTheDocument();
  });

  it('renders total cases count', () => {
    render(<CaseStatusBar />);
  });

  it('renders images and child components', () => {
    render(<CaseStatusBar />);
    expect(screen.getByAltText('Notifications')).toBeInTheDocument();
  });
});

describe('CaseDetailModal Component', () => {
  const onCloseMock = jest.fn();

  beforeEach(() => {
    onCloseMock.mockClear();
  });

  it('renders case details correctly', () => {
    render(<CaseDetailModal caseItem={mockCaseItem} onClose={onCloseMock} />);
    expect(screen.getByText(/Case Details - Case ID: 1/i)).toBeInTheDocument();
    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/ID123/i)).toBeInTheDocument();
    expect(screen.getByText(/Male/i)).toBeInTheDocument();
    expect(screen.getByText(/Stolen bicycle/i)).toBeInTheDocument();
    expect(screen.getByText(/High/i)).toBeInTheDocument();
    expect(screen.getByText(/Pending/i)).toBeInTheDocument();
  });

  it('closes modal when Escape key is pressed', () => {
    render(<CaseDetailModal caseItem={mockCaseItem} onClose={onCloseMock} />);
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('closes modal when Close button is clicked', async () => {
    const user = userEvent.setup();
    render(<CaseDetailModal caseItem={mockCaseItem} onClose={onCloseMock} />);
    const closeButton = screen.getByText('Close');
    await user.click(closeButton);
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('handles invalid dates gracefully', () => {
    const badCase = { ...mockCaseItem, date_of_birth: 'invalid-date' };
    render(<CaseDetailModal caseItem={badCase} onClose={onCloseMock} />);
  });
});

import * as useFetchLawyersModule from '@/app/hooks/useFetchLawyers';

jest.mock('@/app/hooks/useFetchLawyers');
jest.mock('@/app/hooks/useFetchCases');

beforeEach(() => {
  jest.spyOn(useFetchLawyersModule, 'useFetchLawyers').mockReturnValue({
    lawyers: [], loading: false,
  });
});
