import Button from "../../components/button";
import { useMe } from "../../hooks/useMe";

export const EditProfile = () => {
  const { data: userData } = useMe();
  return (
    <div className="mt-52 flex flex-col items-center justify-center">
      <h4 className="mb-3 text-2xl font-semibold">Edit Profile</h4>
      <form className="mt-5 mb-5 grid w-full max-w-screen-sm gap-3">
        <input className="input" type="email" placeholder={userData?.me.email} />
        <input className="input" type="password" placeholder="Password" />
        <Button loading={false} canClick={true} actionText="Save Profile" />
      </form>
    </div>
  );
};
