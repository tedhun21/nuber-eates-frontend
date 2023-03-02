import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMe } from "../hooks/useMe";
import nuberLogo from "../images/logo.svg";

export default function Header() {
  const { data } = useMe();
  return (
    <>
      {!data?.me.verified && (
        <div className="bg-red-500 p-3 text-center text-xs text-white">
          <span>Please verify your email.</span>
        </div>
      )}
      <header className="py-4">
        <div className="mx-auto flex w-full max-w-screen-xl items-center justify-between px-5 xl:px-0">
          <img src={nuberLogo} className="w-24" alt="Nuber Eats" />
          <span className="text-xs">
            <FontAwesomeIcon icon={faUser} className="text-xl" />
          </span>
        </div>
      </header>
    </>
  );
}
