import { bottombarLinks } from "@/constants";
import { Link, useLocation } from "react-router-dom";

const Bottombar = () => {
  const { pathname } = useLocation();

  return (
    <section className="bottom-bar">
      {bottombarLinks.map((link) => {
        const isActive = pathname === link.route;
        return (
          <Link
            to={link.route}
            key={`bottombar-${link.label}`} 
            className={`${
              isActive && "rounded-[10px] bg-primary-500 "
            } flex-center flex-col gap-1 p-2 transition`}
          >
            <img 
              src={link.imgURL} 
              alt={link.label}
              className={`${isActive && 'invert-white'}`}
              width={16}
              height={16}
            />
            <p className="tiny-medium text-light-2">
              {link.label}
            </p>
            
          </Link>
        )
      })}
    </section>
  )
}

export default Bottombar