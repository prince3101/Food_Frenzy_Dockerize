import {useNavigation } from "react-router-dom";
// import { Loading } from "../pages/Loading";

const Loader = () => {
  const navigation = useNavigation();
  console.log(navigation);

  if (navigation.state === "loading") return (
    <div className="container loader-section">
      <div className="loader"></div>
    </div>
  );
};
  


// const Loading = () => {
//     return (
//       <div className="container loader-section">
//         <div className="loader"></div>
//       </div>
//     );
//   };

export default Loader;