import "./Loader.css";
const Loader = ({ width = "5rem", height = "5rem" }) => {
  const styles = { width, height };
  return (
    <div className="width-100 display-flex justify-content-center align-items-center">
      <div style={styles} className="loader" />
    </div>
  );
};

export { Loader };
