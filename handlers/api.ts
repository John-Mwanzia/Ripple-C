const createURL = (path) => window.location.origin + path;

export const SignIn = async ({ phoneNumber, password }) => {
  try {
    const res = await fetch(
      new Request(createURL("/api/signin"), {
        method: "POST",
        body: JSON.stringify({
          phoneNumber,
          password,
        }),
      })
    );

    if (res.ok) {
      return res.json();
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const SignUp = async ({
  phoneNumber,
  firstName,
  password,
  referralCode,
  referrer,
}) => {
  try {
    const res = await fetch(
      new Request(createURL("/api/signup"), {
        method: "POST",
        body: JSON.stringify({
          phoneNumber,
          firstName,
          password,
          referralCode,
          referrer,
        }),
      })
    );

    if (res.ok) {
      return res.json();
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const getUserData = async ({ phoneNumber }) => {
  try {
    const res = await fetch(
      new Request(createURL(`/api/user/${phoneNumber}`), {
        method: "GET",
      })
    );

    if (res.ok) {
      return res.json();
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const transactionInit = async ({ phoneNumber, amount, type }) => {
  try {
    const res = await fetch(
      new Request(createURL("/api/transaction"), {
        method: "POST",
        body: JSON.stringify({
          phoneNumber,
          amount,
          type,
        }),
      })
    );

    if (res.ok) {
      return res.json();
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const createInvestment = async ({
  phoneNumber,
  productName,
  productPrice,
  revenueCycle,
  dailyIncome,
  totalIncome,
}) => {
  try {
    const res = await fetch(
      new Request(createURL("/api/investment"), {
        method: "POST",
        body: JSON.stringify({
          phoneNumber,
          productName,
          productPrice,
          revenueCycle,
          dailyIncome,
          totalIncome,
        }),
      })
    );

    if (res.ok) {
      return res.json();
    }
  } catch (error) {
    throw new Error(error);
  }
};
