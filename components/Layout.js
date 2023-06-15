import Header from "./Header";
import MobileNavigation from "./Navigation/MobileNavigation";

const Layout = ({ navigation, children }) => {
  return (
    <>
      <Header navigation={navigation} />
      <MobileNavigation navigation={navigation} />
      {children}
    </>
  );
};

export default Layout;
