import { create } from 'zustand';

export const useNavigationStore = create((set, get) => ({
  // Current screen state
  currentScreen: 'SignupScreen',
  
  // Navigation history for back navigation
  history: [],
  
  // Navigation parameters
  params: {},
  
  // Navigate to a new screen
  navigateTo: (screenName, params = {}) => {
    const current = get().currentScreen;
    set((state) => ({
      currentScreen: screenName,
      history: [...state.history, current],
      params: params,
    }));
  },
  
  // Go back to previous screen
  goBack: () => {
    const history = get().history;
    if (history.length > 0) {
      const previousScreen = history[history.length - 1];
      set((state) => ({
        currentScreen: previousScreen,
        history: state.history.slice(0, -1),
        params: {},
      }));
    }
  },
  
  // Reset to initial screen
  resetToSignup: () => {
    set({
      currentScreen: 'SignupScreen',
      history: [],
      params: {},
    });
  },
  
  // Check if can go back
  canGoBack: () => get().history.length > 0,
  
  // Get current params
  getParams: () => get().params,
}));

export default useNavigationStore;
