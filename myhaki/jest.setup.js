import '@testing-library/jest-dom';

jest.mock('recharts', () => {
    const OriginalRecharts = jest.requireActual('recharts');
    return {
      ...OriginalRecharts,
      ResponsiveContainer: ({ children }) => <div style={{ width: 800, height: 400 }}>{children}</div>,
    };
  });