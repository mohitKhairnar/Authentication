import Login from "./pages/login/Login";
import { Routes, Route } from "react-router-dom";
import Signup from "./pages/signup/Signup";
import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import LoadingBar from "react-top-loading-bar";
import OnlyIfNotLoggedIn from "./components/OnlyIfNotLoggedIn";
import toast, { Toaster } from "react-hot-toast";

export const TOAST_SUCCESS = "toast_success";
export const TOAST_FAILURE = "toast_failure";

function App() {
  console.log("App is loading");
    const isLoading = useSelector((state) => state.appConfigReducer.isLoading);
    const toastData = useSelector((state) => state.appConfigReducer.toastData);
    const loadingRef = useRef(null);

    useEffect(() => {
        if (isLoading) {
            loadingRef.current?.continuousStart();
        } else {
            loadingRef.current?.complete();
        }
    }, [isLoading]);

    useEffect(() => {
        switch (toastData.type) {
            case TOAST_SUCCESS:
                toast.success(toastData.message);
                break;
            case TOAST_FAILURE:
                toast.error(toastData.message);
                break;
        }
    }, [toastData]);

    return (
        <div className="App">
            {/* <LoadingBar color="#000" ref={loadingRef} />
            <div>
                <Toaster />
            </div> */}
            <Routes>
            <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
        </div>
    );
}

export default App;
