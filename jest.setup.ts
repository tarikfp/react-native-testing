import 'react-native-gesture-handler/jestSetup';
import {mswServer} from './__mocks__/msw/handlers';

jest.useFakeTimers();

// https://mswjs.io/docs/getting-started/integrate/node#setup

// Establish API mocking before all tests.
beforeAll(() => mswServer.listen());
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => mswServer.resetHandlers());
// Clean up after the tests are finished.
afterAll(() => mswServer.close());

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
