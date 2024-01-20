import React, { Children, useContext, useState } from "react";

const ProfileContext = React.createContext(null);

export function ProfileProvider({ children }) {
  const [profile, setProfile] = useState("");
  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}

export const useProfile = () => {
  return useContext(ProfileContext);
};
// export default ProfileProvider;
