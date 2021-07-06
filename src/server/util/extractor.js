export const extractDBQueryParam = (req) => {
  const keys = Object.keys(req.body.payload);
  const values = Object.values(req.body.payload);
  return { keys, values };
};

export const extractDBQueryParamforUpdate = (req, exceptField = []) => {
  const keys = Object.keys(req.body.payload);
  const values = Object.values(req.body.payload);
  let q = "";
  keys.forEach((ele, index) => {
    if (!(exceptField.indexOf(ele) > -1)) {
      q = q ? `${q}, ${ele}='${values[index]}'` : `${ele}='${values[index]}'`;
    }
  });
  return q;
};
export const extractDBQueryParamforRetrieve = (req) => {
  const keys = Object.keys(req.body.payload);
  const values = Object.values(req.body.payload);
  let q = "";
  keys.forEach((ele, index) => {
    q = q ? `${q} AND ${ele}='${values[index]}'` : `${ele}='${values[index]}'`;
  });
  return q;
};
