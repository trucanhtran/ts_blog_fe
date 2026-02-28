"use client";

// import react
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

// import component
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";

// import lib
import { apiGet } from "@/lib/api";

interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

const SamplePage = () => {
  const t = useTranslations("sample");
  const tCommon = useTranslations("common");
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiGet<Post[]>("/posts", { params: { _limit: 5 } });
      setPosts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : tCommon("error"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <Box sx={{ p: 3, maxWidth: 720, mx: "auto" }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {t("title")}
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 2 }}>
        {t("description")}
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Button variant="contained" onClick={fetchPosts} disabled={loading} sx={{ mb: 2 }}>
        {loading ? tCommon("loading") : tCommon("refresh")}
      </Button>

      {loading && !posts.length ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {posts.map((post) => (
            <Card key={post.id}>
              <CardContent>
                <Typography variant="h6" component="h2" gutterBottom>
                  {post.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {post.body}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ mt: 1, display: "block" }}
                >
                  Post #{post.id} · User {post.userId}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default SamplePage;
