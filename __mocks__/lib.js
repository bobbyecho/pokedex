jest.useFakeTimers();

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));
