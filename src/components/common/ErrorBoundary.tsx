// src/components/common/ErrorBoundary.tsx
// Error boundary to catch component errors

import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Box, Button, Container, Typography } from "@mui/material";
import React, { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error("ErrorBoundary caught:", error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <Container maxWidth="md">
          <Box
            sx={{
              minHeight: "60vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              gap: 3,
              py: 8,
            }}
          >
            <ErrorOutlineIcon sx={{ fontSize: 80, color: "error.main" }} />

            <Typography variant="h4" fontWeight="bold" color="text.primary">
              Oops! Something went wrong
            </Typography>

            <Typography variant="body1" color="text.secondary" maxWidth={500}>
              We're sorry for the inconvenience. Please try refreshing the page or contact support if the problem
              persists.
            </Typography>

            {this.state.error && (
              <Box
                sx={{
                  p: 2,
                  bgcolor: "grey.100",
                  borderRadius: 1,
                  maxWidth: 600,
                  width: "100%",
                }}
              >
                <Typography variant="caption" color="error" sx={{ fontFamily: "monospace" }}>
                  {this.state.error.message}
                </Typography>
              </Box>
            )}

            <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
              <Button variant="contained" onClick={this.handleReset}>
                Try Again
              </Button>
              <Button variant="outlined" onClick={() => (window.location.href = "/")}>
                Go Home
              </Button>
            </Box>
          </Box>
        </Container>
      );
    }

    return this.props.children;
  }
}
