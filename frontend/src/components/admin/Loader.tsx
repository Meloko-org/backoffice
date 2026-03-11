import { BallTriangle } from "react-loader-spinner";

export default function Loader() {

  return(
    <div className="w-full h-full flex justify-center items-center">
      <BallTriangle
        height={100}
        width={100}
        radius={5}
        color="#98B66E"
        ariaLabel="ball-triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
}