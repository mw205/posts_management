const { Router } = require("express");
const authenticate = require("../middlewares/authenticate");
const donationController = require("../controllers/donationController");
const { validate, validateKashierHash, restrictTo } = require("../middlewares");
const createDonationSchema = require("../validations/donations/createDonationSchema");

const router = Router();
router.post(
  "/",
  authenticate,
  validate(createDonationSchema),
  donationController.createDonation,
);
router.post("/webhook", validateKashierHash, donationController.handleWebhook);

router.get(
  "/all",
  authenticate,
  restrictTo("admin"),
  donationController.listAllDonations,
);
router.get("/", authenticate, donationController.listMyDonations);
module.exports = router;
