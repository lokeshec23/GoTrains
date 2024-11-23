const HelperText = ({ message, type, style }) => {
  const getTextType = (type) => {
    switch (type) {
      case "success":
        return "text-success";
      case "error":
        return "text-danger";
      case "warning":
        return "text-warning";
      case "info":
        return "text-info";
      default:
        return "text-info";
    }
  };

  return (
    <div className={`${getTextType(type)} mb-2`} id="helperText" style={style}>
      {message}
    </div>
  );
};

export default HelperText;
