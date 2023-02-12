import { ReactNode } from "react";
import { IconType } from "react-icons";
import { GiCookingPot } from "react-icons/gi";

interface Props {
  isSubMenuOpen: boolean;
  onClick: (bool: boolean) => void;
}

const SideBar: React.FC<Props> = ({ isSubMenuOpen, onClick }) => {
  const handleSubMenuToggle = () => {
    onClick(!isSubMenuOpen);
  };

  return (
    <div className="bg-gray-900 text-white h-screen w-20 flex flex-col justify-between">
      <div className="p-4">
        <SideBarIcon
          icon={<GiCookingPot size="28" />}
          handleSubMenuToggle={handleSubMenuToggle}
        />
      </div>
      <div className="p-4"></div>
    </div>
  );
};

interface SideBarIconProp {
  icon: ReactNode;
  handleSubMenuToggle: () => void;
}

const SideBarIcon: React.FC<SideBarIconProp> = ({
  icon,
  handleSubMenuToggle,
}) => {
  return (
    <div className="sidebar-icon" onClick={handleSubMenuToggle}>
      {icon}
    </div>
  );
};

export default SideBar;
