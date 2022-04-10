// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import Settings from './components/settings';
import RtlLayout from './components/RtlLayout';
import ScrollToTop from './components/ScrollToTop';
import { ProgressBarStyle } from './components/ProgressBar';
import ThemeColorPresets from './components/ThemeColorPresets';
import MotionLazyContainer from './components/animate/MotionLazyContainer';
import NotistackProvider from './components/NotistackProvider';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <ThemeProvider>
      <ThemeColorPresets>
        <RtlLayout>
        <NotistackProvider>
          <MotionLazyContainer>
            <ProgressBarStyle />
            <Settings />
            <ScrollToTop />
            <Router />
          </MotionLazyContainer>
          </NotistackProvider>
        </RtlLayout>
      </ThemeColorPresets>
    </ThemeProvider>
  );
}
