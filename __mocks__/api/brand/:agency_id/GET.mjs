export default (request, response) => {
  const {
    params: { agency_id },
  } = request;

  return response.status(200).json({
    "code": "ok",
    "data": [
      {
        "agency": {
          "id": agency_id,
          "name": "string"
        },
        "brand_id": "string",
        "brand_status": "PENDING",
        "expiry_date": "string",
        "file_name": "string",
        "human_readable": "string",
        "id": "string"
      }
    ]
  });
};
