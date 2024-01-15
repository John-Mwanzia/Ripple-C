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
  productId,
  phoneNumber,
  category,
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
          productId,
          phoneNumber,
          category,
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

export const paymentConfirm = async (userId, amount, id) => {
  try {
    const res = await fetch(
      new Request(createURL("/api/paymentConfirm"), {
        method: "POST",
        body: JSON.stringify({
          userId,
          amount,
          id,
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

export const declinePayment = async (userId, id) => {
  try {
    const res = await fetch(
      new Request(createURL("/api/declinePayment"), {
        method: "POST",
        body: JSON.stringify({
          userId,
          id,
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

export const withdrawConfirm = async (withdrawId) => {
  try {
    const res = await fetch(
      new Request(createURL("/api/withdrawConfirm"), {
        method: "POST",
        body: JSON.stringify({
          withdrawId,
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

export const withdrawDecline = async (userId, withdrawId, amount) => {
  try {
    const res = await fetch(
      new Request(createURL("/api/withdrawDecline"), {
        method: "POST",
        body: JSON.stringify({
          userId,
          withdrawId,
          amount,
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
