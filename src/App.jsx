import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Feed from "./components/pages/feed/Feed.jsx";
import MainLayout from "./components/layout/MainLayout";
import Signup from "./components/auth/Signup";
import Signin from "./components/auth/Signin";
import ProfileView from "./components/pages/profile/ProfileView.jsx";
import ProfileEdit from "./components/pages/profile/ProfileEdit.jsx";
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoute from "./utils/ProtectedRoute.jsx";
import GuestRoute from "./utils/GuestRoute.jsx";
import { useEffect } from "react";
import { fetchLoggedInUser, selectUser } from "./components/auth/authSlice.js";
import Requests from "./components/pages/requests/Requests.jsx";
import Chat from "./components/pages/chat/Chat.jsx";
import ChatData from "./components/pages/chat/ChatsData.jsx";
import SocketProvider from "./utils/SocketProvider.jsx";
import { Toaster } from "react-hot-toast";
import HelpPage from "./components/pages/HelpPage.jsx";

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    const fetchData = () => {
      dispatch(fetchLoggedInUser());
    };
    if (!user) fetchData();
  }, [dispatch, user]);

  return (
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <SocketProvider>
                  <MainLayout />
                </SocketProvider>
              </ProtectedRoute>
            }
          >
            <Route index element={<Feed />} />
            <Route path="/requests" element={<Requests />} />
            <Route path="/chat" element={<ChatData />} />
            <Route
              path="/chat/:status/:chatId/:targetUserId"
              element={<Chat />}
            />
            <Route path="/profile/view/:id" element={<ProfileView />} />
            <Route path="/profile/edit/:id" element={<ProfileEdit />} />
            <Route path="/help" element={<HelpPage />} />
          </Route>

          <Route
            path="/signin"
            element={
              <GuestRoute>
                <Signin />
              </GuestRoute>
            }
          />

          <Route
            path="/signup"
            element={
              <GuestRoute>
                <Signup />
              </GuestRoute>
            }
          />
        </Routes>
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              marginBottom: "60px",
            },
          }}
        />
      </BrowserRouter>
  );
}

export default App;
