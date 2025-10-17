import { Box, Paper, Typography } from "@mui/material";
import { useGlobal } from "./hooks/useGlobal";
import type { User } from "./types/models/user";

export default function Dev() {
  // cách lấy user sau khi đăng nhập ở đây, nếu chưa đăng nhập thì nó null
  const { user } = useGlobal();

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Dev — Current User
      </Typography>

      {user === undefined ? (
        <Paper sx={{ p: 2, background: "#fff8e1" }}>
          <Typography variant="body1">User state is undefined.</Typography>
          <Typography variant="caption" sx={{ display: "block", mt: 1 }}>
            This may mean the global state hasn't initialized yet.
          </Typography>
        </Paper>
      ) : user === null ? (
        <Paper sx={{ p: 2, background: "#fff8e1" }}>
          <Typography variant="body1">User is explicitly null (no authenticated user).</Typography>
          <Typography variant="caption" sx={{ display: "block", mt: 1 }}>
            Use the login flow to sign in and populate the user.
          </Typography>
        </Paper>
      ) : (
        <Paper sx={{ p: 2 }}>
          {(() => {
            const u = user as User;

            return (
              <>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  Basic info
                </Typography>
                {/* Show typed fields */}
                {u.fullName && <Typography variant="body2">Name: {u.fullName}</Typography>}
                {u.email && <Typography variant="body2">Email: {u.email}</Typography>}
                {u.role && <Typography variant="body2">Role: {u.role}</Typography>}

                {/* Render other keys generically */}
                {Object.keys(u).length > 0 && (
                  <Box sx={{ mt: 1 }}>
                    {Object.entries(u).map(([k, v]) => (
                      <Typography key={k} variant="caption" sx={{ display: "block" }}>
                        {k}: {typeof v === "object" ? JSON.stringify(v) : String(v)}
                      </Typography>
                    ))}
                  </Box>
                )}

                <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
                  Raw JSON
                </Typography>
                <Box component="pre" sx={{ whiteSpace: "pre-wrap", fontSize: 12, maxHeight: 300, overflow: "auto" }}>
                  {JSON.stringify(u, null, 2)}
                </Box>
              </>
            );
          })()}
        </Paper>
      )}
    </Box>
  );
}
