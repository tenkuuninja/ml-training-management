// import { AccountApi } from "@/apis";
// import { LOCALSTORAGE_TOKEN_KEY } from "@/configs/app";
import { removeAuth, updateAuth } from "@/lib/redux/slices/auth";
import { AppState } from "@/lib/redux/store";
import { useDispatch, useSelector } from "react-redux";

export function useAuth() {
  const dispatch = useDispatch();
  const auth = useSelector((store: AppState) => store?.auth);

  const handleGetProfile = async () => {
    try {
      // const res = await AccountApi.getProfile();
      // dispatch(updateAuth(res?.data));
    } catch (error) {
      dispatch(removeAuth());
    }
  };

  const handleLogout = async () => {
    try {
      // localStorage.removeItem(LOCALSTORAGE_TOKEN_KEY);
      dispatch(removeAuth());
    } catch (error) {}
  };

  return {
    ...auth,
    getProfile: handleGetProfile,
    logout: handleLogout,
  };
}
