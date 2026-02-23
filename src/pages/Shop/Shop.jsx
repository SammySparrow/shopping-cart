import { useOutletContext } from "react-router";
import LoadingCircle from "../../components/LoadingWheel/LoadingCircle";

export default function Shop() {
  const { loading, error, shopItems } = useOutletContext();
  if (loading)
    return (
      <>
        <LoadingCircle />
        <p>Loading</p>
      </>
    );
  if (error) return <p>An error was encountered</p>;
}
