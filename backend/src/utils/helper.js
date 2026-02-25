import bcrypt from "bcryptjs";

// HASH PASSWORD
export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// COMPARE PASSWORD
export const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

// FORMAT DATE TO YYYY-MM-DD
export const formatDate = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// GENERATE RANDOM ID
export const generateId = (length = 8) => {
  return Math.random().toString(36).substring(2, 2 + length);
};

// SIMPLE EMAIL VALIDATION
export const validateEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};