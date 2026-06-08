const { default: axios } = require("axios");
const Donation = require("../models/donations");
const createDonation = async (amount, userId) => {
  const newDonation = await Donation.create({ amount: amount, user: userId });
  return newDonation;
};
const updateDonation = async (id, data) => {
  const updatedDonation = await Donation.findOneAndUpdate({ _id: id }, data, {
    new: true,
  });
  return updatedDonation;
};
const createPaymentLink = async (donation) => {
  const data = {
    maxFailureAttempts: 3,
    paymentType: "credit",
    amount: donation.amount.toString(),
    currency: "EGP",
    order: donation._id,
    merchantRedirect: "https://example.com/redirect",
    display: "en",
    type: "one-time",
    allowedMethods: "card,wallet",
    redirectMethod: null,
    iframeBackgroundColor: "#FFFFFF",
    metaData: {
      customKey: "customValue",
      displayNotes: { key: "value" },
    },
    merchantId: process.env.KASHIER_MERCHANT_ID,
    failureRedirect: false,
    brandColor: "#33e7ffff",
    defaultMethod: "card",
    description: "Payment for order ORD123456",
    manualCapture: false,
    saveCard: null,
    retrieveSavedCard: true,
    interactionSource: "ECOMMERCE",
    enable3DS: true,
    serverWebhook: process.env.KASHIER_WEBHOOK_URL,
  };
  const response = await axios.post(
    "https://test-api.kashier.io/v3/payment/sessions",
    data,
    {
      headers: {
        Authorization: process.env.KASHIER_SECRET_KEY,
        "api-key": process.env.KASHIER_API_KEY,
      },
    },
  );
  return response.data;
};

const listAllDonations = async () => {
  const donations = await Donation.find().populate("user", "name email").sort({
    createdAt: -1,
  });
  return donations;
};
const listMyDonations = async (userId) => {
  const donations = await Donation.find({ user: userId }).sort({
    createdAt: -1,
  });
  return donations;
};
const getDonationById = async (id) => {
  const donation = await Donation.findById(id).populate("user");
  return donation;
};
module.exports = {
  createDonation,
  updateDonation,
  createPaymentLink,
  listAllDonations,
  listMyDonations,
  getDonationById,
};
