import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import type { ReactNode } from "react";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";
import { jwtDecode } from "jwt-decode";
interface JWTPayload {
  exp: number;
  iat: number;
}

type TokenContextType = {
  token: string | null;
  isClerkLoadedForToken: boolean;
  setToken: (token: string) => void;
  refreshToken: () => Promise<void>;
};

const TokenContext = createContext<TokenContextType>({
  token: null,
  isClerkLoadedForToken: false,
  setToken: () => {},
  refreshToken: async () => {},
});

const TOKEN_REFRESH_BUFFER = 5 * 60 * 1000; // 5 minutes before expiration
const TOKEN_CHECK_INTERVAL = 30 * 1000; // Check token every 30 seconds

const TokenProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const { getToken, isLoaded: isClerkLoadedForToken } = useAuth();
  const refreshTimeout = useRef<NodeJS.Timeout | null>(null);
  const isRefreshing = useRef(false);

  // Calculate time until token expires
  const getTimeUntilExpiry = useCallback((token: string): number => {
    try {
      const decoded = jwtDecode<JWTPayload>(token);
      const expiryTime = decoded.exp * 1000; // Convert to milliseconds
      return expiryTime - Date.now();
    } catch (error) {
      console.error("Error decoding token:", error);
      return 0;
    }
  }, []);

  // Schedule token refresh
  const scheduleTokenRefresh = useCallback(
    (token: string) => {
      if (refreshTimeout.current) {
        clearTimeout(refreshTimeout.current);
      }

      const timeUntilExpiry = getTimeUntilExpiry(token);
      const refreshTime = Math.max(timeUntilExpiry - TOKEN_REFRESH_BUFFER, 0);

      if (refreshTime > 0) {
        refreshTimeout.current = setTimeout(() => {
          fetchToken();
        }, refreshTime);
      } else {
        // Token is already close to expiry or expired, refresh immediately
        fetchToken();
      }
    },
    [getTimeUntilExpiry]
  );

  // Fetch new token
  const fetchToken = useCallback(async () => {
    if (!isClerkLoadedForToken || isRefreshing.current) return;

    try {
      isRefreshing.current = true;
      const newToken = await getToken({ skipCache: true });

      if (newToken) {
        setToken(newToken);
        scheduleTokenRefresh(newToken);
      }
    } catch (error) {
      console.error("Error fetching token:", error);
    } finally {
      isRefreshing.current = false;
    }
  }, [getToken, isClerkLoadedForToken, scheduleTokenRefresh]);

  // Setup axios interceptors
  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use(
      async (config) => {
        if (!token) return config;

        const timeUntilExpiry = getTimeUntilExpiry(token);

        // If token is close to expiry, refresh it before making the request
        if (timeUntilExpiry < TOKEN_REFRESH_BUFFER) {
          await fetchToken();
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }

        return config;
      }
    );

    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        // If error is due to token expiration and request hasn't been retried
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          await fetchToken();

          if (token) {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axios(originalRequest);
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [token, fetchToken, getTimeUntilExpiry]);

  // Initial token setup and periodic check
  useEffect(() => {
    if (isClerkLoadedForToken && !token) {
      fetchToken();
    }

    // Periodically check token validity
    const checkInterval = setInterval(() => {
      if (token) {
        const timeUntilExpiry = getTimeUntilExpiry(token);
        if (timeUntilExpiry < TOKEN_REFRESH_BUFFER) {
          fetchToken();
        }
      }
    }, TOKEN_CHECK_INTERVAL);

    return () => {
      clearInterval(checkInterval);
      if (refreshTimeout.current) {
        clearTimeout(refreshTimeout.current);
      }
    };
  }, [token, isClerkLoadedForToken, fetchToken, getTimeUntilExpiry]);

  // Update axios defaults when token changes
  useEffect(() => {
    if (token && isClerkLoadedForToken) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios.defaults.headers.post["Content-Type"] = "application/json";
    }
  }, [token, isClerkLoadedForToken]);

  return (
    <TokenContext.Provider
      value={{
        token,
        isClerkLoadedForToken,
        setToken,
        refreshToken: fetchToken,
      }}
    >
      {children}
    </TokenContext.Provider>
  );
};

export const useToken = () => useContext(TokenContext);
export default TokenProvider;
