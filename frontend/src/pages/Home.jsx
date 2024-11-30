import HomeTrainIMG from "../assets/images/home_page_train.svg";
import "../styles/Home.css";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/booking");
  };

  return (
    <div className="homePage-container">
      <div>
        <div className="homePage-imgText">Go Trains</div>
        <img src={HomeTrainIMG} alt="train-img" className="home_trainimg" />
      </div>
      <button className="homePage_reginster_btn" onClick={handleNavigation}>
        Register
      </button>
      <div className="homePage_bottom_container">
        <p>
          Where is my <br />
          <Link className="link" to="/whereismytrain">
            Train
          </Link>
          ?
        </p>
        <p>
          Already a user? <br />
          <span>
            {" "}
            <Link to="/login" className="link">
              Login
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Home;
