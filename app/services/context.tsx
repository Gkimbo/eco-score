import { createContext } from 'react';

import type { AuthContextValue } from './types/AuthContextType';

export const AuthContext = createContext<AuthContextValue | null>(null);
