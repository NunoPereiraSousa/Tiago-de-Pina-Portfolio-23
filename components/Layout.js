import Header from "./Header";

const Layout = ({ navigation, children }) => {
  return (
    <>
      <Header navigation={navigation} />
      {children}
    </>
  );
};

export default Layout;
