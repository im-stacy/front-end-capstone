import { ReactNode } from "react";
import { IconType } from "react-icons";
import { GiCookingPot } from "react-icons/gi";
import { AiOutlineFileAdd } from "react-icons/ai";

interface Props {
  onClick: (n: number) => void;
}

const SideBar: React.FC<Props> = ({ onClick }) => {
  return (
    <div className="bg-gray-900 text-white h-screen w-20 flex flex-col justify-between">
      <div className="p-4">
        <SideBarIcon
          flag={0}
          icon={<GiCookingPot size="65" />}
          onClick={onClick}
        />
        <SideBarIcon
          flag={1}
          icon={<AiOutlineFileAdd size="65" />}
          onClick={onClick}
        />
      </div>
      <div className="p-4"></div>
    </div>
  );
};

interface SideBarIconProp {
  icon: ReactNode;
  flag: number;
  onClick: (n: number) => void;
}

const SideBarIcon: React.FC<SideBarIconProp> = ({ icon, flag, onClick }) => {
  const handleIconClick = () => {
    onClick(flag);
  };
  return (
    <div className="sidebar-icon" onClick={handleIconClick}>
      {icon}
    </div>
  );
};

export default SideBar;
