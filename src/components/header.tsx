import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMe } from "../hooks/useMe";
import nuberLogo from "../images/logo.svg";

export default function Header() {
  const { data, loading, error } = useMe();
  return (
    <header className="py-4">
      <div className="mx-auto flex max-w-screen-xl items-center justify-between px-5 xl:px-0">
        <img src={nuberLogo} className="w-24" alt="Nuber Eats" />
        <span className="text-sm">
          <FontAwesomeIcon icon={faUser} className="text-xl" />
        </span>
      </div>
    </header>
  );
}
