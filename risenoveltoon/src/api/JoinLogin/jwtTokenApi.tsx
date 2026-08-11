import axios from "axios";

const api = axios.create({
  baseURL: "/api",
});

// 요청 인터셉터: Access Token 붙이기
api.interceptors.request.use((config) => {
  const storedToken = localStorage.getItem("jwtToken");
  if (storedToken) {
    const { accessToken } = JSON.parse(storedToken);
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// 응답 인터셉터: 토큰 만료 시 Refresh Token으로 재발급
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401) {
      const storedToken = localStorage.getItem("jwtToken");
      if (storedToken) {
        const { refreshToken } = JSON.parse(storedToken);

        try {
          // 백엔드의 재발급 API 호출
          const res = await axios.post("/api/reissue", { refreshToken });

          const newToken = res.data.data; // ApiResponse.data 안에 새 토큰
          localStorage.setItem("jwtToken", JSON.stringify(newToken));

          // 새 토큰으로 Authorization 헤더 갱신 후 재요청
          originalRequest.headers.Authorization = `Bearer ${newToken.accessToken}`;
          return api(originalRequest);
        } catch (err) {
          // Refresh Token도 만료 → 로그인 페이지로 이동
          window.location.href = "/loginScreen";
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;