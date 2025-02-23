export const BASE_URL = "http://localhost:8000/v1";

//email Pattern
export const emailPattern = new RegExp(
  /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
);

export const phonePattern = new RegExp(/^([+]\d{2})?\d{10}$/i);

export const _pagination = {
  hasNext: false,
  hasPrevious: false,
  page: 1,
  limit: 100,
  showing: null,
  
};

export const setPagination = function (
  page = _pagination.page,
  limit = _pagination.limit,
  totalpages = 0,
  total = 0
) {
  let pagination = _pagination;
  const from = page * limit - limit + 1;
  const to = totalpages === page ? total : limit * page;
  
  const hasPrevious = page > 1;
  const hasNext = totalpages > page;
  const showing =
    total > 0 ? `Showing ${from} to ${to} of ${total} entries` : null;
  pagination = {
    ...pagination,
    hasNext: hasNext,
    hasPrevious: hasPrevious,
    page: page,
    limit: limit,
    showing: showing,
  };
  return pagination;
};

//Login Form Validation
export const LoginFormValidation = (inputDetail) => {
  let isError = false;
  let errorObj = {};
  let errors = {};

  if (window.cn(inputDetail.email) && !window.cb(inputDetail.email)) {
    errors = { ...errors, email: "Enter Email *" };
    isError = true;
  } else if (!emailPattern.test(inputDetail.email)) {
    errors = { ...errors, email: "Enter Valid Email*" };
    isError = true;
  } else {
    errors = { ...errors, email: "" };
  }

  if (window.cn(inputDetail.password) && !window.cb(inputDetail.password)) {
    errors = { ...errors, password: "Enter Password *" };
    isError = true;
  } else {
    errors = { ...errors, password: "" };
  }

  errorObj = { errors, isError };

  return errorObj;
};

//Login Form Validation
export const CategoryValidation = (inputDetail) => {
  let isError = false;
  let errorObj = {};
  let errors = {};

  if (window.cn(inputDetail.name) && !window.cb(inputDetail.name)) {
    errors = { ...errors, name: "Enter Category Name *" };
    isError = true;
  } else {
    errors = { ...errors, name: "" };
  }

  if (
    window.cn(inputDetail.description) &&
    !window.cb(inputDetail.description)
  ) {
    errors = { ...errors, description: "Enter Category Description *" };
    isError = true;
  } else {
    errors = { ...errors, description: "" };
  }

  errorObj = { errors, isError };

  return errorObj;
};

//Employee Form Validation
export const EmployeeValidation = (inputDetail) => {
  let isError = false;
  let errorObj = {};
  let errors = {};

  if (window.cn(inputDetail.first_name) && !window.cb(inputDetail.first_name)) {
    errors = { ...errors, first_name: "Enter First Name *" };
    isError = true;
  } else {
    errors = { ...errors, first_name: "" };
  }

  if (window.cn(inputDetail.last_name) && !window.cb(inputDetail.last_name)) {
    errors = { ...errors, last_name: "Enter Last Name *" };
    isError = true;
  } else {
    errors = { ...errors, last_name: "" };
  }

  if (window.cn(inputDetail.email) && !window.cb(inputDetail.email)) {
    errors = { ...errors, email: "Enter Email *" };
    isError = true;
  } else if (!emailPattern.test(inputDetail.email)) {
    errors = { ...errors, email: "Enter Valid Email*" };
    isError = true;
  } else {
    errors = { ...errors, email: "" };
  }

  if (window.cn(inputDetail.phone) && !window.cb(inputDetail.phone)) {
    errors = { ...errors, phone: "Enter Phone Number *" };
    isError = true;
  } else if (!phonePattern.test(inputDetail.phone)) {
    errors = { ...errors, phone: "Enter Valid Phone Number*" };
    isError = true;
  } else {
    errors = { ...errors, phone: "" };
  }

  if (window.cn(inputDetail.password) && !window.cb(inputDetail.password)) {
    errors = { ...errors, password: "Enter Password *" };
    isError = true;
  } else {
    errors = { ...errors, password: "" };
  }

  errorObj = { errors, isError };

  return errorObj;
};

export const ServiceValidation = (inputDetail) => {
  let isError = false;
  let errorObj = {};
  let errors = {};

  if (
    window.cn(inputDetail.name) &&
    !window.cb(inputDetail.name)
  ) {
    errors = { ...errors, name: "Enter Inventory Name *" };
    isError = true;
  } else {
    errors = { ...errors, name: "" };
  }

  if (
    window.cn(inputDetail.price) &&
    !window.cb(inputDetail.price)
  ) {
    errors = { ...errors, price: "Enter Price *" };
    isError = true;
  } else {
    errors = { ...errors, price: "" };
  }

  if (
    window.cn(inputDetail.item) &&
    !window.cb(inputDetail.item)
  ) {
    errors = { ...errors, item: "Enter Item *" };
    isError = true;
  } else {
    errors = { ...errors, item: "" };
  }

  if (
    window.cn(inputDetail.category_id) &&
    !window.cb(inputDetail.category_id)
  ) {
    errors = { ...errors, category_id: "Select Category *" };
    isError = true;
  } else {
    errors = { ...errors, category_id: "" };
  }

  errorObj = { errors, isError };

  return errorObj;
};
