import Header from "./Header";
import MobileNavigation from "./Navigation/MobileNavigation";

const Layout = ({ navigation, children }) => {
  return (
    <div>
      <Header navigation={navigation} />
      <MobileNavigation navigation={navigation} />
      {children}
    </div>
  );
};

export default Layout;
