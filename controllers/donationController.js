const donationService = require("../services/donationService");
const APIError = require("../utils/APIError");
const emailService = require("../services/emailService");

const createDonation = async (req, res) => {
  const donation = await donationService.createDonation(
    req.body.amount,
    req.user.id,
  );
  const gatewayRes = await donationService.createPaymentLink(donation);
  const updatedDonation = await donationService.updateDonation(donation._id, {
    providerSessionId: gatewayRes._id,
    link: gatewayRes.sessionUrl,
  });
  res.status(200).json({
    status: "success",
    data: updatedDonation,
  });
};

const handleWebhook = async (req, res) => {
  const { data } = req.body;
  const { merchantOrderId: donationId, status } = data;

  const donationStatus = status === "SUCCESS" ? "completed" : "failed";
  await donationService.updateDonation(donationId, { status: donationStatus });

  // Fetch the donation with user populated
  const donation = await donationService.getDonationById(donationId);

  // Send receipt email if donation completed
  if (donationStatus === "completed" && donation && donation.user) {
    await emailService.sendEmail(
      "donationSuccess",
      {
        name: donation.user.name,
        amount: donation.amount,
        donationId: donation._id.toString(),
      },
      donation.user.email,
      "Thank you for your donation!",
    );
  }

  res.status(200).json({
    status: "success",
    data: "webhook received",
  });
};

const listAllDonations = async (req, res) => {
  const donations = await donationService.listAllDonations();
  res.status(200).json({
    status: "success",
    data: donations,
  });
};

const listMyDonations = async (req, res) => {
  const donations = await donationService.listMyDonations(req.user.id);
  res.status(200).json({
    status: "success",
    data: donations,
  });
};

module.exports = {
  createDonation,
  handleWebhook,
  listAllDonations,
  listMyDonations,
};
