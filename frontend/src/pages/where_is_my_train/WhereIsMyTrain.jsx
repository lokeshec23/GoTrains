import "../../styles/WhereIsMyTrain.css";
import SwrapIcon from "../../assets/images/where_is_my_train/swap_icon.svg";

import Select from "@mui/joy/Select";
import Autocomplete from "@mui/joy/Autocomplete";
import Option from "@mui/joy/Option";
import Button from "@mui/joy/Button";
import { useCallback, useEffect, useState } from "react";
import { getList } from "../../services/whereIsMyTrain";
import useApi from "../../hooks/useApi";
import debounce from "../../utils/debounce";
// import { showToast } from "../utils/toast";

const WhereIsMyTrain = () => {
  const { loading, error: errorAPi, callApi } = useApi();
  const [trainInfo, setTrainInfo] = useState({
    from_station: "",
    to_station: "",
  });

  const [listOfStation, setListOfStation] = useState([]);

  const STATION_NAMES = [
    "Chennai Central",
    "Chennai Egmore",
    "Bangalore Central",
  ];

  // const getTrainList = (key) => {
  //   let list =
  //     STATION_NAMES &&
  //     STATION_NAMES.map((name, index) => {
  //       return (
  //         <Option key={`${name}_${index}`} value={name} name={key}>
  //           {name}
  //         </Option>
  //       );
  //     });

  //   return list;
  // };

  const getListOfStation = (e) => {};

  const handleChange = async (e, key) => {
    debugger;
    const value = e?.target?.value || e?.target?.innerText || "";

    setTrainInfo((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // const debouncedApiCall = useCallback(
  //   debounce(async (value) => {
  //     const response = await callApi(() => getList(value));
  //     if (response) {
  //       setListOfStation(response);
  //     }
  //   }, 500), // Adjust delay as needed (e.g., 500ms)
  //   []
  // );

  useEffect(() => {
    loaded();
  }, []);
  const loaded = async () => {
    const response = await callApi(() => getList());
    if (response) {
      debugger;
      setListOfStation(response);
    }
  };

  const swrapState = () => {
    setTrainInfo((prev) => ({
      ...prev,
      from_station: prev.to_station,
      to_station: prev.from_station,
    }));
  };

  return (
    <div className="where-container">
      <div className="where-header">
        <h4>Where is my train</h4>
      </div>

      {/* search  */}
      <div className="where-search-div">
        <Autocomplete
          // startDecorator={<LiveTv />}
          placeholder="From Station"
          options={listOfStation ?? STATION_NAMES}
          size="md"
          variant="soft"
          color="neutral"
          className="where-select"
          name="from_station"
          value={trainInfo?.from_station || ""}
          onChange={(e) => {
            debugger;
            handleChange(e, "from_station");
          }}
        />
        <img
          src={SwrapIcon}
          alt="SwrapIcon"
          className="where-swrap-icon"
          onClick={swrapState}
        />
        <Autocomplete
          // startDecorator={<LiveTv />}
          placeholder="To Station"
          options={listOfStation || STATION_NAMES}
          size="md"
          variant="soft"
          color="neutral"
          className="where-select"
          name="to_station"
          value={trainInfo?.to_station || ""}
          onChange={(e) => {
            handleChange(e, "to_station");
          }}
        />
      </div>

      <div className="where-search-button-div">
        <Button
          className="where-search-button"
          color="neutral"
          onClick={function () {}}
          variant="primary"
        >
          Search
        </Button>
      </div>
    </div>
  );
};

export default WhereIsMyTrain;
